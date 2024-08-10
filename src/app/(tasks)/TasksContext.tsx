"use client";

import { useTaskTable } from "@/app/(tasks)/useTaskTable";
import type { Task } from "@/types";
import { type LoadTasksResult, loadTasks } from "@/utils/tasks";
import type { Table } from "@tanstack/react-table";
import { createContext, useContext, useState } from "react";

export type TasksContextType = {
	file: string;
	tasksTable: Table<Task>;
	selectedTask: Task | null;
	globalFilter: string;
	visibleFilters: boolean;
	setLoadTasks: (result: LoadTasksResult) => void;
	setSelectedTask: (task: Task | null) => void;
	setGlobalFilter: (value: string) => void;
	toggleVisibleFilters: () => void;
};

export const TasksContext = createContext<TasksContextType | undefined>(
	undefined,
);

export function useTasksContext() {
	const context = useContext(TasksContext);
	if (!context) {
		throw new Error("useTasksContext must be used within a TasksProvider");
	}
	return context;
}

export function TasksProvider({ children }: { children: React.ReactNode }) {
	const [{ file, tasks }, setLoadTasks] = useState<LoadTasksResult>({
		file: "",
		tasks: [],
	});
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [globalFilter, setGlobalFilter] = useState("");
	const [visibleFilters, setVisibleFilters] = useState(false);

	const tasksTable = useTaskTable(tasks, {
		value: globalFilter,
		onChange: setGlobalFilter,
	});

	const value = {
		file,
		tasksTable,
		selectedTask,
		globalFilter,
		visibleFilters,
		setLoadTasks,
		setSelectedTask,
		setGlobalFilter,
		toggleVisibleFilters: () => setVisibleFilters((prev) => !prev),
	};
	return (
		<TasksContext.Provider value={value}>{children}</TasksContext.Provider>
	);
}
