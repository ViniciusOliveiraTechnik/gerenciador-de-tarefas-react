import { useEffect, useState } from "react";
import Addtask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  // Criando state para tasks
  const [tasks, setTask] = useState(
    // Recupera as tasks do localStorage ou inicia um array vazio
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  // Atualiza o localStorage sempre que o state de tasks for alterado
  useEffect(() => {
    // Salva as tasks no localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setTask(data);
    }
    fetchData();
  }, []);

  // Função para atualizar o estado de uma task
  function onTaskClick(taskid) {
    const newTasks = tasks.map((task) => {
      // Preciso atualizar a task
      if (task.id === taskid) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      // Não preciso atualizar a task
      return task;
    });
    setTask(newTasks);
  }

  // Função para deletar uma task
  function onTaskDelete(taskId) {
    // Filtra array com valores diferentes da task deletada
    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTask(newTasks);
  }

  // Função para adicionar uma task
  function onClickAddTask(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };

    setTask([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title textContent="Geremciador de Tarefas" />
        
        <Addtask onClickAddTask={onClickAddTask} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onTaskDelete={onTaskDelete}
        />
      </div>
    </div>
  );
}

export default App;
