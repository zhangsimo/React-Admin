let output = 'test' //本地修改环境
const origin = window.location.hostname
if (origin.includes('devoms2')){
    output = 'dev'
}
if (origin.includes('tsoms2')){
    output = 'test'
}
if (origin.includes('uatoms2')){
    output = 'audit'
}
if (origin.includes('erp')){
    output = 'pro'
}
// console.log(output , '测试当前环境')
export default output
