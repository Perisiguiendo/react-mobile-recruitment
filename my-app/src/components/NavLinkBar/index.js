import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import propTypes from 'prop-types'
import { withRouter } from 'react-router-dom';


@withRouter
class NavLinkBar extends Component {
    static propTypes = {
        data: propTypes.array.isRequired
    }

    constructor(props) {
        super(props);
    }
    
    render() {
        const navList = this.props.data.filter(v => !v.hide);
        const { pathname } = this.props.location;
        return (
            <div>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    tabBarPosition='bottom'
                >
                    {
                        navList.map(v => (
                            <TabBar.Item
                                key={v.path}
                                title={v.title}
                                icon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                                }}
                                />}
                                selectedIcon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                                }}
                                />}
                                selected={pathname === v.path}
                                onPress={() => {
                                    this.props.history.push(v.path)
                                }}
                            >
                            </TabBar.Item>
                        ))
                    }
                </TabBar>
            </div>
        )
    }
}

export default NavLinkBar
