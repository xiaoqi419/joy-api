import { App } from 'vue';
import SvgIcon from './svg-icon/index.vue';
import TopHeader from '@/components/header/NavBar.vue';
import UserModal from '@/components/modal/UserModal.vue';
import AvatarMenu from '@/components/header/AvatarMenu.vue';
import Footer from '@/components/footer/Footer.vue';
import TipMenu from '@/components/header/TipMenu.vue';

const components = [SvgIcon, TopHeader, UserModal, AvatarMenu, Footer, TipMenu];

export const installComponents = (app: App) => {
  components.forEach((c) => {
    app.component(`joy-${c.name}`, c);
  });
};

export { SvgIcon, TopHeader, UserModal, AvatarMenu, Footer, TipMenu };
