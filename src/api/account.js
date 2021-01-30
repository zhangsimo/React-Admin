import Axios from '@lib/api.request.js'
import api from './url'

//获取token
export const login = ({username, password}) => {
    let data = {
        username,
        password,
        grant_type: 'password',
        client_id: 'oos',
        client_secret: 'oosecret'
    }
    return Axios.request({
        url: api.tokenApi + '/uaa/token',
        method: 'post',
        data
    })
}


//获取用户信息
export const getUserInfo = (username) => {
    return Axios.request({
        url: api.passportApi + '/staff/findByUsername',
        method: 'get',
        params: {
            client: 'oms',
            username
        }
    })
}
