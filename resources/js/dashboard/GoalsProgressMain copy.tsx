// components/GoalsProgressMain.tsx
import React, { useEffect, useState } from 'react';
import GradientProgress from './GradientProgress';
import { Info, BadgeDollarSign } from 'lucide-react';
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
  subGoals: SubGoal[];
}

const GoalsProgressMain: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    // Aquí puedes llamar a tu API real:
    // fetch('/api/goals').then(r => r.json()).then(setGoals);

    // Datos de ejemplo:
    setGoals([
      {
        id: 1,
        name: 'Pedidos / Exposición',
        subGoals: [
          { id: 101, name: '1/4 Palet Budweiser', current: 20, target: 50 },
          { id: 102, name: '1/4 Palet Mahou 5E', current: 2, target: 40 },
          { id: 103, name: 'Expositor Budweiser', current: 2, target: 30 },
          { id: 104, name: 'Expositor Mahou 5E', current: 2, target: 20 },
        ],
      },
      {
        id: 2,
        name: 'Nuevas referencias',
        subGoals: [
          { id: 201, name: 'Alta Mahou Reserva', current: 22, target: 25 },
          { id: 202, name: 'Alta Mahou Mini', current: 30, target: 20 },
        ],
      },
      {
        id: 3,
        name: 'Packs Visibilidad',
        subGoals: [
          { id: 301, name: 'Visibilidad Mahou', current: 7, target: 10 },
          { id: 302, name: 'Visibilidad Otro', current: 1, target: 1 },
        ],
      },
    ]);
  }, []);

  return (
    <div className="p-4 space-y-4">
      <TooltipProvider>
        <div className="pb-2 border-b dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-md md:text-lg mr-4 font-bold text-gray-800 dark:text-gray-200 flex items-center">
            OBJETIVOS
            <Tooltip>
              <TooltipTrigger asChild>
                <Info
                  size={16}
                  className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent> % completado según objetivo</TooltipContent>
            </Tooltip>
          </h2>
          <button className="flex items-center justify-end space-x-1 px-3 py-2 rounded-md bg-green-800 text-white hover:bg-green-600 transition">
            <BadgeDollarSign size={20} />
            <span>DETALLE</span>
          </button>
        </div>
      </TooltipProvider>

      {goals.map((goal) => {
        const totalCur = goal.subGoals.reduce((a, b) => a + b.current, 0);
        const totalTgt = goal.subGoals.reduce((a, b) => a + b.target, 0);
        const pct = totalTgt ? Math.round((totalCur / totalTgt) * 100) : 0;

        return (
          <div key={goal.id} className="mb-10 mr-4">
            <div className="flex justify-between mb-1">
              <h2 className="font-bold">{goal.name}</h2>
              <span className="font-semibold">{pct} %</span>
            </div>
            <GradientProgress percent={pct} />
            {/* {totalCur < totalTgt &&
              goal.subGoals.map((sg) => {
                const sp = sg.target
                  ? Math.round((sg.current / sg.target) * 100)
                  : 0;
                return (
                  <div key={sg.id} className="ml-4 md:ml-10 mt-4">
                    <div className="flex justify-between text-sm">
                      <span>{sg.name}</span>
                      <span>
                        {sg.current} / {sg.target}
                      </span>
                    </div>
                    <GradientProgress percent={sp} />
                  </div>
                );
              })} */}
          </div>
        );
      })}
    </div>
  );
};

export default GoalsProgressMain;
