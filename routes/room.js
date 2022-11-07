const {addRoom,getRoom,addThanhVien} = require("../controllers/roomController")

const router = require("express").Router();
router.post("/addRoom/", addRoom);
router.post("/getRoom/", getRoom);
router.post("/addTT/", addThanhVien);
module.exports = router;