import type { Task } from "@/types";
import { WebviewWindow, getAll } from "@tauri-apps/api/window";

export function openInNewWindow(task: Task) {
	const windowLabel = `task-details-${task.id}`;
	const window = getAll().find((window) => window.label === windowLabel);

	if (window) {
		window.show().catch(console.error);
		return;
	}

	const taskDetailsWindow = new WebviewWindow(`task_${task.id}`, {
		url: `/t?task=${encodeURIComponent(JSON.stringify(task))}`,
		title: task.title,
	});
	taskDetailsWindow.once("tauri://error", console.error);
}
