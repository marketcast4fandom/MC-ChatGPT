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
// import { Hub } from "aws-amplify/utils";
import awsExports from '../src/aws-exports';
//
import { Home } from "./components/home";
// import { getServerSideConfig } from "./config/server";
// const serverConfig = getServerSideConfig();
//
export default async function App() {

//     Hub.listen("auth", ({ payload }) => {
//         switch (payload.event) {
//             case "signInWithRedirect":
//                 const user = getCurrentUser();
//                 console.log(user);
//                 return(
//                     <><Home /></>
//                 )
//                 break;
//             case "signInWithRedirect_failure":
//                 // handle sign in failure
//                 console.log(payload.event);
//                 break;
//             case "customOAuthState":
//                 const state = payload.data; // this will be customState provided on signInWithRedirect function
//                 console.log(state);
//                 break;
//       }
//     });
//
    const provider = {
      custom: 'MarketCastOkta'
    }

    function handleSignInClick() {
        console.log("pre signInWithRedirect")
        console.log(awsExports)
        signInWithRedirect({provider: provider});
        console.log("post signInWithRedirect")
        return(<><Home /></>)
    }

    return (
        <div>
            <ConfigureAmplifyClientSide />
            { handleSignInClick() }
        </div>
    );
}

