import { getCurrentInstance } from 'vue'
import * as Vue from 'vue'
// import * as antV from 'ant-design-vue'
window.Vue = Vue
let installed = false
await loadStyle()
await LoadSrtipt()
export function setupElementPlus() {
  if (installed) return
  const instance = getCurrentInstance()
  instance.appContext.app.use(window.antd)
  installed = true
}

export function loadStyle() {
  // https://unpkg.com/browse/ant-design-vue@2.2.4/dist/antd.min.css
  const antdStyle = new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/ant-design-vue@2.1.2/dist/antd.min.css'
    link.addEventListener('load', resolve)
    link.addEventListener('error', reject)
    document.body.append(link)
  })
  const styles = ['#STYLE#', '#DARKSTYLE#'].map((style) => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = style
      link.addEventListener('load', resolve)
      link.addEventListener('error', reject)
      document.body.append(link)
    })
  })
  return Promise.all(styles.concat(antdStyle))
}

export function LoadSrtipt() {
  // 降级处理
  const scripts = [
    'https://unpkg.com/ant-design-vue@2.1.2/dist/antd.min.js',
  ].map((script) => {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = script
      scriptElement.addEventListener('load', resolve)
      scriptElement.addEventListener('error', reject)
      document.body.append(scriptElement)
    })
  })
  return Promise.all(scripts)
}
