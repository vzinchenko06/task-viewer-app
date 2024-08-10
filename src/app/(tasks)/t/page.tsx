"use client";

import { Suspense } from "react";
import TaskDetails from "./TaskDetails";

export default function TaskDetailsPage() {
	return (
		<Suspense>
			<TaskDetails />
		</Suspense>
	);
}
