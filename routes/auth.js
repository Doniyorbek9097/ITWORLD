const router = require("express").Router();
const Auth = require("../controllers/auth");

router.post("/", Auth);

module.exports = router;

