import Cookies from 'js-cookie'


export const TOKEN_KEY = 'token'
export  const LoginName = 'loginName'


//设置token 时效为1天
export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, {expires: 1})
}


//获取token
export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}

//删除toke
export const romveToken = () => {
    if (Cookies.get(TOKEN_KEY)){
        Cookies.remove(TOKEN_KEY)
    }
    return false
}

// 登录名保存
export const setLoginName = (name) => {
    localStorage.setItem(LoginName , JSON.stringify(name))
}

//获取登录名
export const getLoginName =() => {
    return JSON.parse(localStorage.getItem(LoginName))

}

//角色信息保存到本地
export const setSessionStorage = (value) => {
        sessionStorage.setItem('ds-userlist' , JSON.stringify(value))
}

//获取本地角色信息
export const getSessionStorage = () => {
        return JSON.parse(sessionStorage.getItem('ds-userlist'))
}


//删除本地角色信息
export const removeSessionStorage = () => {
    if (sessionStorage.getItem("ds-userlist") != null){
     sessionStorage.removeItem('ds-userlist')
    }
    return false
}
