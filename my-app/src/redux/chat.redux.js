import io from 'socket.io-client';
import axios from 'axios';

const socket = io('ws://localhost:9093');

// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
// 标识已读
const MSG_READ = 'MSG_READ';

const initState = {
    chatmsg: [],
    users: [],
    unread: 0
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return { ...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length };
        case MSG_READ:
            return {};
        case MSG_RECV:
            const increment = action.payload.to === action.userid ? 1 : 0;
            console.log(state);
            return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + increment };
        default:
            return { ...state };
    }
}

function msgList(msgs, users, userid) {
    console.log('MSG_LIST');
    return { type: MSG_LIST, payload: { msgs, users, userid } }
}

function msgRecv(data, userid) {
    return { userid, type: MSG_RECV, payload: data }
}

export function sendMsg({ from, to, msg }) {
    console.log('sendmsg');
    return dispatch => {
        socket.emit('sendmsg', { from, to, msg })
    }
}

export function recMsg() {
    return (dispatch, getState) => {
        socket.on('recmsg', function (data) {
            const userid = getState().user._id;
            dispatch(msgRecv(data, userid));
        })
    }
}

export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    const userid = getState().user._id;
                    dispatch(msgList(res.data.msgs, res.data.users, userid))
                }
            })
    }
}