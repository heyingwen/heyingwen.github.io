const RDOCS = './docs/'
const ADOCS = '/docs/'
var fs = require('fs')

const getFileName = name => {
  let arr = []
  fs.readdirSync(`${RDOCS}${name}`)
    .filter(function(file) {
      return /\.(js|md)$/i.test(file)
    })
    .map(function(file) {
      s1 = file.substring(0, file.indexOf('.'))
      let res = ''
      if (s1 === 'readme' || s1 === 'README') {
        res = ADOCS + name + '/'
      } else {
        res = ADOCS + name + '/' + s1
      }
      arr.push(res)
    })
  return arr
}

const getNav = name => {
  return ADOCS + name + '/'
  // return DOCS + name + '/'
}

module.exports = {
  base: '/',
  dest: 'dist', //指定 vuepress build 的输出目录
  title: '何应文的技术架构',
  description: '汇聚运维技术、规范、效率、架构',
  themeConfig: {
    lastUpdated: '最后更新时间',
    serviceWorker: {
      updatePopup: true, // Boolean | Object, 默认值是 undefined.
      // 如果设置为 true, 默认的文本配置将是:
      updatePopup: {
        message: '就在刚刚，内容更新了',
        buttonText: '获取最新'
      }
    }
  },
  extend: '@vuepress/theme-default',
  // 为每个代码块显示行号
  // markdown: {
  //   extendMarkdown: md => {
  //     md.use(require('markdown-it-task-lists'), { enabled: true })
  //   }
  // },
  themeConfig: {
    nav: [
      { text: 'docker', link: getNav('docker') },
      { text: 'cicd', link: getNav('cicd') },
      { text: 'k8s', link: getNav('k8s') }
    ],
    sidebar: {
      [`${ADOCS}docker`]: getFileName('docker'),
      [`${ADOCS}k8s`]: getFileName('k8s'),
      [`${ADOCS}cicd`]: getFileName('cicd'),
    },
    lastUpdated: 'Last Updated',
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'heyingwen.github.io',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'heyingwen.github.io',
    // 假如文档不是放在仓库的根目录下：
    // docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！'
  }
}
