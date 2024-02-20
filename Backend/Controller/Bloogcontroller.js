import mongoose from "mongoose";
import bloogModel from "../Model/Bloogmodel.js";
import Usermodel from "../Model/Usermodel.js";
const getblog = async (req, res) => {
  try {
    const blogs = await bloogModel.find({}).populate('user')
    
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "no blog found",
      });
    }
    return res.status(200).send({
      success: true,
      bloogcount: blogs.length,
      message: "all blog lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "error in blog api",
    });
  }
};
const createblog = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
     

      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }
    const existinguser = await Usermodel.findById(user);
    if (!existinguser) {
      console.log("user not found", user);
      return res.status(500).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newblog = new bloogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newblog.save({ session });
    existinguser.blog = newblog;
    await existinguser.save({ session });
    await session.commitTransaction();
    await newblog.save();

    return res.status(201).send({
      success: true,
      message: "blog data registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "error in blog api",
    });
  }
};
const blogupdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blogs = await bloogModel.findById(id);

    if (!blogs) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    const blog = await bloogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "blog updated",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "error in blog update api",
    });
  }
};
const getsingleblock = async (req, res) => {
  try {
    const { id } = req.params;
    const getid = await bloogModel.findById(id);
    if (!getid) {
      return res.status(404).send({
        success: false,
        message: "invalid id",
      });
    }
    return res.status(201).send({
      success: true,
      message: "fetched successfuly",
      getid,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "not found",
    });
  }
};
const Deletesingle = async (req, res) => {
  try {
    const blogs = await bloogModel
      .findByIdAndDelete(req.params.id)
      .populate("user");
      if(!blogs){
        console.log("blog is",req.user)

        return res.status(404).send({
          success: false,
          message: "Blog not found",
        });
      }
    await blogs.user.save();
 
  
    return res.status(201).send({
      success: true,
      message: "deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
    });
  }
};

const userbloog=async(req,res)=>{
  try {
    

    const userBlog = await Usermodel.findById(req.params.id).populate('bloogs');
    console.log('User Blog:', userBlog); // Add this line for debugging

    if(!userBlog){
   return res.status(404).send({
          success: false,
          message: "Blog not found",
        }) 
    }
    return res.status(200).send({
    success:true,
    userBlog
  });
  } catch (error) {
 return res.status(404).send({
          success: false,
          message: "Blog not found",
        })   
  }
}
export { getblog, createblog, blogupdate, getsingleblock, Deletesingle,userbloog };
