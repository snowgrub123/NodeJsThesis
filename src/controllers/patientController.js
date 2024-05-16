import patientService from "../services/patientService";


let postBookAppointment = async (req, res) => {
    try {
        let response = await patientService.postBookAppointmentService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the sever postBook'
        })
    }
}


let postConfirmBookAppointment = async (req, res) => {
    try {
        let response = await patientService.postConfirmBookAppointmentService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from the sever postBook'
        })
    }
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postConfirmBookAppointment: postConfirmBookAppointment
}