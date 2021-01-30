import React , {Component } from  'react'
import {  Switch  } from 'react-router-dom'
//私有路由引入
import FadingRoute from '@router/index.js'

//自动化工程获取组件
const components =[]
const files = require.context('@/view', true , /\.js$/)

files.keys().map( key => {
    if (key.includes('./base') || key.includes('./login') || key.includes('component')) {return false}
    let splitFilesName = key.split('.')[1]
    splitFilesName =  splitFilesName.split('/')
     splitFilesName.pop()
    splitFilesName = splitFilesName.join('/')

    const path = `/base${splitFilesName}`,
          component = files(key).default
   return  components.push({path,component})
})


class containerMain extends Component {
    constructor(props){
        super(props)
        this.state ={}
    }

    render() {
        return (
                    <Switch>
                        {
                            components.map( item => {
                              return  <FadingRoute exact key={item.path} component={item.component} path={item.path}></FadingRoute>
                            })
                        }

                    </Switch>
        );
    }
}

export default containerMain
