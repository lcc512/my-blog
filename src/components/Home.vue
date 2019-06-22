<template>

  <div>

    <el-container>

      <el-header height="150px" >
        <vue-header></vue-header>
      </el-header>

      <el-container>
        <el-aside width="250px">
          <vue-aside></vue-aside>
        </el-aside>
        <el-main>

          <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="16">
              <vue-main></vue-main>
            </el-col>
          </el-row>

        </el-main>
      </el-container>

    </el-container>

  </div>
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


  body {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: #303133;
  }

  a {
    text-decoration: none;

    &:active, &:visited,&:link {
      color: #303133;
    }
  }

  .myActive {
    a {
      font-weight: bolder;
      color: #409EFF;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /*通用类样式*/

  /*标题下面的文章属性信息*/
  .common-info {
    font-size: 14px;
    color: #909399;
  }

  /*默认蓝色背景*/
  .common-background-color{
    background-color: #409EFF;
  }
  /*测试样式*/
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  /*测试样式结束*/

</style>