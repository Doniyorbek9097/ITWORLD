const router = require("express").Router();

const {
	Teachers,
	AddTeacher,
	TeacherById,
	EditTeacher,
	DeleteTeacher
	} = require("../controllers/teacher");

router.post("/", AddTeacher);
router.get("/", Teachers);
router.get("/:id", TeacherById);
router.put("/:id", EditTeacher);
router.delete("/:id", DeleteTeacher);


module.exports = router;