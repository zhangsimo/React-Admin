//用户登录信息


const seachList ={
    searchList:[],
}


const userReduer = function (state = seachList ,action) {
    switch(action.type){
        case 'GET_SEARCH_LIST':
            return {
                ...state,
                searchList:action.list
            }
        default:
            return state
    }
}

export default userReduer
