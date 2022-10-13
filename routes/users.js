const router = require("express").Router();
const {Users, createUser, VerifyUser } = require("../controllers/users");



router.get("/:id/verify/:token/", VerifyUser);

router.get("/", Users);
router.post("/", createUser);


module.exports = router;

