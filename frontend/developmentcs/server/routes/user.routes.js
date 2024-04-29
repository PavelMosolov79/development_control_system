const Router = require('express')
const router = new  Router()
const userController = require(('../controller/user.controller'))

router.post("/createUser", userController.createUser)
router.get("/findUser/:email", userController.findUser)
router.get("/getUser", userController.getUser)
router.get("/getOneUser/:id", userController.getOneUser)
router.put("/updateUser", userController.updateUser)
router.get("/deleteUser/:id", userController.deleteUser)


router.post("/registration", userController.registration)
router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.get("/activate/:link", userController.activate)
router.get("/refresh", userController.refresh)

module.exports = router