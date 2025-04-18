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

interface SubGoal {
  id: number;
  name: string;
  current: number;
  target: number;
}

interface Goal {
  id: number;
  name: string;
  subGoals: SubGoal[];
}

export default function GoalsProgressMain() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get<Goal[]>('/api/goals');
        setGoals(response.data);
      } catch (err) {
        setError('Error al cargar los objetivos');
        console.error('Error fetching goals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        {error}
      </div>
    );
  }

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
              <TooltipContent>Progreso de objetivos</TooltipContent>
            </Tooltip>
          </h2>
          <BadgeDollarSign className="text-green-600" size={24} />
        </div>
      </TooltipProvider>

      <div className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.id} className="space-y-4">
            <h3 className="font-semibold text-lg">{goal.name}</h3>
            <div className="space-y-2">
              {goal.subGoals.map((subGoal) => (
                <div key={subGoal.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{subGoal.name}</span>
                    <span>{subGoal.current} / {subGoal.target}</span>
                  </div>
                  <GradientProgress
                    percent={(subGoal.current / subGoal.target) * 100}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
