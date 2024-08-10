import { TaskDetails } from "@/components/TaskDetails";
import { Alert } from "@mui/joy";
import { useMemo } from "react";

interface Task {
	id: string;
	workItemType: string;
	title: string;
	assignedTo: string;
	state: string;
	tags?: string;
	description?: string;
}

interface TaskByIdProps {
	searchParams: {
		task: string;
	};
}

export default function TaskDetailsPage({ searchParams }: TaskByIdProps) {
	const task = useMemo<Task | null>(() => {
		if (searchParams.task) {
			return JSON.parse(searchParams.task);
		}
		return null;
	}, [searchParams.task]);

	return task ? (
		<TaskDetails task={task} />
	) : (
		<Alert color="danger" size="lg">
			No task data available
		</Alert>
	);
}
