import mongoose from "mongoose";
const schema=mongoose.Schema

const userSchema=new schema({
    Name:{
        type:String,
        required:false,
            message:["Please enter your Name"]},
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        
        enum:{
            values:["adopter", "shelter","vets","admin"],
            message:'Role must be adopter or shelter or admin or vets.'
        },
        type:String,
        default: "adopter"
    },
    otp:{
        type:Number,
        required:true
    },
    otpExpires:{
        type:Date,
        required:false
    },
    verified:{
        type:Boolean,
        required:true,
        default:false
    }
});
userSchema.pre("save", async function (next) {
    if (this.role === "admin" && this.isNew) {  // ✅ Only check when creating a NEW admin
        const existingAdmin = await mongoose.model("User").findOne({ role: "admin" });
        if (existingAdmin) {
            const error = new Error("An admin already exists. You cannot create another one.");
            return next(error);
        }
    }
    next();
});

const UserModel=mongoose.model("User",userSchema);

export default UserModel;