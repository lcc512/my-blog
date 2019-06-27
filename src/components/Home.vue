<template>

  <div>

    <el-container>

      <el-header height="150px">
        <vue-header></vue-header>
      </el-header>

      <el-container>
        <el-aside width="180px">
          <vue-aside></vue-aside>
        </el-aside>
        <el-main>

          <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="24" :md="22" :lg="22" :xl="22">
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

    &:active, &:visited, &:link {
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
    text-align: right;
    font-size: 12px;
    color: #909399;
  }

  /*默认蓝色背景*/
  .common-background-color {
    background-color: #409EFF;
  }

  @media (max-width: 991px) {
    .el-aside {
      display: none;
    }

    .el-header {
      height: 200px !important;
    }
  }

  /*通用tag标签样式*/
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  /*测试样式*/

  /*测试样式结束*/

</style>