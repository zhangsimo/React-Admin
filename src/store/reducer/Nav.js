
const dynamicJump = {
    all: 2,
    activityKey: sessionStorage.getItem('pathList') ? JSON.parse(sessionStorage.getItem('pathList')) : [],
}

const nav = function (state = dynamicJump, action) {
    switch (action.type) {
        case 'BLOCK':
            let blockList =state.activityKey
            blockList.forEach((item,i)=>{
                blockList.splice(i,blockList.length)
            })
          
            sessionStorage.setItem('pathList', JSON.stringify(blockList))
            return {...state}
        case 'DEL':
          
            let list = state.activityKey
            list.forEach((item, i) => {
                if (item.title === action.obj.title) {
                    list.splice(i, 1)
                }
            })
            sessionStorage.setItem('pathList', JSON.stringify(list))
            return {...state}
        case 'CLOSE':
            let  allLists=state.activityKey
            let allList = [];
            allList=allLists.filter((item,i)=>{
                return item.title==='首页'
            })
            sessionStorage.path="/base/home"
            sessionStorage.setItem('pathList', JSON.stringify(allList))

            return {...state,activityKey:allList}
        case 'CLOSE_O':
            let other =state.activityKey;
            let others=[]
           others= other.filter((item, i) => {
               return item.key===action.path||item.title==='首页'
            })
            state.activityKey=others
            sessionStorage.setItem('pathList', JSON.stringify(others))
            return {...state,activityKey:others}
        case 'TIAO':
            let data = state.activityKey
            const hh = data.find(item => item.title === action.obj.title);

            if (hh === undefined) {
                data.push(action.obj)
            }
            sessionStorage.setItem('pathList', JSON.stringify(data))
          return {...state}
        default:
            break;
    }

    return state
        
   
}

export default nav