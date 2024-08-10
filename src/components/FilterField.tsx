"use client";

import type { Task } from "@/types";
import { FormControl, FormLabel } from "@mui/joy";
import Input from "@mui/joy/Input";
import type InputProps from "@mui/joy/Input/InputProps";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import { type Column, type Header, flexRender } from "@tanstack/react-table";
import React, {
	type ChangeEvent,
	type SyntheticEvent,
	useMemo,
	useRef,
} from "react";

export function useSortedUniqueValues(column: Column<Task, unknown>) {
	const uniqueValues = column.getFacetedUniqueValues();

	return useMemo(() => {
		return Array.from(uniqueValues.keys()).sort();
	}, [uniqueValues]);
}

export interface FilterFieldProps {
	column: Column<Task, unknown>;
}

export function FilterField({ column }: FilterFieldProps) {
	const { filterVariant } = column.columnDef.meta ?? {};

	return filterVariant === "select" ? (
		<FilterSelect column={column} />
	) : (
		<FilterAutocomplete column={column} />
	);
}

export function FilterSelect({ column }: FilterFieldProps) {
	const sortedUniqueValues = useSortedUniqueValues(column);

	const handleChange = (_: SyntheticEvent | null, value: string | null) => {
		column.setFilterValue(value);
	};

	return (
		<Select onChange={handleChange} value={column.getFilterValue()?.toString()}>
			<Option value="">All</Option>
			{sortedUniqueValues.map((value) => (
				<Option value={value} key={value}>
					{value}
				</Option>
			))}
		</Select>
	);
}

export function FilterAutocomplete({ column }: FilterFieldProps) {
	const sortedUniqueValues = useSortedUniqueValues(column);
	const id = `${column.id}list`;

	return (
		<>
			<datalist id={id}>
				{sortedUniqueValues.map((value) => (
					<option value={value} key={value} />
				))}
			</datalist>
			<DebounceInput
				value={(column.getFilterValue() ?? "") as string}
				onChange={(value) => column.setFilterValue(value)}
				placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
				slotProps={{
					input: {
						list: id,
					},
				}}
			/>
		</>
	);
}

export interface DebounceProps extends Omit<InputProps, "onChange"> {
	onChange: (value: string) => void;
	debounceTimeout?: number;
}

export function DebounceInput({
	onChange,
	debounceTimeout = 500,
	...rest
}: InputProps & DebounceProps) {
	const timerRef = useRef<ReturnType<typeof setTimeout>>();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			onChange(event.target.value);
		}, debounceTimeout);
	};

	return <Input {...rest} onChange={handleChange} />;
}

export interface FilterFormControlProps {
	header: Header<Task, unknown>;
}

export function FilterFormControl({ header }: FilterFormControlProps) {
	return (
		<FormControl>
			<FormLabel>
				{flexRender(header.column.columnDef.header, header.getContext())}
			</FormLabel>
			<FilterField column={header.column} />
		</FormControl>
	);
}
