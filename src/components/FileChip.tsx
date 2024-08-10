"use client";

import { Chip } from "@mui/joy";
import { FileIcon } from "lucide-react";

export interface FileChipProps {
	file: string;
}

export function FileChip({ file }: FileChipProps) {
	return (
		<Chip variant="soft" size="sm" startDecorator={<FileIcon size={12} />}>
			{file}
		</Chip>
	);
}
