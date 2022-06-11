const { readTodos, createTodo, updateTodo, deleteTodo } = require("./model");
const { SECRET_KEY } = require("../../config/config");
const jwt = require("jsonwebtoken");

const { selectUser } = require("../Auth/model");

const findUser = async (header) => {
  const { token } = header;
  const { user_name, user_password } = jwt.verify(token, SECRET_KEY);
  const foundUser = await selectUser(user_name, user_password);
  return foundUser;
};

module.exports = {
  READ: async (req, res) => {
    try {
      const foundUser = await findUser(req.headers);
      if (foundUser) {
        const todos = await readTodos(foundUser.id);
        res.json(todos).status(200);
      } else {
        res.status(401).json({ message: "User not found" });
      }
    } catch (err) {
      console.log("Todos => [READ]: ", err.message);
      res.status(500).json({ message: "SERVER error" });
    }
  },
  CREATE: async (req, res) => {
    try {
      const { text } = req.body;
      const foundUser = await findUser(req.headers);
      const newTodo = await createTodo(foundUser.id, text);
      res.status(200).json(newTodo);
    } catch (err) {
      console.log("Todos => [CREATE]: ", err.message);
      res.status(400).json({ message: "Bad Request" });
    }
  },
  UPDATE: async (req, res) => {
    try {
      const { id } = req.params;
      const modifiedTodo = await updateTodo(id);
      if (!modifiedTodo) {
        res.status(400).json({ message: "Bad Request" });
        return;
      }
      res.status(200).json(modifiedTodo);
    } catch (err) {
      console.log("Todos => [UPDATE]: ", err.message);
      res.status(400).json({ message: "Bad Request" });
    }
  },
  DELETE: async (req, res) => {
    try {
      const { id } = req.params;
      await deleteTodo(id);
      res.status(200).json({ message: "Successful!" });
    } catch (err) {
      console.log("Todos => [DELETE]: ", err.message);
      res.status(400).json({ message: "Bad Request" });
    }
  },
};
