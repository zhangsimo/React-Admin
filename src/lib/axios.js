import Axios from 'axios'
import baseURL from '../api/url.js'
import qs from 'qs'
import { message } from 'antd';
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/utils/tool.js'
let isFailure = false;
// let is403 = 0
//创建实例
class httpRequest {
    constructor () {
        this.options = {
            method: '',
            url: ''
        }
        // 存储请求队列
        this.queue = {}
        // 当发生错误时，是否提示的队列
        this.showErrorQueue = {}
    }
    // 销毁请求实例
    destroy (url) {
        delete this.queue[url]
        const queue = Object.keys(this.queue)
        return queue.length
    }
    // 请求拦截
    interceptors (instance, url) {
        if(isFailure&&!url.includes('/uaa/token')){
            return false;
        }
        // 添加请求拦截器
        instance.interceptors.request.use(config => {
            // isFailure=false;
            if(Cookies.get(TOKEN_KEY) && !config.url.includes('/token')){
                config.headers['Authorization'] = "Bearer "+Cookies.get(TOKEN_KEY)
                //登录权限需要
                        config.params.scope = 'oms'
            }else{
                if(config.url.includes('/token')){
                    config.data = qs.stringify(config.data);
                    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                }
            }

            return config
        }, error => {
            // 对请求错误做些什么
            return Promise.reject(error)
        })

        // 添加响应拦截器
        instance.interceptors.response.use((res) => {
            let { data } = res
            if(data.code !== 0){
                message.error(data.message)
                return Promise.reject(data)
            }else{
                return data
            }
        }, (error) => {
            if(error.response.config.url.includes('/token')){
                message.error(error.response.data.data.errorMessage)
            }else{
                message.error(error.message)
            }

            // 对响应错误做点什么
            return Promise.reject(error)
        })
    }
    // 创建实例
    create () {
        let conf = {
            baseURL: baseURL.omsApi,
            timeout: 2000,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-URL-PATH': window.location.pathname
            },
            params:{}
        }
        return Axios.create(conf)
    }

    // 请求实例
    request (options) {
        var instance = this.create()
        this.interceptors(instance, options.url)
        this.queue[options.url] = instance
        this.showErrorQueue[options.url] = options.showError === undefined ? true : !!options.showError
        return instance(options)
    }
}

export default httpRequest
