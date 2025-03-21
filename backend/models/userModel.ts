// import mongoose from "mongoose";
// const UserSchema = new mongoose.Schema({
//     firstname: { type: String, required: true },
//     lastname: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// })
// const UserModel = mongoose.model("User", UserSchema);
// export default UserModel;
import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the User model
const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
