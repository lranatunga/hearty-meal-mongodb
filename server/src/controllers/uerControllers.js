
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const handleUserRegister = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    // console.log("User details:", req.body)

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    // console.log("New User:", newUser)

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error in user register: " + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const handleUserLogin = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(400).json({ message: "Username or password is incorrect" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Username or password is incorrect" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  
      res.json({ token, userID: user._id });
      console.log('user login sucsessfull')
    } catch (error) {
      console.log("Error in user login: " + error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  


// export const handleUserLogin = async (req, res) => {
//     const user = User.find(user => user.username === req.body.username)
//     if (user == null) {
//       return res.status(400).send('Cannot find user')
//     }
//     try {
//       if(await bcrypt.compare(req.body.password, user.password)) {
//         res.send('Success')
//       } else {
//         res.send('Not Allowed')
//       }
//     } catch {
//       res.status(500).send()
//     }
//   }


// export const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//       jwt.verify(authHeader, "secret", (err) => {
//         if (err) {
//           return res.sendStatus(403);
//         }
//         next();
//       });
//     } else {
//       res.sendStatus(401);
//     }
//   };