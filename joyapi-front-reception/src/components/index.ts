import { App } from 'vue'
import SvgIcon from './svg-icon/index.vue'
import TopHeader from '@/components/header/index.vue'

const components = [SvgIcon, TopHeader]

export const installComponents = (app: App) => {
  components.forEach(c => {
    console.log(c)
    app.component(`joy-${c.name}`, c)
  })
}

export { SvgIcon, TopHeader }
