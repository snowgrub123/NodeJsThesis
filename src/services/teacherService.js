import { Model, where } from 'sequelize'
import db from '../models/index'
import { Where } from 'sequelize/lib/utils'
import { raw } from 'body-parser'
require('dotenv').config();
import _ from 'lodash';
import emailService from '../services/emailService';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
let getTopTeacherHomeService = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { vaiTroID: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['matKhau']
                },
                include: [
                    { model: db.allCodes, as: 'positionData', attributes: ['value_vi', 'value_en'] },
                    { model: db.allCodes, as: 'genderData', attributes: ['value_vi', 'value_en'] },
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getAllTeacherServive = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let teachers = await db.User.findAll({
                Where: { vaiTroID: 'R2' },
                attributes: {
                    exclude: ['matKhau', 'avatar']
                },
            })
            resolve({
                errCode: 0,
                data: teachers
            })
        } catch (error) {
            reject(error)
        }
    })
}

let checkRequiredFields = (inputData) => {
    let array = ['giaoVienID',
        'contentHTML',
        'contentMarkdown',
        'action',
        'selectedPrice',
        'selectedPayMent',
        'nameCentral',
        'addressCentral',
        'note',
        'selectedProvince',
        'specialtyID']
    let isValid = true;
    let element = '';
    for (let i = 0; i < array.length; i++) {
        if (!inputData[array[i]]) {
            isValid = false;
            element = array[i]
            break;
        }
    }
    return {
        isValid: isValid,
        element: element
    }
}

