
import specialtyService from '../services/specialtyService'
let postSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.postSpecialtyService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the sever post specialty'
        })
    }
}
let getAllSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.getAllSpecialtyService();
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the sever get specialty'
        })
    }
}
let getDetailSpecialtyByID = async (req, res) => {
    try {
        let response = await specialtyService.getDetailSpecialtyByIDService(req.query.id, req.query.location);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the sever get detail specialty'
        })
    }
}

module.exports = {
    postSpecialty: postSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyByID: getDetailSpecialtyByID
}