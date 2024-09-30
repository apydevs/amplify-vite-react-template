import { useEffect } from "react";
import { useGetUserQuery } from "../../hooks/useGetUserQuery";


function PaymentCallback() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const property = urlParams.get('from');
    const device = urlParams.get('device');
    const status = urlParams.get('redirect_status');

    const { loading, error, data } = useGetUserQuery(device ?? '');

    useEffect(() => {
        const rehydrateUser = async () => {
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
        };

        if (status == 'succeeded' && property) {
            // Rehydrate the user data
            rehydrateUser();

            // Redirect to the property URL after rehydrating user data
            //window.location.href = property;
        } else {
            window.location.href = 'error';
        }
    }, [loading, error, data, status, property]); // Dependencies added for useEffect to react to changes in loading, error, data, status, or property

    return (
        <div>
            {loading ? (
                <p>Loading user data...</p>
            ) : error ? (
                <p>Error: Failed to load user data</p>
            ) : (
                <p>Data successfully loaded.</p>
            )}
        </div>
    );
}

export default PaymentCallback;
