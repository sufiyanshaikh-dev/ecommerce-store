import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// -------------------- Creating Token -------------------
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}




// --------------- Routes for usr Login ------------------
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // -------------- checking user already exists ---------------------
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: "User does not exists"
            })
        }

        // -------------- creating token and checking the correct password ----------------
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({
                success: true,
                token
            })
        } else {
            res.json({
                success: false,
                message: "Invalid Password"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}





// ----------------- Routes for user Register --------------------
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        // -------------- Checking user already exist -----------------
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({
                success: false,
                message: "User already exists"
            })
        }

        // ------------------- Validating Email format and strong password --------------------
        // -------------- for Email ---------------
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid Email"
            })
        }
        // ---------------- for Password ----------------
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password"
            })
        }

        // ------------------ Hashing user password ---------------------
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        // -------------- Creating token --------------
        const token = createToken(user._id)
        res.json({
            success: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}





// --------------------- Routes for Admin-Login -----------------
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
              const token = jwt.sign({ id: "admin", role: "admin" }, process.env.JWT_SECRET,{ expiresIn: "7d" });
            res.json({
                success: true,
                token
            });
        } else {
            res.json({
                success: false,
                message: "Invalid Credential"
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}


export { loginUser, registerUser, adminLogin };