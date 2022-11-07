const { addMessage, getMessages ,addreaction,getMessagesRoom} = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/addreaction/", addreaction);
router.post("/getMessagesRoom/", getMessagesRoom);

module.exports = router;
