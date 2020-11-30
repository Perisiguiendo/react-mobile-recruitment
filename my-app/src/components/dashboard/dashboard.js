import React, { Component } from 'react'
import { NavBar } from 'antd-mobile'
import './index.css'
import Boss from '../../container/boss/boss'
import Genius from '../../container/genius/genius'
import Msg from '../Msg'
import User from '../User'
import NavLinkBar from '../NavLinkBar'
import { connect } from 'react-redux'

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
                    >{navList.find(v => v.path = pathname).title}</NavBar>
                </header>
                {/* <Route path='/boss' exact component={Boss} />
                <Route path='/boss' exact component={Boss} />
                <Route path='/boss' exact component={Boss} />
                <Route path='/boss' exact component={Boss} /> */}
                <footer>
                    <NavLinkBar data={navList} />
                </footer>
            </div>
        )
    }
}

export default Dashboard
