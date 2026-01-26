import { draftMode } from "next/headers";
import Link from "next/link";

export const DraftModeNotification = async () => {
	if (!(await draftMode()).isEnabled) {
		return null;
	}

	return (
		<div className="fixed bottom-0 right-0 z-50 bg-red-100 px-8 py-2 text-red-700">
			Estás en modo borrador. Las solicitudes no están en caché.{" "}
			<Link className="underline" href="/api/draft/disable">
				Desactivar.
			</Link>
		</div>
	);
};
