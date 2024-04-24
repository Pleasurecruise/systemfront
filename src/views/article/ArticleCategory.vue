<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const categorys = ref([
    {
        "id": 1,
        "categoryName": "学校事件",
        "categoryAlias": "xuexiaoshijian",
        "createTime": "2024-03-25 00:16:04",
        "updateTime": "2024-04-01 20:47:37"
    },
])
//声明一个异步的函数
import { articleCategoryListService, articleCategoryAddService, articleCategoryUpdateService, articleCategoryDeleteService } from '@/api/article.js'
const articleCategoryList = async () => {
    let result = await articleCategoryListService();
    categorys.value = result.data;

}
articleCategoryList();

const dialogVisible = ref(false)
const rules = {
    categoryName: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    categoryAlias: [
        { required: true, message: '请输入分类别名', trigger: 'blur' },
    ]
}
const categoryModel = ref({
    categoryName: '',
    categoryAlias: ''
})

//调用接口,添加表单
import { ElMessage } from 'element-plus'
const addCategory = async () => {
    //调用接口
    let result = await articleCategoryAddService(categoryModel.value);
    ElMessage.success(result.msg ? result.msg : '添加成功')

    //调用获取所有文章分类的函数
    articleCategoryList();
    dialogVisible.value = false;
}

//定义变量,控制标题的展示
const title = ref('')

const showDialog = (row) => {
    dialogVisible.value = true; title.value = '编辑分类'
    //数据拷贝
    categoryModel.value.categoryName = row.categoryName;
    categoryModel.value.categoryAlias = row.categoryAlias;
    //扩展id属性,将来需要传递给后台,完成分类的修改
    categoryModel.value.id = row.id
}
//编辑分类
const updateCategory = async () => {
    //调用接口
    let result = await articleCategoryUpdateService(categoryModel.value);
    ElMessage.success(result.msg ? result.msg : '编辑成功')

    //调用获取所有文章分类的函数
    articleCategoryList();
    dialogVisible.value = false;
}

//删除分类
import { ElMessageBox } from 'element-plus'
const deleteCategory = (row) => {
    ElMessageBox.confirm(
        '确认删除当前文章分类?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }

    )
        .then(async () => {
            //调用接口
            let result = await articleCategoryDeleteService(row.id);
            ElMessage({
                type: 'success',
                message: 'Delete completed',
            })
            articleCategoryList();
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })
}

//清空表单
const clearData = () => {
    categoryModel.value.categoryName = '';
    categoryModel.value.categoryAlias = '';
}
</script>

<template>
    <el-page-header :icon="null">
        <template #content>
            <div class="flex items-center">
                <el-avatar :size="32" class="mr-3"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <span class="text-large font-600 mr-3"> 文章分类列表</span>
            </div>
        </template>
        <template #extra>
            <el-button type="primary" @click="dialogVisible = true; title = '新建文章分类'; clearData()">新建文章分类</el-button>
            <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="文章分类名" prop="categoryName">
                    <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="备注和说明" prop="categoryAlias">
                    <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="15"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="title == '新建文章分类' ? addCategory() : updateCategory()"> 确认 </el-button>
                </span>
            </template>
        </el-dialog>
        </template>
    </el-page-header>
    <el-divider></el-divider>
    <el-table :data="categorys" style="width: 100%">
        <el-table-column label="id" prop="id" />
        <el-table-column label="分类名称" prop="categoryName"></el-table-column>
        <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
        <el-table-column label="操作" width="100">
            <template #default="{ row }">
                <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
                <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
            </template>
        </el-table-column>
        <template #empty>
            <el-empty description="没有数据" />
        </template>
    </el-table>
</template>