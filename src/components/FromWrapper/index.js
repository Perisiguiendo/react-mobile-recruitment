import React, { Component } from 'react'

export default function FormWrapper(Cpn) {
    return class CpnWrapper extends Component {

        constructor(props) {
            super(props);
            this.state = {};
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange(key, val) {
            console.log('key:', key, 'val:', val);
            this.setState({
                [key]: val.trim(),
            })
        }

        render() {
            return <Cpn handleChange={this.handleChange} state={this.state} {...this.props}></Cpn>
        }
    }
}