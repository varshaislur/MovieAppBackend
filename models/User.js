import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password:{type:String,required:true,unique:true},
    profileInfo: String, // Any additional profile information
    profilePicture: { type: String, default: '' }, // URL of the profile picture
    
}, { timestamps: true });

export default mongoose.model('User', userSchema);
