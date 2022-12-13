<template>
  <div>
    <div class="layout-header">
      <div @click="$router.push('/app/main')" class="header-app-name">
        Git Dev
      </div>
      <div class="header-bar"></div>
      <div class="header-userinfo">
        <div style="height: 100%;padding-top: 4%;width: 60px;position: relative">
          <el-dropdown>
            <span class="el-dropdown-link" >
              <i style="font-weight: 600;font-size: 20px" class="el-icon-plus"></i>
              <i style="font-weight: 600;font-size: 20px" class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="create" icon="el-icon-plus">创建新的项目</el-dropdown-item>
              <el-dropdown-item icon="el-icon-download">迁移外部项目</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>

        </div>
      </div>
    </div>
    <div class="layout-main">
      <el-scrollbar class="el-scrollbar-main" style="height: 100%">
        <router-view/>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>

export default {
  name: "Layout",
  computed: {
  },

  methods:{

  }
}
</script>

<style>
.layout-header {
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dededf;
}

.header-app-name {
  flex: 1;
  font-size: 16px;
  font-weight: 700;
  color: rgba(0,120,212,1);
}

.header-bar {
  flex: 4;
  display: flex;
}
.bar-path{
  color: #337ab7;
  cursor: pointer;
}
.split{
  color: #8d8c8c;
}
.header-bar .path{
  margin: 0 4px;
  font-weight: 600;
  font-size: 16px;
}
.header-userinfo {
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;

}
.layout-main{
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;
}
.el-scrollbar-main .el-scrollbar__wrap{
  overflow-x: hidden!important;
}
.el-scrollbar-main .is-horizontal{
  opacity: 0!important;
}

</style>
