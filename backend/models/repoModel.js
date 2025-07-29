const mongoose = require("mongoose");
const { Schema } = mongoose;

const RepositorySchema = new Schema ({
    
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: [
        {
            type: String,
        },
    ],
    content: [
        {
            type: String,
        },
    ],
    visibilty: {
        type: Boolean,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    issues: [
        {
            type: Schema.Types.ObjectId,
            ref: "Issue",
        },
    ],
}, {timestamps: true});

const Repository = mongoose.model("Repository", RepositorySchema);
module.exports = Repository;