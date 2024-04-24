import { defineStore } from 'pinia'
import { ref } from 'vue'
const useArticleCateStore = defineStore('articleCate', () => {
    //定义状态相关的内容

    const cate = ref({})

    const setCate = (newCate) => {
        cate.value = newCate
    }


    const removeCate = () => {
        cate.value = {}
    }

    return { cate, setCate, removeCate }

}, { persist: true })

export default useArticleCateStore;