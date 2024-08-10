import type {
  Column,
  ColumnMeta,
  RowData,
  VisibilityState,
} from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "select";
  }
}

export interface Task {
  id: string;
  workItemType: string;
  title: string;
  assignedTo: string;
  state: string;
  tags?: string;
  description?: string;
}
