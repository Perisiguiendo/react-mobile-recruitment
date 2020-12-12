import React, { Component } from 'react'
import { List, InputItem } from 'antd-mobile'
import io from 'socket.io-client'
import './index.css'

const socket = io('ws://localhost:9093')

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: [],
        }
    }

    componentDidMount() {
        const self = this;
        socket.on('recmsg', data => {
            this.setState({
                msg: [...this.state.msg, data.text]
            })
        })
    }

    handleSubmit() {
        const { text } = this.state;
        socket.emit('sendmsg', { text: text })
        this.setState({ text: '' })
    }

    render() {
        const { msg } = this.state;
        return (
            <div>
                <div>
                    {msg.map(v => {
                        return <p key={v}>{v}</p>
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
                                <span onClick={() => this.handleSubmit()}>发送</span>
                            }
                        >信息</InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat
