<template>
    <div>
        <Form ref="formInline" :model="formInline" inline>
            <FormItem prop="city">
                <Input type="text" v-model="formInline.city" placeholder="搜索">
                    <Icon type="search"></Icon>>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">查询</Button>
            </FormItem>
        </Form>
      <div id="myChart" style="width:100%; min-height:500px;"></div> 
    </div>
</template>
<script>
import $http from 'axios'
import Echarts from "echarts";
import 'echarts/map/js/china.js'
// import CityMap from "../../mockdata/Hchart/citys";
// import ProvinceMap from "../../mockdata/Hchart/province-map";
import {
    geoCoordMap , 
    BJData ,
    SHData ,
    GZData ,
    data,
    cityData,
    activeData
} from '../../mockdata/Hchart'
import city from '../../mock/city';
    export default {
        data () {
            return {
                city: '',
                formInline: {
                    city:''
                },
                myChart:null,
                name:'',
                pinyinName:'',
                acCity:'',
                levelColorMap: {
                    '1': 'rgba(241, 109, 115, .8)',
                    '2': 'rgba(255, 235, 59, .7)',
                    '3': 'rgba(147, 235, 248, 1)'
                },
                option: {
                    title: {
                        text: "全国地图",
                        textStyle: {
                            color: '#fff' //对title的样式配置.
                        }
                    },
                    
                    series: [{
                        type: "map",
                        mapType: "china",
                        selectedMode: "single",
                        // data:[
                        //    {name:'北京', selected:true} // selected:true 默认选中
                        // ],
                        //选中样式
                        itemStyle:{
                            normal:{
                                label:{show:true},

                            },
                            // 划过样式
                            emphasis:{
                                label:{show:true},
                                areaColor: 'rgba(147, 235, 248, .5)'
                            }  
                        },
                        
                    }]
                }
            }    
        },
        methods: {
            init() {
                let newActiveDate = []
                activeData.map((item,v)=> {
                    newActiveDate.push({
                        name: item.city,
                        selected: true
                    })
                })
                this.myChart = Echarts.init(document.getElementById('myChart'));
                this.$http.get(`https://raw.githubusercontent.com/huanent/vue-echarts-map-demo/master/map/china.json`).then(res=>{
                    Echarts.registerMap("china", res.data);
                    this.option.series[0].data = newActiveDate
                    this.myChart.setOption(this.option);
                    this.myChart.on("mapselectchanged", this.onProvinceClick);
                })
            },
            handleSubmit() {
                let reg = /[\u4e00-\u9fa5]/
                if(reg.test(this.formInline.city)) {
                    this.name = this.formInline.city
                    this.pinyinName = cityData[this.formInline.city] ? cityData[this.formInline.city]: '';
                }else {
                    for( let i in cityData) {
                        if(cityData[i] == this.formInline.city) {
                            this.name = i;
                            this.pinyinName = this.formInline.city;
                            break;
                        }
                    }
                }
                this.onProvinceClick();
                
            },
            onProvinceClick(e) {
                let pinyinName ;
                let activeCity = [];
                if(this.pinyinName) {
                    pinyinName = this.pinyinName ;
                }else {
                    pinyinName =  cityData[e.batch[0].name ]
                }
                activeData.map( item => {
                    if(item.city==(this.name?this.name:e.batch[0].name)) {
                        console.log(this.name?this.name:e.batch[0].name)
                        this.acCity = item.name
                        activeCity.push({
                            name: item.name,
                            selected: true
                        })
                    }
                })
                console.log(`选择的是${this.name?this.name:e.batch[0].name}----${pinyinName}`)

                this.$http.get(`../../../static/province/${pinyinName}.json`).then(res => {
                    Echarts.registerMap(pinyinName, res.data);
                    this.option.series[0].mapType = pinyinName;
                    this.option.title.text = this.name?this.name:e.batch[0].name;
                    this.option.series[0].data = activeCity
                    this.myChart.setOption(this.option); 
                    this.myChart.off("mapselectchanged", this.onProvinceClick);
                    this.myChart.on("mapselectchanged", this.onCityClick);
                })
            },
            onCityClick(e) {
                let activeArea = [];
                let name = e.batch[0].name
                var cityName = geoCoordMap[name];

                activeData.map( item => {
                    if(item.name==this.acCity) {
                        activeArea.push({
                            name: item.pos,
                            selected: true
                        })
                    }
                })
                this.$http.get(`../../../static/citys/${cityName}.json`).then(res => {
                    Echarts.registerMap(cityName, res.data);
                    this.option.series[0].mapType = cityName;
                    this.option.series[0].data = activeArea
                    this.myChart.setOption(this.option);
                    this.myChart.off("mapselectchanged", this.onProvinceClick);
                    this.myChart.off("mapselectchanged", this.onCityClick);
                })
            }
        },
        mounted() {
          
            this.init();
            

        }
    }
</script>
<style scoped>

</style>