//引入redux 状态管理器
import { createStore , combineReducers } from 'redux'
import userReducer from './reducer/seachList.js'
import login from './reducer/loginList.js'
import nav from './reducer/Nav.js';
//创建Reducer对象
const allReducer = combineReducers({
    userReducer,
    login,
    nav:nav
})

//创建Stroe实例
const store = createStore(allReducer)
export default store

