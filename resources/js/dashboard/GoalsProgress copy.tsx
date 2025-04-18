// components/GoalsProgress.tsx
import React from 'react';
import GradientProgress from './GradientProgress';
import { PlusCircle, Info } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export interface SubGoal { id: number; name: string; current: number; target: number; }
export interface Goal { id: number; name: string; subGoals: SubGoal[]; }

interface Props { goals: Goal[]; }

const GoalsProgress: React.FC<Props> = ({ goals }) => (
    <div className="p-4 space-y-4">
        <TooltipProvider>
            <div className="pr-4 pb-2 border-b dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-md md:text-lg mr-4 font-bold text-gray-800 dark:text-gray-200 flex items-center">
                    AVANCE DE LOS OBJETIVOS
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info size={16} className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent> % completado según objetivo</TooltipContent>
                    </Tooltip>
                </h2>
                <button className="flex items-center space-x-1 px-3 py-2 rounded-md bg-sky-800 text-white hover:bg-blue-600 transition">
                    <PlusCircle size={20} />
                    <span>Nueva Tarea</span>
                </button>
            </div>
        </TooltipProvider>

        {goals.map(goal => {
            const totalCur = goal.subGoals.reduce((a, b) => a + b.current, 0);
            const totalTgt = goal.subGoals.reduce((a, b) => a + b.target, 0);
            const pct = totalTgt ? Math.round((totalCur / totalTgt) * 100) : 0;

            return (
                <div key={goal.id} className="mb-10 mr-4">
                    <div className="flex justify-between mb-1">
                        <h2 className="font-bold">{goal.name}</h2>
                        <span className='font-semibold'>{pct} %</span>
                    </div>
                    <GradientProgress percent={pct} />
                    {totalCur < totalTgt
                        ? goal.subGoals.map(sg => {
                            const sp = sg.target ? Math.round((sg.current / sg.target) * 100) : 0;
                            return (
                                <div key={sg.id} className="ml-4 md:ml-10 mt-4">
                                    <div className="flex justify-between text-sm">
                                        <span>{sg.name}</span>
                                        <span>{sg.current} / {sg.target}</span>
                                    </div>
                                    <GradientProgress percent={sp} />
                                </div>
                            );
                        }) : ''}
                </div>
            );
        })}
    </div>
);

export default GoalsProgress;
