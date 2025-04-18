import React from 'react';
import { PDV, Task } from '@/types/tables';

interface TasksListProps {
  tasks: Task[];
  selectedPdv: PDV | null;
}

export default function TasksListMain({ tasks, selectedPdv }: TasksListProps) {
  // Filtrar tareas por PDV seleccionado si existe
  const filteredTasks = selectedPdv
    ? tasks.filter((task) => task.pdv_id === selectedPdv.id)
    : [];

  return (
    <div>
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">Selecciona un punto de venta para ver tareas.</p>
      ) : (
        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="p-2 bg-gray-50 rounded flex justify-between items-center"
            >
              <span>{task.title}</span>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  task.status === 'pending'
                    ? 'bg-yellow-200 text-yellow-800'
                    : task.status === 'in_progress'
                    ? 'bg-blue-200 text-blue-800'
                    : 'bg-green-200 text-green-800'
                }`}
              >
                {task.status.replace('_', ' ')}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
