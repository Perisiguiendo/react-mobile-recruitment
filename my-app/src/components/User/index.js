import React, { Component } from 'react'
import { connect } from 'react-redux'
import browserCookie from 'browser-cookies'
import { Redirect } from 'react-router-dom'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
import { logoutSubmit } from '../../redux/user.redux'
import './index.css'

@connect(
    state => state.user,
    { logoutSubmit }
)
class User extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.cancellation = this.cancellation.bind(this);
    }

    logout() {
        const alert = Modal.alert;
        alert('登出', '是否确认?', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            {
                text: '确认', onPress: () => {
                    browserCookie.erase('userid');
                    this.props.logoutSubmit();
                }
            },
        ])
    }

    cancellation() {
        console.log('cancellation');
    }

    render() {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;

        const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="pic" style={{ width: 60, height: 60 }} />;
        return props.user ? (
            <div>
                <Result
                    img={myImg('https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg')}
                    title={props.user}
                    message={props.type === 'boss' ? props.company : null}
                />
                <List
                    renderHeader={() => '简介'}
                >
                    <Item multipleLine>
                        <Brief>{props.position}</Brief>
                        {
                            props.introduction ? props.introduction.split('\n').map(e =>
                                <Brief key={e}>{e}</Brief>) : null
                        }
                        {
                            props.request ? props.request.split('\n').map(e =>
                                <Brief key={e}>{e}</Brief>) : null
                        }
                        {
                            props.salary ? <Brief>薪资：{props.salary}</Brief> : null
                        }
                    </Item>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <Button type='primary' onClick={this.logout}>登出</Button>
                <WhiteSpace />
                <WhiteSpace />
                <Button type='warning' onClick={this.cancellation}>注销</Button>
            </div>
        ) : <Redirect to={this.props.redirectTo} />
    }
}
export default User