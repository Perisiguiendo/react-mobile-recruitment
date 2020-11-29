import React, { Component } from 'react'
import { NavBar, List, InputItem, TextareaItem, Button, WingBlank, WhiteSpace } from 'antd-mobile'
import AvatarSelector from '../../components/AvatarSelector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    { update }
)
class GeniusInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            position: '',
            introduction: '',
        }
        this.selectAvatar = this.selectAvatar.bind(this);

    }

    handleChange(key, val) {
        this.setState({
            [key]: val.trim(),
        })
    }

    selectAvatar(text) {
        this.setState({
            avatar: text
        }, () => {
            console.log(this.state.avatar);
        })
    }

    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <NavBar mode="dark">牛人完善信息页</NavBar>
                <AvatarSelector
                    selectAvatar={this.selectAvatar}
                />
                <WhiteSpace />
                <WhiteSpace />
                <List>
                    <InputItem onChange={e => this.handleChange('position', e)}
                    >求职岗位</InputItem>
                    <TextareaItem
                        title="个人简介"
                        autoHeight
                        labelNumber={5}
                        onChange={e => this.handleChange('introduction', e)}
                    />
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <Button
                    type='primary'
                    onClick={() => this.props.update(this.state)}
                >保存</Button>


            </div>
        )
    }
}

export default GeniusInfo
