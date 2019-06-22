<template>
  <div class="baseStyle">
    <el-button type="primary" @click="toNewPage">新建</el-button>
    <ul>

      <li v-for="article in articleList">
        <p class="title">
          <i class="el-icon-s-opportunity"></i>
          <router-link :to="{name:'article-detail',params:{id:article.id}}">{{article.title}}</router-link>
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
        articleList: []
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
        
        // console.log(data)

        this.articleList = data.articles

      }
    }
  }
</script>

<style scoped lang="less">

  .baseStyle {

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