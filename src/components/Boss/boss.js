import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from '../UserCard'
import { getUserList } from '../../redux/chatuser.redux'
import '../index.css'

@connect(
    state => state.chatuser,
    { getUserList }
)
class Boss extends Component {

    componentDidMount() {
        this.props.getUserList('genius')
    }

    render() {
        return (<UserCard userList={this.props.userList} />)
    }
}


export default Boss 