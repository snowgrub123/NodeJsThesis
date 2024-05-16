
import user from "../models/user";
import accountService from "../services/accountService";



let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Thông tin đăng nhập chưa đầy đủ!'
        })
    }
    let userData = await accountService.handleUserLogin(email, password);
    // check email exist
    // compare password not invalue
    //return userInfor
    //access_token:JWT( json web token)
    return res.status(200).json({
        message: userData.errMessage,
        errCode: userData.err,
        user: userData.user ? userData.user : {}
    })//200 ok , 500 error
}

let handleGetAllUser = async (req, res) => {
    // get all or id 
    let id = req.query.id;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Empty',
            user: []
        })
    }
    let users = await accountService.getAllUser(id);
    // console.log(users)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        user: users
    })


}
let handleCreateNewUser = async (req, res) => {
    let message = await accountService.createNewUSer(req.body);
    console.log(message);
    return res.status(200).json(message);
}
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await accountService.upDateUserData(data)
    return res.status(200).json(message)
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Bạn nhập thiếu tham số !"
        })
    }
    let message = await accountService.deleteUser(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}
let getAllCode = async (req, res) => {
    try {
        let data = await accountService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (error) {
        console.log("Get all code from error:", error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Loi from server"
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
}