import axios from "axios";
import { getRedirectPath } from '../utils'

const ERROR_MSG = 'ERROR_MSG';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
  redirectTo: '',  // 用户要跳转页面
  msg: '', // 
  user: '', // 用户名
  type: '', // 类型
}

// reducer
export const user = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.data };
    case LOAD_DATA:
      return { ...state, ...action.payload, redirectTo: getRedirectPath(action.payload) };
    case ERROR_MSG:
      return { ...state, msg: action.msg };
    default:
      return state;
  }
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
}

function authSuccess(obj) {
  const { pwd, ...data } = obj;
  return { type: AUTH_SUCCESS, payload: data }
}

export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo }
}

export function register({ user, pwd, repeatpwd, type }) {
  console.log({ user, pwd, repeatpwd, type });
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('两次输入的密码不相同，请重新输入')
  }
  return dispatch => {
    axios.post('/user/register', { user, pwd, type })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess({ user, pwd, type }))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('用户名和密码必须输入');
  }
  return dispatch => {
    axios.post('/user/login', { user, pwd })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function update(data) {
  console.log(data);
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}