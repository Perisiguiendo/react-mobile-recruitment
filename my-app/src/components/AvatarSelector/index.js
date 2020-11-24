import React, { Component } from 'react'
import { ImagePicker, WingBlank } from 'antd-mobile'


const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];

export default class AvatarSelector extends Component {
    state = {
        files: data,
        multiple: false,
    }

    onChange = (files, type, index) => {
        this.setState({
            files,
        });
    }

    render() {
        const { files } = this.state;
        return (
            <div>
                <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 7}
                    multiple={this.state.multiple}
                />
            </div>
        )
    }
}
