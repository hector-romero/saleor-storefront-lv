"use client";

import { usePathname } from "next/navigation";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

const companyName = "VECTRA";

export const Logo = () => {
	const pathname = usePathname();

	if (pathname === "/") {
		return (
			<h1 className="flex w-full items-center text-xl font-bold md:w-auto" aria-label="inicio">
				{companyName}
			</h1>
		);
	}
	return (
		<div className="flex w-full items-center text-xl font-bold md:w-auto">
			<LinkWithChannel aria-label="inicio" className="w-full items-center text-center" href="/">
				{companyName}
			</LinkWithChannel>
		</div>
	);
};
