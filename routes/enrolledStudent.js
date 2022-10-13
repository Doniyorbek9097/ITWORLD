const router = require("express").Router();

const {
	studentList,
	enrolledAdd,
	deleteEnrolled
} = require("../controllers/enrolledStudent");

router.delete("/:id",deleteEnrolled);
router.get("/", studentList);
router.post("/", enrolledAdd);




module.exports = router;