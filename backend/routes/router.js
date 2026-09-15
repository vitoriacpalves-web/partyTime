const router = require("express").Router();

//Service router
const servicesRouter = require("./services");
router.use("/", servicesRouter);

//Parties
const partiesRouter = require("./parties")
router.use("/", partiesRouter);

//login
const loginRouter = require("./login")
router.use("/", loginRouter)


module.exports = router;