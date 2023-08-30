const { Schema, model } = require("mongoose")
const bcrypt = require('bcrypt')

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,

    },


    profilePic: {
        type: String,
        default: "default.png",

    },

},

    {
        timestamps: true
    }

);
UserSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

UserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


UserSchema.methods.lastUpdatedDate = function () {
    this.lastUpdated = Date.now();
    return this.lastUpdated;
};
const User = model("User", UserSchema);

module.exports = User;
