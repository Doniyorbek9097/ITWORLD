const router = require("express").Router();

const {
	Students,
	AddStudent,
	StudentById,
	EditStudent,
	DeleteStudent

} =  require("../controllers/student");

router.delete("/:id", DeleteStudent);
router.put("/:id", EditStudent);
router.get("/:id", StudentById);
router.post("/", AddStudent);
router.get("/", Students);


module.exports = router;