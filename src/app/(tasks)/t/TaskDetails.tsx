import { TaskDetails as Details } from "@/components/TaskDetails";
import type { Task } from "@/types";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

function decodeTask(rawTask?: string | null): Task | null {
	if (rawTask) {
		return JSON.parse(rawTask);
	}
	return null;
}

export default function TaskDetails() {
	const searchParams = useSearchParams();

	const task = useMemo<Task | null>(
		() => decodeTask(searchParams.get("task")),
		[searchParams],
	);

	return <Details task={task} />;
}
