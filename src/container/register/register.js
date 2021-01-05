import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, InputItem, WhiteSpace, Radio, List } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import Logo from '../../components/Logo'
import { register } from '../../redux/user.redux'
import FormWrapper from '../../components/FromWrapper'


@connect(
    state => state.user,
    { register }
)
@FormWrapper
class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    componentDidMount() {
        this.props.handleChange('type', 'genius');
    }

    handleRegister() {
        this.props.register(this.props.state);
    }

    render() {
        const props = this.props;
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {props.redirectTo ? <Redirect to={props.redirectTo} /> : null}
                <Logo />
                <h3 style={{ color: '#eb3941', textAlign: 'center' }}>{props.msg}</h3>
                <List>
                    <InputItem onChange={e => props.handleChange('user', e)}>用户名</InputItem>
                    <InputItem onChange={e => props.handleChange('pwd', e)}>密码</InputItem>
                    <InputItem onChange={e => props.handleChange('repeatpwd', e)}>确认密码</InputItem>
                </List>
                <h3>选择身份</h3>
                <List>
                    <RadioItem checked={this.props.state.type === 'genius'} onChange={() => props.handleChange('type', 'genius')}>牛人</RadioItem>
                    <RadioItem checked={this.props.state.type === 'boss'} onChange={() => props.handleChange('type', 'boss')}>Boss</RadioItem>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <Button type='primary' onClick={this.handleRegister}>注册</Button>
            </div>
        )
    }
}

export default Register
