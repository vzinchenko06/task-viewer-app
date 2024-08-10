"use client";

import createCache, { type Options } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import { useServerInsertedHTML } from "next/navigation";
import { type PropsWithChildren, useState } from "react";

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902

function initThemeRegistryState(options?: Options) {
	const cache = createCache({ key: "joy", ...options });
	cache.compat = true;
	const prevInsert = cache.insert;
	let inserted: string[] = [];
	cache.insert = (...args) => {
		const serialized = args[1];
		if (cache.inserted[serialized.name] === undefined) {
			inserted.push(serialized.name);
		}
		return prevInsert(...args);
	};
	const flush = () => {
		const prevInserted = inserted;
		inserted = [];
		return prevInserted;
	};
	return { cache, flush };
}

interface ThemeRegistryProps {
	options?: Options;
}

export default function ThemeRegistry({
	options,
	children,
}: PropsWithChildren<ThemeRegistryProps>) {
	const [{ cache, flush }] = useState(() => initThemeRegistryState(options));

	useServerInsertedHTML(() => {
		const names = flush();
		if (names.length === 0) {
			return null;
		}
		let styles = "";
		for (const name of names) {
			styles += cache.inserted[name];
		}
		return (
			<style
				key={cache.key}
				data-emotion={`${cache.key} ${names.join(" ")}`}
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{
					__html: styles,
				}}
			/>
		);
	});

	return (
		<CacheProvider value={cache}>
			<CssVarsProvider>
				<CssBaseline />
				{children}
			</CssVarsProvider>
		</CacheProvider>
	);
}
