import Login from './pages/Login.vue'
import NotFound from './pages/404.vue'
import Home from './pages/Home.vue'
import Main from './pages/Main.vue'
import Table from './pages/nav1/Table.vue'
import Form from './pages/nav1/Form.vue'
import user from './pages/nav1/user.vue'
import valueHalf from './pages/nav2/valueHalf.vue'
import Upload from './pages/nav2/Upload.vue'
import Test from './pages/nav3/test.vue'
import svg from './pages/nav3/svg.vue'
import echarts from './pages/charts/echarts.vue'
import Map from './pages/charts/Map.vue'

let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    }, {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'home', //图标样式class
        children: [{
            path: '/main',
            component: Main,
            name: '主页',
            hidden: true
        }, {
            path: '/table',
            component: Table,
            name: '表格'
        }, {
            path: '/form',
            component: Form,
            name: '表单'
        }, {
            path: '/user',
            component: user,
            name: '列表'
        }, ]
    }, {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'ios-paw',
        children: [{
            path: '/valueHalf',
            component: valueHalf,
            name: '评分'
        }, {
            path: '/Upload',
            component: Upload,
            name: '图片上传'
        }]
    }, {
        path: '/',
        component: Home,
        name: '导航三',
        iconCls: 'social-freebsd-devil',
        //leaf: true, //只有一个节点
        children: [{
            path: '/test',
            component: Test,
            name: 'TULB'
        },{
            path: '/svg',
            component: svg,
            name: 'svg动画'
        }]
    }, {
        path: '/',
        component: Home,
        name: '导航四',
        iconCls: 'stats-bars',
        children: [{
            path: '/echarts',
            component: echarts,
            name: '图表'
        }, {
            path: '/Map',
            component: Map,
            name: '地图'
        }]
    }, {
        path: '*',
        hidden: true,
        redirect: {
            path: '/404'
        }
    }
];

export
default routes;