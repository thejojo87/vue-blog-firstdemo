/**
 * Created by thejojo on 2017/7/15.
 */
import MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
// import ins from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import footnote from 'markdown-it-footnote'
import sup from 'markdown-it-sup'
import sub from 'markdown-it-sub'
import todo from 'markdown-it-task-lists'
import deflist from 'markdown-it-deflist'

const markdown = new MarkdownIt({
  html: true,
  xhtmlout: true,
  breaks: true,
  langPrefix: 'language-',
  linkify: true,
  typographer: true,
  quotes: '“”‘’',
  highlight: function (str, lang) {
    return '<pre class="hljs"><code class="' + lang + '">' + markdown.utils.escapeHtml(str) + '</code></pre>'
  }
})

// <abbr/>
var abbr = require('markdown-it-abbr')
// insert 带有下划线 样式 ++ ++
var insert = require('markdown-it-ins')
//
var container = require('markdown-it-container')
// math katex
var katex = require('markdown-it-katex')
var miip = require('markdown-it-images-preview')

markdown.use(emoji)
  .use(sup)
  .use(sub)
  .use(deflist)
  .use(abbr)
  .use(footnote)
  .use(insert)
  .use(mark)
  .use(container)
  .use(miip)
  .use(katex)
  // .use(ins)
  .use(todo, { label: true })
export default markdown
