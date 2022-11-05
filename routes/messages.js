const { addMessage, getMessages ,addreaction} = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/addreaction/", addreaction);

module.exports = router;
