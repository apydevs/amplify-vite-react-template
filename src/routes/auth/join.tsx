
import SignupStep1 from "../../components/signIn/step1.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import SignupStep0 from "../../components/signIn/step0.tsx";
import Step2GeneralBuyer from "../../components/signIn/step2Buyer.tsx";
const JoinComponent = () => {
    const step = useSelector((state: RootState) => state.counter.value); // Make sure the path matches your actual state structure

    if (step === 0) {
        return <SignupStep0 />;
    }
    if (step === 1) {
        return <SignupStep1 />;
    }

    // general buyers account setup
    if (step === 2) {
        return <Step2GeneralBuyer />;
    }

    // agents and other account types






    // const handleLogin = async () => {
    //     setFormError(''); // Reset the form error
    //
    //     if(email.length == 0 || password.length == 0){
    //
    //         setFormError("Please login using your details.");
    //         return
    //     }
    //
    //     try {
    //         // Trigger the mutation with correct variables
    //         const { data, errors } = await attemptUserLogin({
    //             variables: {
    //                 email: email,
    //                 password: password,
    //                 device_name: deviceName,
    //             },
    //         });
    //
    //
    //         // Handle GraphQL errors
    //         if (errors && errors.length > 0) {
    //             console.log('Login failed with GraphQL errors:', errors);
    //             return; // Exit early on errors
    //         }
    //
    //         // Safely access the loginUser and user data
    //         const loginResponse = data?.loginUser;
    //         const user = loginResponse?.user;
    //
    //         // If user exists and has a token, login was successful
    //         if (user && user.token) {
    //             console.log('Login successful, token:', user.token);
    //
    //             // Dispatch user details to the store
    //             dispatch(setUserDetails({
    //                 email: user.email,
    //                 name: user.name,
    //                 token: user.token,
    //                 account: user.account.type,
    //             }));
    //
    //             // Dispatch user locations
    //             dispatch(setLocations({ locations: user.locations }));
    //
    //             // Navigate to account page
    //             return navigate('/account');
    //         } else {
    //             // If user is null, display a general login failure message
    //             setFormError(loginResponse?.errors || "Login failed. Please check your credentials.");
    //         }
    //     } catch (error) {
    //         // Catch any unexpected errors
    //         if (error instanceof Error) {
    //             console.error('Login failed:', error.message);
    //             setFormError(error.message); // Set the error message
    //
    //             if(error.message == 'validation'){
    //                 setFormError("Login failed. Please check your credentials.");
    //             }
    //
    //         } else {
    //             setFormError("An unexpected error occurred.");
    //         }
    //     }
    // };






}


export default JoinComponent;
