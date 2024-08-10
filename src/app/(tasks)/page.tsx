"use client";

import { FilterFormControl } from "@/components/FilterField";
import { TaskDrawer } from "@/components/TaskDrawer";
import { TaskTable } from "@/components/TaskTable";
import type { Task } from "@/types";
import { type LoadTasksResult, loadTasks } from "@/utils/tasks";
import { Button, Divider, Grid, IconButton, Input, Stack } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import { FilterIcon, FolderOpenIcon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { useTaskTable } from "./useTaskTable";

export default function TasksPage() {
	const [{ file, tasks }, setData] = useState<LoadTasksResult>({
		file: "",
		tasks: [],
	});
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [globalFilter, setGlobalFilter] = useState("");
	const [visibleFilters, setVisibleFilters] = useState(false);

	const handleLoadTasks = () => {
		loadTasks().then(setData);
	};

	const table = useTaskTable(tasks, {
		value: globalFilter,
		onChange: setGlobalFilter,
	});

	const handleRowClick = (task: Task) => {
		setSelectedTask(task);
	};

	const handleCloseDrawer = () => {
		setSelectedTask(null);
	};

	const handleGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
		setGlobalFilter(e.target.value);
	};

	const handeToggleFilters = () => {
		setVisibleFilters((prev) => !prev);
	};

	return (
		<>
			<Stack spacing={2} sx={{ padding: 2 }}>
				<Stack
					direction="row"
					spacing={2}
					divider={<Divider orientation="vertical" />}
				>
					<Input
						placeholder="Search..."
						value={globalFilter}
						onChange={handleGlobalFilterChange}
						variant="soft"
						sx={{ flexGrow: 1 }}
					/>
					<IconButton variant={visibleFilters ? "solid" : "soft"}>
						<FilterIcon onClick={handeToggleFilters} />
					</IconButton>
					<Button
						onClick={handleLoadTasks}
						variant="soft"
						startDecorator={<FolderOpenIcon />}
					>
						Load Tasks
					</Button>
				</Stack>
				{visibleFilters && (
					<Sheet variant="soft" sx={{ padding: 2 }}>
						<Grid container spacing={2} sx={{ flexGrow: 1 }}>
							{table.getFlatHeaders().map((header) => (
								<Grid key={header.id} xs={12} sm={6} md={3}>
									<FilterFormControl header={header} />
								</Grid>
							))}
						</Grid>
					</Sheet>
				)}

				<TaskTable table={table} onRowClick={handleRowClick} fileName={file} />
			</Stack>

			<TaskDrawer
				task={selectedTask}
				isOpen={Boolean(selectedTask)}
				onClose={handleCloseDrawer}
			/>
		</>
	);
}
