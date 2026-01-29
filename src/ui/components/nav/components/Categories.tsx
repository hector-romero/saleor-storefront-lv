import { NavLink } from "./NavLink";

export type Tree = {
	id: string;
	name: string;
	slug: string;
	children: Tree[];
};

export function buildCategoryTree(
	categories: { id: string; name: string; slug: string; parent?: { id: string } | null }[],
	explicitCategorySlugs: Set<string>,
): Tree[] {
	const byId = new Map<string, Tree>();
	const parentById = new Map<string, string | null>();

	// 1) Create nodes
	for (const c of categories) {
		byId.set(c.id, { id: c.id, name: c.name, slug: c.slug, children: [] });
		parentById.set(c.id, c.parent?.id ?? null);
	}

	// 2) Attach children (attach everything first)
	for (const c of categories) {
		const parentId = c.parent?.id;
		if (parentId && byId.has(parentId)) {
			byId.get(parentId)!.children.push(byId.get(c.id)!);
		}
	}

	// 3) Collect roots with “lifting” of explicit nodes
	const roots: Tree[] = [];

	for (const c of categories) {
		const node = byId.get(c.id)!;
		const parentId = parentById.get(c.id);

		const isRoot = !parentId || !byId.has(parentId);
		if (!isRoot) continue;

		if (explicitCategorySlugs.has(node.slug)) {
			// lift children to roots
			roots.push(...node.children);
		} else {
			roots.push(node);
		}
	}

	// 4) Recursively remove explicit nodes and lift their children
	function filterAndLift(nodes: Tree[]): Tree[] {
		const out: Tree[] = [];
		for (const n of nodes) {
			const filteredChildren = filterAndLift(n.children);

			if (explicitCategorySlugs.has(n.slug)) {
				// remove this node, lift its children into current level
				out.push(...filteredChildren);
			} else {
				out.push({ ...n, children: filteredChildren });
			}
		}
		return out;
	}

	return filterAndLift(roots);
}

export function CategoryLinks({ tree, depth = 0 }: { tree: Tree[]; depth?: number }) {
	return (
		<>
			{tree.map((c) => (
				<NavLink
					key={c.id}
					href={`/categories/${c.slug}`}
					after={
						c.children.length > 0 && depth < 1 ? (
							<div className="group relative ml-2">
								<span className="text-neutral-400">▾</span>
								<div className="absolute left-0 top-full hidden rounded bg-white p-2 shadow group-hover:block">
									<CategoryLinks tree={c.children} depth={depth + 1} />
								</div>
							</div>
						) : null
					}
				>
					{c.name}
				</NavLink>
			))}
		</>
	);
}
