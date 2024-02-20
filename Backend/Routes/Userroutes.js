import express from "express";
import {
  Logincontroller,
  Registercontroller,
  getalluserscontroller,
} from "../Controller/Usercontroller.js";
const router = express.Router();
router.post("/register", Registercontroller);
router.get("/getuser", getalluserscontroller);
router.post("/login", Logincontroller);

export default router;
