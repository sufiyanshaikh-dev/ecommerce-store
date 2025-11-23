// import jwt from "jsonwebtoken"

// const adminAuth = async (req, res, next) => {
//     try {
//         const token = req.headers.token
//         if (!token) {
//             return res.json({
//                 success: false,
//                 message: "Not Authorized, Login again"
//             })
//         }

//         const token_decode = jwt.verify(token, process.env.JWT_SECRET)
//         if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//             return res.json({
//                 success: false,
//                 message: "Not Authorized, Login again"
//             })
//         }
//         next()
//     } catch (error) {
//         console.log(error)
//         res.json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// export default adminAuth

import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, Login again",
      });
    }

    // Remove Bearer
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure this is an admin token
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only",
      });
    }

    req.admin = decoded;
    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Not Authorized, Login again",
    });
  }
};

export default adminAuth;
