import { UserIcon } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { CurrentUserDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

function loginDisabled() {
	// Toggle here to enable/disable the user menu at runtime.
	// Using a function prevents the condition from being a compile-time constant
	// which can trigger build-time hoisting/optimizations in some bundlers.
	return true;
}

export async function UserMenuContainer() {
	if (loginDisabled()) {
		// Todo Login feature has been disabled
		return null;
	}
	const { me: user } = await executeGraphQL(CurrentUserDocument, {
		cache: "no-cache",
	});

	if (user) {
		return <UserMenu user={user} />;
	} else {
		return (
			<LinkWithChannel href="/login" className="h-6 w-6 flex-shrink-0">
				<UserIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
				<span className="sr-only">Iniciar sesión</span>
			</LinkWithChannel>
		);
	}
}
