"use client";

import { TaskTable as Table } from "@/components/TaskTable";
import dynamic from "next/dynamic";
import { useTasksContext } from "./TasksContext";

const AppWindowTitle = dynamic(() => import("@/components/AppWindowTitle"), {
	ssr: false,
});

/// TODO: Implement pagination
export default function TaskTable() {
	const { file, tasksTable, setSelectedTask } = useTasksContext();

	return (
		<>
			<AppWindowTitle title={file ? `Tasks [${file}]` : "Tasks"} />
			<Table
				stickyHeader
				headers={tasksTable.getFlatHeaders()}
				rows={tasksTable.getRowModel().rows}
				onRowSelect={setSelectedTask}
			/>
		</>
	);
}
