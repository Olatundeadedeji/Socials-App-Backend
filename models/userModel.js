import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
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
        // Not required because of OAuth
    },
    firstname: String,
    lastname: String,
    isUserAdmin: {
        type: Boolean,
        default: false,
    },
    chesscom: {
        userId: String,
        username: String,
        profile_url: String,
        ratings: {
            bullet: Number,
            blitz: Number,
            rapid: Number,
            classical: Number,
        },
        title: String,
        status: String,
        joined: Date,
        last_online: Date,
    },
    aboutMe: String,
    stayAt: String,
    workAt: String,
    relationshipStatus: String,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
}, { timestamps: true });

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
