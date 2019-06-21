<template>
  <el-container>

    <el-header>
      <vue-header></vue-header>
    </el-header>

    <el-container>
      <el-aside>
        <vue-aside></vue-aside>
      </el-aside>
      <el-main>
        <vue-main></vue-main>
      </el-main>
    </el-container>

  </el-container>


</template>

<script>

  import VueHeader from './VueHeader.vue'
  import VueAside from './VueAside.vue'
  import VueMain from './VueMain.vue'

  export default {
    components: {
      VueHeader,
      VueAside,
      VueMain
    }
  }
</script>

<style lang="less">

  body{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: #303133;
  }


  /*.myActive {*/
    /*background-color: beige;*/
    /*a {*/
      /*color: #666;*/
    /*}*/
  /*}*/

  .commonTitle{
    height: 50px;
    line-height: 50px;
    background-color: beige;
    color: #303133;
    text-align: center;
    font-size: 20px;
  }



</style>