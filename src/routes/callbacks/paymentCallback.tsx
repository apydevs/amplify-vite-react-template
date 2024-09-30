import {useEffect, useState} from "react";
import {useGetUserQuery} from "../../hooks/useGetUserQuery.ts";
import {useDispatch} from "react-redux";
import {setUserOffers} from "../../store/features/user/userSlice.ts";

function PaymentCallback() {
    const [isUserRehydrated, setIsUserRehydrated] = useState(false);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const property = urlParams.get('from');
    const device = urlParams.get('device');
    const status = urlParams.get('redirect_status');

    const { loading, error, data } = useGetUserQuery(device ?? '');
    const dispatch = useDispatch();

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
                console.log('User data:', data);
                // Dispatch user details to the store
                try {
                    await dispatch(setUserOffers({
                        offers: data.GetUser.offers
                    }));
                    setIsUserRehydrated(true); // Set rehydrated flag after store is updated
                } catch (err) {
                    console.error('Error dispatching user offers:', err);
                }
            }
        };

        if (status === 'succeeded' && property) {
            rehydrateUser();
        } else {
            window.location.href = 'error';
        }
    }, [loading, error, data, status, property, dispatch]);

    useEffect(() => {
        if (isUserRehydrated && status === 'succeeded' && property) {
            window.location.href = `${property}?status=${status}`;
        }
    }, [isUserRehydrated, status, property]);

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
