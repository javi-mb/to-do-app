"use client"

import { useState, useEffect } from "react";

const API_URL = "http://to-do-server-my-app.apps.ocp.sbox.fusionglobal.tech/tasks";

export default function TodoApp() {
  const [tasks, setTasks] = useState<{ id: number; task: string; created_at: string }[]>([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (task.trim() !== "") {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task }),
        });
        if (response.ok) {
          fetchTasks();
          setTask("");
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const removeTask = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">TO-DO List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Añadir nueva tarea"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Agregar
        </button>
      </div>
      <ul>
        {tasks.map((t) => (
          <li key={t.id} className="flex justify-between items-center p-2 border-b">
            {t.task}
            <button
              onClick={() => removeTask(t.id)}
              className="text-red-500"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}