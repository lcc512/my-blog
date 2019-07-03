<template>
  <div class="baseStyle">


    <el-row style="margin-bottom: 20px">
      <el-checkbox-group v-model="checkboxGroup">
        <el-checkbox-button v-for="city in checkTags" :label="city" :key="city">{{city}}</el-checkbox-button>
      </el-checkbox-group>
    </el-row>
    <el-row type="flex" justify="start" style="padding-bottom: 20px;">
      <el-button type="primary" round plain @click="toNewPage">新建</el-button>
      <el-button type="info" round plain @click="shuaxinTag">刷新标签</el-button>
    </el-row>


    <ul v-loading="loading">

      <li v-for="article in filterArticleList">
        <p class="title">
          <i class="el-icon-s-opportunity"></i>
          <router-link :to="{name:'article-detail',params:{id:article.id}}">{{article.title}}</router-link>
        <div class="tagList">
          <el-tag :key="tag" v-for="tag in article.tagList">
            {{tag}}
          </el-tag>
        </div>
        <p class="common-info">
          <span>{{article.createTime}} | {{article.updateTime}}(更新)</span>
        </p>
      </li>
    </ul>

  </div>
</template>

<script>

  import axios from 'axios'

  import VueCommon from './VueCommon.vue'

  export default {
    data() {
      return {
        articleList: [],
        // 筛选后的列表
        currArticleList: [],
        // 筛选数组
        checkboxGroup: [],
        checkTags: [],
        loading: true
      }
    },
    computed: {

      //筛选逻辑
      //不选则显示全部
      //选几个，文章所含标签包含选择的显示
      filterArticleList() {


        var tempList = []

        if (this.checkboxGroup.length === 0) {
          tempList = this.articleList
          return tempList
        }


        this.articleList.forEach(item => {

          // 没有标签的跳出
          if (item.tagList == '' || item.tagList == null) return

          // console.log(item)
          // 设定一个临时flag，如果抽中了某一条就不再判断
          item.tempFlag = false

          if (this.isContained(item.tagList, this.checkboxGroup)) {

            tempList.push(item)
          }


          // if (this.checkboxGroup.indexOf(valItem) !== -1 && item.tempFlag === false) {
          //
          //   tempList.push(item)
          //
          //   item.tempFlag = true
          //
          //   return
          // }


        })

        return tempList

      }
    },
    created() {

      this.loadArticleList()

      this.setCheckTags()


    },
    methods: {

      // 网上找的判断数组是否包含方法，a包含b返回true
      isContained(a, b) {
        if (!(a instanceof Array) || !(b instanceof Array)) return false;
        if (a.length < b.length) return false;
        var aStr = a.toString();
        for (var i = 0, len = b.length; i < len; i++) {
          if (aStr.indexOf(b[i]) == -1) return false;
        }
        return true;
      }
      ,

      // 刷新标签
      async shuaxinTag() {
        await VueCommon.shuaxinTagAllList(this.articleList)

        this.setCheckTags()
      }
      ,

      async setCheckTags() {

        this.checkTags = await VueCommon.getTagAllList()

      }

      ,
      toNewPage() {
        this.$router.push('/article/new')
      },
      async loadArticleList() {

        const {data} = await axios.get('/myBlog/article')

        data.articles.forEach((item) => {

          if (item.tagList == null || item.tagList == '') return false

          item.tagList = item.tagList.split(',')
        })

        this.articleList = data.articles

        this.loading = false

      }
    }
  }
</script>

<style scoped lang="less">

  .baseStyle {
    ul {
      li {
        border-radius: 10px;
        padding: 1px 0;
        border-bottom: 1px solid #e4e7ec;
        &:hover {
          background-color: #F2F6FC;
        }
      }
    }

  }

  .title {
    font-size: 18px;
    i {
      display: inline-block;
      padding: 0 10px;
      color: #409EFF;
    }
  }


</style>