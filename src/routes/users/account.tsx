
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from './../../../amplify_outputs.json'; // Adjust the path as needed
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

function Account() {
    return (
        <>

            <Authenticator>
            {({signOut, user}) => (

                <div className="container max-w-7xl mx-auto">
                  <h1>Account</h1>

                  <div>{user?.username}</div>
                    <button onClick={signOut}>Sign out</button>
              </div>
            )}
        </Authenticator>
        </>
    );
}

export default Account;
