import { defineStore } from 'pinia';
import { ref } from 'vue';
import { API } from '@/api/typings';

const useUserStore = defineStore(
  'userStore',
  () => {
    const userInfo = ref<API.UserVO>();

    const setUserInfo = (obj: API.UserVO) => {
      userInfo.value = obj;
    };

    return {
      userInfo,
      setUserInfo
    };
  },
  {
    persist: {
      key: 'userStore',
      storage: sessionStorage
    }
  }
);

export default useUserStore;
