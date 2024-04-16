'use client';

import '@aws-amplify/ui-react/styles.css';
import ConfigureAmplifyClientSide from './ConfigureAmplify';
import { signInWithRedirect, AuthError } from 'aws-amplify/auth';
import { Hub } from "aws-amplify/utils";
import { Home } from "./components/home";

export default async function App() {

    Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          console.log('user have been signedIn successfully.');
          break;
        case 'signedOut':
          console.log('user have been signedOut successfully.');
          break;
        case 'tokenRefresh':
          console.log('auth tokens have been refreshed.');
          break;
        case 'tokenRefresh_failure':
          console.log('failure while refreshing auth tokens.');
          break;
        case 'signInWithRedirect':
          console.log('signInWithRedirect API has successfully been resolved.');
            return(
                <><Home /></>
            )
          // break;
        case 'signInWithRedirect_failure':
          console.log('failure while trying to resolve signInWithRedirect API.');
          break;
        case 'customOAuthState':
          console.log('custom state returned from CognitoHosted UI');
          break;
      }
    });

    async function handleSignIn() {
        try {
            await signInWithRedirect({
                provider: {
                    custom: "MarketCastOkta"
                },
            });
        } catch (error) {
            error instanceof AuthError && console.log(error.name, error.message, error.recoverySuggestion)
            if (error instanceof AuthError && error.name === 'UserAlreadyAuthenticatedException') {
                return(
                    <><Home /></>
                )
            }
        }
        return(<></>)
    }

    return (
        <>
            <ConfigureAmplifyClientSide />
            { handleSignIn() }
        </>
        // <main className="flex min-h-screen flex-col items-center justify-between p-24">
        //   <ConfigureAmplifyClientSide />
        //   <button onClick={handleSignIn}>Sign in with Okta</button>
        // </main>
    );
}

