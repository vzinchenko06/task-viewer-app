import type { Task } from "@/types";
import { openInNewWindow } from "@/utils/app";
import { Chip, IconButton, Stack } from "@mui/joy";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Typography from "@mui/joy/Typography";
import { ExternalLinkIcon } from "lucide-react";
import { useMemo } from "react";
import { SafeHTML } from "./SafeHTML";

interface TaskDetailsProps {
	task: Task;
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

	return (
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
			<SafeHTML html={task.description} />
			<Stack direction="row" gap={1}>
				<Typography level="title-sm">Tags:</Typography>
				{tags.map((tag) => (
					<Chip key={tag} size="sm">
						{tag}
					</Chip>
				))}
			</Stack>
		</Stack>
	);
}
