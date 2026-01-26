"use client";

import { usePathname } from "next/navigation";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

const companyName = "VECTRA";

export const Logo = () => {
	const pathname = usePathname();

	if (pathname === "/") {
		return (
			<h1 className="flex items-center font-bold" aria-label="inicio">
				{companyName}
			</h1>
		);
	}
	return (
		<div className="flex items-center font-bold">
			<LinkWithChannel aria-label="inicio" href="/">
				{companyName}
			</LinkWithChannel>
		</div>
	);
};
