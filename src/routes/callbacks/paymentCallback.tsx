import { useEffect } from "react";
import { useGetUserQuery } from "../../hooks/useGetUserQuery";


function PaymentCallback() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const property = urlParams.get('from');
    const device = urlParams.get('device');
    const { loading, error, data } = useGetUserQuery(device ?? '');

    useEffect(() => {


        console.log(queryString);


        const status = urlParams.get('redirect_status');

        async function rehydrateUser() {
            if (loading) {
                console.log('Loading user data...');
                return; // Wait until the loading is complete
            }

            if (error) {
                console.log('Login failed with GraphQL errors:', error);
                return; // Exit early on errors
            }

            if (data) {
                console.log('User data:', data);
                // You can also do any additional processing here, like saving data to context/store
            }
        }

        if (status === 'succeeded' && property) {
            // Rehydrate the user data
            rehydrateUser();

            // Redirect to the property URL after rehydrating user data
            //window.location.href = property;
        } else {
            window.location.href = 'error';
        }
    }, [loading, error, data]); // Dependencies added for useEffect to react to changes in loading, error, or data

    return (
        <div>
            {/* You can show a loader or a success/error message based on the loading state here */}
        </div>
    );
}

export default PaymentCallback;
