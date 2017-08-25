<template>
   <div class="wrapClass">
       <input
            ref="input"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            :maxlength="maxlength"
            :readonly="readonly"
            :name="name"
            :value="currentValue"
            :autofocus="autofocus"
            :tofixed="tofixed"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleInput"
           >
   </div>
</template>
<script>
    export default {
        name:"Currency",
        props :{
            type: {
                default: 'text'
            },
            placeholder: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            maxlength: {
                type: [String,Number]
            },
            readonly: {
                type: Boolean,
                default: false
            },
            name: {
                type: String
            },
            autofocus: {
                type:Boolean
            },
            tofixed: {
                type:[String,Number],
                default : 2
            },
            
        },
        data(){
             return {
                currentValue:this.value,
            };
        },
        methods: {
            handleFocus (event) {
                this.$emit('on-focus', event);
            },
            handleBlur (event) {
                this.$emit('on-blur', event);
            },
            handleInput (event) {
                let value =  event.target.value;
                    this.currentValue = this.setCurrentValue(value);
            },
            setCurrentValue(num){
                let re = /^(([1-9]\d{0,9})|0)(\.\d{1,9})?$/;
                let _num = num.replace(/[^\d.]/g,'');
                if(_num.lastIndexOf('.') > -1 && _num.match(/\./g).length > 1){
                    _num = _num.substr(0, _num.lastIndexOf('.'));
                }else if(re.test(_num)){
                    if(_num.lastIndexOf('.') > -1){
                        if( _num.toString().split(".")[1].length>this.tofixed){
                            _num =Number(_num).toFixed(this.tofixed) 
                        }
                    }
                }    
                    this.$refs.input.value = _num;
                    this.$emit('input', _num) 
                    return _num;    
            },
           
        },
        mounted(){
           
        }
    }
 
</script>



<style scoped>
    .wrapClass{
        display: inline-block;
        height: 100%;
        border: 1px solid #ccc;
    }
    .wrapClass input{
        border: none;
        outline:none;
        padding:5px 10px;
    }
</style>


