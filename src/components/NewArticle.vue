<template>
  <div>
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-tag
          :key="tag"
          v-for="tag in formData.tagList"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="formData.labelInfo" placeholder="请选择活动区域">
          <el-option label="技术" value="shanghai"></el-option>
          <el-option label="生活" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="内容">
        <mavon-editor ref=md
                      v-model="formData.content"
                      @imgAdd="$imgAdd"
                      @imgDel="imgDel"></mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancelNewPage">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import axios from 'axios'
  import {mavonEditor} from 'mavon-editor'

  export default {
    data() {
      return {
        formData: {
          title: '',
          labelInfo: '',
          content: '',
          tagList: [],
        },

        inputVisible: false,
        inputValue: ''
      }
    },
    methods: {

      async onSubmit() {
        try {

          if (this.formData.title == '' || this.formData.content == '') {
            window.alert('标题或内容不能为空')
            return
          }

          this.formData.content = this.formData.content.replace(/'/g, "''")

          const {data} = await axios.post('/myBlog/article/', this.formData)

          this.$router.push(`/article/detail/${data.id}`)
        } catch (err) {
          console.dir(err)
        }

      },

      cancelNewPage() {

        this.$router.push('/article')
      },


      // 绑定@imgAdd event
      $imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('image', $file);
        axios({
          url: '/myBlog/uploadImg',
          method: 'post',
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data'},
        }).then((url) => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
          console.log(url)
          this.$refs.md.$img2Url(pos, url.data.url);
        })
      },


      handleClose(tag) {

        this.formData.tagList.splice(this.formData.tagList.indexOf(tag), 1);
        console.log(this.formData.tagList)
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;

        if (inputValue) {
          if (this.formData.tagList != null || this.formData.tagList != '') {


            if (this.formData.tagList.indexOf(inputValue) == -1) {

              this.formData.tagList.push(inputValue);
            } else {
              window.alert('不允许有重复的标签')
            }
          }


        }
        this.inputVisible = false;
        this.inputValue = '';
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