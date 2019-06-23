<template>
  <div class="baseStyle">
    <ul>
      <router-link tag="li" exact to="/">
        <a>HOME</a></router-link>
      <router-link tag="li" to="/article">
        <a>Article</a>
      </router-link>
      <router-link tag="li" to="/about">
        <a>About</a>
      </router-link>
    </ul>
    <div class="footerInfo common-info">
      <p>Paperleaf © 2019</p>
      <p>Proudly published with Ghost</p>
      <p>and Paperleaf theme by NvsLbs</p>
      <p>Copyright@xxx,,,</p>
    </div>

  </div>
</template>

<script>
  export default {
    name: "VueAside"
  }
</script>

<style scoped lang="less">


  .baseStyle {
    margin-left: 20px;
    border-right: 1px solid #409EFF;
    .footerInfo {

      padding-top: 100px;
      text-align: center;

      p{
        text-align: center;
      }
    }
  }

  ul {

    li {
      text-align: center;
      font-size: 20px;
      padding: 10px 0;
      a {
        text-decoration: none;
      }

    }

  }
</style>