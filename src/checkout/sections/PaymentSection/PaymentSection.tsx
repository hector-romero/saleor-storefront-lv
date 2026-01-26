import { PaymentMethods } from "./PaymentMethods";
import { Divider } from "@/checkout/components/Divider";
import { Title } from "@/checkout/components/Title";

export const PaymentSection = () => {
	return (
		<>
			<Divider />
			<div className="py-4" data-testid="paymentMethods">
				<Title>Métodos de pago</Title>
				<PaymentMethods />
			</div>
		</>
	);
};
