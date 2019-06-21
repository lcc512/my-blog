<template>
  <div>


    <el-table
      :data="tableData"
      :default-sort="{prop: 'phoneNumber', order: 'descending'}"
      border
      style="width: 100%">
      <el-table-column type="index" width="50" sortable></el-table-column>
      <el-table-column prop="phoneNumber" label="电话" sortable></el-table-column>
      <el-table-column prop="userName" label="名称" sortable></el-table-column>
      <el-table-column prop="sex" label="性别" sortable></el-table-column>
      <el-table-column prop="birthday" label="生日" sortable></el-table-column>
      <el-table-column prop="idClass" label="证件类别" sortable></el-table-column>
      <el-table-column prop="idNumber" label="证件号" sortable></el-table-column>
      <el-table-column prop="degree" label="学历" sortable></el-table-column>
      <el-table-column prop="workDate" label="工作时间" sortable></el-table-column>
      <el-table-column prop="company" label="公司" sortable></el-table-column>
      <el-table-column prop="duty" label="职务" sortable></el-table-column>
      <el-table-column prop="creatTime" label="录入时间" sortable></el-table-column>
      <el-table-column prop="updateTime" label="修改时间" sortable></el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="deleteInfo(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>

</template>

<script>

  import axios from 'axios'

  export default {
    data() {
      return {

        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]

      }
    },


    created() {

      this.loadInfoData()
    },

    methods: {
      async loadInfoData() {

        try {

          const {data} = await axios.get('/mobileapp/baseinfo')

          this.tableData = data.baseinfos

        } catch (err) {
          console.dir(err)
        }
      },

      async deleteInfo(row) {


        if (!window.confirm('确认要删除？')) {
          return
        }
        try {
          const {status} = await axios.delete(`/mobileapp/baseinfo/${row.phoneNumber}`)

          console.log(status)
          if (status == '201') {
            window.alert('删除成功')

            this.loadInfoData()
          }


        } catch (err) {

          window.alert(err)

        }
      }

    }
  }
</script>

<style scoped>


</style>