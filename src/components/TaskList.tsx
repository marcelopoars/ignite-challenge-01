import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

/*
- cadastrar com enter
- focus do cursosr
- acessibilidade
*/

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return;

    // Criando a nova tarefa
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    };

    // Aqui eu mantenho o conteúdo original do array e adiciono um novo valor
    setTasks((tasks) => [...tasks, newTask]);

    // Aqui eu limpo o conteúdo do input
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // Aqui eu percorro a lista de tarefas e busco a tarefa com o ID da tarefa a ser alterada para DONE Encontrando a tarefa, eu coloco em um novo objeto os dados da tarefa alterando apenas a propriedade 'isComplete'
    const currentTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );

    setTasks(currentTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    // Aqui eu percorro a lista de tarefas e armazeno em um novo array as tarefas com ID diferente do ID da tarefa a ser deletada
    const currentTasks = tasks.filter((task) => task.id !== id);
    setTasks(currentTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
