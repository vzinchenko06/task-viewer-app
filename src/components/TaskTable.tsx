"use client";

import { FileChip } from "@/components/FileChip";
import type { Task } from "@/types";
import Box from "@mui/joy/Box";
import Link from "@mui/joy/Link";
import TableComponent from "@mui/joy/Table";
import {
	type Cell,
	type Header,
	type Row,
	type SortDirection,
	type Table,
	flexRender,
} from "@tanstack/react-table";
import { ArrowDownAZIcon, ArrowUpZAIcon } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";

type RowClickHandler = (task: Task) => void;

export const SORT_ICON: Record<SortDirection, ReactNode> = {
	asc: <ArrowUpZAIcon size={16} />,
	desc: <ArrowDownAZIcon size={16} />,
};

export interface TaskTableProps {
	table: Table<Task>;
	onRowClick: RowClickHandler;
	fileName?: string;
}

export function TaskTable({ table, onRowClick, fileName }: TaskTableProps) {
	const headers = table.getFlatHeaders();
	const rowModel = table.getRowModel();

	return (
		<Box sx={{ position: "relative" }}>
			<Box sx={{ position: "absolute", top: 2, left: 4, zIndex: 100 }}>
				<FileChip file={fileName ?? ""} />
			</Box>
			<TableComponent
				stickyHeader
				hoverRow
				variant="plain"
				borderAxis="xBetween"
			>
				<thead>
					<TaskTableHeadRow headers={headers} />
				</thead>
				<tbody>
					{rowModel.rows.map((row) => (
						<TaskTableRow key={row.id} onClick={onRowClick} row={row} />
					))}
				</tbody>
			</TableComponent>
		</Box>
	);
}

export interface TaskTableHeadRowProps {
	headers: Header<Task, unknown>[];
}

export function TaskTableHeadRow({ headers = [] }: TaskTableHeadRowProps) {
	return (
		<tr>
			{headers.map((header) => (
				<TaskTableHeadCell key={header.id} header={header} />
			))}
		</tr>
	);
}

export interface TaskTableHeadCellProps {
	header: Header<Task, unknown>;
}

export function TaskTableHeadCell({ header }: TaskTableHeadCellProps) {
	return header?.isPlaceholder ? null : (
		<th>
			<Link
				role="button"
				color="neutral"
				onClick={header.column.getToggleSortingHandler()}
				endDecorator={
					<TaskTableSortIcon direction={header.column.getIsSorted()} />
				}
			>
				{flexRender(header.column.columnDef.header, header.getContext())}
			</Link>
		</th>
	);
}

export interface TaskTableSortIcon {
	direction: false | SortDirection;
}

export function TaskTableSortIcon({ direction }: TaskTableSortIcon) {
	return direction ? SORT_ICON[direction] : null;
}

export interface TaskTableRowProps {
	row: Row<Task>;
	onClick: RowClickHandler;
}

export function TaskTableRow({ row, onClick }: TaskTableRowProps) {
	const handleRowClick: MouseEventHandler<HTMLTableRowElement> = () => {
		onClick(row.original);
	};

	const handleRowKeyPress = (
		event: React.KeyboardEvent<HTMLTableRowElement>,
	) => {
		if (event.key === "Enter" || event.key === " ") {
			onClick(row.original);
		}
	};

	return (
		<tr onClick={handleRowClick} onKeyUp={handleRowKeyPress}>
			{row.getVisibleCells().map((cell) => (
				<TaskTableCell key={cell.id} cell={cell} />
			))}
		</tr>
	);
}

export interface TaskTableCellProps {
	cell: Cell<Task, unknown>;
}

export function TaskTableCell({ cell }: TaskTableCellProps) {
	return <td>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
}
