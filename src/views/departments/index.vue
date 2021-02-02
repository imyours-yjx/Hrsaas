<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <e-tree :tree-node="company" :is-root="true" @addDialog="addDialog" />
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <e-tree

            slot-scope="{ data }"
            :tree-node="data"
            @delSon="getBumen()"
            @addDialog="addDialog"
            @editDialog="editDialog"
          />

        </el-tree>
      </el-card>
    </div>
    <add-depts ref="addDept" :show-dialog.sync="showDialog" :form-data="formData" :tree-node="node" @addDept="getBumen" />
    <!-- <div v-loading="loading" class="dashboard-container" /> -->
  </div>
</template>

<script>
import { getBuMen } from '@/api/user'
import eTree from './components/e-tree.vue'
import { tranList } from '@/utils'
import AddDepts from './components/add-depts.vue'

export default {
  components: { eTree, AddDepts },
  data() {
    return {
      // loading: false,
      node: null, // 记录当前点击的node节点
      showDialog: false,
      company: { },
      defaultProps: {
        label: 'name'
      },
      departs: [],
      formData: {}
    }
  },
  created() {
    this.getBumen()
  },
  methods: {
    async getBumen() {
      // this.loading = true
      try {
        const data = await getBuMen()
        console.log(data)
        this.company = { name: data.companyName, manager: '负责人', id: '' }
        this.departs = tranList(data.depts, '')
        // this.loading = false
      } catch (err) {
        this.$toast('失败了！')
      }
    },

    addDialog(node) {
      // node是当前点击的部门
      this.showDialog = true
      this.node = node
    },
    editDialog(node) {
      this.showDialog = true
      this.node = node
      console.log(this.$refs.addDept)
      this.$refs.addDept.editBumen(node.id)
    }

  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
