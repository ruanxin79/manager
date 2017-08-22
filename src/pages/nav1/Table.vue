<template>
    <div>
        <Table :context="self" :data="tableData" :columns="tableColumns" stripe border></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="page" @on-change="changePage" show-total></Page>
            </div>
        </div>
    </div>
</template>
<script>
import {
        getUserListPage,
        removeUser,
        editUser,
        addUser
    } from '../../api/mork';
    export default {
        data () {
            return {
                self: this,
                tableData: [],
                total: 0,
                page: 1,
                tableColumns: [
                     {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名字',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '地址',
                        align: 'center',
                        key: 'addr',
                        width: 300,
                        ellipsis:true,
                    },
                    {
                        title: '年龄',
                        align: 'center',
                        key: 'age'
                    },
                    {
                        title: '生日',
                        align: 'center',
                        key: 'birth'
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        align: 'center',
                        render: (h, params) => {
                            const row = params.row;
                            const text = row.sex === 1 ? '男':'女';
                            return h('span', {}, text);
                        }
                    },
                     {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                         render: (h, params,index) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    } ,
                                    style: {
                                        marginRight: '10px',
                                    },
                                    on: {
                                        click: () => {
                                            this.showInfo(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                     on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            mockTableData () {
                let para = {
                    page: this.page
                };
                this.$Loading.start();
                getUserListPage(para).then((res) => {
                    this.$Loading.finish();
                    this.total = res.data.total;
                    this.tableData = res.data.users;
                   
                });
            },
            showInfo (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `姓名：${this.tableData[index].name}<br>年龄：${this.tableData[index].age}<br>地址：${this.tableData[index].addr}`
                })
            },
            remove (index) {
                 let self = this;
                 this.$Modal.confirm({
                    title: '用户信息',
                    content: `是否删除此记录`,
                    onOk: function(){
                        this.$Loading.start();
                        let para = {id: index}
                         removeUser(para).then((res)=> {
                            self.mockTableData();
                      });
                    }
                })
            },
            changePage (row) {
                // mock数据
                this.page = row;
                this.mockTableData();
            },
        },
        mounted() {
            this.mockTableData();
        }
    }
</script>
<style scoped>
    .ivu-table-cell button{
        margin: 0 10px;
    }
</style>