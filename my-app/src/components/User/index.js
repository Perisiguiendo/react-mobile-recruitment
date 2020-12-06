import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, WhiteSpace } from 'antd-mobile'
import './index.css'

@connect(
    state => state.user,
    null
)
class User extends Component {

    render() {
        const { user, type, avatar } = this.props;
        const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
        return user ? (
            <div>
                <Result
                    img={myImg('https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg')}
                    title={user}
                    message={
                        <div>

                        </div>
                    }
                />
                {user}
                {type}
                {avatar}
            </div>
        ) : null
    }
}
export default User