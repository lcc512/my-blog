<template>
  <div class="baseStyle">


    <el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
      ref="filterTable"
      :data="articleList"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        sortable
        width="380"
        column-key="title"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发布日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="修改日期"
      >
      </el-table-column>
      <el-table-column
        prop="tagList"
        label="标签"
        width="100"
        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions>{{scope.row.tag}}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>


    <el-row type="flex" justify="end">
      <el-button type="primary" round @click="toNewPage">新建</el-button>
    </el-row>
    <ul>

      <li v-for="article in articleList">
        <p class="title">
          <i class="el-icon-s-opportunity"></i>
          <router-link :to="{name:'article-detail',params:{id:article.id}}">{{article.title}}</router-link>
        <div class="tagList">
          <el-tag :key="tag" v-for="tag in article.tagList">
            {{tag}}
          </el-tag>
        </div>
        <p class="common-info">
          <span>发布于：{{article.createTime}} | 更新于：{{article.updateTime}}</span>
        </p>
      </li>
    </ul>

  </div>
</template>

<script>

  import axios from 'axios'

  export default {
    data() {
      return {
        articleList: [],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }]
      }
    },
    created() {

      this.loadArticleList()
    },
    methods: {

      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
      ,

      toNewPage() {
        this.$router.push('/article/new')
      },
      async loadArticleList() {

        const {data} = await axios.get('/myBlog/article')

        data.articles.forEach((item) => {

          if (item.tagList == null || item.tagList == '') return false

          item.tagList = item.tagList.split(',')
        })

        this.articleList = data.articles

      }
    }
  }
</script>

<style scoped lang="less">

  .baseStyle {
    ul {
      li {
        border-radius: 10px;
        padding: 1px 0;
        &:hover {
          background-color: #F2F6FC;
        }
      }
    }

  }

  .title {
    font-size: 18px;
    i {
      display: inline-block;
      padding: 0 10px;
      color: #409EFF;
    }
  }


</style>