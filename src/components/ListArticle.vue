<template>
  <div class="baseStyle">

    <el-row style="padding-bottom: 10px;">
      <el-switch
        v-model="switchValue"
        active-text="筛选"
        inactive-text="不筛选">
      </el-switch>
    </el-row>
    <el-row v-if="switchValue">
      <el-checkbox-group v-model="checkboxGroup">
        <el-checkbox-button v-for="city in checkTags" :label="city" :key="city">{{city}}</el-checkbox-button>
      </el-checkbox-group>
    </el-row>

    <el-row type="flex" justify="end">
      <el-button v-if="switchValue" type="info" round @click="shuaxinTag">刷新标签</el-button>
      <el-button type="primary" round @click="toNewPage">新建</el-button>
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
          <span>发布于：{{article.createTime}} | 更新于：{{article.updateTime}}</span>
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
        checkboxGroup: [],
        checkTags: [],

        switchValue: false,

        loading:true
      }
    },
    computed: {

      filterArticleList() {


        if (!this.switchValue) {
          return this.articleList
        }


        const tempList = []

        this.articleList.forEach(item => {

          if (item.tagList == '' || item.tagList == null) return

          // console.log(item)
          // 设定一个临时flag，如果抽中了某一条就不再判断
          item.tempFlag = false

          item.tagList.forEach(valItem => {


            if (this.checkboxGroup.indexOf(valItem) !== -1 && item.tempFlag === false) {

              tempList.push(item)

              item.tempFlag = true

              return
            }

          })
        })

        return tempList

      }
    },
    created() {

      this.loadArticleList()

      this.setCheckTags()




    },
    methods: {

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

        this.loading=false

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