<template>
  <div>
    <div style="border: 1px solid gainsboro; padding-left: 26px;">
      <h2>Repository Info</h2>
      <div class="repoInfo">
        <div><b>Repository Name:</b>{{repoInfo.repoName}}</div>
        <div><b>Repository Owner:</b>{{repoInfo.repoOwner}}</div>
        <div><b>Repository Owner:</b><a target="_blank" :href="urlList[repoInfo.repoId]">{{urlList[repoInfo.repoId]}}</a></div>
      </div>
    </div>

    <div class="item-box">
      <div class="item-box-title">
        <h2>Part I</h2>
      </div>
      <div ref="developers" style="width:100%;height:120px"></div>
      <div ref="commitNum" style="width:100%;height:376px"></div>
    </div>
    <div class="item-box">
      <div class="item-box-title">
        <h2>Part II</h2>
      </div>
      <div ref="averageTimeBar" style="width:100%;height:120px"></div>
      <div ref="issueInfoPie" style="width:48%;height:376px"></div>
      <div ref="issueInfoLine" style="width:48%;height:376px"></div>
      <div ref="releaseInfoBar" style="width:48%;height:376px"></div>
      <div ref="releaseInfoLine" style="width:48%;height:376px"></div>
      <div ref="statisticsPie" style="width:48%;height:376px"></div>
      <div ref="statisticsBar" style="width:48%;height:376px"></div>
    </div>
  </div>
</template>

<script>
import {
  getIssueInfo,
  getIssueTime, getReleaseInfo, getReleaseInfoLine,
  getRepository,
  getStatistics,
  getUsers,
  getUsersWithPage
} from "@/api/repositoryApi";

import * as echarts from 'echarts';

