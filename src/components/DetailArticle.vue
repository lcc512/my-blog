<template>
  <div v-loading="loading">
    <el-row type="flex" justify="end">
      <el-tooltip content="取消" placement="top-start">
        <el-button icon="el-icon-close" circle
                   @click="cancelEdit"
                   :disabled="disabledItem.cancelBtn"></el-button>
      </el-tooltip>

      <el-tooltip content="编辑" placement="top-start">
        <el-button type="primary" icon="el-icon-edit" circle
                   @click="switchToEdit"
                   :disabled="disabledItem.editBtn"></el-button>
      </el-tooltip>
      <el-tooltip content="提交" placement="top-start">
        <el-button type="success" icon="el-icon-check" circle
                   @click="submitArticle"
                   :disabled="disabledItem.submitBtn"></el-button>
      </el-tooltip>
      <!--<el-button type="info" icon="el-icon-message" circle></el-button>-->
      <!--<el-button type="warning" icon="el-icon-star-off" circle></el-button>-->
      <el-tooltip content="删除" placement="top-start">
        <el-button type="danger" icon="el-icon-delete" circle
                   @click="toDeleteArticle"
                   :disabled="disabledItem.deleteBtn"></el-button>
      </el-tooltip>
    </el-row>
    <p class="title"><i class="el-icon-s-opportunity"></i>{{title}}</p>

    <el-row>
      <el-tag
        :key="tag"
        v-for="tag in tagList"
        :closable="disabledItem.editBtn"
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>

      <!--标签可编辑按钮切换-->
      <template v-if="disabledItem.editBtn">
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
      </template>
    </el-row>

    <p class="common-info">发布于：{{createTime}} | 更新于：{{updateTime}}</p>
    <div class="content">
      <mavon-editor ref=md
                    :subfield="markdownItem.subfield"
                    :toolbarsFlag="markdownItem.toolbarsFlag"
                    :boxShadow="markdownItem.boxShadow"
                    :defaultOpen="markdownItem.defaultOpen"
                    v-model="content"
                    @imgAdd="$imgAdd"
                    @imgDel="imgDel"
      ></mavon-editor>
    </div>
  </div>
</template>

<script>

  import axios from 'axios'

  import VueCommon from './VueCommon.vue'

  export default {
    data() {
      return {
        markdownItem: {
          subfield: false,
          toolbarsFlag: false,
          boxShadow: false,
          defaultOpen: "preview"

        },

        // 预览状态下按钮是否禁用，true 禁用
        disabledItem: {
          editBtn: false,
          submitBtn: true,
          deleteBtn: false,
          cancelBtn: true
        },

        title: '...',
        content: '...',
        createTime: '...',
        updateTime: '...',
        tagList: [],

        tagItem: {
          closable: false
        },

        inputVisible: false,
        inputValue: '',

        loading:true

      }
    },
    created() {

      const {id} = this.$route.params

      this.loadArticle(id)

    }
    ,
    methods: {

      async loadArticle(id) {


        try {

          const {data: article} = await axios.get(`/myBlog/article/${id}`)
          

          
          this.title = article.title
          this.content = article.content



          this.createTime = article.createTime
          this.updateTime = article.updateTime



          if (article.tagList == '') {
            this.tagList = []

          }else{
            this.tagList = article.tagList.split(',')
          }


          this.loading=false

        } catch (err) {

        }

      },


      // 切换到编辑状态
      switchToEdit() {

        this.disabledItem.editBtn = true
        this.disabledItem.submitBtn = false
        this.disabledItem.deleteBtn = true
        this.disabledItem.cancelBtn = false

        this.markdownItem.toolbarsFlag = true
        this.markdownItem.defaultOpen = 'edit'

      },

      //取消编辑状态
      //还没做
      cancelEdit() {

        this.disabledItem.editBtn = false
        this.disabledItem.submitBtn = true
        this.disabledItem.deleteBtn = false
        this.disabledItem.cancelBtn = true

        this.markdownItem.toolbarsFlag = false
        this.markdownItem.defaultOpen = 'preview'

      },


      // 提交编辑信息
      async submitArticle() {

        const {id} = this.$route.params

        try {


          this.content = this.content.replace(/'/g, "''")

          await axios.patch(`/myBlog/article/${id}`, {
            title: this.title,
            content: this.content,
            tagList: this.tagList
          })


          window.alert('修改成功')

          await VueCommon.setTagAllList(this.tagList)


          this.cancelEdit()
          this.loadArticle(id)


        } catch (err) {
          window.alert('提交失败，请稍后重试，或查看日志')
          console.log(err)
        }

      },

      async toDeleteArticle() {
        if (window.confirm('是否删除该文章')) {

          const {id} = this.$route.params

          try {
            await axios.delete(`/myBlog/article/${id}`)

            this.$router.push('/article')

          } catch (err) {
            window.alert('删除失败，请稍后重试，或查看日志')
            console.log(err)
          }

        }
      },

      // 绑定@imgAdd event
      $imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.

        console.log($file)

        var formdata = new FormData();
        formdata.append('mark', $file);
        axios({
          url: '/myBlog/upload',
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
          this.$refs.md.$img2Url(pos, url.data.imageUrl);
        })
      },

      handleClose(tag) {
        this.tagList.splice(this.tagList.indexOf(tag), 1);
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
          if (this.tagList != null || this.tagList != '') {


            if (this.tagList.indexOf(inputValue) == -1) {

              this.tagList.push(inputValue);
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
    /*background-color: #F2F6FC;*/
    border-radius: 8px;
    padding: 20px 40px;
    text-indent: 32px;
    line-height: 32px;
  }

</style>