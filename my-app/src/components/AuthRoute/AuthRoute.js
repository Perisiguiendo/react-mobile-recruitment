import Axios from 'axios';
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class AuthRoute extends Component {
    componentDidMount() {
        /**
         * 获取用户信息
         * 1. 是否登录
         * 2. 现在的url地址是什么  login不需要跳转
         * 3. 用户的type是boss还是牛人
         * 4. 用户是否完善信息
         * 。。。。
         */
        Axios.get('/user/info')
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    if (res.data.code === 0) {
                        // 有登录信息
                    } else {
                        this.props.history.push('/login');
                    }
                }
            })
    }
    render() {
        return null;
    }
}

export default withRouter(AuthRoute)
