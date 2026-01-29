import Link from "next/link";
import { NavLink } from "./NavLink";
import { executeGraphQL } from "@/lib/graphql";
import { MenuGetBySlugDocument } from "@/gql/graphql";
import { fetchAllCategories } from "@/ui/components/nav/components/fetchAllCategories";
import { CategoryLinks, buildCategoryTree } from "@/ui/components/nav/components/Categories";

export const NavLinks = async ({ channel }: { channel: string }) => {
	const [navLinks, categories] = await Promise.all([
		executeGraphQL(MenuGetBySlugDocument, {
			variables: { slug: "navbar", channel },
			revalidate: 60 * 60 * 24,
		}),
		fetchAllCategories(),
	]);

	const explicitCategorySlugs = new Set(
		navLinks.menu?.items?.map((item) => item.category?.slug).filter(Boolean),
	);

	const tree = buildCategoryTree(categories, explicitCategorySlugs);

	return (
		<>
			<NavLink href="/products">Todos</NavLink>
			{navLinks.menu?.items?.map((item) => {
				if (item.category) {
					return (
						<NavLink key={item.id} href={`/categories/${item.category.slug}`}>
							{item.category.name}
						</NavLink>
					);
				}
				if (item.collection) {
					return (
						<NavLink key={item.id} href={`/collections/${item.collection.slug}`}>
							{item.collection.name}
						</NavLink>
					);
				}
				if (item.page) {
					return (
						<NavLink key={item.id} href={`/pages/${item.page.slug}`}>
							{item.page.title}
						</NavLink>
					);
				}
				if (item.url) {
					return (
						<Link key={item.id} href={item.url}>
							{item.name}
						</Link>
					);
				}
				return null;
			})}

			<CategoryLinks tree={tree} />
		</>
	);
};
