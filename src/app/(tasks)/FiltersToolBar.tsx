import { useTasksContext } from "@/app/(tasks)/TasksContext";
import { FilterFormControl } from "@/components/FilterField";
import { Grid } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";

export default function FiltersToolBar() {
	const { tasksTable, visibleFilters } = useTasksContext();
	const headers = tasksTable.getFlatHeaders();

	return visibleFilters ? (
		<Sheet variant="soft" sx={{ padding: 2 }}>
			<Grid container spacing={2} sx={{ flexGrow: 1 }}>
				{headers.map((header) => (
					<Grid key={header.id} xs={12} sm={6} md={3}>
						<FilterFormControl header={header} />
					</Grid>
				))}
			</Grid>
		</Sheet>
	) : null;
}
