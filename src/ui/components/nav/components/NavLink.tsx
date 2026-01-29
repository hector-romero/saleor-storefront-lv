"use client";

import clsx from "clsx";
import { type ReactElement, ReactNode } from "react";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import useSelectedPathname from "@/hooks/useSelectedPathname";

export function NavLink({
	href,
	children,
	after,
}: {
	href: string;
	children: ReactElement | string;
	after?: ReactNode;
}) {
	const pathname = useSelectedPathname();
	const isActive = pathname === href;

	return (
		<li className="inline-flex">
			<LinkWithChannel
				href={href}
				className={clsx(
					isActive ? "border-neutral-900 text-neutral-900" : "border-transparent text-neutral-500",
					"inline-flex items-center border-b-2 pt-px text-sm font-medium hover:text-neutral-700",
				)}
			>
				{children}
			</LinkWithChannel>
			{after}
		</li>
	);
}
