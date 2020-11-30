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
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
            >
                <button onClick={() => console.log(navList, this.props.history.location, this.props.history)}>xxxx</button>
                {
                    navList.map(v => (
                        <h2>{v.path}{v.icon}</h2>
                        // <TabBar.Item
                        //     key={v.path}
                        //     title={v.title}
                        //     icon={{ uri: require('./img/boss-active.png') }}
                        //     selectedIcon={{ uri: require(`./img/boss-active.png`) }}
                        //     selected={pathname === v.path}
                        //     onPress={() => {
                        //         this.props.history.push(v.path)
                        //     }}
                        // >
                        // </TabBar.Item>
                    ))
                }
                {/* <TabBar.Item
                    title="Life"
                    key="Life"
                    icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                    }}
                    />
                    }
                    selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                    }}
                    />
                    }
                    selected={this.state.selectedTab === 'blueTab'}
                    badge={1}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'blueTab',
                        });
                    }}
                    data-seed="logId"
                >
                </TabBar.Item> */}

            </TabBar>
        )
    }
}

export default NavLinkBar
