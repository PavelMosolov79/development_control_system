const Router = require('express');
const router = new  Router();
const userController = require(('../controller/user.controller'));
const {body} = require('express-validator');
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/createUser", userController.createUser);
router.get("/findUser/:email", userController.findUser);
router.get("/getUser", authMiddleware, userController.getUser);
router.get("/getOneUser/:id", userController.getOneUser);
router.put("/updateUser", userController.updateUser);
router.get("/deleteUser/:id", userController.deleteUser);

router.post("/registration", body('email').isEmail(), body('password').isLength({min: 3, max: 32}), userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);

module.exports = router