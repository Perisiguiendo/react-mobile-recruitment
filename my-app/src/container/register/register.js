import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, WingBlank, InputItem, WhiteSpace, Radio, List } from 'antd-mobile'
import Logo from '../../components/Logo'
import { register } from '../../redux/user.redux'

@connect(
    state => state.user,
    { register }
)
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    handleRegister() {
        // console.log(this.state);
        this.props.register(this.state);
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <WingBlank>
                <Logo />
                <h3 style={{color: '#eb3941', textAlign: 'center'}}>{this.props.msg}</h3>
                <List>
                    <InputItem onChange={e => this.handleChange('user', e)}>用户名</InputItem>
                    <InputItem onChange={e => this.handleChange('pwd', e)}>密码</InputItem>
                    <InputItem onChange={e => this.handleChange('repeatpwd', e)}>确认密码</InputItem>
                </List>
                <h3>选择身份</h3>
                <List>
                    <RadioItem checked={this.state.type === 'genius'} onChange={() => this.handleChange('type', 'genius')}>牛人</RadioItem>
                    <RadioItem checked={this.state.type === 'boss'} onChange={() => this.handleChange('type', 'boss')}>Boss</RadioItem>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <Button type='primary' onClick={this.handleRegister}>注册</Button>
            </WingBlank>
        )
    }
}

export default Register
