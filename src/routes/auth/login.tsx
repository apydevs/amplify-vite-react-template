
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from './../../../amplify_outputs.json'; // Adjust the path as needed
import '@aws-amplify/ui-react/styles.css';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { defaultStorage } from 'aws-amplify/utils';

cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);
Amplify.configure(outputs);
function App() {
    return (
        <div className="container max-w-7xl   mx-auto my-10">
            <div className="my-32">
             <Authenticator>
                {({ signOut, user }) => (
                    <main>
                        <h1>Hello {user?.username}</h1>
                        <button onClick={signOut}>Sign out</button>
                        {/* Render your components conditionally or as needed here */}
                    </main>
                )}
            </Authenticator>
            </div>

        </div>

    );
}

export default App;
