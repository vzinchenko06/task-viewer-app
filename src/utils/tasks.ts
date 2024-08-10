import type { Task } from "@/types";
import { type OpenDialogOptions, message, open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";
import Papa, { type ParseError } from "papaparse";

export interface LoadTasksResult {
	file: string;
	tasks: Task[];
}

const csvOpenDialogOptions: OpenDialogOptions = {
	filters: [{ name: "CSV Files", extensions: ["csv"] }],
};

function transformHeaderToCamelCase(header: string) {
	return header
		.split(/\s+/g)
		.filter(Boolean)
		.map((word, index) => {
			if (index === 0) return word.toLowerCase();
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		})
		.join("");
}

async function parseTasksCsv(csvString: string): Promise<Task[]> {
	return new Promise((resolve, reject) => {
		Papa.parse<Task>(csvString, {
			header: true,
			dynamicTyping: true,
			transformHeader: transformHeaderToCamelCase,
			complete: (result) => resolve(result.data),
			error: reject,
		});
	});
}

export async function loadTasks(): Promise<LoadTasksResult> {
	const selected = await open(csvOpenDialogOptions);

	if (!selected) return { file: "", tasks: [] };
	const file = Array.isArray(selected) ? selected[0] : selected;

	const csvString = await readTextFile(file).catch((error: Error) => {
		message(error.message, { title: "Open CSV File", type: "error" }).catch(
			console.error,
		);
		return "";
	});

	const tasks = await parseTasksCsv(csvString).catch((error: ParseError) => {
		message(error.message, { title: error.code, type: "error" }).catch(
			console.error,
		);
		return [];
	});

	return { file, tasks };
}
