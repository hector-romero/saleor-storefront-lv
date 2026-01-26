import { useCallback, useMemo } from "react";
import { type ErrorCode } from "@/checkout/lib/globalTypes";

export const errorMessages = {
	invalid: "Valor inválido",
	required: "Campo obligatorio",
	unique: "El valor debe ser único",
	emailInvalid: "El correo electrónico no es válido",
	passwordAtLeastCharacters: "La contraseña debe tener al menos 8 caracteres",
	passwordTooShort: "La contraseña proporcionada es demasiado corta. La longitud mínima es de 8 caracteres.",
	passwordTooSimilar: "La contraseña proporcionada es demasiado similar a la anterior.",
	passwordTooCommon: "La contraseña proporcionada es demasiado común. Usa algo más seguro.",
	passwordInvalid: "La contraseña proporcionada no es válida.",
	quantityGreaterThanLimit: "La cantidad seleccionada excede el límite permitido.",
	insufficientStock: "No hay suficiente stock del artículo seleccionado.",
	invalidCredentials: "Credenciales inválidas.",
	missingFields: "Faltan campos en el formulario de dirección: ",
} satisfies Record<ErrorCode, string>;

export type ErrorMessages = Record<ErrorCode, string>;

export const useErrorMessages = <TKey extends string = ErrorCode>(customMessages?: Record<TKey, string>) => {
	const messagesToUse = customMessages || errorMessages;

	const getMessageByErrorCode = useCallback(
		(errorCode: string) => {
			const formattedMessage = messagesToUse[errorCode as keyof typeof messagesToUse];
			if (!formattedMessage) {
				console.warn(`Falta traducción: ${errorCode}`);
				return "";
			}
			return formattedMessage;
		},
		[messagesToUse],
	);

	const translatedErrorMessages = useMemo(
		() =>
			Object.keys(messagesToUse).reduce(
				(result, key) => ({
					...result,
					[key]: getMessageByErrorCode(key as TKey),
				}),
				{} as Record<TKey, string>,
			),
		[getMessageByErrorCode, messagesToUse],
	);

	return {
		errorMessages: translatedErrorMessages,
		getMessageByErrorCode,
	};
};
