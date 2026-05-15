const express = require("express");
const router = express.Router();

const { signup, signin } = require("../controllers/authControllers");
// const authMiddleware = require("../Middleware/AuthMiddleware")

router.post("/signup", signup);
router.post("/signin", signin);

// router.get("/signin", authMiddleware, (req, res) => {
//     res.json({
//         message: "Protected route access",
//         user: req.user,
//     })
// })

module.exports = router;
