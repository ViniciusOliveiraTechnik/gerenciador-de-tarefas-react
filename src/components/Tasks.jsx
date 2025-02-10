import { Check, ChevronRight, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Buttom from "./Buttom";

function Tasks(props) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }

  return (
    <ul
      className={`space-y-4 p-6 bg-slate-200 rounded-md shadow overflow-y-auto max-h-90 ${
        props.tasks.length === 0 && "hidden"
      }`}
    >
      {props.tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          
          <button
            onClick={() => props.onTaskClick(task.id)}
            className={`bg-slate-400 p-2 text-white rounded-md text-left cursor-pointer w-full flex items-center gap-2 ${
              task.isCompleted && "line-through"
            }`}
          >
            {task.isCompleted && <Check />}
            {task.title}
          </button>

          <Buttom
            textContent={<ChevronRight />}
            onClick={() => onSeeDetailsClick(task)}
          />

          <Buttom
            onClick={() => props.onTaskDelete(task.id)}
            textContent={<Trash />}
          />

        </li>
      ))}
    </ul>
  );
}

export default Tasks;
