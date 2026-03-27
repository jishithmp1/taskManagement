const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

// auth routes
router.post("/auth/signup", controller.signup);
router.post("/auth/login", controller.login);

// task routes
// router.post("/api/tasks", controller.createTasks);
// router.get("/api/tasks", controller.getTasks);
// router.get("/api/tasks/:id", controller.getTaskById);
// router.put("/api/tasks/:id", controller.updateTaskById);
// router.delete("/api/tasks/:id", controller.deleteTaskById);

module.exports = router;