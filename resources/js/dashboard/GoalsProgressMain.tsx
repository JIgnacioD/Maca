import React, { useState, useEffect } from 'react';
import GradientProgress from './GradientProgress';
import { ChartBarIncreasing, Info } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import axios from 'axios';

interface TimeGoal {
    id: number;
    start_date: string;
    active_days: number;
    progress: number;
}

interface SubGoal {
    id: number;
    name: string;
    current: number;
    target: number;
    timeGoals: TimeGoal[];
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
                console.log('Fetching goals...');
                const response = await axios.get('/api/goals');
                console.log('Response:', response.data);
                setGoals(response.data);
            } catch (err: any) {
                console.error('Error details:', err.response || err);
                setError(err.response?.data?.message || 'Error al cargar los objetivos');
            } finally {
                setLoading(false);
            }
        };
        fetchGoals();
    }, []);

    const isCurrentGoal = (timeGoal: TimeGoal) => {
        const now = new Date();
        const startDate = new Date(timeGoal.start_date);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + timeGoal.active_days);
        return now >= startDate && now <= endDate;
    };

    const isNextGoal = (timeGoal: TimeGoal) => {
        const now = new Date();
        const startDate = new Date(timeGoal.start_date);
        return startDate > now;
    };

    const renderGoalSection = (title: string, filterFn: (timeGoal: TimeGoal) => boolean) => (
        <div className="space-y-4">
            {title.length > 0 && (
                <h3 className="pb-2 border-b dark:border-gray-700 text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>

            )}

            {goals.map(goal => {
                const relevantSubGoals = goal.subGoals.filter(sg =>
                    sg.timeGoals.some(filterFn)
                );

                if (relevantSubGoals.length === 0) return null;

                const totalCurrent = relevantSubGoals.reduce((acc, sg) => acc + sg.current, 0);
                const totalTarget = relevantSubGoals.reduce((acc, sg) => acc + sg.target, 0);
                const progress = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;

                return (
                    <div key={goal.id} className="p-4 rounded-lg shadow">
                        <div className="flex justify-between mb-2">
                            <h4 className="font-bold text-gray-900 dark:text-gray-100">{goal.name}</h4>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <GradientProgress percent={progress} />

                        <div className="mt-4 space-y-3">
                            {relevantSubGoals.map(subGoal => {
                                const subProgress = subGoal.target > 0
                                    ? (subGoal.current / subGoal.target) * 100
                                    : 0;

                                return (
                                    <div key={subGoal.id} className="ml-4 lg:ml-10">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-700 dark:text-gray-300">{subGoal.name}</span>
                                            <span className="text-gray-600 dark:text-gray-400">
                                                {subGoal.current} / {subGoal.target}
                                            </span>
                                        </div>
                                        <GradientProgress percent={subProgress} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    if (loading) return <div>Cargando objetivos...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-4 space-y-6">
            <TooltipProvider>
                <div className="pb-2 border-b dark:border-gray-700 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                        OBJETIVOS
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info size={16} className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>Progreso de objetivos actuales y próximos</TooltipContent>
                        </Tooltip>
                    </h2>
                    <button className="flex items-center space-x-1 px-3 py-2 rounded-md bg-sky-700 text-white hover:bg-sky-600 transition">
                        <ChartBarIncreasing size={20} />
                        <span>Gestionar</span>
                    </button>
                </div>
            </TooltipProvider>

            {renderGoalSection('', isCurrentGoal)}
            {renderGoalSection('Próximos Objetivos', isNextGoal)}
        </div>
    );
}
