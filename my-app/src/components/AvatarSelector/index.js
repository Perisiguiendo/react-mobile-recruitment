import React, { Component } from 'react'
import { List, Grid } from 'antd-mobile'

const data = Array.from(new Array(11)).map((_val, i) => ({
    icon: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    text: `name${i}`,
}));

class AvatarSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            file: '',
        }
    }

    render() {
        const { url } = this.state;

        const select = url ?
            (<div style={{ height: 80, display: 'flex', alignItems: 'center', marginLeft: 10 }}>
                <div>已选择头像</div>
                <img style={{ width: 40, height: 50, marginLeft: 10 }} src={url} alt="profile" />
            </div>)
            :
            (<div style={{ height: 80, display: 'flex', alignItems: 'center', marginLeft: 10 }}>请选择头像</div>)
        return (
            <div>
                <List renderHeader={() => select}>
                    <Grid
                        data={data}
                        activeStyle={false}
                        columnNum={4}
                        onClick={ele => {
                            this.props.selectAvatar(ele.text)
                            this.setState({
                                url: ele.icon
                            })
                        }}
                    />
                </List>

            </div>
        )
    }
}

export default AvatarSelector
