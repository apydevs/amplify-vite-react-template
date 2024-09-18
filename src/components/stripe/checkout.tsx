import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {ToastContainer} from "react-toastify";
import {goodUserNotification} from "../../utils/ValidationHandler.ts";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: `http://localhost:5173/redirect/assessment?from=${window.location.href}`,
            },
        });

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {


            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.

            const isValid = goodUserNotification([
                { value: 'Successful', name: 'Payment' },
            ]);

            if (isValid) {
                // Handle form submission logic if validation passes
            alert('sdfsdfsdfsdf')


            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <PaymentElement/>
                <button disabled={!stripe}>Submit</button>
            </form>
            <ToastContainer stacked/>
        </div>

    )
};

export default CheckoutForm;