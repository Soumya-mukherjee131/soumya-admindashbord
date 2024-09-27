const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    designation: {
        type: String, 
        required: false,
    },
    gender: {
        type: String, 
        required: false,
    },
    course: {
        type: [String],
        default: [],
    },
    image: {
        type: String,
        required: false,
    },
    // curDate:{
    //     type: String,
    //     required:false,
    // },
}, 
// {
//     timestamps: true, 
// }
);

// Secure the password using bcrypt
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
});

// Compare password
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

// Generate JSON web token
userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY, 
        {
            expiresIn: "30d",
        });
    } catch (error) {
        console.error(error);
    }
};

// Define the model or the collection names
const User = mongoose.model("User", userSchema);

module.exports = User;
