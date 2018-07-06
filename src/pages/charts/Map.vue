<template>
    <div>
      <div id="myChart" style="width:100%; min-height:500px;"></div>
      <div id="myMap" style="width:100%; height:400px; margin-top:10px;"></div>
      
    </div>
</template>
<script>
import API from '../../api/http'
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import {
    geoCoordMap , 
    BJData ,
    SHData ,
    GZData ,
    data
} from '../../mockdata/Hchart'
    export default {
        data () {
            return {
                myChart:null,
                myMap:null,
            }    
        },
        methods: {
            convertData(data){
                let res =[];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            }

        },
        mounted() {
            var _this = this;
            //初始化echarts
            this.myChart = echarts.init(document.getElementById('myChart'));
            this.myMap = echarts.init(document.getElementById('myMap'));

            this.myChart.setOption({
                backgroundColor: '#404a59',
                title: {
                    text: '全国主要城市空气质量',
                    subtext: 'data from PM25.in',
                    sublink: 'http://www.pm25.in',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    y: 'bottom',
                    x: 'right',
                    data: ['pm2.5'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#111'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    }
                },
                series: [{
                    name: 'pm2.5',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: this.convertData(data),
                    symbolSize: function(val) {
                        return val[2] / 10;
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    }
                }, {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: this.convertData(data.sort(function(a, b) {
                        return b.value - a.value;
                    }).slice(0, 6)),
                    symbolSize: function(val) {
                        return val[2] / 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                }]
            });

            

        }
    }
</script>
<style scoped>
    .ivu-table-cell button{
        margin: 0 10px;
    }
</style>