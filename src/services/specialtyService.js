import { Model, where } from 'sequelize'
import db from '../models/index'
import { Where } from 'sequelize/lib/utils'
import { raw } from 'body-parser'
require('dotenv').config();
import _ from 'lodash';

let postSpecialtyService = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.name || !inputData.descriptionHTML || !inputData.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter from postSpecialty'
                })
            } else {
                await db.ChuyenKhoa.create({
                    tenChuyenKhoa: inputData.name,
                    hinhAnh: inputData.imageBase64,
                    mieuTaHTML: inputData.descriptionHTML,
                    mieuTaMarkdown: inputData.descriptionMarkdown,
                })
            }
            resolve({
                errCode: 0,
                errMessage: "Tạo Thêm Chuyên Khoa Thành công!"
            }
            )
        } catch (error) {
            reject(error)
        }
    })
}
let getAllSpecialtyService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = await db.ChuyenKhoa.findAll();
            if (specialty && specialty.length > 0) {
                // console.log("Check specialty", specialty)
                specialty.map(item => {
                    item.hinhAnh = new Buffer(item.hinhAnh, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'Oke',
                specialty
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getDetailSpecialtyByIDService = (inputID, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputID || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter from get Detail Specialty'
                })
            } else {

                let data = await db.ChuyenKhoa.findOne({
                    where: {
                        id: inputID
                    },
                    attributes: ['id', 'mieuTaHTML', 'mieuTaMarkdown']
                })

                if (data) {
                    let doctorsSpecialty = [];
                    if (location === 'ALL') {
                        doctorsSpecialty = await db.teacher_Infor.findAll({
                            where: {
                                chuyenKhoaID: inputID
                            },
                            attributes: ['giaoVienID', 'provinceID']
                        })
                    } else {
                        doctorsSpecialty = await db.teacher_Infor.findAll({
                            where: {
                                chuyenKhoaID: inputID,
                                provinceID: location

                            },
                            attributes: ['giaoVienID', 'provinceID']
                        })
                    }

                    data.doctorsSpecialty = doctorsSpecialty;
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
    postSpecialtyService: postSpecialtyService,
    getAllSpecialtyService: getAllSpecialtyService,
    getDetailSpecialtyByIDService: getDetailSpecialtyByIDService

}