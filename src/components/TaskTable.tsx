"use client";

import type { Task } from "@/types";
import Link from "@mui/joy/Link";
import Table from "@mui/joy/Table";
import {
	type Cell,
	type Header,
	type Row,
	type SortDirection,
	flexRender,
} from "@tanstack/react-table";
import { ArrowDownAZIcon, ArrowUpZAIcon } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";

export type RowSelectHandler = (task: Task) => void;

const SORT_ICON: Record<SortDirection, ReactNode> = {
	asc: <ArrowUpZAIcon size={16} />,
	desc: <ArrowDownAZIcon size={16} />,
};

export interface TaskTableProps extends TaskTableHeadRowProps {
	rows: Row<Task>[];
	onRowSelect: RowSelectHandler;
	stickyHeader?: boolean;
}

export function TaskTable({
	headers = [],
	rows = [],
	onRowSelect,
	stickyHeader = false,
}: TaskTableProps) {
	return (
		<Table
			stickyHeader={stickyHeader}
			hoverRow
			variant="plain"
			borderAxis="xBetween"
		>
			<thead>
				<TaskTableHeadRow headers={headers} />
			</thead>
			<tbody>
				{rows.map((row) => (
					<TaskTableRow key={row.id} onSelect={onRowSelect} row={row} />
				))}
			</tbody>
		</Table>
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
	onSelect: RowSelectHandler;
}

export function TaskTableRow({ row, onSelect }: TaskTableRowProps) {
	const handleRowClick: MouseEventHandler<HTMLTableRowElement> = () => {
		onSelect(row.original);
	};

	const handleRowKeyPress = (
		event: React.KeyboardEvent<HTMLTableRowElement>,
	) => {
		if (event.key === "Enter" || event.key === " ") {
			onSelect(row.original);
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
