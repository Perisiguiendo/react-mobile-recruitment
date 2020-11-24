import React, { Component } from 'react'
import { NavBar, List, InputItem, TextareaItem } from 'antd-mobile'
import AvatarSelector from '../../components/AvatarSelector'

export default class BossInfo extends Component {
    constructor(props) {
        super(props);

    }

    handleChange(key, val) {
        this.setState({
            [key]: val.trim(),
        })
    }

    render() {
        return (
            <div>
                <NavBar mode="dark">Boss完善信息页</NavBar>
                <AvatarSelector />
                <List>
                    <InputItem onChange={e => this.handleChange('title', e)}
                    >招聘职位</InputItem>
                    <InputItem onChange={e => this.handleChange('title', e)}
                    >公司名称</InputItem>
                    <InputItem onChange={e => this.handleChange('title', e)}
                    >职位薪资</InputItem>
                    <TextareaItem
                        title="职位要求"
                        autoHeight
                        labelNumber={5}
                    />


                </List>

            </div>
        )
    }
}
