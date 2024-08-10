import type { Task } from "@/types";
import {
	type OnChangeFn,
	type VisibilityState,
	createColumnHelper,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<Task>();

export const columns = [
	columnHelper.accessor("id", {
		header: "ID",
		cell: (info) => info.getValue(),
		filterFn: "includesString",
	}),
	columnHelper.accessor("title", {
		header: "Title",
		cell: (info) => info.getValue(),
		filterFn: "includesString",
	}),
	columnHelper.accessor("state", {
		header: "State",
		cell: (info) => info.getValue(),
		meta: {
			filterVariant: "select",
		},
	}),
	columnHelper.accessor("workItemType", {
		header: "Work Item Type",
		cell: (info) => info.getValue(),
		meta: {
			filterVariant: "select",
		},
	}),
	columnHelper.accessor("assignedTo", {
		header: "Assigned To",
		cell: (info) => {
			const newValue = String(info.getValue() ?? "").replace(/\s*<[^>]*>/g, "");
			console.log("-> assignedTo", newValue);
			return newValue;
		},
		filterFn: "includesString",
	}),
	columnHelper.accessor("tags", {
		header: "Tags",
		cell: (row) => row.getValue(),
		filterFn: "includesString",
	}),
];

export const columnVisibility: VisibilityState = {
	id: false,
	title: true,
	state: true,
	workItemType: true,
	assignedTo: true,
	tags: false,
};

export interface GlobalFilterState {
	value: string;
	onChange: OnChangeFn<string>;
}

export function useTaskTable(data: Task[], globalFilter?: GlobalFilterState) {
	return useReactTable<Task>({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getRowId: (row) => row.id,
		state: {
			globalFilter: globalFilter?.value,
			columnVisibility,
		},
		onGlobalFilterChange: globalFilter?.onChange,
	});
}
