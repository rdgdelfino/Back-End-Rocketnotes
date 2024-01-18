const { Router } = require("express");

const TagsController = require("../controllers/TagsController")
const ensureAutenticated = require("../middlewares/ensureAutenticated")

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/", ensureAutenticated, tagsController.index);


module.exports = tagsRoutes;
