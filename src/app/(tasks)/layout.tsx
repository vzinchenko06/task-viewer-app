"use client";

import type { PropsWithChildren } from "react";
import { TasksProvider } from "./TasksContext";

export default function TasksLayout({ children }: Readonly<PropsWithChildren>) {
	return <TasksProvider>{children}</TasksProvider>;
}
