import express from "express";
import {
  Deletesingle,
  blogupdate,
  createblog,
  getblog,
  getsingleblock,
  userbloog,
} from "../Controller/Bloogcontroller.js";
const router = express.Router();
router.post("/create-blog", createblog);
router.get("/get-blog", getblog);
router.put("/update-blog/:id", blogupdate);
router.get("/get-single-block/:id", getsingleblock);
router.delete("/delete/:id", Deletesingle);

router.get("/user/:id",userbloog)
export default router;
