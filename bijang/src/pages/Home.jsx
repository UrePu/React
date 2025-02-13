import React, { useEffect, useState } from "react";
import supabase from "../supabase/client";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      try {
        const { data, error } = await supabase.from("todos").select("*");
        if (error) throw error;
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    await supabase.from("todos").insert({ todo });
  };

  return (
    <div>
      <h1>Todo</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="할일을 입력하세요"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button>추가</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.todo}</div>
      ))}
    </div>
  );
};

export default Home;
