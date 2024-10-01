import { useEffect, useState } from "react";
import { useGetUserQuery } from "../../hooks/useGetUserQuery";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";

function PaymentCallback() {
    const [isUserRehydrated, setIsUserRehydrated] = useState(false);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const property = urlParams.get('from');
    const device = urlParams.get('device');
    const status = urlParams.get('redirect_status');

    const { loading, error, data } = useGetUserQuery(device ?? '');
    const dispatch = useDispatch();
    const userOffers = useSelector((state: RootState) => state.users.user.offers);

    useEffect(() => {
        const rehydrateUser = async () => {
            if (loading) {
                console.log('Loading user data...');
                return;
            }

            if (error) {
                console.log('Login failed with GraphQL errors:', error);
                return;
            }

            if (data) {
                setIsUserRehydrated(true);
            }
        };

        if (status === 'succeeded' && property) {
            rehydrateUser();
        } else {
            window.location.href = 'error';
        }
    }, [loading, error, data, status, property, dispatch]);

    useEffect(() => {
        // Perform redirect once Redux store is updated
        if (isUserRehydrated && userOffers && status === 'succeeded' && property) {

            window.location.href = `${property}?status=${status}`;
        }
    }, [isUserRehydrated, userOffers, status, property]);

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
