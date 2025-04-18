// components/TasksListMain.tsx
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle } from 'lucide-react';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'Alta'|'Media'|'Baja';
}

interface Props {
  tasks: Task[];
  onToggle: (id: number) => void;
}

const TasksListMain: React.FC<Props> = ({ tasks, onToggle }) => {
  const grouped = ['Alta','Media','Baja'].map(p => ({
    priority: p,
    items: tasks.filter(t => t.priority === p)
  }));

  return (
    <div className="p-4 space-y-4 overflow-y-auto">
      {grouped.map(({ priority, items }) => (
        <div key={priority}>
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            {priority}
          </h3>
          {items.length === 0
            ? <p className="text-sm text-gray-500">Sin tareas</p>
            : items.map(t => (
              <div key={t.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={t.completed}
                    onCheckedChange={() => onToggle(t.id)}
                  />
                  <span className={t.completed ? 'line-through text-gray-400' : ''}>
                    {t.title}
                  </span>
                </div>
                {t.completed && <CheckCircle size={18} className="text-green-500" />}
              </div>
            ))
          }
        </div>
      ))}
    </div>
  );
};

export default TasksListMain;
