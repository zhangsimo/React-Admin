//用户登录信息
import {actionsetTokenkey} from '../Type'
import {setToken,getToken} from '@/utils/tool.js'

const loginList ={
    token:"" || getToken(),
    userList:'',
}


export default (state = loginList ,action) =>{
    switch(action.type){
        //处理获取到的token
        case actionsetTokenkey:
            setToken(action.payload.token)

            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

