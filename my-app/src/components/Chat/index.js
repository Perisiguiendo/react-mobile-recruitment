import React, { Component } from 'react';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import './index.css'
import { sendMsg, getMsgList, recMsg, readMsg } from '../../redux/chat.redux';
import { getChatId } from '../../utils';
const socket = io('ws://localhost:9093');

@connect(
    state => state,
    { sendMsg, getMsgList, recMsg, readMsg }
)
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            showEmoji: false,
        }
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recMsg();
        }
        const to = this.props.match.params.user;
        this.props.readMsg(to);

    }

    fixCarousel = () => {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        })
    }

    handleSubmit = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({ from, to, msg });
        this.setState({ text: '' });
    }

    render() {
        const emojis = '😀 😃 😀 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 🥰 😍 🤩 😘 😗 😚 😙 😋 😛 😜 🤪 😝 🤑 🤗 🤭 🤫 🤔 🤐 🤨 😐 😑 😶 😏 😒 🙄 😬 🤥 😌 😔 😪 🤤 😴 😷 🤒 🤕 🤢 🤮 🤧 🥵 🥶 🥴 😵 🤯 😤 😡 👿 😈 💀 ☠️ 👻 ❤️ ❤️ 💛 💚 💙 💜 🖤 🤍 💦 💬 💣 🗯️ 💤'
            .split(' ')
            .filter(v => v)
            .map(v => ({ text: v }));
        const userid = this.props.match.params.user;
        const Item = List.Item;
        const users = this.props.chat.users;
        const avatar = 'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg';
        if (!users[userid]) {
            return null;
        }
        const chatid = getChatId(userid, this.props.user._id);
        const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === chatid);

        return (
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    icon={<Icon type='left' />}
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[userid].name}
                </NavBar>
                <div>
                    {chatmsg.map(v => {
                        return v.from === userid ? (
                            <List key={v._id}>
                                <Item
                                    thumb={avatar}
                                >对方:{v.content}</Item>
                            </List>
                        ) : (
                                <List key={v._id}>
                                    <Item
                                        extra={<img src='https://www.gravatar.com/avatar/9335c6bb9158dcb17327506da237fb77?s=32&d=identicon&r=PG' src='avatar' />}
                                        className='chat-me'
                                    >自己:{v.content}</Item>
                                </List>
                            )
                    })}
                </div>
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({ text: v })
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{ marginRight: 15 }}
                                        onClick={() => {
                                            this.setState({
                                                showEmoji: !this.state.showEmoji
                                            }, () => {
                                                this.fixCarousel()
                                            })
                                        }}
                                    >emoji</span>
                                    <span onClick={this.handleSubmit}>发送</span>
                                </div>
                            }
                        ></InputItem>
                    </List>
                    <div id="scroller">
                        {
                            this.state.showEmoji ? <Grid
                                data={emojis}
                                columnNum={9}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={el => {
                                    this.setState({
                                        text: this.state.text + el.text
                                    })
                                }}
                            /> : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat
