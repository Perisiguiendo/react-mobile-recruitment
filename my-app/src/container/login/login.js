import React, { Component } from 'react'
import { Button, WhiteSpace, InputItem, List } from 'antd-mobile'
import Logo from '../../components/Logo'
import { login } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    { login }
)
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
        }
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleRegister() {
        this.props.history.push('/register')
    }

    handleLogin() {
        this.props.login(this.state)
    }

    handleChange(key, val) {
        this.setState({
            [key]: val.trim(),
        })
    }

    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo />
                <h3 style={{ color: '#eb3941', textAlign: 'center' }}>{this.props.msg}</h3>
                <List>
                    <InputItem
                        onChange={e => this.handleChange('user', e)}
                    >用户名</InputItem>
                    <InputItem
                        type='password'
                        onChange={e => this.handleChange('pwd', e)}
                    >密码</InputItem>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <Button type='primary' onClick={this.handleLogin}>登录</Button>
                <WhiteSpace />
                <WhiteSpace />
                <Button type='primary' onClick={this.handleRegister}>注册</Button>
            </div>
        )
    }
}

export default Login
