import React, { Component } from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import './index.css'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import Msg from '../Msg'
import User from '../User'
import NavLinkBar from '../NavLinkBar'

@connect(
    state => state
)
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: false,
        };
    }

    render() {
        const user = this.props.user;
        const { pathname } = this.props.location;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius',
            },
            {
                path: '/genius',
                text: 'Boss',
                icon: 'genius',
                title: 'Boss列表',
                component: Genius,
                hide: user.type === 'boss',
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg,
            },
            {
                path: '/user',
                text: '我的',
                icon: 'user',
                title: '个人中心',
                component: User,
            }
        ];
        return (
            <div>
                <header>
                    <NavBar
                        mode="dark"
                        className='fixed-header'
                    >{navList.find(v => v.path === pathname).title}</NavBar>
                </header>
                <div style={{ marginTop: 45 }}>
                    <Switch>
                        {navList.map(v => (
                            <Route key={v.path} path={v.path} exact component={v.component} />
                        ))}
                    </Switch>
                </div>

                <footer>
                    <NavLinkBar data={navList} />
                </footer>
            </div>
        )
    }
}

export default Dashboard
