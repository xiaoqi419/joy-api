import { defineStore } from 'pinia';
import { ref } from 'vue';

const useButtonStore = defineStore(
  'buttonStore',
  () => {
    // 导航栏登录按钮显示状态
    const loginBtn = ref(true);

    const setLoginBtn = (value: boolean) => {
      loginBtn.value = value;
    };

    return {
      loginBtn,
      setLoginBtn
    };
  },
  {
    persist: {
      key: 'buttonStore',
      storage: sessionStorage
    }
  }
);

export default useButtonStore;
