const router = require("express").Router();

const {
	createGroup,
	getGroups,
	editGroup,
	deleteGroup,
	groupPushStudent,
	getGroupById,
	groupStudentDelete,
	searchGroup,
	groupStudentUpdate

} = require("../controllers/group");

router.put("/group-student-update", groupStudentUpdate)
router.get("/group-search/:name", searchGroup);
router.get("/group-remove-student/:id/:index",  groupStudentDelete);
router.put("/group-add-student/:id", groupPushStudent);
router.delete("/:id", deleteGroup);
router.put("/:id", editGroup);
router.get("/:id", getGroupById)
router.post("/", createGroup);
router.get("/", getGroups);

module.exports = router;