let saveInforTeacherService = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = checkRequiredFields(inputData);
            if (check.isValid === false) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing parameter:${check.element}`
                })
            } else {
                if (inputData.action === 'CREATE') {
                    await db.markdowns.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        moTa: inputData.moTa,
                        giaoVienID: inputData.giaoVienID,
                    })
                } else if (inputData.action === 'EDIT') {
                    let teacherMarkdown = await db.markdowns.findOne({
                        where: { giaoVienID: inputData.giaoVienID },
                        raw: false
                    })
                    if (teacherMarkdown) {
                        teacherMarkdown.contentHTML = inputData.contentHTML;
                        teacherMarkdown.contentMarkdown = inputData.contentMarkdown;
                        teacherMarkdown.moTa = inputData.moTa;
                        // teacherMarkdown.giaoVienID = inputData.giaoVienID,
                        // teacherMarkdown.updateAt = new Date();
                        await teacherMarkdown.save();
                    }
                }

                // find user Teacher
                let TeacherInfor = await db.teacher_Infor.findOne({
                    where: {
                        giaoVienID: inputData.giaoVienID,
                    },
                    raw: false
                })
                if (TeacherInfor) {
                    TeacherInfor.giaoVienID = inputData.giaoVienID;
                    TeacherInfor.priceID = inputData.selectedPrice;
                    TeacherInfor.provinceID = inputData.selectedProvince;
                    TeacherInfor.paymentID = inputData.selectedPayMent;
                    TeacherInfor.nameCentral = inputData.nameCentral;
                    TeacherInfor.addressCentral = inputData.addressCentral;
                    TeacherInfor.note = inputData.note;
                    TeacherInfor.chuyenKhoaID = inputData.specialtyID;
                    TeacherInfor.phongKhamID = inputData.clinicID;

                    await TeacherInfor.save()
                    console.log("Teacher info", TeacherInfor)
                } else {
                    await db.teacher_Infor.create({
                        giaoVienID: inputData.giaoVienID,
                        priceID: inputData.selectedPrice,
                        provinceID: inputData.selectedProvince,
                        paymentID: inputData.selectedPayMent,
                        nameCentral: inputData.nameCentral,
                        addressCentral: inputData.addressCentral,
                        note: inputData.note,
                        chuyenKhoaID: inputData.specialtyID,
                        phongKhamID: inputData.clinicID,
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'save info teacher succeed!'
                }
                )
            }

        } catch (error) {
            reject(error)
        }
    })
}
let getDetailTeacherByIDService = (inputID) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputID) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter from getTeacher'
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: inputID },
                    attributes: { exclude: ['matKhau'] },
                    include: [
                        {
                            model: db.markdowns,
                            attributes: ['moTa', 'contentHTML', 'contentMarkdown']
                        },
                        { model: db.allCodes, as: 'positionData', attributes: ['value_vi', 'value_en'] },

                        {
                            model: db.teacher_Infor,
                            attributes: {
                                exclude: ['id', 'giaoVienID']
                            },
                            include: [
                                { model: db.allCodes, as: 'priceTypeData', attributes: ['value_vi', 'value_en'] },
                                { model: db.allCodes, as: 'provinceTypeData', attributes: ['value_vi', 'value_en'] },
                                { model: db.allCodes, as: 'paymentTypeData', attributes: ['value_vi', 'value_en'] },
                            ]
                        },
                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.avatar) {
                    data.avatar = new Buffer(data.avatar, 'base64').toString('binary');
                }
                if (!data) data = {}
                resolve({
                    errCode: 0,
                    data: data
                }
                )
            }

        } catch (error) {
            reject(error)
        }
    })
}
let bulkCreateScheduleService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.giaoVienID || !data.FormatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing"
                })
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                // console.log("schedule", schedule)
                // console.log("data of check", data)

                let exsisting = await db.schedules.findAll({
                    where: { giaoVienID: data.giaoVienID, date: data.FormatedDate },
                    attributes: ['giaoVienID', 'date', 'timeType', 'maxNumber'],
                    raw: true
                });

                // chuyen doi date
                // if (exsisting && exsisting.length > 0) {
                //     exsisting = exsisting.map(item => {
                //         item.date = new Date(item.date).getTime();
                //         return item;
                //     })
                // }
                // console.log("check exsisting", exsisting)


                //so sanh
                // let toCreate = _.differenceBy(schedule, exsisting, ['timeType', 'date']);

                let toCreate = _.differenceWith(schedule, exsisting, (a, b) => {
                    // console.log("11111", schedule)
                    // console.log("22222", exsisting)
                    // console.log("time1", a)
                    // console.log("time2", b)
                    return a.timeType === b.timeType && +a.date === +b.date
                });
                // console.log("checkkkkkkkkkkkk", toCreate)

                if (toCreate && toCreate.length > 0) {
                    await db.schedules.bulkCreate(toCreate);
                }
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }

        } catch (error) {
            reject(error)
        }
    })

}

let getScheduleTeacherByDateService = (teacherID, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!teacherID || !date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters from Teacher by date"
                })
            } else {
                let dataScheduleByDate = await db.schedules.findAll({
                    where: {
                        giaoVienID: teacherID,
                        date: date
                    },
                    include: [
                        { model: db.allCodes, as: 'timeTypeData', attributes: ['value_vi', 'value_en'] },
                        { model: db.User, as: 'doctorData', attributes: ['ho', 'ten'] },

                    ],
                    raw: true,
                    nest: true
                })
                if (!dataScheduleByDate)
                    dataScheduleByDate = [];
                resolve({
                    errCode: 0,
                    data: dataScheduleByDate
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}


let getExtraInforTeacherByService = (inputID) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputID) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter from getTeacher'
                })
            } else {
                let data = await db.teacher_Infor.findOne({
                    where: { giaoVienID: inputID },
                    attributes: { exclude: ['id', 'giaoVienID'] },
                    include: [
                        { model: db.allCodes, as: 'priceTypeData', attributes: ['value_vi', 'value_en'] },
                        { model: db.allCodes, as: 'provinceTypeData', attributes: ['value_vi', 'value_en'] },
                        { model: db.allCodes, as: 'paymentTypeData', attributes: ['value_vi', 'value_en'] },
                    ],
                    raw: false,
                    nest: true
                })
                if (!data) data = {}
                resolve({
                    errCode: 0,
                    data: data
                }
                )
            }

        } catch (error) {
            reject(error)
        }
    })
}
// getProfileTeacherByService
let getProfileTeacherByService = (inputID) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputID) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter from getTeacher'
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: inputID },
                    attributes: { exclude: ['matKhau'] },
                    include: [
                        {
                            model: db.markdowns,
                            attributes: ['moTa', 'contentHTML', 'contentMarkdown']
                        },
                        { model: db.allCodes, as: 'positionData', attributes: ['value_vi', 'value_en'] },

                        {
                            model: db.teacher_Infor,
                            attributes: {
                                exclude: ['id', 'giaoVienID']
                            },
                            include: [
                                { model: db.allCodes, as: 'priceTypeData', attributes: ['value_vi', 'value_en'] },
                                { model: db.allCodes, as: 'provinceTypeData', attributes: ['value_vi', 'value_en'] },
                                { model: db.allCodes, as: 'paymentTypeData', attributes: ['value_vi', 'value_en'] },
                            ]
                        },
                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.avatar) {
                    data.avatar = new Buffer(data.avatar, 'base64').toString('binary');
                }
                if (!data) data = {}
                resolve({
                    errCode: 0,
                    data: data
                }
                )
            }

        } catch (error) {
            reject(error)
        }
    })
}

let getListPatientByService = (inputID, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputID || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter from getPatientBooked'
                })
            } else {
                let data = await db.DatLich.findAll({
                    where: {
                        giaoVienID: inputID,
                        date: date,
                        trangThaiID: 'S2'
                    },
                    include: [
                        {
                            model: db.User, as: 'benhNhanData',
                            attributes: ['email', 'ten', 'diaChi', 'gioiTinh'],
                            include: [
                                { model: db.allCodes, as: 'genderData', attributes: ['value_vi', 'value_en'] }
                            ]
                        },
                        { model: db.allCodes, as: 'timeTypeDataPatient', attributes: ['value_vi', 'value_en'] }
                    ],

                    raw: false,
                    nest: true
                })

                resolve({
                    errCode: 0,
                    data: data
                }
                )
            }

        } catch (error) {
            reject(error)
        }
    })
}
let postSendBillFromService = (data) => {
    return new Promise(async (resovle, reject) => {
        try {
            if (!data.email || !data.giaoVienID
                || !data.benhNhanID || !data.timeType) {

                resovle({
                    errCode: 1,
                    errMessage: "Missing parameter of post SendBill"
                })
            } else {
                let appointment = await db.DatLich.findOne({
                    where: {
                        giaoVienID: data.giaoVienID,
                        benhNhanID: data.benhNhanID,
                        timeType: data.timeType,
                        trangThaiID: 'S2'
                    },
                    raw: false

                })
                if (appointment) {
                    appointment.trangThaiID = 'S3';
                    // appointment.contentMarkdown = data.contentMarkdown;
                    // appointment.moTa = data.moTa;
                    await appointment.save();
                }

                // console.log('check server', data)
                await emailService.postBillToEmail(data)
                resovle({
                    errCode: 0,
                    // data: data
                    errMessage: 'Oke fine'
                })
            }


            resovle({
                errCode: 0,
                errMessage: 'Succeed'
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getTopTeacherHomeService: getTopTeacherHomeService,
    getAllTeacherServive: getAllTeacherServive,
    saveInforTeacherService: saveInforTeacherService,
    getDetailTeacherByIDService: getDetailTeacherByIDService,
    bulkCreateScheduleService: bulkCreateScheduleService,
    getScheduleTeacherByDateService: getScheduleTeacherByDateService,
    getExtraInforTeacherByService: getExtraInforTeacherByService,
    getProfileTeacherByService: getProfileTeacherByService,
    getListPatientByService: getListPatientByService,
    postSendBillFromService: postSendBillFromService
}