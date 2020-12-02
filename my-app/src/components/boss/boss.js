import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'

@connect(
    state => state.chatuser,
    { getUserList }
)
class Boss extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUserList('genius')
    }
    
    render() {
        const { userList } = this.props;
        return (
            <div>
                <WingBlank>
                    <WhiteSpace size="lg" />
                    {
                        userList.map(v => (
                            v.avatar ?
                                <div
                                    key={v._id}
                                >
                                    <Card>
                                        <Card.Header
                                            title={v.user}
                                            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                                            extra={<span>{v.position}</span>}
                                        />
                                        <Card.Body>
                                            <div>
                                                {
                                                    v.introduction.split('\n').map(v => (
                                                        <div style={{ lineHeight: 1.5 }}>{v}</div>
                                                    ))
                                                }
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <WhiteSpace size="lg" />
                                </div>
                                : null
                        ))
                    }
                    <WhiteSpace size="lg" />
                </WingBlank>
            </div>
        )
    }
}


export default Boss 