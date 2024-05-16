import { raw } from 'body-parser';
import db from '../models/index'
import bcrypt from 'bcryptjs';
import { where } from 'sequelize';
// import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email);
            if (isExist) {
                // user already exist
                //compare password
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['id', 'ho', 'ten', 'email', 'vaiTroID', 'matKhau'],
                    raw: true,
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.matKhau);
                    if (check) {
                        userData.err = 0;
                        userData.errMessage = 'Đăng nhập thành công!';
                        console.log(user)
                        delete user.matKhau;
                        userData.user = user;
                    } else {
                        userData.err = 3;
                        userData.errMessage = "Sai mật khẩu!";
                    }
                } else {
                    userData.err = 2;
                    userData.errMessage = "Không tìm thấy thông tin user!"
                }
            } else {
                userData.err = 1;
                userData.errMessage = "Email của bạn không tồn tại!"
            }
            resolve(userData)

        } catch (error) {
            reject(error)
        }
    })
}
let checkUserEmail = (UserEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: UserEmail }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId && userId === 'all') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['matKhau']
                    }
                })
            }
            if (userId && userId !== 'all') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['matKhau']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewUSer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: "Email đã tồn tại, Hãy Thử lại! "
                })
            } else {
                let hashPass = await hashUserPassword(data.matKhau);
                await db.User.create({
                    ho: data.ho,
                    ten: data.ten,
                    email: data.email,
                    matKhau: hashPass,
                    soDT: data.soDT,
                    diaChi: data.diaChi,
                    gioiTinh: data.gioiTinh,
                    viTriID: data.viTriID,
                    vaiTroID: data.vaiTroID,
                    avatar: data.avatar,
                })
                resolve({
                    errCode: 0,
                    message: "Thành công tạo người tài khoản!"
                })
            }
        } catch (error) {
            reject(error)
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
let deleteUser = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userid }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: "Tài khoản không tồn tại!"
                })
            }
            await db.User.destroy({
                where: { id: userid }
            });
            resolve({
                errCode: 0,
                errMessage: "Tài khoản đã được xóa!"
            })
        } catch (error) {
            reject(error)
        }
    })
}

let upDateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.vaiTroID || !data.viTriID || !data.gioiTinh) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing dữ liệu đầu vào!'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.ho = data.ho;
                user.ten = data.ten;
                user.diaChi = data.diaChi;
                user.vaiTroID = data.vaiTroID;
                user.viTriID = data.viTriID;
                user.soDT = data.soDT;
                user.gioiTinh = data.gioiTinh;
                if (data.avatar) {
                    user.avatar = data.avatar;
                }
                await user.save(
                    // ho: data.ho,
                    // ten: data.ten,
                    // diaChi: data.diaChi,
                )
                resolve({
                    errCode: 0,
                    errMessage: "Update account thành công!",
                })
            } else {
                resolve({
                    errCode: 0,
                    errMessage: "account notFound!",
                })
            }
        } catch (error) {
            resolve({
                errCode: 2,
                errMessage: 'Missing dữ liệu đầu vào!'
            })
        }
    })

}
let getAllCodeService = (inputType) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputType) {
                resolve({
                    errCode: 1,
                    errMessage: "Khong nhap"
                })
            } else {
                let respone = {};
                let allCode = await db.allCodes.findAll({
                    where: { type: inputType }
                })
                respone.errCode = 0;
                respone.data = allCode;
                resolve(respone);
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUSer: createNewUSer,
    // editUser: editUser,
    upDateUserData: upDateUserData,
    deleteUser: deleteUser,
    getAllCodeService: getAllCodeService,
}