import jwt from 'jsonwebtoken'

const authAdmin = async (req, res, next) => {
  try {
    const { token } = req.headers

    if (!token) {
      return res.json({ success: false, message: 'Không tồn tại token!'})
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET)

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: 'Token không hợp lệ!'})
    }

    next()

  } catch (error) {
    res.json({success: false, message: error.message})
    console.log(error);
  }
}

export default authAdmin