const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // validation

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  }

  // Uniqueness

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      message: "Invalid User Data",
    });
  }
};

const loginUser = async (req,res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});

  if(user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({
      _id:user.id,
      name:user.name,
      email:user.email,
      token: generateToken(user._id)
    })

  }else{
    return res.status(401).json({
      message:"Please enter a valid password"
    })
  }

}


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
};
