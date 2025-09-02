import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    projectId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
     },
     title: { type: String, required: true },
     description: String,
     status: {
        type: String,
        enum: ['todo','doing','done'],
        default: 'doing'
     },
     priority: {
        type: String,
        enum: ['low','med','high'],
        default: 'med'
     },
     dueDate: Date,
     tags: [String],
     attachments: [String],
     createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
     }
}, {timestamps: true})

const Task = mongoose.model('Task', taskSchema)
export default Task;