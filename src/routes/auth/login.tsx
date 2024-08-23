import { useState } from 'react';
import { useLoginUser } from "../../hooks/useUserLogin.ts";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../store/features/user/userSlice.ts";
import {useNavigate} from 'react-router-dom'
import {setLocations} from "../../store/features/locations/locationSlice.ts";

const LoginComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [deviceName] = useState('defaultDevice');
    const attemptUserLogin = useLoginUser();

    const handleLogin = async () => {
        try {
            // Trigger the mutation with correct variables
            const { data, errors } = await attemptUserLogin({
                variables: {
                    email: email,
                    password: password,
                    device_name: deviceName,
                }
            });

            // Handle GraphQL Errors if any
            if (errors && errors.length > 0) {
                console.log('Login failed with GraphQL errors:', errors);
                return; // Exit early
            }

            // Safely access the user object with optional chaining
            const user = data?.loginUser?.user;

            if (user) {
                console.log('Login successful, device:', user.token);
                dispatch(setUserDetails({
                    email : user.email,
                    name:user.name,
                    token:user.token
                }));

                console.log('user locations',user.locations)
                dispatch(setLocations({locations: user.locations}))

                return  navigate('/account');
            } else {
                // Handle the case where user is undefined
                console.log('Login failed: User object is undefined.');
            }

        } catch (error) {
            // Catch other unexpected errors
            if (error instanceof Error) {
                console.log('Login failed:', error.message);
            }
        }
    };


    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginComponent;
