const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
    {
        numberPhone: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },

        nameOfUser: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            /*
                Đánh dấu role người dùng qua con số 1,2,3
                1 là admin
                2 là nhân viên
                3 là client
            */
            enum: [1,2,3],
            required: true,
            default: 3,
        },
        
        // Trạng thái có thể hiểu ở đây là tài khoản còn tồn tại hay đã xóa mềm chưa 
        status: {
            type: Boolean,
            require: true,
            default: true,
        },

        createAt: {
            type: Date,
            default: () => new Date(),
        },

        deleteAt: {
            type: Date,
            default: null,
        },

        // Update token để khi có thay đổi trong tài khoản

        resetToken: {
            type: String
        },

        resetTokenExpiration: {
            type: Date
        }
    }
)

const Account = mongoose.model('Account', Schema);
module.exports =  Account;