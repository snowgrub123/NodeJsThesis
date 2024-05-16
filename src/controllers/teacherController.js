import teacherService from "../services/teacherService";
let getTopTeacherHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await teacherService.getTopTeacherHomeService(+limit)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            messageL: 'Error for server... teacher'
        })
    }
}
let getAllTeacher = async (req, res) => {
    try {
        let teachers = await teacherService.getAllTeacherServive();
        return res.status(200).json(teachers)
    } catch (error) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the sever'
        })
    }
}
let postInforTeacher = async (req, res) => {
    try {
        let response = await teacherService.saveInforTeacherService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the sever 123'
        })
    }
}


let getDetailTeacherByID = async (req, res) => {
    try {
        let response = await teacherService.getDetailTeacherByIDService(req.query.id);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the sever 123'
        })
    }
}
let bulkCreateSchedule = async (req, res) => {
    try {
        let response = await teacherService.bulkCreateScheduleService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the sever bulk'
        })
    }
}
let getScheduleTeacherByDate = async (req, res) => {
    try {
        let response = await teacherService.getScheduleTeacherByDateService(req.query.giaoVienID, req.query.date);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the sever by Date'
        })
    }
}
let getExtraInforTeacher = async (req, res) => {
    try {
        let response = await teacherService.getExtraInforTeacherByService(req.query.giaoVienID);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the sever by extraTeacher'
        })
    }
}
// getProfileTeacher

let getProfileTeacher = async (req, res) => {
    try {
        let response = await teacherService.getProfileTeacherByService(req.query.giaoVienID);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the sever by profileTeacher'
        })
    }
}
let getListPatientBooked = async (req, res) => {
    try {
        let response = await teacherService.getListPatientByService(req.query.giaoVienID, req.query.date);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the sever by getListPatientByService'
        })
    }
}
let postSendBill = async (req, res) => {
    try {
        let response = await teacherService.postSendBillFromService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the post Bill'
        })
    }
}

module.exports = {
    getTopTeacherHome: getTopTeacherHome,
    getAllTeacher: getAllTeacher,
    postInforTeacher: postInforTeacher,
    getDetailTeacherByID: getDetailTeacherByID,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleTeacherByDate: getScheduleTeacherByDate,
    getExtraInforTeacher: getExtraInforTeacher,
    getProfileTeacher: getProfileTeacher,
    getListPatientBooked: getListPatientBooked,
    postSendBill: postSendBill

}