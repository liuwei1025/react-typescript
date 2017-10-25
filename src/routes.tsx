/**
 * 路由写到此处 按照
 */
import {RouteProps} from 'react-router-dom'

import Apple from './components/fruits/Apple'
import Banana from './components/fruits/banana'

import Cabbage from './components/vegetables/cabbage'
import Radish from './components/vegetables/radish'

interface PowerRouteProps extends RouteProps{
    name:string;
}

export const _routes=[
    {
        id:'fruits',
        name:'水果',
        routes:[
            {
                name:'苹果',
                path:'/apple',
                component:Apple
            },
            {
                name:'香蕉',
                path:'/banana',
                component:Banana
            }
        ]
    },
    {
        id:'vegetables',
        name:'蔬菜',
        routes:[
            {
                name:'白菜',
                path:'/cabbage',
                component:Cabbage
            },
            {
                name:'萝卜',
                path:'/radish',
                component:Radish
            }
        ]
    }
];
export const maproutes = _routes.reduce((ary:PowerRouteProps[],cur:any)=>{
    return ary.concat(cur.routes||cur)
},[]).filter(x=>x.path && x.path!=='');