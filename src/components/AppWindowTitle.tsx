import { appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

export interface AppWindowTitleProps {
	title: string;
}

export default function AppWindowTitle({ title }: AppWindowTitleProps) {
	useEffect(() => {
		if (!title) return
		appWindow.setTitle(title).catch(console.error);
	}, [title]);

	return null;
}
