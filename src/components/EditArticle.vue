<template>
  <div>

    <p class="title"><i class="el-icon-s-opportunity"></i>{{title}}</p>
    <p class="common-info">{{createTime}} | 更新于：{{updateTime}}</p>
    <p class="content">{{content}}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '123',
        content: `
          g\\src\\components\\ContentArticle.vue?vu /n e&type=
      style&index=0&id=9 \\n2b7e426&scoped=true&lang=less&<br/>
      (line 35, column 13)
      @ ./src/components/ContentArtic \\n le.vue?vue&type=
      style&index=0&id=92b7e426&`,
        createTime: '2019',
        updateTime: '2019'

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
    border-radius: 5px;
    padding: 20px 10px;
  }

</style>