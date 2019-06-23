<template>
  <div>
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="formData.labelInfo" placeholder="请选择活动区域">
          <el-option label="技术" value="shanghai"></el-option>
          <el-option label="生活" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="内容">
        <!--<el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.content"></el-input>-->
        <!--<p>1111111111111111</p>-->
        <quill-editor ref="myTextEditor"
                      v-model="formData.content"
                      :config="editorOption"
        ></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import axios from 'axios'

  export default {
    data() {
      return {
        formData: {
          title: '',
          labelInfo: '',
          content: ''
        }
      }
    },
    methods: {

      async onSubmit() {
        try {

          this.formData.content=this.formData.content.replace(/'/g,"''")

          const {data} = await axios.post('/myBlog/article/', this.formData)
          console.log(data)
          this.$router.push(`/article/detail/${data.id}`)
        } catch (err) {
          console.dir(err)
        }

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