<template>
  <el-dialog :title="chooseBumen" :visible="showDialog" @close="btnClose">
    <el-form ref="deptData" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" type="textarea" :rows="1" />
      </el-form-item>

      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" type="textarea" :rows="1" />
      </el-form-item>

      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择">
          <el-option v-for="(v,id) in manData" :key="id" :label="v.username" :value="v.username" />
        </el-select>
      </el-form-item>

      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="1" />
      </el-form-item>
    </el-form>
    <!-- 尾部 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="Succ">确定</el-button>
        <el-button size="small" @click="showDialog = false">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getBuMen, getMan, addBumen, editBumen, editBumends } from '@/api/user'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }

  },
  data() {
    // 检查部门是否重复
    const checkNameRepeat = async(rules, value, callback) => {
      const { depts } = await getBuMen()
      // 编辑模式下的表单验证
      let isRepeat = false
      if (this.formData.id) {
        // 编辑模式
        isRepeat = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(item => item.name === value)
      } else {
        // 新增模式
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      // 获取到所有的当前节点的子部门

      isRepeat ? callback(new Error('哦豁？喜欢人妻？')) : callback()
      // console.log(depts.filter(item => item.pid === this.treeNode))
    }
    // 检查code是否重复
    const checkCodeRepeat = async(rules, value, callback) => {
      const { depts } = await getBuMen()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑模式
        depts.filter(item => item.pid === this.formData.pid).some(item => item.code === value)
      } else {
        // 新增模式
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.code === value)
      }
      // 获取到所有的当前节点的子部门

      isRepeat ? callback(new Error('哦豁,被人用过的')) : callback()
      // console.log(depts.filter(item => item.pid === this.treeNode))
    }

    return {
      manData: [],
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''

      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '名称长度为1-50个字符', trigger: 'blur' }, { validator: checkNameRepeat, trigger: 'blur' }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '编码长度为1-50个字符', trigger: 'blur' }, {
          tigger: 'blur', validator: checkCodeRepeat
        }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' }, { min: 1, max: 300, message: '介绍长度为1-300个字符', trigger: 'blur' }]
      }
    }
  },
  computed: {
    chooseBumen() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  created() {
    this.getMans()
  },
  methods: {
    btnClose() {
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''

      }
      this.$emit('update:showDialog', false)
      this.$refs.deptData.resetFields()
    },
    async getMans() {
      const result = await getMan()
      console.log(result)
      this.manData.push(...result)
      console.log(this.manData)
    },

    Succ() {
      this.$refs.deptData.validate(async isOK => {
        if (isOK) {
          if (this.formData.id) {
            await editBumends(this.formData)
            this.$emit('update:showDialog', false)
            this.$emit('addDept')
          } else {
            await addBumen({ ...this.formData, pid: this.treeNode.id })
            this.$emit('update:showDialog', false)
            this.$emit('addDept')
          }
        }
        // this.showDialog = false
      })
    },
    async editBumen(id) {
      this.formData = await editBumen(id)
      // console.log(data)
    }

  }

}
</script>

<style>

</style>
