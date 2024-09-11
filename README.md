# Task Viewer App

This is a small task viewer application built using **Tauri**, **Next.js**, **React**, **TypeScript**, **Bun**, and **Joy UI**. It allows users to upload a CSV file of tasks, display them in a table with sorting, filtering, search, and pagination functionalities, and view detailed task descriptions in a drawer or separate window.

## Features

- **CSV File Upload**: Upload a CSV file of tasks and display them in a styled table.
- **Filtering**: Filter tasks by any column (except `ID`) using search inputs.
- **Search**: Search across all columns with a global search feature.
- **Sorting**: Sort tasks by clicking on column headers.
- **Pagination**: Manage large datasets with pagination controls.
- **Task Details**: View detailed task information in a sliding drawer or open it in a separate window using Tauri's multi-window support.
- **HTML Content Display**: Safely render task descriptions containing HTML using a custom `SafeHTML` component, with Joy UI-styled elements.

## Tech Stack

- **Tauri**: Cross-platform framework for building desktop apps.
- **Next.js**: React framework with server-side rendering.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript for static typing.
- **Bun**: Fast JavaScript runtime that also serves as a package manager.
- **Joy UI**: A minimal UI component library built by MUI.

## Scripts
This project uses Bun as the package manager.

- To install the dependencies, run: ```bun install```
- Start the development server and Tauri's desktop app: ```bun dev```
- To build the project for production, use: ```bun build```

*You also can use `npm` or other package manager* 

## How to Use
Upload a CSV file: The app supports uploading CSV files with the following structure:
```csv
ID,Work Item Type,Title,Assigned To,State,Tags,Description
194253,Product Backlog Item,IFPS Connectivity,The Author,Proposed,IFPS,<div>Task description</div>
```
After uploading the CSV, the tasks will be displayed in a table with options to sort, filter, and search.
Click on a task row to open the task details in a drawer.
Use the "Open in New Window" button to view task details in a separate window.

## License
This project is licensed under the MIT License.
