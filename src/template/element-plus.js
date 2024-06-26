import { getCurrentInstance } from 'vue'
import * as Vue from 'vue'
// import * as antV from 'ant-design-vue'
window.Vue = Vue
let installed = false
await loadStyle()
const antd = await LoadSrtipt()
export function setupElementPlus() {
  if (installed) return
  const instance = getCurrentInstance()
  instance.appContext.app.use(window.antd || antd)
  installed = true
}

export function loadStyle() {
  // https://unpkg.com/browse/ant-design-vue@2.2.4/dist/antd.min.css
  const antdStyle = new Promise((resolve, reject) => {
    const ANT_VERSION = '#ANT_VERSION#'
    if (!ANT_VERSION.startsWith('2.')) {
      resolve()
      return
    }
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://unpkg.com/ant-design-vue@${ANT_VERSION}/dist/antd.min.css`
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
  const ANT_VERSION = '#ANT_VERSIONJS#'
  return new Promise((resolve, reject) => {
    let script = `https://unpkg.com/ant-design-vue@${ANT_VERSION}/dist/antd.min.js`
    if (!ANT_VERSION.startsWith('2.')) {
      // https://cdn.jsdelivr.net/npm/ant-design-vue@4.1.2/dist/antd.esm.min.js
      script = `https://unpkg.com/ant-design-vue@${ANT_VERSION}/dist/antd.esm.min.js`
      return resolve(import(script))
    }
    const scriptElement = document.createElement('script')
    scriptElement.src = script
    scriptElement.addEventListener('load', resolve)
    scriptElement.addEventListener('error', reject)
    document.body.append(scriptElement)
  })
}
