const randomstring = require('randomstring')
const joi = require('joi')
const cron = require('node-cron')

const Bill = require('../models/Bill')

const createBill = async (req, res, next) => {
    try {
        const { sumOfBill, description, numberPhone, discount } = req.body;

        // codeBill has 10 length
        const codeBill = randomstring.generate({
            length: 10,
            charset: 'numeric',
        })

        console.log(codeBill)

        const newBill = new Bill({
            codeBill,
            sumOfBill,
            description,
            numberPhone,
            discount
        })

        await newBill.save();
        res.status(201).json({message: `Bill đã tạo được thành công`,bill: newBill},)
    } catch (error) {
        console.error(`Error resseting password:`, error);
        res.status(500).json({ success: false, error: 'Internal server error'})
    }
}

const getBill = async (req, res, next) => {
    try {
        const { numberPhone } = req.params;

        const findBill = await Bill.find({ numberPhone: numberPhone});

        if(!findBill){
            res.status(404).json({message: `Không tìm thấy bất kì hóa đơn có số điện thoại: ${numberPhone}`});
        }

        res.status(200).json({message: `Hóa đơn có số điện thoại ${req.params.numberPhone}`,bill: findBill})
    } catch (error) {
        console.error(`Error resseting password:`, error);
        res.status(500).json({ success: false, error: 'Internal server error'})
    }
}

const deleteBill = async (req, res, next) => {
    try {
        const { codeBill } = req.query;

        const findBill = await Bill.findOne({ codeBill: codeBill});

        if(!findBill){
            res.status(404).json({message: `Không tìm thấy bất kì hóa đơn có số điện thoại: ${numberPhone}`});
        }

        const currentTime = Date().now;
        const threeHours = 3 * 60 * 60 / 1000;
        if (currentTime - findBill.createAt > threeHours){
            res.status(400).json({message: `Hóa đơn quá 3 tiếng không thể hủy`})
        }

        findBill.deleteAt =  new Date();
        findBill.status = false;

        await findBill.save();

        res.status(200).json({ message: `Hóa đơn mã ${findBill.codeBill} sẽ lên lịch hủy vào ${findBill.deleteAt}`})
    } catch (error) {
        console.error(`Error resseting password:`, error);
        res.status(500).json({ success: false, error: 'Internal server error'})
    }
}

const deleteHard = async (req, res, next) => {
    try {
        const currentDate = Date.now();
        const result = await Bill.deleteMany({deleteAt: { $lte: currentDate }});
        res.status(200).json({message: `Bill ${result.deletedCount} was expired`})
    } catch (error) {
        console.error(`Error resseting password:`, error);
        res.status(500).json({ success: false, error: 'Internal server error'})
    }
}


cron.schedule('0 0 * * *', () => {
    console.log('Check and delete expired accounts..');
    deleteAccountHard();
}, {
    scheduled: true,
    timezone: "Asia/Ho_Chi_Minh"
});

module.exports = { createBill, getBill, deleteBill, deleteHard };
