import { ShoppingBagIcon } from "lucide-react";
import clsx from "clsx";
import * as Checkout from "@/lib/checkout";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export const CartNavItem = async ({ channel }: { channel: string }) => {
	const checkoutId = await Checkout.getIdFromCookies(channel);
	const checkout = checkoutId ? await Checkout.find(checkoutId) : null;

	const lineCount = checkout ? checkout.lines.reduce((result, line) => result + line.quantity, 0) : 0;
	// TODO Cart is disabled
	if (true) {
		return null;
	}
	// TODO Cart feature is disabled
	return (
		<LinkWithChannel href="/cart" className="relative flex items-center" data-testid="CartNavItem">
			<ShoppingBagIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
			{lineCount > 0 ? (
				<div
					className={clsx(
						"absolute bottom-0 right-0 -mb-2 -mr-2 flex h-4 flex-col items-center justify-center rounded bg-neutral-900 text-xs font-medium text-white",
						lineCount > 9 ? "w-[3ch]" : "w-[2ch]",
					)}
				>
					{lineCount}{" "}
					<span className="sr-only">
						{lineCount}{" "}
						{lineCount > 1 ? "artículos en el carrito, ver carrito" : "artículo en el carrito, ver carrito"}
					</span>
				</div>
			) : (
				<span className="sr-only">0 artículos en el carrito</span>
			)}
		</LinkWithChannel>
	);
};
