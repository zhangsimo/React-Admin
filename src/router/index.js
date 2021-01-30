import React from 'react'
import { Route , Redirect} from "react-router-dom"
import {getToken} from '@/utils/tool.js'

//路由守卫判断是否带token
const FadingRoute =({ component: Component, ...rest }) => {
    return (
            <Route {...rest} render={routeProps => (
                getToken()?  <Component {...routeProps} /> : <Redirect to="/"/>
                )}
            />
    )
}

export default FadingRoute
