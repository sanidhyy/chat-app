const { addMessage, getAllMessages } = require("../controllers/msgController");

const router = require("express").Router();

// Message Routes
router.post("/addmsg", addMessage);
router.post("/getmsg", getAllMessages);

module.exports = router;
