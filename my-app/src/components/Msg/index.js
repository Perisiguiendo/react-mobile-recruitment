import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, List } from 'antd-mobile';

@connect(
    state => state
)
class Msg extends Component {

    getLastMsg = (arr) => {
        return arr[arr.length - 1];
    }

    render() {
        const Item = List.Item;
        const Brief = Item.Brief;
        const userid = this.props.user._id;
        const avatar = 'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg';
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
        });
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLastMsg(a).create_time;
            const b_last = this.getLastMsg(b).create_time;
            return b_last - a_last;
        })
        return (

            <div>
                <List>
                    {
                        chatList.map(v => {
                            const lastItem = this.getLastMsg(v);
                            const targetId = v[0].from === userid ? v[0].to : v[0].from;
                            const unreadNum = v.filter(v => !v.read && v.to === userid).length;
                            if (!this.props.chat.users[targetId]) {
                                return null;
                            }
                            const name = this.props.chat.users[targetId] ? this.props.chat.users[targetId].name : '';
                            // const avatar = this.props.chat.users[targetId] ? this.props.chat.users[targetId].name : '';

                            return (
                                <Item
                                    extra={<Badge text={unreadNum}></Badge>}
                                    key={lastItem._id}
                                    thumb={avatar}
                                    arrow="horizontal"
                                    onClick={() => {
                                        this.props.history.push(`/chat/${targetId}`);
                                    }}
                                >
                                    <span>{name}</span>
                                    <Brief>{lastItem.content}</Brief>
                                </Item>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}

export default Msg 
