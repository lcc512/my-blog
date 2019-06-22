<template>
  <div class="baseStyle">
    <ul class="common-ul">
      <router-link tag="li" exact to="/">
        <a>HOME</a></router-link>
      <router-link tag="li" to="/article">
        <a>Article</a>
      </router-link>
    </ul>
    <p>Copyright@xxx,,,</p>
  </div>
</template>

<script>
  export default {
    name: "VueAside"
  }
</script>

<style scoped lang="less">


  .baseStyle{
    margin-left: 20px;

    border-right: 1px solid  #409EFF;
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