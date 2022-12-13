import request from "@/utils/request";

export const findAllRepository =()=>{
    return  request({
        url:"/repository",
        method:"get",
    })
},getUsers=(id)=>{
    return  request({
        url:`/repository/${id}/users`,
        method:"get"
    })
},getRepository=(repoId)=>{
    return  request({
        url:`/repository/${repoId}`,
        method:"get",
    })
},getUsersWithPage=(repoId,limit)=>{
    return  request({
        url:`/repository/${repoId}/users/limit/${limit}`,
        method:"get",
    })
},getStatistics=(repoId)=>{
    return  request({
        url:`/repository/${repoId}/commits/statistics`,
        method:"get",
    })
},getIssueInfo=(repoId)=>{
    return  request({
        url:`/repository/${repoId}/issues/info`,
        method:"get",
    })
},getIssueTime=(repoId)=>{
    return  request({
        url:`/repository/${repoId}/issues/time`,
        method:"get",
    })
},getReleaseInfo=(repoId)=>{
    return  request({
        url:`/repository/${repoId}/releases/info`,
        method:"get",
    })
},getReleaseInfoLine=(repoId)=>{
    return  request({
        url:`/repository/${repoId}/releases/limit/10/page/1`,
        method:"get",
    })
}

