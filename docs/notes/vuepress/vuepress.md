# VuePress 从 0 开始搭建个人网站

> [VuePress 官网传送门](https://vuepress.vuejs.org/zh/)

## 什么是Vuepress
VuePress 是一款基于 Vue 的静态网站生成器。它可以将你编写的 Markdown 文档转化为已经渲染好的 HTML 静态页面。这些页面有着良好的 SEO 优化，可以轻松的支持搜索引擎收录；同时页面被浏览时由 Vue 接管而形成单页应用，其他页面按浏览按需加载。

## 为什么选择Vuepress？
最重要的一点是：VuePress 对 Vue 技术有着很好的支持。这也就意味着除了其他静态网站生成器的功能，你可以在文档中使用 Vue 的动态组件，这对 Vue 程序员来说十分友好。关于 Vue 组件，你可以参考这个链接：[ 在 Markdown 中使用 Vue ](https://vuepress.vuejs.org/zh/guide/using-vue.html)。

## 体验 VuePress

1. 创建并进入新目录

```bash
mkdir gongycBlog
cd gongycBlog
```

2. 使用你喜欢的包管理器进行初始化

```bash
yarn init         # npm init
```

3. 安装 VuePress

```bash
yarn add -D vuepress    # npm install -D vuepress
```

4. 在根目录下创建 docs 文件夹

```bash
mkdir docs
```

5. 在 docs 目录下新建 README.md 文档，并写入一些内容

6. 在 `package.json` 文件添加 `scripts`

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

7. 启动本地服务器

```bash
yarn docs:dev    # npm run docs:dev
```

VuePress 会在 http://localhost:8080 启动一个热重载(允许开发者在应用程序运行时更改源代码，并立即看到效果的关键功能)的开发服务器



## 目录结构

以下为 gongy-Blog 部分目录结构，比较重要的是 `.vuepress` 目录的结构。官方目录结构请移步 [→](https://vuepress.vuejs.org/zh/guide/directory-structure.html)

    .
    ├── docs
    │   ├── .vuepress
    │   │   ├── public
    |   |   |   └── img
    │   │   ├── styles
    │   │   │   └── index.styl
    │   │   ├── nav.js
    │   │   ├── sidebar.js
    │   │   └── config.js
    |   |
    │   ├── notes
    │   │   ├── vuepress
    |   │   │   ├── vuepress.md
    |   │   │   ├── sidebar.js
    |   │   │   └── ...
    |   |   |
    |   |   ├── js
    |   │   │   ├── array.md
    |   │   │   ├── js_modules.md
    |   │   │   ├── sidebar.js
    |   │   │   └── ...
    |   │   │
    |   │   ├── ...
    |   |   |
    │   │   └── README.md
    |   |
    │   └── README.md
    │
    ├── .gitignore
    |
    └── package.json

## `config.js` 文件配置

每个配置的作用都写在注释当中。

官方文档：[配置](https://vuepress.vuejs.org/zh/config/)、[插件](https://vuepress.vuejs.org/zh/plugin/)、[默认主题配置](https://vuepress.vuejs.org/zh/theme/default-theme-config.html)

```js
module.exports = {
    // 根路径，和仓库名一致
    base: '/gongycBlog/',
    // 左上角标题
    title: 'gongyc-Blog',
    description: '一个博客, 大概会记录一些技术笔记',
    // 自定义网站 favicon
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }]
    ],
    // markdown 相关配置
    markdown: {
        // 代码块行号
        lineNumbers: true,
    },
    // 插件设置
    plugins: {
        // 返回顶部按钮
        '@vuepress/back-to-top': true,
        '@vuepress/register-components': {
            componentsDir: '/components/'
        },
        // 图片缩放
        '@vuepress/medium-zoom': {
            selector: 'img.zoom-custom-imgs',
            // medium-zoom options here
            // See: https://github.com/francoischalifour/medium-zoom#options
            options: {
              margin: 16
            }
          }
    },
    // 默认主题相关配置
    themeConfig: {
        // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
        lastUpdated: '上次更新',
        // 导航栏
        nav: require('./nav.js'),
        // 侧边栏
        sidebar: require('./sidebar.js'),
        // 标题深度，2 表示提取 h2 和 h3 标题
        sidebarDepth: 2,
        
        // 导航栏显示 github 仓库
        repo: 'gongyc0419/my-notes.github.io',
        repoLabel: '查看源码',

        // 以下为可选的编辑链接选项
        // 假如文档不是放在仓库的根目录下：
        docsDir: 'docs',
        // 在页面的底部生成一个 "Edit this page" 链接
        editLinks: true,
        editLinkText: '帮助我改善此页面！',
    }
}
```

## 首页

`docs/README.md`文档：

```yaml
---
home: true
heroImage: /img/logo.jpg
actionText: Get Started →
actionLink: /notes/vuepress/vuepress
meta:
- name: keywords
  content: 技术 软件 计算机 前端 笔记
features:
- title: 全面
  details: 笔记涵盖从计算机科学、软件工程、到各种具体实用技术等多维度内容。
- title: 简洁
  details: 笔记力图以简洁的文字和画面表现出各知识的条理关系。
- title: 实用
  details: 这不是百科全书，但在全面的基础上尽量展示最可能用到的部分。
---
```

[官方文档](https://vuepress.vuejs.org/zh/theme/default-theme-config.html)

## 导航栏

这里没有直接把配置写在 `config.js` 文件中，而是提取成一个模块，便于后续维护，也避免 `config.js` 文件过于臃肿。

注意事项：

- 所有路径以 `/` 开头，`/` 代表 docs 目录
- 若没有指明具体文件，只有文件夹，则默认会寻找该文件夹下的 READMED.md 文档，如 `'/notes/'` → `'/notes/README.md'`

```js
// .vuepress/nav.js
module.exports = [
      {
        text: '基础',
        items: [
          { text: 'Javascript', link: '/notes/js/js_modules' },
        ]
      },
      {
        text: '其它',
        items: [
          { text: 'Git', link: '/notes/git/git' },
          { text: 'Vuepress', link: '/notes/vuepress/vuepress' },
        ]
      }
]
```

[官方文档](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%AF%BC%E8%88%AA%E6%A0%8F)

## 侧边栏
侧边栏的配置和你的 /docs 目录息息相关，二者应当是相互对应的.

gongyc-Blog 为不同页面显示不同的侧边栏，并且每个页面的侧边栏封装为一个模块便于后续维护。

以 js 页面的侧边栏为例：

```js
// .vuepress/sidebar.js
module.exports = {
    '/notes/vuepress': require('../notes/vuepress/sidebar'),
    '/notes/git': require('../notes/git/sidebar'),
    '/notes/js': require('../notes/js/sidebar'),
}
```

```js
// notes/js/sidebar.js
module.exports = [
    {
      title: 'Javascript 数组',
      path: '/notes/js/array'
    },
    {
      title: 'JS 模块化',
      path: '/notes/js/js_modules'
    },
  ]
```

[官方文档](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F)

## 修改默认样式

在 `.vuepress/styles/index.styl` 文件可以方便地添加自定义样式

```css
blockquote {
  border-left: 0.2rem solid #3eaf7c;
  font-weight: 700;
}
```

[官方文档](https://vuepress.vuejs.org/zh/config/#styling)

## Emoji

输入

```
:tada: :smile:
```

输出

:tada: :smile:

[Emoji 大全](https://www.webfx.com/tools/emoji-cheat-sheet/)

## 搭建过程踩的坑

- h1 标题不会生成目录，因此若想标题出现在目录，请用 h2 和 h3 标题
- 使用 `![]()` 插入图片时，要填写标准的相对路径，如 `./images/xxx.png`，不要省略前面的 `./`，否则图片无法正常显示
- 在非代码块中（包括行内代码）不要使用紧贴的大括号，两个同向的大括号之间加个空格

```js
// 报错写法
style={{ key: value }}
// 不报错写法
style={ { key: value } }
```

- 侧边栏对应的文件路径要书写正确，否则侧边栏无法展示
- 若一个目录有 `README.md` 和 `sidebar.js` ，则其子目录文件夹不能再有
- 总之，如果页面展示出现问题，多看看控制台的报错，一般都会有提示

## 部署 - GitHub Pages

我们可以使用 GitHub 自带的 GitHub Pages 来实现部署，它使用 GitHub 的服务器，一般情况下不会出现复杂的网络问题。[官网教程](https://vuepress.vuejs.org/zh/guide/deploy.html)

1. 在 `docs/.vuepress/config.js` 中设置正确的 `base`。

如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 base 默认即是 "/"。

如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

```js
module.exports = {
  // 仓库名为 gongycBlog！！！！
  // 这里有坑！如果base设置成了/gongycBlog/，那仓库名必须为gongycBlog
  //否则打包后，会找不到样式路径
  base: '/gongycBlog/',
}
```

2. 在 `gongycBlog` 目录下运行打包命令

```bash
yarn docs:build
```

3. 打包完成后，会在docs/.vuepress文件夹中生成 dist 文件夹

4. 将dist文件夹下生成的内容拷贝到根目录下，即/gongycBlog/中
5. 在根目录中初始化git，并添加文件到git仓库

```bash
git init
git add -A
git commit -m 'deploy'
```

6. 提交到远程仓库
```bash
//关联远程仓库
git remote add origin git@github.com:gongyc0419/gongycBlog
//推送到远程仓库的master分支
git push -u origin master
```

7. 开启 Github Pages 服务

在settings下找到pages，开启Github Pages 服务


至此，gongycBlog 的搭建完成！:tada::smile:

## 更新网站内容

> VuePress 每次打包生成的 dist 都不相同，因此尽量有比较大改动时才更新网站，这不像 docsify 那么方便自由

- 删除旧的 `dist` 文件夹
- 重新build新的 `dist` 文件夹
- 把`dist`文件夹中的内容拷贝到根目录
- 将修改添加暂存区，提交本地库，并推送到远程分支
- 如此，既能更新远程 `pages` 分支内容，也能同步 git 的历史操作记录
