const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cron = require('node-cron')

const Account = require('../models/Account');
const sendEmail = require('../utils/sendEmail');

function httpres500(){
    console.error(`Error resseting password:`, error);
    res.status(500).json({ success: false, error: 'Internal server error'})
}

const signUp = async (req, res) => {
    try {
        const { numberPhone, password, nameOfUser, email } = req.body;
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);
        const newAccount = new Account({
            numberPhone,
            password: hashedPassword,
            nameOfUser,
            email
        })
        await newAccount.save();
        res.status(201).json({message: `Account created successfully`, account: newAccount});

    } catch (error) {
        res.status(500).json({message: 'Error creating account ', error})
    }
}

const signIn = async (req, res) => {
    try {
        const {numberPhone, password} = req.body;

        const findNumberPhone = await Account.findOne({ numberPhone });
        if (!findNumberPhone){
            return res.status(404).send('Số điện thoại của bạn không tồn tại');
        }

        const isMatch = await bcrypt.compare(password, findNumberPhone.password);
        if (!isMatch){
            return res.status(400).send('Mật khẩu không chính xác');
        }

        const token = jwt.sign({id: findNumberPhone._id}, 'your_jwt_secret_key', { expiresIn: '1h'});
        res.status(200).json({token})
        
    } catch (error){
        httpres500(500);
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        
        const isMatchEmail = await Account.findOne({ email });
        if (!isMatchEmail){
            return res.status(404).send('Email của bạn không tồn tại');
        }

        const token = jwt.sign({id: isMatchEmail._id}, 'your_jwt_secret_key', { expiresIn: '1h'});
        const resetLink = `http://localhost:3000/resetYourPassword?token=${token}`;

        isMatchEmail.resetToken = token;
        isMatchEmail.resetTokenExpiration = Date.now() + 3600000;
        await isMatchEmail.save();
        
        await sendEmail({
            to: email,
            subject: 'Tạo lại mật khẩu mới',
            text: `Vui lòng nhấn vào đường link này để tạo lại mật khẩu mới: ${resetLink}`,
            message: `<p>Vui lòng nhấn vào đường link:</p><a href="${resetLink}">${resetLink}</a>`,
        })

        res.status(200).json({success: true, message: 'Email đã gửi thành công'})

    } catch (error) {
        httpres500();
    }
}

const resetYourPassword = async (req, res, next) => {
    try {
        const { newPassword } = req.body;
        const token = req.query.token;

        if (!token){
            return res.status(400).json({success: false}, {message: 'Token không được cung cấp'})
        }

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
        }

        const decodedToken = jwt.verify(token, 'your_jwt_secret_key');

        const account = await Account.findOne({ 
            _id: decodedToken.id,
            resetToken: token,  
            resetTokenExpiration: { $gt: Date.now() }
        });

        if (!account){
            return res.status(404).send('Tài khoản bạn có token không khớp hoặc hết hạn');
        }

        const newHashedPassword = bcrypt.hashSync(newPassword, 10);

        account.password = newHashedPassword;
        account.resetToken = undefined;
        account.resetTokenExpiration = undefined;
        await account.save();

        res.status(200).json({ success: true, message: `Mật khẩu đã được cập nhật thành công`});

        
    } catch (error) {
        console.error(`Error resseting password:`, error);
        res.status(500).json({ success: false, error: 'Internal server error'})
    }

}

// Soft delete
const deleteAccount = async (req, res, next) => {
    try {
        const { numberPhone } = req.body;
        const isMatchNumberPhone = await Account.findOne({ numberPhone });
        if (!isMatchNumberPhone){
            return res.status(404).send('NumberPhone của bạn không tồn tại hoặc bị sai');
        }

        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 1);

        isMatchNumberPhone.deleteAt = currentDate.getTime();
        isMatchNumberPhone.status = false;

        await isMatchNumberPhone.save();
        
        res.status(200).json({
            success: true,
            message: `Tài khoản của bạn đã được lịch xóa vào: ${currentDate}, status: ${isMatchNumberPhone.status}`,
        })


    } catch (error) {
        console.error(`Error resseting password:`, error);
        res.status(500).json({ success: false, error: 'Internal server error'})
    }
}

const deleteAccountHard = async (req, res, next) => {
    try {
        const currentDate = Date.now();
        const result = await Account.deleteMany({deleteAt: { $lte: currentDate }});
        console.log(`Account ${result.deletedCount} was expired`)
    } catch (error) {
        console.error(`Error resseting password:`, error);
        res.status(500).json({ success: false, error: 'Internal server error'})
    }
}

const updateAccount = async (req, res, next ) => {
    try {
        const { newPassword, nameOfUser, numberPhone } = req.body;
        const account = await Account.findOne({ numberPhone });

        if (nameOfUser === account.nameOfUser){
            res.status(400).json({
                success: false,
                message: `Tên tài khoản không được trùng tên tài khoản trước đó`
            })
        }

        const isMatch = await bcrypt.compare(newPassword, account.password);
        if (isMatch) {
            return res.status(400).send(`Mật khẩu không được trùng mật khẩu trước đó`);
        }

        account.nameOfUser = nameOfUser;
        account.password = newPassword;
        await account.save();

        res.status(200).json({
            success: true,
            message: `Tài khoản của bạn đã thay đổi: nameOfUser: ${nameOfUser}`
        })

    } catch (error) {
        httpres500();
    }    
}

// Node-cron
cron.schedule('0 0 * * *', () => {
    console.log('Check and delete expired accounts..');
    deleteAccountHard();
}, {
    scheduled: true,
    timezone: "Asia/Ho_Chi_Minh"
});

module.exports = { signUp, signIn, forgotPassword, resetYourPassword, deleteAccount, deleteAccountHard, updateAccount }
