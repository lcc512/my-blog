<template>
  <div>

    <el-form ref="form" :model="form" label-width="80px">
      <h4>基本信息</h4>
      <el-form-item label="手机号码">
        <el-input v-model="form.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男" value="1"></el-radio>
          <el-radio label="女" value="2"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期">

        <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>

      </el-form-item>
      <el-form-item label="证件类型">
        <el-select v-model="form.idClass" placeholder="请选择">
          <el-option
            v-for="item in form.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="证件号码">
        <el-input v-model="form.idNumber"></el-input>
      </el-form-item>

      <h4>工作学习</h4>

      <el-form-item label="学历">
        <el-select v-model="form.degree" placeholder="请选择">
          <el-option
            v-for="item in form.degreeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="参加工作时间">

        <el-date-picker type="date"
                        placeholder="选择日期"
                        v-model="form.workDate"
                        style="width: 100%;">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="公司名称">
        <el-input v-model="form.company"></el-input>
      </el-form-item>

      <el-form-item label="职务及职称">
        <el-input v-model="form.duty"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="clearAll">清空</el-button>
          <el-button type="warning">关闭</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>


  </div>

</template>

<script>

  import axios from 'axios'

  export default {
    data() {
      return {
        form: {
          phoneNumber: '',
          userName: '',
          sex: '男',
          birthday: '',
          idClass: '',
          idNumber: '',
          options: [{
            value: '身份证',
            label: '身份证'
          }, {
            value: '军人证',
            label: '军人证'
          }, {
            value: '临时证件',
            label: '临时证件'
          }, {
            value: '驾照',
            label: '驾照'
          }],
          degree: '',
          workDate: '',
          company: '',
          duty: '',
          degreeOptions: [{
            value: '高中',
            label: '高中'
          }, {
            value: '专科',
            label: '专科'
          }, {
            value: '本科',
            label: '本科'
          }, {
            value: '研究生',
            label: '研究生'
          }]
        }

      }
    },
    methods: {
      async onSubmit() {

        const formData = this.form

        // console.log(formData)

        try {

          if (formData.phoneNumber == '') {
            window.alert('手机号必填')
            return
          }

          const {data: baseinfo} = await axios.get(`/mobileapp/baseinfo/${formData.phoneNumber}`)

          if (baseinfo) {
            window.alert('该手机号已被注册，请重新输入')
            return
          }

          const {data} = await axios.post('/mobileapp/baseinfo', formData)

          if (data) {
            window.alert('录入成功')
            console.log(data)
          }

        } catch (err) {
          console.dir(err)
        }
      },

      clearAll() {
        this.form = {
          phoneNumber: '',
          userName: '',
          sex: '男',
          birthday: '',
          idClass: '',
          idNumber: '',
          degree: '',
          workDate: '',
          company: '',
          duty: ''
        }

      }
    }
  }
</script>

<style scoped>


</style>