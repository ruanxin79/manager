<template>
    <div>
        <Carousel autoplay v-model="value2">
            <Carousel-item v-for="item in bannerList">
                <img :src="item.url" alt="" class="demo-carousel" width="100%" :height="300">
            </Carousel-item>
        </Carousel>
 
    </div>
</template>
<style scoped>
.demo-carousel{
    height:300px;
}
    
</style>
<script>
    export default {
        data () {
            return {
                value2: 0,
                bannerList:[
                    {url:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3030713634,1144684616&fm=26&gp=0.jpg"},
                    {url:"http://ykfwapp.oss-cn-hangzhou.aliyuncs.com/BannerService/BannerService1496202141198.jpg?Expires=4649802142&OSSAccessKeyId=LTAIXDLmmnPp2xUJ&Signature=Y%2BBA9dwsTlSpWbjXgJA75gx55%2Bk%3D"},
                    {url:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3030713634,1144684616&fm=26&gp=0.jpg"},
                    {url:"http://ykfwapp.oss-cn-hangzhou.aliyuncs.com/BannerService/BannerService1496202141198.jpg?Expires=4649802142&OSSAccessKeyId=LTAIXDLmmnPp2xUJ&Signature=Y%2BBA9dwsTlSpWbjXgJA75gx55%2Bk%3D"}
                ]
            }
        }
    }
</script>