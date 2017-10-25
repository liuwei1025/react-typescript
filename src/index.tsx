import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {HashRouter, Route, Switch, Link, BrowserRouter} from 'react-router-dom'
// 提供antd的本地语言支持
import {LocaleProvider, Menu} from 'antd'
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

import {maproutes,_routes} from './routes'

class Navigation extends React.Component {
    render() {
        return (
            <Menu>
                {maproutes.map(route => {
                    return (
                        <MenuItem key={route.path}>
                            <Link to={route.path} key={`route-link-${route.path}`}>{route.name}</Link>
                        </MenuItem>
                    )
                })}
            </Menu>
        )
    }
}

class Navigations extends React.Component {
    render() {
        return (
            <Menu style={{width:200}} mode="inline">
                {_routes.map(routes=>{
                    return (
                    <SubMenu key={routes.id} title={routes.name}>
                        {routes.routes.map(route=>{
                            return (
                                <MenuItem key={`route-${route.path}`}>
                                    <Link to={route.path} key={`route-link-${route.path}`}>{route.name}</Link>
                                </MenuItem>
                            )
                        })}
                    </SubMenu>)
                })}
            </Menu>
        )
    }
}

class NotFoundView extends React.Component {
    render() {
        return (
            <div className="http-404">
                <h2 className="text-info">功能尚未开发完毕</h2>
                <h3 className="text-danger">Page not found</h3>
            </div>
        );
    }
}

const Router = () => (
    <BrowserRouter>
        <Switch>
            {maproutes.map(route => {
                // return <Route path={route.path} key={`route-path-${route.path}`} location={route.location} component={route.component}/>
                return <Route path={route.path} key={`route-${route.path}`} component={route.component}/>
            })}
            <Route path="/" exact component={Navigations}/>
            <Route component={NotFoundView}/>
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(
    <Router/>, document.getElementById('app'));