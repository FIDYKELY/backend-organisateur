import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

}, {timestamps: true})

const Project = mongoose.model('Project', projectSchema)
export default Project;