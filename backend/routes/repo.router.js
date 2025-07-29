const express = require('express');
const repoController = require("../controllers/repoController");

const repoRouter = express.Router();

repoRouter.post("/repo/create", repoController.createRepository);
repoRouter.get("/repo/all", repoController.getAllRepositories);
repoRouter.get("/repo/:id", repoController.fetchRepositoriesById);
repoRouter.get("/repo/name/:name", repoController.fetchRepositoryByName);
repoRouter.get("/repo/user/:userId", repoController.fetchRepositoryForCurrentUser);
repoRouter.get("/repo/update/:id", repoController.updateRepositoryById);
repoRouter.get("/repo/delete/:id", repoController.deleteRepositoryById);
repoRouter.get("/repo/toggle/:id", repoController.togglevisibilityById);

module.exports = repoRouter