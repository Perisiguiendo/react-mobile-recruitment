import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import '../index.css'
import UserCard from '../UserCard'

@connect(
    state => state.chatuser,
    { getUserList }
)
class Genius extends Component {

    componentDidMount() {
        this.props.getUserList('boss')
    }

    render() {
        return (<UserCard userList={this.props.userList} />)
    }
}


export default Genius 