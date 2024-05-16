import { Model, where } from 'sequelize'
import db from '../models/index'
import { Where } from 'sequelize/lib/utils'
import { raw } from 'body-parser'
require('dotenv').config();
import _ from 'lodash';
import user from '../models/user';
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';



let postBookAppointmentService = (inputID) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputID.email || !inputID.giaoVienID
                || !inputID.timeType || !inputID.date
                // || !inputID.address
                // || !inputID.selectedGender || !inputID.fullname
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter from postPatient'
                })
            } else {

                let token = uuidv4();
                await emailService.SendSimpleEmailByService({
                    reciverGmail: inputID.email,
                    tenBenhNhan: inputID.fullname,
                    thoiGian: inputID.timeString,
                    tenBacSi: inputID.doctorName,
                    language: inputID.language,
                    linkConfirm: buildLinkEmail(inputID.giaoVienID, token)
                })

                let user = await db.User.findOrCreate({
                    where: { email: inputID.email },
                    defaults: {
                        email: inputID.email,
                        vaiTroID: 'R3',
                        gioiTinh: inputID.selectedGender,
                        diaChi: inputID.address,
                        ten: inputID.fullname,
                    }
                });
                console.log("Check user from post", user[0])
                if (user && user[0]) {
                    await db.DatLich.findOrCreate({
                        where: { benhNhanID: user[0].id },
                        defaults: {
                            trangThaiID: 'S1',
                            giaoVienID: inputID.giaoVienID,
                            benhNhanID: user[0].id,
                            date: inputID.date,
                            timeType: inputID.timeType,
                            token: token
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: "Tạo người dùng thành công!"
                }
                )
            }

        } catch (error) {
            reject(error)
        }
    })
}

let buildLinkEmail = (giaoVienID, token) => {
    // let id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    let result = `${process.env.URL_REACT}/confirm-booked?token=${token}&giaoVienID=${giaoVienID}`
    return result
}

let postConfirmBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.giaoVienID || !data.token) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter form post Confirm Seriver Book'
                })
            } else {
                let appointment = await db.DatLich.findOne({
                    where: {
                        trangThaiID: 'S1',
                        giaoVienID: data.giaoVienID,
                        token: data.token
                    },
                    raw: false
                })
                console.log("chek appointment", appointment)
                if (appointment) {
                    appointment.trangThaiID = 'S2';
                    await appointment.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'Save Succeed form Service'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Save falied form Service'
                    })
                }
            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    postBookAppointmentService: postBookAppointmentService,
    postConfirmBookAppointmentService: postConfirmBookAppointmentService
}