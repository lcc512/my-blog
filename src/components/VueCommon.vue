<!--定义一些公共的属性方法-->

<template>

</template>

<script>

  import axios from 'axios'

  const httpUrl = 'http://39.105.17.99:8080/'

  var propTagAllList = []

  function commonFun() {
    console.log("公共方法")
  }


  // 获取标签数组
  async function getTagAllList() {

    const {data: {tagAllList}} = await axios.get('/myBlog/options')

    const currentList = tagAllList.split(',')

    propTagAllList = currentList

    return currentList

  }

  //修改标签数组
  async function setTagAllList(arr) {


    let currArr = propTagAllList.concat(arr)
    let result = []
    let obj = {}

    for (let i of currArr) {
      if (!obj[i]) {
        result.push(i)
        obj[i] = 1
      }
    }

    await axios.patch('/myBlog/options', {
      tagAllList: result
    })

  }


  async function shuaxinTagAllList(articleList) {

    var currArr = []

    articleList.forEach((item) => {

      currArr.push(...item.tagList)

    })

    let result = []
    let obj = {}

    for (let i of currArr) {
      if (!obj[i]) {
        result.push(i)
        obj[i] = 1
      }
    }

    await axios.patch('/myBlog/options', {
      tagAllList: currArr
    })
  }


  // 暴露出这些属性和方法
  export default {
    httpUrl,
    getTagAllList,
    setTagAllList,
    shuaxinTagAllList
  }
</script>

<style scoped>

</style>