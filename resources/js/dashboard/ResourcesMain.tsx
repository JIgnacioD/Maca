// components/GoalsProgress.tsx
import React, { useEffect, useState } from 'react';
import { Info, File } from 'lucide-react';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

export interface SubGoal {
  id: number;
  name: string;
  current: number;
  target: number;
}
export interface Goal {
  id: number;
  name: string;
}

const GoalsProgress: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    // Aquí puedes llamar a tu API real:
    // fetch('/api/goals').then(r => r.json()).then(setGoals);

    // Datos de ejemplo:
    setGoals([
      {
        id: 1,
        name: 'Hojas Vendedoras'
      },
      {
        id: 2,
        name: 'Portfolios',
      },
      {
        id: 3,
        name: 'Catalogos',
      },
      {
        id: 4,
        name: 'PLV',
      },
      {
        id: 5,
        name: 'Planogramas',
      },
    ]);
  }, []);

  return (
    <div className="p-4 space-y-4">
      <TooltipProvider>
        <div className="pb-2 border-b dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-md md:text-lg mr-4 font-bold text-gray-800 dark:text-gray-200 flex items-center">
            DOCUMENTACIóN
            <Tooltip>
              <TooltipTrigger asChild>
                <Info
                  size={16}
                  className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent> Documentación necesaria para ayuda a GPV</TooltipContent>
            </Tooltip>
          </h2>
          <button className="flex items-center space-x-1 px-3 py-2 rounded-md bg-sky-800 text-white hover:bg-blue-600 transition">
            <File size={20} />
            <span>Acceso</span>
          </button>
        </div>
      </TooltipProvider>

      {goals.map((goal) => {

        return (
          <div key={goal.id} className="mb-4 mr-4">
            <div className="flex justify-between mb-1">
              <h2 className="font-bold">{goal.name}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GoalsProgress;
