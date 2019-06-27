<template>
  <div class="baseStyle">

    <el-row>
      <h4>标签筛选</h4>
      <el-checkbox-group v-model="checkboxGroup">
        <el-checkbox-button v-for="city in checkTags" :label="city" :key="city">{{city}}</el-checkbox-button>
      </el-checkbox-group>
    </el-row>

    <el-row type="flex" justify="end">
      <el-button type="primary" round @click="toNewPage">新建</el-button>
    </el-row>
    <ul>

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

  export default {
    data() {
      return {
        articleList: [],
        // 筛选后的列表
        currArticleList: [],
        checkboxGroup: [],
        checkTags: ['测试', '前端', '123', '可删除']
      }
    },
    computed: {

      filterArticleList() {

        const tempList = []

        this.articleList.forEach(item => {

          if (item.tagList == '' || item.tagList == null) return

          // console.log(item)
          // 设定一个临时flag，如果抽中了某一条就不再判断
          item.tempFlag = false

          item.tagList.forEach(valItem => {


            if (this.checkboxGroup.indexOf(valItem) !== -1 && item.tempFlag ===false) {

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
    },
    methods: {
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