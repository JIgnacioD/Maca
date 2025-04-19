import React from 'react';

export const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <table className="min-w-full divide-y divide-gray-200">{children}</table>
);

export const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <thead className="bg-secondary">{children}</thead>
);

export const TableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <tr>{children}</tr>
);

export const TableCell: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <td className={`text-xs px-2 py-2 whitespace-nowrap ${className}`}>{children}</td>
);

export const TableBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
);
