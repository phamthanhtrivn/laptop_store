import jwt from "jsonwebtoken"; 

const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
 
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Không có token hoặc token không hợp lệ" });
  }

  const token = authHeader.split(" ")[1];

  if (!token || typeof token !== "string") {
    return res.status(401).json({ success: false, message: "Token không hợp lệ" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userID = token_decode.id; 
    next();
  } catch (error) {
    console.log("Lỗi xác thực token:", error.message);
    return res.status(401).json({ success: false, message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

export default authUser;