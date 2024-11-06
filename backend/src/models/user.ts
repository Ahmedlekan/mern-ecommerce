import mongoose from "mongoose"
import { UserType } from "../shared/types"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: String,
  profilePic : String,
  role : String,
  createdAt: Date,
  updatedAt: Date
}, {
  timestamps : true
})

// // Setting up a middleware function to execute before saving a user to the database
// userSchema.pre("save", async function (next) {
//     // Checking if the "password" field of the user document is modified
//     if (this.isModified("password")) {
//       // If the password is modified, hash the password using bcrypt with a salt of 8 rounds
//       this.password = await bcrypt.hash(this.password, 8);
//     }
//     // Calling the next function to continue with the save operation
//     next();
//   });

const User = mongoose.model<UserType>("User", userSchema)

export default User