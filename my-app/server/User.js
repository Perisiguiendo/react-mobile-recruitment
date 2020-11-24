const express = require('express')
const utility = require('utility')

const model = require('./model')
const Router = express.Router()
const User = model.getModel('user')
const _filter = { 'pwd': 0, '__v': 0 }

Router.get('/info', function (req, res) {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  }

  User.findOne({ _id: userid }, _filter, function (err, doc) {
    if (err) {
      return res.json({ code: 1, msg: '后端出错了' });
    }
    if (doc) {
      return res.json({ code: 0, data: doc })
    }
  })
})

Router.get('/list', function (req, res) {
  // User.remove({}, function (err, doc) { })
  User.find({}, function (err, doc) {
    return res.json(doc)
  })
})

Router.post('/register', function (req, res) {
  const { user, pwd, type } = req.body;
  console.log(user, pwd, type);
  User.findOne({ user: user }, function (err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复' })
    }
    const userModel = new User({ user, pwd: md5Pwd(pwd), type })
    userModel.save(function (err, doc) {
      if (err) {
        return res.json({ code: 1, msg: '后端出错了' })
      }
      const { user, type, _id } = doc;
      res.cookie('userid', _id);
      return res.json({ code: 0, data: { user, type, _id } })
    })
  })
})

Router.post('/login', function (req, res) {
  const { user, pwd } = req.body;
  User.findOne({ user: user, pwd: md5Pwd(pwd) }, _filter, function (err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名不存在或密码错误' })
    }
    res.cookie('userid', doc._id);
    return res.json({ code: 0, data: doc })
  })
})



function md5Pwd(pwd) {
  const salt = 'imooc_is_good_768r@57$48&9~~';
  return utility.md5(utility.md5(pwd + salt));
}

module.exports = Router