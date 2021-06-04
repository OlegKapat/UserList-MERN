const express = require("express");
const router = express.Router();
const authcontroller = require("../contrlollers/auth");
const upload = require("../middleware/upload");

router.post("/login", authcontroller.login);
router.get("/alluser",upload.single('avatar'), authcontroller.showAllUsers );
router.post("/register", upload.single('avatar'), authcontroller.register);
router.patch("/update/:id", upload.single('avatar'), authcontroller.updateById);
router.get("/:id",authcontroller.getUserById)
router.delete("/:id", authcontroller.deleteUser);

module.exports = router;
