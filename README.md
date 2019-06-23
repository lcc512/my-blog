#my-blog

##技术运用
- element-ui    样式框架
- vueMVC        数据交互
- vue-router    路由导航
- vue-quill-editor  富文本插件

##其他
- 样式参照
    - https://preview.themeforest.net/item/paperleaf-multipurpose-ghost-theme/full_screen_preview/14206224

##开发，打包
```shell
npm run dev

npm run build
```

##Git
```shell
git status
git add .
git commit -m 'describtion'
git clone https://github.com/lcc512/my-blog.git
```


##已完成
- 文章列表页
- 文章新增
- 文章展示

##遇到的问题
- 文本框中有单引号的话，mysql保存会有问题，将单引号转换成两个单引号，因为sql中用两个单引号表示单引号
- TZ 时间转成标准时间
    - new Date(TZ时间字符串)
- 富文本插件的引入，不知道为啥package.json打包后把富文本的插件弄丢了，导致远程使用网站找不到相应的js文件
    
- 富文本插件
    - 在html中要先引入 quill 再引入 vue-quill-editor
    