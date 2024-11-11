import mongoose from "mongoose";

const { Schema } = mongoose;


const userSchema = new Schema({
    fullname: String,
    email: { type: String, require: true },
    provider: { type: String },
    profileImg: { type: String },
    password: { type: String },
    role: { type: String, default: "user" },
    gender: String,
    address: String,
}, { timestamps: true })


export const userModal = mongoose.models.Users || mongoose.model('Users',userSchema)
