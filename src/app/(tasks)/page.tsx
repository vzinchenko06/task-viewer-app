"use client";

import Stack from "@mui/joy/Stack";
import dynamic from "next/dynamic";
import FiltersToolBar from "./FiltersToolBar";
import MainToolBar from "./MainToolBar";
import TaskTable from "./TaskTable";

const TaskDrawer = dynamic(() => import("./TaskDrawer"), { ssr: false });

export default function TasksPage() {
	return (
		<>
			<Stack spacing={2} sx={{ padding: 2 }}>
				<MainToolBar />
				<FiltersToolBar />
				<TaskTable />
			</Stack>
			<TaskDrawer />
		</>
	);
}
