
// import clinicService from '../services/clinicService'

import clinicService from '../services/clinicService'

let postClinic = async (req, res) => {
    try {
        let response = await clinicService.postClinicService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the sever post clinic'
        })
    }
}
let getAllClinic = async (req, res) => {
    try {
        let response = await clinicService.getAllClinicService();
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the sever get clinic'
        })
    }
}
let getDetailClinicID = async (req, res) => {
    try {
        let response = await clinicService.getDetailClinicByIDService(req.query.id, req.query.location);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the sever get detail clinic'
        })
    }
}

module.exports = {
    postClinic: postClinic,
    getAllClinic: getAllClinic,
    getDetailClinicID: getDetailClinicID
}