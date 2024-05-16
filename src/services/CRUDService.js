import { raw } from 'body-parser';
import db from '../models/index'
import bcrypt from 'bcryptjs';


const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassFromBc = await hashUserPassword(data.password);
            await db.User.create({
                ho: data.ho,
                ten: data.ten,
                email: data.email,
                matKhau: hashPassFromBc,
                diaChi: data.diaChi,
                gioiTinh: data.gioiTinh,
                vaiTroID: data.roldID,
            })
            resolve('Succeed')
        } catch (e) {
            reject(e);
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (e) {
            resolve(e)
        }
    })
}
let getAllAcount = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}
let getUserById = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userid },
                raw: true,
            })
            if (user) {
                resolve(user)
            } else {
                resolve([])
            }
        } catch (error) {
            reject(error)
        }
    })
}
let upDate = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.ho = data.ho;
                user.ten = data.ten;
                user.diaChi = data.diaChi;
                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers)
            }
            else {
                resolve("Nothing change")
            }
            // await db.data.upDate
        } catch (error) {
            reject(error)
        }
    })
}

let deleteById = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userid } // gan value cua userid cho id 
            })
            if (user) {
                await user.destroy();
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllAcount: getAllAcount,
    getUserById: getUserById,
    upDate: upDate,
    deleteById: deleteById,
}