<template>
  <div>

    <el-row :gutter="10" class="baseStyle">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <img src="../images/logo.png" alt="logo">
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <span class="logoName"> MyBolg DevVersion</span>
      </el-col>
      <el-col :xs="24" :sm="24" :md="0" :lg="0" :xl="0">
        <ul class="otherMenu">
          <router-link tag="li" exact to="/">
            <a>HOME</a></router-link>
          <router-link tag="li" to="/article">
            <a>Article</a>
          </router-link>
          <router-link tag="li" to="/about">
            <a>About</a>
          </router-link>
        </ul>
      </el-col>

    </el-row>

  </div>
</template>

<script>

</script>

<style scoped lang="less">


  .baseStyle{
    text-align: center;
    padding: 10px 10%;
    /*height: 60%;*/
    img{
      margin: 0 auto;
      display: block;
      height: 60px;
    }
    .logoName{
      display: block;
      font-size: 26px;
      line-height: 60px;
      font-weight: bolder;
    }

    .other{
      float: right;
      font-size: 26px;
      font-weight: bolder;
      vertical-align: middle;
    }

    .otherMenu{
      text-align: center;
      padding-top: 30px;
      padding-bottom: 20px;

      border-bottom: 1px solid #409EFF;

        li {
          display: inline-block;
          text-align: center;
          font-size: 20px;
          padding: 0 10px;
          a {
            text-decoration: none;
          }

        }
    }

  }

</style>