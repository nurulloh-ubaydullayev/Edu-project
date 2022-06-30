const { Router } = require("express");

const router = new Router();

const Users = require("./Users/users");
const Auth = require("./Auth/auth");
const Todos = require("./Todos/todos");

router
  .post("/signup", Users.SIGNUP)
  .post("/login", Auth.LOGIN)
  .get("/todos", Auth.VERIFICATION, Todos.READ)
  .post("/todos", Auth.VERIFICATION, Todos.CREATE)
  .put("/todos/:id", Auth.VERIFICATION, Todos.UPDATE)
  .delete("/todos/:id", Auth.VERIFICATION, Todos.DELETE);

module.exports = router;
