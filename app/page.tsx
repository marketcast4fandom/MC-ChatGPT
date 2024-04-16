'use client';

import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import ConfigureAmplifyClientSide from './ConfigureAmplify';

// export default async function App({ signOut, user } : WithAuthenticatorProps) {
// // export function App({ signOut, user } : WithAuthenticatorProps) {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <ConfigureAmplifyClientSide />
//       <h1>Hello {user?.username}</h1>
//       <button onClick={signOut}>Sign out</button>
//     </main>
//   );
// }

// 'use client'
// import { Amplify } from 'aws-amplify';
import { signInWithRedirect, getCurrentUser, AuthUser } from 'aws-amplify/auth';
import { Hub } from "aws-amplify/utils";
import { Home } from "./components/home";
// import { getServerSideConfig } from "./config/server";
// const serverConfig = getServerSideConfig();
//
export default async function App() {

    // Hub.listen("auth", ({ payload }) => {
    //     switch (payload.event) {
    //         case "signInWithRedirect":
    //             console.log("signInWithRedirect");
    //             return(
    //                 <><Home /></>
    //             )
    //         case "signInWithRedirect_failure":
    //             // handle sign in failure
    //             console.log(payload.event);
    //             break;
    //         case "customOAuthState":
    //             const state = payload.data; // this will be customState provided on signInWithRedirect function
    //             console.log(state);
    //             break;
    //   }
    // });
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
          break;
        case 'signInWithRedirect_failure':
          console.log('failure while trying to resolve signInWithRedirect API.');
          break;
        case 'customOAuthState':
          console.log('custom state returned from CognitoHosted UI');
          break;
      }
    });

    function handleSignIn() {
        console.log('pre signInWithRedirect');
        signInWithRedirect({
            provider: {
                custom: "MarketCastOkta"
            },
        });
        console.log('post signInWithRedirect');
        return(<></>)
    }

    return (
        // <>
        //     <ConfigureAmplifyClientSide />
        //     { handleSignIn() }
        // </>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <ConfigureAmplifyClientSide />
          <button onClick={handleSignIn}>Sign in with Okta</button>
        </main>

    );
}

