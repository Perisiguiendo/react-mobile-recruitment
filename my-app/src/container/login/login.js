import React, { Component } from 'react'
// import { connect } from 'redux'
import Logo from '../../components/Logo'
import { Button, WingBlank, WhiteSpace, InputItem, List } from 'antd-mobile'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        console.log(this.props.history)
        this.props.history.push('/register')
    }

    render() {
        return (
            <WingBlank>
                <Logo />
                <h1>登录页</h1>
                <List>
                    <InputItem onChange={e=>{this.handleChange('user', e)}}>用户名</InputItem>
                    <InputItem type='password'>密码</InputItem>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <Button type='primary'>登录</Button>
                <WhiteSpace />
                <WhiteSpace />
                <Button type='primary' onClick={this.handleChange}>注册</Button>
            </WingBlank>
        )
    }
}

// function mapStateToProps() {

// }

// function mapDispatchToProps() {

// }

export default Login
// connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Login)
