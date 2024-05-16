import db from '../models/index'
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {

    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }


}
let getDemo = (req, res) => {
    // return res.render('homepage.ejs');
    return res.render('test/demo.ejs');

}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message)

    return res.send("post crud from server");
}
let readCRUD = async (req, res) => {
    let data = await CRUDService.getAllAcount();
    console.log("------------")
    console.log(data)
    console.log("------------")
    return res.render('readCRUD.ejs', {
        dataTable: data,
    })
}

let editCRUD = async (req, res) => {
    let userId = req.query.id;// lay id ng dung
    if (userId) {
        let userData = await CRUDService.getUserById(userId);
        return res.render('edit-crud.ejs', {
            nguoiDung: userData,
        })
        // return res.render('editCRUD.ejs');
    } else {
        return res.send('user not found');
    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.upDate(data)
    return res.render('readCRUD.ejs', {
        dataTable: allUsers,
    })
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteById(id);
        return res.send("Deleted")
    } else {
        return res.send('user not found')
    }


}


module.exports = {
    getHomePage: getHomePage,
    getDemo: getDemo,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    readCRUD: readCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}