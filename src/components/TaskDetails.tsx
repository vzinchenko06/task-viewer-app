"use client";

import type { Task } from "@/types";
import Alert from "@mui/joy/Alert";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useMemo } from "react";
import { SafeHtmlView } from "./SafeHtmlView";

interface TaskDetailsProps {
	task?: Task | null;
	headerDecorator?: React.ReactNode;
}

export function TaskDetails({ task, headerDecorator }: TaskDetailsProps) {
	const tags = useMemo(
		() =>
			String(task?.tags ?? "")
				.split(/\s+/g)
				.filter(Boolean),
		[task],
	);

	return task ? (
		<Stack sx={{ padding: 2 }} gap={1}>
			<Stack
				direction="row"
				gap={2}
				justifyContent="space-between"
				alignItems="baseline"
			>
				<Typography level="h4">{task.title}</Typography>
				{headerDecorator && <Box>{headerDecorator}</Box>}
			</Stack>
			<Stack direction="row" gap={1}>
				<Chip size="sm" startDecorator={<strong>#</strong>}>
					{task.id}
				</Chip>
				<Chip size="sm" startDecorator={<strong>State:</strong>}>
					{task.state}
				</Chip>
				<Chip size="sm" startDecorator={<strong>Assigned To:</strong>}>
					{task.assignedTo}
				</Chip>
			</Stack>
			<Typography level="title-sm">Description:</Typography>
			<SafeHtmlView html={task.description} />
			<Stack direction="row" gap={1}>
				<Typography level="title-sm">Tags:</Typography>
				{tags.map((tag) => (
					<Chip key={tag} size="sm">
						{tag}
					</Chip>
				))}
			</Stack>
		</Stack>
	) : (
		<Alert color="danger" size="lg">
			No task data available
		</Alert>
	);
}
