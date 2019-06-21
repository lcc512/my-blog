<template>
  <div style="background-color: gold">
    <ul class="common-ul">
    <router-link tag="li" to="/">
    <a>HOME</a></router-link>
    <router-link tag="li" to="/article">
    <a>Article</a>
    </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "VueAside"
  }
</script>

<style scoped lang="less">

  .common-ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      /*height: 50px;*/
      /*line-height: 50px;*/
      text-align: center;
      font-size: 20px;
      padding: 10px 0;
      a{
        text-decoration: none;
      }

    }

  }
</style>