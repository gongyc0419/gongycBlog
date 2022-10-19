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
        repo: 'gongyc0419/gongycBlog',
        repoLabel: '查看源码',

        // 以下为可选的编辑链接选项
        // 假如文档不是放在仓库的根目录下：
        docsDir: 'docs',
        // 在页面的底部生成一个 "Edit this page" 链接
        editLinks: true,
        editLinkText: '帮助我改善此页面！',
    }
}