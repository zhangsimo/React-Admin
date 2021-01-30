import React from 'react';
import {  Switch , Route , BrowserRouter} from 'react-router-dom'
import Login from './view/login/index.js'
import Base from  './view/base/index.js'
import FadingRoute from './router/index.js'
import Store from '@store/index.js'
import {Provider} from 'react-redux'
class App extends  React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  /**路由的5种模式**/
  /**hashHistory URL中的hash模式带#**/
  /**BrowserRouter URL中的history模式不带# 上线后需要后台处理url指向 可以用nginx**/
  /**MemoryRouter：不存储history，所有路由过程保存在内存里，不能进行前进后退，因为地址栏没有发生任何变化**/
  /**NativeRouter：经常配合ReactNative使用，多用于移动端**/
  /**StaticRouter：设置静态路由，需要和后台服务器配合设置，比如设置服务端渲染时使用**/
  /*switch 表示相同路径下,只匹配第一个,防止重复匹配*/
  /*exact 表示精确匹配路由*/
  render() {
    return(
        <Provider store={Store}>
        <BrowserRouter>
        <Switch>
          <Route exact component={Login} path='/'/>
          <FadingRoute component={Base} path='/base' />
        </Switch>
      </BrowserRouter>
        </Provider>
    )
  }
}

export default App;
