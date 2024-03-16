import { App } from 'vue'
import SvgIcon from './svg-icon/index.vue'
import TopHeader from '@/components/header/index.vue'
import UserModal from '@/components/modal/UserModal.vue'

const components = [SvgIcon, TopHeader, UserModal]

export const installComponents = (app: App) => {
  components.forEach(c => {
    app.component(`joy-${c.name}`, c)
  })
}

export { SvgIcon, TopHeader, UserModal }
