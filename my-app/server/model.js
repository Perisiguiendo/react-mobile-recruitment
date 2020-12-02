const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/imooc-chat'
mongoose.connect(DB_URL)

const models = {
    user: {
        'user': { type: String, require: true },
        'pwd': { type: String, require: true },
        'type': { type: String, require: true },
        // 头像
        'avatar': { type: String },
        // 个人简介
        'introduction': { type: String },
        // 岗位
        'position': { type: String },
        // 公司
        'company': { type: String },
        // 工资
        'salary': { type: String },
        // 岗位要求
        'request': {type: String},
        // 
    },
    chat: {
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}