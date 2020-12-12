import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import { withRouter } from 'react-router-dom';

@withRouter
class UserCard extends Component {
    static propTypes = {
        userList: propTypes.array.isRequired
    }



    handleClick(v) {
        console.log(v);
        this.props.history.push(`/chat/${v.user}`)
    }

    render() {
        return (
            <WingBlank>
                <WhiteSpace size="lg" />
                {
                    this.props.userList.map(v => (
                        v.avatar ?
                            <div key={v._id} onClick={() => this.handleClick(v)}>
                                <Card>
                                    <Card.Header
                                        title={v.user}
                                        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                                        extra={<span>{v.type === 'boss' ? v.company : v.position}</span>}
                                    />
                                    <Card.Body>
                                        <div style={{ lineHeight: 1.5 }}>
                                            {
                                                v.type === 'boss' ? <div><span className='card__strong'>岗位名称：</span>{v.position}</div> : null
                                            }
                                            {
                                                v.salary ? <div><span className='card__strong'>薪资：</span>{v.salary}</div> : null
                                            }
                                            {
                                                v.introduction ?
                                                    < div>
                                                        <span className='card__strong'>岗位要求：</span>
                                                        <div>
                                                            {
                                                                v.introduction.split('\n').map(v => (
                                                                    <div key={v}>{v}</div>
                                                                ))
                                                            }
                                                        </div>
                                                    </ div>
                                                    : null
                                            }
                                            {
                                                v.request ?
                                                    < div>
                                                        <span className='card__strong'>岗位要求：</span>
                                                        <div>
                                                            {
                                                                v.request.split('\n').map(v => (
                                                                    <div key={v}>{v}</div>
                                                                ))
                                                            }
                                                        </div>
                                                    </ div>
                                                    : null

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
        )
    }
}

export default UserCard
