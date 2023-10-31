import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeTodo, editTodo } from '../features/todo/todoSlice';

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editableTodos, setEditableTodos] = useState([]);

  const handleEditClick = (todoId) => {
    setEditableTodos((prevEditableTodos) =>
      prevEditableTodos.includes(todoId)
        ? prevEditableTodos.filter((id) => id !== todoId)
        : [...prevEditableTodos, todoId]
    );
  };

  const handleSaveClick = (todo) => {
    dispatch(editTodo({ id: todo.id, text: todo.text }));
    handleEditClick(todo.id);
  };

  const isEditable = (todoId) => editableTodos.includes(todoId);

  return (
    <>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg m-2 flex items-center justify-between"
        >
          <span
            className={`text-lg ${isEditable(todo.id) ? 'text-black' : 'text-white'} ${
              isEditable(todo.id) ? 'border-b' : ''
            }`}
          >
            {isEditable(todo.id) ? (
              <input
                type="text"
                value={todo.text}
                onChange={(e) => {
                  const newText = e.target.value;
                  const updatedTodo = { ...todo, text: newText };
                  dispatch(editTodo(updatedTodo));
                }}
                className="border-none focus:ring-0 outline-none w-full text-black"
              />
            ) : (
              todo.text
            )}
          </span>
          <div>
            {isEditable(todo.id) ? (
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white font-medium rounded-lg text-sm px-3 py-1.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-2 dark:focus:ring-blue-400"
                onClick={() => handleSaveClick(todo)}
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white font-medium rounded-lg text-sm px-3 py-1.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-2 dark:focus:ring-blue-400"
                onClick={() => handleEditClick(todo.id)}
              >
                Edit
              </button>
            )}
            <button
              type="button"
              className="bg-red-600 hover-bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-white font-medium rounded-lg text-sm px-3 py-1.5 ml-2 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-2 dark:focus:ring-red-600"
              onClick={() => dispatch(removeTodo(todo.id))}
            >
              Delete Note
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Todos;
