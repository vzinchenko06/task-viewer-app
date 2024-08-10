"use client";

import Sheet from "@mui/joy/Sheet";

interface SafeHTMLProps {
	html?: string;
}

export function SafeHtmlView({ html }: SafeHTMLProps) {
	return (
		<Sheet variant="soft" sx={{ padding: 2 }}>
			<div
				className="descroption-html"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: html ?? "" }}
			/>
		</Sheet>
	);
}
