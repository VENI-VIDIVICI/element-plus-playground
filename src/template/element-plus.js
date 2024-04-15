import { getCurrentInstance } from 'vue'
import * as antV from 'ant-design-vue'

let installed = false
await loadStyle()

export function setupElementPlus() {
  if (installed) return
  const instance = getCurrentInstance()
  instance.appContext.app.use(antV)
  installed = true
}

export function loadStyle() {
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
  return Promise.all(styles)
}
