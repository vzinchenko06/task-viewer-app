import { Inter } from "next/font/google";
import "./global.css";
import ThemeRegistry from "@/app/ThemeRegistry";
import type { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeRegistry>{children}</ThemeRegistry>
			</body>
		</html>
	);
}
