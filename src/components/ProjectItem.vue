<template>
  <div @click="repositorytInfoHandle(repository.repoId)" class="item-box">
    <div>
      <div style="display: flex;">
        <div>
          <el-avatar :style="`background:${$colorName(repository.repoName)}`" :size="60" shape="square">
            <span style="font-size: 30px">{{ repository.repoName.substring(0, 1).toUpperCase() }}</span>
          </el-avatar>
        </div>
        <div style="width: 100%;padding-left: 16px">
          <div class="project-name">{{ repository.repoName }}</div>
          <el-badge value="Onwer" class="item">
            <el-avatar  :size="22" :style="`background:${$colorName(repository.repoOwner)}`" >
              {{ repository.repoOwner.substring(0, 1).toUpperCase() }}
            </el-avatar>
          </el-badge>

        </div>
      </div>
      <div class="project-member">
        <el-avatar v-for="(user,index) in userList" :size="36" :style="`background:${$colorName(user.usersName)}`" :key="user.usersId">
          {{ user.usersName.substring(0, 1).toUpperCase() }}
        </el-avatar>

        <el-avatar v-if="num!=0" :size="36">{{ num }}+</el-avatar>
      </div>
    </div>
  </div>
</template>

<script>
import {getUsers} from "@/api/repositoryApi";

export default {
  name: "ProjectItem",
  data: () => ({
    userList: [],
    num: 0
  }),
  props: {
    repository: {
      type: Object,
      required: true
    }
  },
  mounted() {
    getUsers(this.repository.repoId).then(res => {
      if (res.length > 6) {
        this.userList = res.slice(0, 5)
        this.num = res.length - 5 > 100 ? 99 : res.length - 5
      } else {
        this.userList = res
      }
    })
  },
  methods: {
    repositorytInfoHandle(repoId) {
      this.$router.push({path:"/repository/"+repoId})
    }
  }
}
</script>

<style scoped>
.item-box {
  cursor: pointer;
  border: 1px solid #dededf;
  width: 316px;
  margin: 8px 8px;
  padding: 20px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12) !important;
}

.project-name {
  width: 240px;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}

.project-member .el-avatar:first-child {
  margin-left: 0;
}

.project-member .el-avatar {
  margin-left: -8px;
}
</style>
