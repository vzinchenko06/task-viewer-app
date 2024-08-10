"use client";

import { loadTasks } from "@/utils/tasks";
import { Button, Divider, IconButton, Input, Stack } from "@mui/joy";
import { FilterIcon, FolderOpenIcon } from "lucide-react";
import { useTasksContext } from "./TasksContext";

export default function MainToolBar() {
	const {
		setLoadTasks,
		globalFilter,
		setGlobalFilter,
		visibleFilters,
		toggleVisibleFilters,
	} = useTasksContext();

	const handleLoadTasks = () => {
		loadTasks().then(setLoadTasks);
	};

	return (
		<Stack
			direction="row"
			spacing={2}
			divider={<Divider orientation="vertical" />}
		>
			<Input
				placeholder="Search..."
				value={globalFilter}
				onChange={(event) => setGlobalFilter(event.target.value)}
				variant="soft"
				sx={{ flexGrow: 1 }}
			/>
			<IconButton variant={visibleFilters ? "solid" : "soft"}>
				<FilterIcon onClick={() => toggleVisibleFilters()} />
			</IconButton>
			<Button
				onClick={handleLoadTasks}
				variant="soft"
				startDecorator={<FolderOpenIcon />}
			>
				Load Tasks
			</Button>
		</Stack>
	);
}
