<template>
  <div style="display: flex;flex-flow: wrap;padding: 16px">
    <project-item :repository="item" v-for="item in repositoryList" :key="item.repoId"/>
  </div>
</template>

<script>
import {findAllRepository} from "@/api/repositoryApi"
import ProjectItem from "@/components/ProjectItem";
export default {
  name: "Main",
  components: {ProjectItem},
  data:()=>({
    repositoryList:[]
  }),
  methods:{
  },
  mounted() {
    findAllRepository().then(res=>{
      console.log(res)
      this.repositoryList=res
    })
  }
}
</script>

<style scoped>

</style>
