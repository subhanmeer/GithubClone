const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createRepository(req, res){
    const { owner, name, issues = [], content = [], description, visibilty } = req.body;

    try {
        // check the missing name
        if (!name) {
            return res.status(400).json({ error: "Repository name is required!"});
        }
        // validate ObjectId of the owner
        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ error: "Invalid User ID!"});
        }
        
          // Ensure visibilty is a boolean
        const isVisibilty = visibilty === "true";  // Convert string "true" to boolean true

        // Create new repository document
        const newRepository = new Repository({
            name,
            description,
            visibilty: isVisibilty,  // Store as boolean
            owner,
            content,
            issues,
        });

        // save repository to DB
        const result = await newRepository.save();

        res.status(201).json({
            message: "Repository created!",
            repositoryID: result._id,
        });
    } catch (error) {
        console.error("Error during repository creation : ", error);
        res.status(500).send("Server error");
    }
}

async function getAllRepositories(req, res) {
    try {
        const repositories = await Repository.find({})
        .populate("owner")
        .populate("issues");

        res.json(repositories);
    } catch (error) {
        console.error("Error during fetching repositories : ", error.message);
        res.status(500).send("Server error");
    }
}

async function fetchRepositoriesById(req, res) {
    const { id } = req.params;

    try {
        const repository = await Repository.findById({ _id: id })
        .populate("owner")
        .populate('issues');

        if (!repository) {
            return res.status(404).send("Repository not found");
        }

    return    res.json(repository);
    } catch (error) {
        console.error("Error during fetching repository : ", error.message);
        res.status(500).send("Server error");
    }
}

async function fetchRepositoryByName(req, res) {
    const { name } = req.params;
    try {
        const repository = await Repository.find({ name })
        .populate("owner")
        .populate("issues");

    return    res.json(repository);
    } catch (error) {
        console.error("Error during fetching repository : ", error.message);
        res.status(500).send("Server error");
    }
}

async function fetchRepositoryForCurrentUser(req, res) {
    console.log(req.params);
    const { userId } = req.params;

    try {
        const repositories = await Repository.find({ owner: userId });

        if (!repositories || repositories.length == 0 ){
            return res.status(404).json({ error: "User Repositories not found!" });

        }
        console.log(repositories);
    return  res.json({ message: "Repositories found!", repositories });

    } catch (error) {
        console.error("Error during fetching user repositories : ", error.message);
        res.status(500).send("Server error");
    }
}


async function updateRepositoryById(req, res) {
    const { id } = req.params;
    const { content, description } = req.body;

    try {
        const repository = await Repository.findById(id);
        if(!repository) {
            return res.status(404).json({ error: "Repository not found!"});
        }

        repository.content.push(content);
        repository.description = description;

        const updatedRepository = await repository.save();

        return res.json({
            message: "Repository updated successfully!",
            repository: updatedRepository,
        })

        res.json({
            message: "Repository updated successfully!",
            repository: updateRepositoryById,
        });
    } catch (error) {
        console.error("Error during updating repository : ", error.message);
        res.status(500).send("Server error");
    }
}

async function togglevisibilityById(req, res) {
    const { id } = req.params;

    try {
        const repository = await Repository.findById(id);
        if (!repository) {
            return res.status(404).json({ error: "Repository not found!"});
        }

        repository.visibilty = !repository.visibilty

        const updatedRepository = await repository.save();

        res.json({
            message: "Repository visibily toggled successully!",
            repository: updatedRepository,
        });
    } catch (error) {
        console.error("Error during toggling visibility : ", error.message);
        res.status(500).send("Server error");
    }
}

async function deleteRepositoryById(req, res) {
    const { id } = req.params;

    try {
        const repository = await Repository.findByIdAndDelete(id);
        if(!repository) {
            return res.status(404).json({ error: "Repository not found!"});
        }

        res.jason({ message: "Repository deleted scuccessfully!"});
    } catch (error) {
        console.error("Error during deleting repository: ", error.message);
        res.status(500).send("Server error");
    }
}

module.exports = {
    createRepository,
    getAllRepositories,
    fetchRepositoriesById,
    fetchRepositoryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryById,
    togglevisibilityById,
    deleteRepositoryById,
}