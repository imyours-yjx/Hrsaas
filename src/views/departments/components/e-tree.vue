<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width:100%">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门 </el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除子部门</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delBumen } from '@/api/user'
export default {
  props: {
    treeNode: {
      required: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {

    }
  },
  created() {},
  methods: {
    handleCommand(type) {
      if (type === 'add') {
      // 添加
        this.$emit('addDialog', this.treeNode) // 传出treeNode是因为添加子部门，需要当前部门的数据
      } else if (type === 'edit') {
        // 编辑
        this.$emit('editDialog', this.treeNode)
      } else {
        this.$confirm('确定要删除吗？').then(() => {
          delBumen(this.treeNode.id).then(() => {
          // 自定义事件
            this.$emit('delSon')
            this.$message('删除成功！')
          })
        })
      }
    }
  }

}
</script>

<style>

</style>
