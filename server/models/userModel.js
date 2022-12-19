import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
<<<<<<< HEAD
    {
        username: {type: String, required: true,},
        email: {type: String, unique: true, required: true,},
        password: { type: String, required: true,},
        role: { type: String, required: true,},
        avatar: { type: String,},
        address: { type: String, required: true,},
        birthday: { type: String, required: true,},
        phone: { type: String, required: true,},
        isActive: { type: Boolean,},
    },
    {
        timestamps: true,
    }
=======
  {
    username: { type: String, required: true, unique: false },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    avatar: { type: String },
    address: { type: String, required: true },
    birthday: { type: String, required: true },
    phone: { type: String, required: true },
    isActive: { type: Boolean },
  },
  {
    timestamps: true,
  }
>>>>>>> 8eb1dc51531da2a32dddccac9a7dc09b5e3504e6
);
const User = mongoose.model('User', userSchema);
export default User;
