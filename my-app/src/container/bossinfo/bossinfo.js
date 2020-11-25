import React, { Component } from 'react'
import { NavBar, List, InputItem, TextareaItem, Button, WingBlank, WhiteSpace } from 'antd-mobile'
import AvatarSelector from '../../components/AvatarSelector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'

@connect(
    state => state.user,
    { update }
)
class BossInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            title: '',
            company: '',
            salary: '',
            request: '',
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
                <NavBar mode="dark">Boss完善信息页</NavBar>
                <AvatarSelector
                    selectAvatar={this.selectAvatar}
                />
                <List>
                    <InputItem onChange={e => this.handleChange('title', e)}
                    >招聘职位</InputItem>
                    <InputItem onChange={e => this.handleChange('company', e)}
                    >公司名称</InputItem>
                    <InputItem onChange={e => this.handleChange('salary', e)}
                    >职位薪资</InputItem>
                    <TextareaItem
                        title="职位要求"
                        autoHeight
                        labelNumber={5}
                        onChange={e => this.handleChange('request', e)}
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

export default BossInfo
