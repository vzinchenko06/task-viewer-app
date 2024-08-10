"use client";

import type { Task } from "@/types";
import { openInNewWindow } from "@/utils/app";
import { Chip, IconButton, Stack } from "@mui/joy";
import Drawer from "@mui/joy/Drawer";
import Typography from "@mui/joy/Typography";
import { ExternalLinkIcon } from "lucide-react";
import { SafeHTML } from "./SafeHTML";
import { TaskDetails } from "./TaskDetails";

export interface TaskDrawerProps {
	task?: Task | null;
	isOpen: boolean;
	onClose: () => void;
}

export function TaskDrawer({
	task = null,
	isOpen = false,
	onClose,
}: TaskDrawerProps) {
	const handleOpenInNewWindow = () => {
		if (task) {
			openInNewWindow(task);
		}
		onClose();
	};

	return (
		<Drawer size="lg" anchor="right" open={isOpen} onClose={onClose}>
			{task && (
				<TaskDetails
					task={task}
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
			)}
		</Drawer>
	);
}
