import React, { useState, useEffect } from "react";

const Home = () => {
    const [tasks, setTasks] = useState([]); // Estado de las tareas
    const [inputValue, setInputValue] = useState(""); // Estado para el campo de texto

    // Usamos useEffect para realizar la petición de la API al montar el componente
    useEffect(() => {
        fetch('https://playground.4geeks.com/todo/users/DiegoSB')
            .then(response => response.json())
            .then(data => {
                console.log(data.todos); // Muestra todas las tareas
                setTasks(data.todos);
            })
            .catch(error => {
                // Manejo de errores
                console.error(error);
            });
    }, []);

    // Función para agregar tareas
    const addTask = (event) => {
        if (event.key === "Enter" && inputValue.trim() !== "") {
            setTasks([...tasks, { label: inputValue.trim(), is_done: false }]); // Agregar nueva tarea
            setInputValue(""); // Vaciar el campo
        }
    };

    // Función para eliminar tareas
    const deleteTask = (index) => {
        setTasks(tasks.filter((_, taskIndex) => taskIndex !== index)); // Eliminar tarea por índice
    };

    return (
        <div className="todo-container">
            <h1 className="todo-title">TODOS</h1>
            <div className="todo-card">
                <input
                    type="text"
                    className="todo-input"
                    placeholder="Añadir tareas"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={addTask}
                />
                <ul className="todo-list">
                    {tasks.length === 0 ? (
                        <li className="todo-item no-tasks">
                            No hay tareas
                        </li>
                    ) : (
                        tasks.map((task, index) => (
                            <li
                                key={index}
                                className="todo-item d-flex justify-content-between align-items-center"
                            >
                                {task.label} {/* Muestra la tarea */}
                                <span
                                    className="todo-delete"
                                    onClick={() => deleteTask(index)}
                                >
                                    ✖
                                </span>
                            </li>
                        ))
                    )}
                </ul>
                <div className="todo-footer">
                    {tasks.length} item{tasks.length > 1 ? "s" : ""} restantes
                </div>
            </div>
        </div>
    );
};

export default Home;