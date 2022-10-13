const router = require("express").Router();
const { 
	Subjects, 
	AddSubject,
	UpdateSubject,
	DeleteSubject,
	SubjectById,
	PushTechnology,
	deleteSubjectTech,
	subjectFindByTitle 

} = require("../controllers/subject");

router.get("/subject-find-title/:title", subjectFindByTitle)
router.put("/add-tech/:id",PushTechnology);
router.get("/del-tech/:id/:index", deleteSubjectTech);
router.get("/:id", SubjectById);
router.put("/:id", UpdateSubject);
router.delete("/:id", DeleteSubject);
router.post("/", AddSubject);
router.get("/", Subjects);





module.exports = router;