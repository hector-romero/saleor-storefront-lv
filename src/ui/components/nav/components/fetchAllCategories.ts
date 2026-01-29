import { executeGraphQL } from "@/lib/graphql";
import { CategoryListAllDocument, CategoryListAllQuery, CategoryListAllQueryVariables } from "@/gql/graphql";

type CategoryNode = {
	id: string;
	name: string;
	slug: string;
	parent?: { id: string } | null;
};

export async function fetchAllCategories(): Promise<CategoryNode[]> {
	const first = 100; // Saleor caps single fetches at 100
	let after: string | null = null;
	const all: CategoryNode[] = [];

	while (true) {
		const result = await executeGraphQL<CategoryListAllQuery, CategoryListAllQueryVariables>(
			CategoryListAllDocument,
			{
				variables: { first, after },
				revalidate: 60 * 60 * 24,
			},
		);
		const categories = result.categories as CategoryListAllQuery["categories"] | undefined;

		const edges = categories?.edges ?? [];
		for (const e of edges) {
			if (e?.node) {
				all.push(e.node as CategoryNode);
			}
		}

		const pageInfo = categories?.pageInfo;
		if (!pageInfo?.hasNextPage || !pageInfo.endCursor) {
			break;
		}
		after = pageInfo.endCursor;
	}

	return all;
}
