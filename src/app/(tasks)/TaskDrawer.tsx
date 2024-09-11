"use client";

import { useTasksContext } from "@/app/(tasks)/TasksContext";
import { TaskDetails } from "@/components/TaskDetails";
import { openInNewWindow } from "@/utils/app";
import { IconButton } from "@mui/joy";
import Drawer from "@mui/joy/Drawer";
import { ExternalLinkIcon } from "lucide-react";

export default function TaskDrawer() {
	const { selectedTask, setSelectedTask } = useTasksContext();

	const handleOpenInNewWindow = () => {
		if (selectedTask) {
			openInNewWindow(selectedTask);
		}
	};

	return (
		<Drawer
			size="lg"
			anchor="right"
			open={!!selectedTask}
			onClose={() => setSelectedTask(null)}
		>
			<TaskDetails
				task={selectedTask}
				headerDecorator={
					<IconButton
						onClick={handleOpenInNewWindow}
						title="Open in New Window"
						variant="soft"
					>
						<ExternalLinkIcon size={16} />
					</IconButton>
				}
			/>
		</Drawer>
	);
}
