//文件路由
/**
 * mark:值控制权限需要跟后台给的数值匹配
 * icon:为图标可以为空使用icon需要去iconMap文件相应配置icon
 * key:view下的路径
 * /base:为基本asp页面
 * **/
const router =[
    {
        title:'首页',
        icon:'home',
        key:'/base/home'
    },
    {
        title:'员工管理',
        icon:'set',
        mark:'2',
        key:'/base/user',
        child:[
            {key:'/base/user/userManagement' ,mark:'10003',title:'用户列表' },
            {key:'/base/user/addUser' ,mark:'',title:'添加用户' }
        ]
    },
    {
        title:'物品管理',
        icon:'set',
        mark:'2',
        key:'/base/bom',
        child:[
            {key:'/base/bom/bomOne' ,mark:'10003',title:'物品列表一' },
            {key:'/base/bom/bomTwo' ,mark:'',title:'添加物品二' },
            {key:'/base/bom/bomThree',mark:'10003',title:'物品列表三' },
            {key:'/base/bom/bomSi' ,mark:'',title:'添加物品四' },
            {key:'/base/bom/bomWu' ,mark:'10003',title:'物品列表五' },
            {key:'/base/bom/bomSix' ,mark:'',title:'添加物品六' },
            {key:'/base/bom/bomQi' ,mark:'10003',title:'物品列表七' },
            {key:'/base/bom/bomBa' ,mark:'',title:'添加物品八' },
            {key:'/base/bom/bomJiu' ,mark:'',title:'添加物品九' },
            {key:'/base/bom/bomS' ,mark:'10003',title:'物品列表十' },
            {key:'/base/bom/bomSS' ,mark:'',title:'添加物品十一' },
           
        ]
    },
    {
        title:'系统设置',
        icon:'set',
        mark:'2',
        key:'/base/system',
        child:[
            {key:'/base/system/setting' , mark:'', title:'系统设置'},
        ]
    },

]

export default router
