import express from "express";
import homeController from "../controllers/homeController";
import accountController from "../controllers/accountController";
import teacherController from "../controllers/teacherController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController"
let router = express.Router();

let initWebRoutes = (app) => {


    router.get("/delete-crud", homeController.deleteCRUD);
    router.get("/edit-crud", homeController.editCRUD);
    router.get("/read", homeController.readCRUD);
    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getCRUD);
    router.get("/demo", homeController.getDemo);
    router.post("/post-crud", homeController.postCRUD);
    router.post("/put-crud", homeController.putCRUD);


    router.post("/api/login", accountController.handleLogin)
    router.get("/api/getalluser", accountController.handleGetAllUser)
    router.post("/api/createNewUser", accountController.handleCreateNewUser)
    router.put("/api/editUser", accountController.handleEditUser)
    router.delete("/api/deleleUser", accountController.handleDeleteUser)
    router.get("/api/allcode", accountController.getAllCode);



    //Teacher
    router.get("/api/top-doctor-home", teacherController.getTopTeacherHome)

    router.get("/api/get-all-teacher", teacherController.getAllTeacher)

    router.post("/api/save-infor-teacher", teacherController.postInforTeacher)

    router.get("/api/get-detail-teacher-by-id", teacherController.getDetailTeacherByID)

    router.post("/api/bulk-create-schesule", teacherController.bulkCreateSchedule)

    router.get("/api/get-schedule-teacher-by-date", teacherController.getScheduleTeacherByDate)

    router.get("/api/get-extra-infor-teacher-by-id", teacherController.getExtraInforTeacher)
    router.get("/api/get-profile-teacher-by-id", teacherController.getProfileTeacher)

    router.get("/api/get-list-patient-booked", teacherController.getListPatientBooked)

    router.post("/api/send-bill", teacherController.postSendBill)

    //patient
    router.post("/api/patient-book-appoiment", patientController.postBookAppointment)

    router.post("/api/confirm-book-appoiment", patientController.postConfirmBookAppointment)

    router.post("/api/create-new-specialty", specialtyController.postSpecialty)

    router.get("/api/get-all-specialty", specialtyController.getAllSpecialty)

    router.get("/api/get-detail-specialty-by-id", specialtyController.getDetailSpecialtyByID)


    //clinic
    router.post("/api/create-new-clinic", clinicController.postClinic)

    router.get("/api/get-all-clinic", clinicController.getAllClinic)

    router.get("/api/get-detail-clinic-by-id", clinicController.getDetailClinicID)



    return app.use("/", router);

}

module.exports = initWebRoutes;