<template>
  <div>
    <!-- 面包屑 -->
    <mybread nav1="数据统计" nav2="数据报表"></mybread>
    <!-- 数据报表 -->
    <el-row class="my-data">
      <el-col :span="24">
        <div ref="main" style="width: 800px;height:500px;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//导入echarts
import echarts from "echarts";
export default {
  name: "reports",
  //数据
  data() {
    return {
      //指定图片的配置和数据
      option: {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  //生命钩子
  mounted() {
    //获取dom
    const mychart = echarts.init(this.$refs.main);
    //指定的配置项和数据显示图表。
    mychart.setOption(this.option);
  }
};
</script>

<style lang="less" scoped>
.my-data{
    background-color: #fff;
    margin-top: 5px;
}
</style>
