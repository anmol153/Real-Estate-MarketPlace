import mongoose from "mongoose";
import bycrypt from "bcryptjs";
const UserSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min:[8, "Password must be at least 8 characters"],
        max:[20, "Password must be at most 20 characters"],
    },
}, { timestamps: true });

UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    } else {
        
        this.password = await bycrypt.hash(this.password, 10);
        next();
    }  
});
export const User = mongoose.model("User", UserSchema);