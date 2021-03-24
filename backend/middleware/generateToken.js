import jwt from "jsonwebtoken"

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.secret, { expiresIn: "30d" })
}
