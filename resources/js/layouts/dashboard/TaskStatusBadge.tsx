import React from 'react';

type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

interface TaskStatusBadgeProps {
    status: TaskStatus;
}

const statusConfig = {
    pending: { bg: 'bg-yellow-200', text: 'text-yellow-800' },
    in_progress: { bg: 'bg-blue-200', text: 'text-blue-800' },
    completed: { bg: 'bg-green-200', text: 'text-green-800' },
    failed: { bg: 'bg-red-200', text: 'text-red-800' }
};

export const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({ status }) => {
    const config = statusConfig[status];
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
            {status.replace('_', ' ').toUpperCase()}
        </span>
    );
};
