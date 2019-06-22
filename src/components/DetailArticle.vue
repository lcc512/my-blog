<template>
  <div>
    <el-row>
      <el-button icon="el-icon-search" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle @click="toEditPage"></el-button>
      <!--<el-button type="success" icon="el-icon-check" circle></el-button>-->
      <!--<el-button type="info" icon="el-icon-message" circle></el-button>-->
      <!--<el-button type="warning" icon="el-icon-star-off" circle></el-button>-->
      <el-button type="danger" icon="el-icon-delete" circle @click="toDeleteArticle"></el-button>
    </el-row>
    <p class="title"><i class="el-icon-s-opportunity"></i>{{title}}</p>
    <p class="common-info">{{createTime}} | 更新于：{{updateTime}}</p>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>

  import axios from 'axios'

  export default {
    data() {
      return {
        title: '...',
        content: '...',
        createTime: '...',
        updateTime: '...'

      }
    },
    created () {

      const {id}=this.$route.params

      this.loadArticle(id)

    }
    ,
    methods: {

      async loadTopicById(id) {
        // try {
        //   const {data: topic} = await axios.get(`/api/topics/${id}`)
        //   this.title = topic.title
        //   this.content = topic.content
        //
        //   //获取当前会话状态信息，这里data：表示给它起了一个别名 sessionUser(解构赋值起别名)
        //   const {data: sessionUser} = await axios.get('/api/session')
        //   console.log(sessionUser)
        //
        //   if (topic.user_id === sessionUser.id) {
        //     this.isLoginUser = true
        //   }
        //
        // } catch (err) {
        //
        // }
      },
      async loadArticle(id) {

        try {

          const {data: article} = await axios.get(`/myBlog/article/${id}`)
          this.title = article.title
          this.content = article.content

          this.createTime = article.createTime
          this.updateTime = article.updateTime

        } catch (err) {

        }

      },
      toEditPage(){
        
        console.log('edit')
      },
      toDeleteArticle(){
        console.log('dele')
      }
    }
  }
</script>

<style scoped lang="less">

  .title {
    font-size: 26px;
    font-weight: bolder;

    i {
      display: inline-block;
      padding: 0 15px;
      color: #409EFF;
    }

  }

  .content {
    background-color: #F2F6FC;
    border-radius: 8px;
    padding: 20px 10px;
    text-indent: 32px;
    line-height: 32px;
  }

</style>