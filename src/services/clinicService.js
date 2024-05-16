import { Model, where } from 'sequelize'
import db from '../models/index'
import { Where } from 'sequelize/lib/utils'
import { raw } from 'body-parser'
require('dotenv').config();
import _ from 'lodash';

let postClinicService = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.name || !inputData.address) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter from postSpecialty'
                })
            } else {
                await db.PhongKham.create({
                    tenPhongKham: inputData.name,
                    hinhAnh: inputData.imageBase64,
                    diaChi: inputData.address,
                    mieuTaHTML: inputData.descriptionHTML,
                    mieuTaMarkdown: inputData.descriptionMarkdown,
                })

            }
            resolve({
                errCode: 0,
                errMessage: "Tạo Thêm Phòng Khám Thành công!"
            }
            )
        } catch (error) {
            reject(error)
        }
    })
}
let getAllClinicService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.PhongKham.findAll();
            if (data && data.length > 0) {
                // console.log("Check specialty", specialty)
                data.map(item => {
                    item.hinhAnh = new Buffer(item.hinhAnh, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'Oke',
                data
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getDetailClinicByIDService = (inputID) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputID) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter from get Detail Clinic'
                })
            } else {

                let data = await db.PhongKham.findOne({
                    where: {
                        id: inputID
                    },
                    attributes: ['id', 'tenPhongKham', 'diaChi', 'mieuTaHTML', 'mieuTaMarkdown']
                })

                if (data) {
                    let clinic = [];
                    clinic = await db.teacher_Infor.findAll({
                        where: {
                            phongKhamID: inputID
                        },
                        attributes: ['giaoVienID']
                    })
                    data.clinic = clinic;
                } else {
                    data = {}
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Oke',
                    data
                })

            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    postClinicService: postClinicService,
    getAllClinicService: getAllClinicService,
    getDetailClinicByIDService: getDetailClinicByIDService

}