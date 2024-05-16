const { Model } = require('sequelize')
import nodemailer from 'nodemailer'
// const nodemailer = require("nodemailer");
require('dotenv').config()

let SendSimpleEmailByService = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        from: '"Khang 👻" <baokhangdang712@gmail.com>', // sender address
        to: dataSend.reciverGmail, // list of receivers
        subject: "Thông Tin Đặt Lịch Khám Bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend)
    });


}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `
        <h2>Dear ${dataSend.tenBenhNhan}</h2>
        <p>You Have Booked Your Medical Examination Schedule On Hospital Booking</p>
        <p>Information Placed on the Website</p>
        <div><b>Name's Doctor:${dataSend.tenBacSi}</b></div>
        <div><b>Time:${dataSend.thoiGian}</b></div>
       
        <p>Please review the Examination Schedule and Confirmation information with us by clicking on the link below!</p>
       
       <div>
       <a href=${dataSend.linkConfirm} target="_blank">Accept</a>
       </div>

       <div>Thank you for using the service !</div>
       <div>Goodbye and wish you good health!</div>


        `
    }

    if (dataSend.language === 'en') {
        result = `
        <h2>Xin Chào ${dataSend.tenBenhNhan}</h2>
        <p>Bạn Đã Đặt Lịch Khám Bệnh Trên Hospital Booking</p>
        <p>Thông Tin Đã Đặt Trên Website</p>
        <div><b>Tên Bác Sĩ:${dataSend.tenBacSi}</b></div>
        <div><b>Thời gian:${dataSend.thoiGian}</b></div>
       
        <p>Hãy xem lại thông tin của Lịch Khám và Xác Nhận với chúng tôi bằng cách click vào link bên dưới!</p>
       
       <div>
       <a href=${dataSend.linkConfirm} target="_blank">Xác Nhận</a>
       </div>

       <div>Cảm ơn bạn đã sử dụng dịch vụ !</div>
       <div>Tạm biệt và chúc quý khách có thật nhiều sức khỏe!</div>


        `
    }

    return result;
}

let getBodyHTMLEmailBill = (dataSend) => {
    let result = ''
    if (dataSend.language === 'en') {
        result = `
        <h2>Dear ${dataSend.patientName}</h2>
        <p>You have Booked succeed Hospital Booking</p>
        <p>Information Placed on the Website</p>
        <p>Please check detail information in attach file below!</p>
        `
    }

    if (dataSend.language === 'vi') {
        result = `
        <h2>Xin Chào ${dataSend.patientName}</h2>
        <p>Bạn Đã Thành Công Đặt Lịch Hospital Booking</p>
        <p>Thông Tin Đã Đặt Trên Website</p>
        <p>Thông tin chi tiết ở trong file đính kèm </p>
        `
    }
    return result

}

let postBillToEmail = async (dataSend) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        from: '"Khang 👻" <baokhangdang712@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Thông Tin Đặt Lịch Khám Bệnh", // Subject line
        html: getBodyHTMLEmailBill(dataSend),

        attachments: [
            {
                filename: `${dataSend.benhNhanID}-${new Date().getTime()}}.png`,
                content: dataSend.imgBase64.split("base64")[1],
                encoding: 'base64'
            },

        ],
    });
}

module.exports = {
    SendSimpleEmailByService: SendSimpleEmailByService,
    postBillToEmail: postBillToEmail
}