export default {
  name: "Repository",
  data: () => ({
    repoInfo: {},
    urlList:["","https://github.com/WAVM/WAVM","https://github.com/Snailclimb/JavaGuide","https://github.com/YeeTone/SUSTech-Java1A-Answer"]
  }),
  methods: {
    getDevelopersChart(size) {
      const dom = this.$refs.developers
      if (dom) {
        const domChart = echarts.init(dom)
        const option = {
          title: {
            text: 'Number of Developers',
            left: 'center'
          },
          xAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          yAxis: {
            type: 'category',
            data: ['总数']
          },
          series: [
            {
              data: [size],
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
        };
        domChart.setOption(option)
        window.addEventListener("resize", function () {
          domChart.resize()
        })
        this.$on('hook:destroyed', () => {
          window.removeEventListener("resize", function () {
            domChart.resize();
          });
        })
      }

    },
    getCommitNumChart(nameList, numList) {
      const dom = this.$refs.commitNum
      if (dom) {
        const domChart = echarts.init(dom)
        const option = {
          title: {
            text: 'Developers activity sort',
            left: 'center'
          },
          xAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          yAxis: {
            type: 'category',
            data: nameList,
            axisLabel: {
              interval: 0,
              formatter: function (params) {
                var newParamsName = "";
                var paramsNameNumber = params.length;
                var provideNumber = 12;
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    var start = p * provideNumber;
                    var end = start + provideNumber;
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr;
                  }
                } else {
                  newParamsName = params;
                }
                return newParamsName;
              }
            }
          },
          series: [
            {
              data: numList,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
        };
        domChart.setOption(option)
        window.addEventListener("resize", function () {
          domChart.resize()
        })
        this.$on('hook:destroyed', () => {
          window.removeEventListener("resize", function () {
            domChart.resize();
          });
        })
      }
    },
    getAverageTimeBar(numList) {
      const dom = this.$refs.averageTimeBar
      if (dom) {
        const domChart = echarts.init(dom)
        const option = {
          title: {
            text: 'Average resolution time',
            left: 'center'
          },
          xAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          yAxis: {
            type: 'category',
            data: ["time"]
          },
          series: [
            {
              data: numList,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
        };
        domChart.setOption(option)
        window.addEventListener("resize", function () {
          domChart.resize()
        })
        this.$on('hook:destroyed', () => {
          window.removeEventListener("resize", function () {
            domChart.resize();
          });
        })
      }
    },
    getReleaseInfoBar(nameList, numList) {
      const dom = this.$refs.releaseInfoBar
      if (dom) {
        const domChart = echarts.init(dom)
        const option = {
          title: {
            text: 'Num of release ',
            left: 'center'
          },
          xAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          yAxis: {
            type: 'category',
            data: nameList
          },
          series: [
            {
              data: numList,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
        };
        domChart.setOption(option)
        window.addEventListener("resize", function () {
          domChart.resize()
        })
        this.$on('hook:destroyed', () => {
          window.removeEventListener("resize", function () {
            domChart.resize();
          });
        })
      }
    },
    getStatisticsPie(data) {
      const dom = this.$refs.statisticsPie
      if (dom) {
        const domChart = echarts.init(dom)
        const option = {
          title: {
            text: 'Commit time distribution',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        domChart.setOption(option)
        window.addEventListener("resize", function () {
          domChart.resize()
        })
        this.$on('hook:destroyed', () => {
          window.removeEventListener("resize", function () {
            domChart.resize();
          });
        })
      }
    },
    getReleaseInfoLine(nameList, numList) {
      const dom = this.$refs.releaseInfoLine
      if (dom) {
        const domChart = echarts.init(dom)
        const option = {
          title: {
            text: 'Commits between release',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: {
            type: 'category',
            data: nameList,
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: numList,
              type: 'line'
            }
          ]
        };
        domChart.setOption(option)
        window.addEventListener("resize", function () {
          domChart.resize()
        })
        this.$on('hook:destroyed', () => {
          window.removeEventListener("resize", function () {
            domChart.resize();
          });
        })
      }
    },
    getIssueInfoPie(data) {
      const dom = this.$refs.issueInfoPie
      if (dom) {
        const domChart = echarts.init(dom)
        const option = {
          title: {
            text: 'Num of open and closed Issue',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        domChart.setOption(option)
        window.addEventListener("resize", function () {
          domChart.resize()
        })
        this.$on('hook:destroyed', () => {
          window.removeEventListener("resize", function () {
            domChart.resize();
          });
        })
      }
    },
    getIssueInfoLine(nameList, numList) {
      const dom = this.$refs.issueInfoLine
      if (dom) {
        const domChart = echarts.init(dom)
        const option = {
          title: {
            text: 'Resolution time distribution',
            left: 'center'
          },
          xAxis: {
            type: 'category',
            data: nameList
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              type: 'bar',
              data: numList,
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
        };
        domChart.setOption(option)
        window.addEventListener("resize", function () {
          domChart.resize()
        })
        this.$on('hook:destroyed', () => {
          window.removeEventListener("resize", function () {
            domChart.resize();
          });
        })
      }
    },
    getStatisticsBar(nameList, numList) {
      const dom = this.$refs.statisticsBar
      if (dom) {
        const domChart = echarts.init(dom)
        const option = {
          title: {
            text: 'Commit time distribution of days',
            left: 'center'
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: {
            type: 'category',
            data: nameList
          },
          series: [
            {
              data: numList,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
        };
        domChart.setOption(option)
        window.addEventListener("resize", function () {
          domChart.resize()
        })
        this.$on('hook:destroyed', () => {
          window.removeEventListener("resize", function () {
            domChart.resize();
          });
        })
      }
    },
  },
  mounted() {
    let repoId = this.$route.params.repoId
    getRepository(repoId).then(res => {
      this.repoInfo = res
    })
    getUsers(repoId).then(res => {
      this.getDevelopersChart(res.length)

    })
    getUsersWithPage(repoId, 10).then(res => {
      let nameList = []
      let numList = []
      res.forEach(item => {
        nameList.unshift(item["usersName"])
        numList.unshift(item["commitNum"])
      })
      this.getCommitNumChart(nameList, numList)
    })
    getStatistics(repoId).then(res => {

      this.getStatisticsPie([{"name": "afternoon", "value": res["afternoon"]}, {
        "name": "morning",
        "value": res["morning"]
      }])
      this.getStatisticsBar(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
          [res["monday"], res["tuesday"], res["wednesday"], res["thursday"], res["friday"], res["saturday"], res["sunday"]])
    })
    getIssueInfo(repoId).then(res => {
      this.getIssueInfoPie([{"name": "close", "value": res["close"]}, {"name": "open", "value": res["open"]}])
    })
    getIssueTime(repoId).then(res => {
      this.getIssueInfoLine(["oneHour", "oneDay", "sevenDay", "oneMonth", "halfYear"],
          [res["oneHour"], res["oneDay"], res["sevenDay"], res["oneMonth"], res["halfYear"]])
      this.getAverageTimeBar([(res["avgSolveTime"]/(3600*24)).toFixed(2)])
    })
    getReleaseInfo(repoId).then(res => {
      this.getReleaseInfoBar([ "releaseNum"], [ res["releaseNum"]])
    })
    getReleaseInfoLine(repoId).then(res => {
      let nameList = []
      let numList = []
      res.forEach(item => {
        nameList.push(item["releaseId"])
        numList.push(item["commitNum"])
      })
      this.getReleaseInfoLine(nameList, numList)

    })
  }
}
</script>

<style scoped>
.item-box {
  display: flex;
  flex-flow: wrap;
  border: 1px solid gainsboro;
  justify-content: space-around;
  margin-bottom: 32px;
}

.item-box-title {
  width: 100%;
  padding-left: 26px;
}
.repoInfo{
  justify-content: center;
  margin-bottom: 32px;
  display: flex;

}
.repoInfo div {
  margin-left: 32px;
}
</style>
