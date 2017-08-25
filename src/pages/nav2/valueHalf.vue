<template>
    <div>
        <Row>
            <i-col span="12">
                <Rate show-text v-model="valueText"></Rate>
            </i-col>
            <i-col span="12">
                <Rate show-text v-model="valueCustomText">
                    <span style="color: #f5a623">{{ valueCustomText }}</span>
                </Rate>
            </i-col>
        </Row>
        <Tooltip placement="right" content="点击弹出对话框" >
            <Button @click="modal10 = true">对话框</Button>
        </Tooltip>
        <Modal
            title="对话框标题"
            v-model="modal10"
            class-name="vertical-center-modal">
            <p>对话框内容</p>
            <p>对话框内容</p>
            <p>对话框内容</p>
        </Modal>
    <Timeline>
        <Timeline-item color="green">发布1.0版本</Timeline-item>
        <Timeline-item color="green">发布2.0版本</Timeline-item>
        <Timeline-item color="red">严重故障</Timeline-item>
        <Timeline-item color="blue">发布3.0版本</Timeline-item>
    </Timeline>

     <Tag v-for="item in count" @on-close="handleClose2"  closable color="yellow">标签{{ item + 1 }}</Tag>
    <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd" v-if="show">添加标签</Button>

        <i-circle :percent="percent" >
        <Icon v-if="percent == 100" type="ios-checkmark-empty" size="60" style="color:#5cb85c"></Icon>
        <span v-else style="font-size:24px">{{ percent }}%</span>
        </i-circle>
        <Currency placeholder="请输入金额" tofixed="2" v-model="curren" ></Currency> 
    </div>
</template>
<script>
import Currency from './Currency.vue'
    export default {
        name:"cur",
        components:{
            Currency
        },
        data () {
            return {
                valueText: 3,
                valueCustomText: 3.8,
                modal10: false,
                show:true,
                count:[0, 1, 2],
                percent:10,
                curren:'',
            }
        },

        methods: {
            handleAdd () {
                if (this.count.length<5) {
                    this.show = true;
                    this.count.push(this.count[this.count.length - 1] + 1);
                }else{
                    this.show = false;
                }
            },
            handleClose2 (event, name) {
                const index = this.count.indexOf(name);
                this.count.splice(index, 1);
            }
        },
        mounted(){
           var tiemr = setInterval(()=>{
                this.percent++;
               if(this.percent>=100){
                  clearTimeout(tiemr);  
               }
            },300);
        }
    }
</script>



<style scoped>
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
    .time{
        font-size: 14px;
        font-weight: bold;
    }
    .content{
        padding-left: 5px;
    }
</style>
