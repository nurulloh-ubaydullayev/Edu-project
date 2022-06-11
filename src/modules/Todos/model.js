const { fetch, fetchAll } = require("../../lib/postgres");

const READ_TODOS = `
    SELECT *
    FROM todos
    WHERE user_id = $1;
`;

const CREATE_TODO = `
    INSERT INTO 
        todos(user_id, body)
    VALUES($1, $2)
    RETURNING *;
`;

const UPDATE_TODO = `
    UPDATE todos
    SET is_checked = NOT is_checked
    WHERE id = $1
    RETURNING *;
`;

const DELETE_TODO = `
    DELETE FROM todos
    WHERE id = $1;
`;

const readTodos = (userId) => fetchAll(READ_TODOS, userId);
const createTodo = (userId, todoBody) => fetch(CREATE_TODO, userId, todoBody);
const updateTodo = (todoId) => fetch(UPDATE_TODO, todoId);
const deleteTodo = (todoId) => fetch(DELETE_TODO, todoId);

module.exports = {
  readTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
