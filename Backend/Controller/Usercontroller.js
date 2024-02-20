import userModel from "../Model/Usermodel.js";
import bcrypt from "bcrypt";
const Registercontroller = async (req, res) => {
  try {
    console.log("Received registration request:", req.body);

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).send({
        success: false,
        message: "please provide all fields",
      });
    }
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(401).send({
        success: false,
        message: "email is already registered",
      });
    }
    const hashpassword = await bcrypt.hash(password, 8);
    const user = new userModel({ username, email, password: hashpassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "could not register",
    });
  }
};

const getalluserscontroller = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(201).send({
      userCount: users.length,
      success: true,
      message: "got the users",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in get all user api",
      error,
    });
  }
};
const Logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "please fill all the details",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "email not found",
      });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(500).send({
        success: false,
        message: "password is wrong",
      });
    }
    return res.status(201).send({
      success: true,
      message: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in login api",
    });
  }
};
export { Registercontroller, getalluserscontroller, Logincontroller };
