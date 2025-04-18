import React, { useEffect, useState } from 'react';
import GradientProgress from './GradientProgress';
import { Info, BadgeDollarSign, Loader2 } from 'lucide-react';
import axios from 'axios';
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

export interface GoalsProgressMainProps {
  apiEndpoint?: string; // default '/api/goals'
}

const GoalsProgressMain: React.FC<GoalsProgressMainProps> = ({ apiEndpoint = '/api/goals' }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Goal[]>(apiEndpoint);
        setGoals(response.data);
      } catch (err: any) {
        console.error('Error fetching goals:', err);
        setError('No se pudieron cargar los objetivos.');
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, [apiEndpoint]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <TooltipProvider>
        <div className="pb-2 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 flex items-center">
            OBJETIVOS
            <Tooltip>
              <TooltipTrigger asChild>
                <Info
                  size={16}
                  className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">% completado según el objetivo total.</p>
              </TooltipContent>
            </Tooltip>
          </h2>
          <button className="flex items-center space-x-1 px-3 py-2 rounded-md bg-green-800 text-white hover:bg-green-600 transition">
            <BadgeDollarSign size={20} />
            <span>Detalle</span>
          </button>
        </div>
      </TooltipProvider>

      {goals.map((goal) => {
        // Calcular totales
        const totalCurrent = goal.subGoals.reduce((sum, sg) => sum + sg.current, 0);
        const totalTarget = goal.subGoals.reduce((sum, sg) => sum + sg.target, 0);
        const overallPct = totalTarget ? Math.round((totalCurrent / totalTarget) * 100) : 0;

        return (
          <div key={goal.id} className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-semibold text-gray-700">{goal.name}</h3>
              <span className="text-sm font-medium text-gray-600">{overallPct}%</span>
            </div>

            <GradientProgress percent={overallPct} />

            <div className="ml-4 space-y-4">
              {goal.subGoals.map((sg) => {
                const subPct = sg.target ? Math.round((sg.current / sg.target) * 100) : 0;
                const isComplete = subPct >= 100;

                return (
                  <div key={sg.id} className="space-y-1">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{sg.name}</span>
                      <span className={isComplete ? 'text-green-600 font-semibold' : ''}>
                        {sg.current} / {sg.target}
                      </span>
                    </div>
                    <GradientProgress percent={subPct} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GoalsProgressMain;
