const bcrypt = require("bcrypt");
const userModel = require("../models/UserModel");
const mailUtil = require("../utils/MailUtils");
const jwt = require("jsonwebtoken");
const secret = "secret";
const cloudinaryUtils = require("../utils/CloudinaryUtils")
const multer = require("multer")

const storage = multer.diskStorage({
  destination : "./uploads",
  filename: function(req,file, cb){
    cb(null, file.originalname);
  }
})

const upload = multer({
  storage:storage,
}).single("image")



const signUp = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;

    const signupUser = await userModel.create(req.body);
    await mailUtil.sendingMail(
      signupUser.email,
      "Welcome mail",
      "This email from appraisal tracker"
    );
    res.status(200).json({
      message: "Signup successfully",
      data: signupUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const foundUserByEmail = await userModel
      .findOne({ email: email })
      .populate("roleId");
    console.log(foundUserByEmail);

    if (foundUserByEmail != null) {
      const isMatch = bcrypt.compareSync(password, foundUserByEmail.password);

      if (isMatch) {
        res.status(200).json({
          message: "User found successfully",
          data: foundUserByEmail,
        });
      } else {
        res.status(401).json({
          message: "Invalid credential...",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found..",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const addUser = async (req, res) => {
  const addedUser = await userModel.create(req.body);
  res.json({
    message: "User created successfully",
    data: addedUser,
  });
};

const addProfileImage = async (req,res)=>{
  upload(req,res, async(err)=>{
    if(err){
      console.log(err);
      res.status(500).json({message: err.message})
    } else{
      const cloudinaryResponse = await cloudinaryUtils.uploadFileToCloudinary(req.file)

      req.body.imageUrl = cloudinaryResponse.secure_url;
      const savedProfileImage = await userModel.create(req.body);
      res.status(201).json({
        message:"image upload successfully",
        data: savedProfileImage
        
      })

    }

  })
}

const getAllUser = async (req, res) => {
  const allUser = await userModel.find().populate("roleId departmentId");
  res.json({
    message: "All user fetched successfully...",
    data: allUser,
  });
};

const getUserByRole = async (req, res) => {
  const userByRole = await userModel.find({
    roleId: "67cfbd8988c9224baf86bf46",
  });
  res.json({
    message: "user found by role",
    data: userByRole,
  });
};

const getUserById = async (req, res) => {
  const userById = await userModel
    .findById(req.params.id)
    .populate("roleId departmentId");
  res.json({
    message: "User found successfully",
    data: userById,
  });
};

const deleteUser = async (req, res) => {
  const deletedUser = await userModel.findByIdAndDelete(req.params.id);
  res.json({
    message: "user deleted successfully",
    data: deletedUser,
  });
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const foundUser = await userModel.findOne({ email: email });

  if (foundUser) {
    const token = jwt.sign(foundUser.toObject(), secret);
    console.log(token);

    const url = `http://localhost:5173/resetpassword/${token}`;
    const mailContent = `<html>
                          <a href ="${url}">reset password</a>
                          </html>`;

    await mailUtil.sendingMail(foundUser.email, "reset password", mailContent);
    res.json({
      message: "reset password link send successfully",
    });
  } else {
    res.json({
      message: "user not found.. register first....",
    });
  }
};


const resetpassword = async (req,res)=>{
  const token = req.body.token
  const password = req.body.password

  const userfromtoken = jwt.verify(token,secret);

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password,salt)

  const updatePassword = await userModel.findByIdAndUpdate(userfromtoken._id,{
    password:hashedPassword
  })
  res.json({
    message:"password updated successfully"
  })
}
module.exports = {
  signUp,
  login,
  addUser,
  getAllUser,
  getUserById,
  deleteUser,
  getUserByRole,
  forgotPassword,
  resetpassword
};
