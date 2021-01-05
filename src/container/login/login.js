import React, { Component } from 'react'
import { Button, WhiteSpace, InputItem, List } from 'antd-mobile'
import Logo from '../../components/Logo'
import { login } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import FormWrapper from '../../components/FromWrapper'

@connect(
    state => state.user,
    { login }
)
@FormWrapper
class Login extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleRegister() {
        this.props.history.push('/register')
    }

    handleLogin() {
        this.props.login(this.props.state)
    }

    render() {
        const props = this.props;
        return (
            <div>
                {props.redirectTo && props.redirectTo !== '/login' ? <Redirect to={props.redirectTo} /> : null}
                <Logo />
                <h3 style={{ color: '#eb3941', textAlign: 'center' }}>{this.props.msg}</h3>
                <List>
                    <InputItem
                        onChange={e => props.handleChange('user', e)}
                    >用户名</InputItem>
                    <InputItem
                        type='password'
                        onChange={e => props.handleChange('pwd', e)}
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
