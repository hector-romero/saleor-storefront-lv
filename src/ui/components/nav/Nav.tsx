import { Suspense } from "react";
import { UserMenuContainer } from "./components/UserMenu/UserMenuContainer";
import { CartNavItem } from "./components/CartNavItem";
import { NavLinks } from "./components/NavLinks";
import { MobileMenu } from "./components/MobileMenu";
import { SearchBar } from "./components/SearchBar";

export const Nav = ({ channel }: { channel: string }) => {
	return (
		<nav
			className="ml-[-100%] flex w-auto gap-4 md:ml-0 md:w-full lg:gap-6"
			aria-label="Navegacion principal"
		>
			<ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
				<NavLinks channel={channel} />
			</ul>
			<div className="ml-auto flex items-center justify-center gap-4 whitespace-nowrap lg:gap-8">
				<div className="hidden lg:flex">
					<SearchBar channel={channel} />
				</div>
				<div className="hidden md:flex">
					<Suspense fallback={<div className="w-8" />}>
						<UserMenuContainer />
					</Suspense>
				</div>
			</div>
			<div className="hidden items-center md:flex">
				<Suspense fallback={<div className="w-6" />}>
					<CartNavItem channel={channel} />
				</Suspense>
			</div>
			<Suspense>
				<MobileMenu>
					<div className="ml-auto flex w-full items-center justify-center gap-4 whitespace-nowrap lg:gap-8">
						<div className="flex w-full">
							<SearchBar channel={channel} />
						</div>
						<div className="flex">
							<Suspense fallback={<div className="w-8" />}>
								<UserMenuContainer />
							</Suspense>
						</div>
						<div className="flex items-center">
							<Suspense fallback={<div className="w-6" />}>
								<CartNavItem channel={channel} />
							</Suspense>
						</div>
					</div>
					{/*<SearchBar channel={channel} />*/}
					<NavLinks channel={channel} />
				</MobileMenu>
			</Suspense>
		</nav>
	);
};
