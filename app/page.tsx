'use client'
import { Amplify } from 'aws-amplify';
import { signInWithRedirect, getCurrentUser, AuthUser } from 'aws-amplify/auth';
import { Hub } from "aws-amplify/utils";
import awsExports from '../src/aws-exports';

import { Home } from "./components/home";
import { getServerSideConfig } from "./config/server";
const serverConfig = getServerSideConfig();

export default async function App() {

    Hub.listen("auth", ({ payload }) => {
        switch (payload.event) {
            case "signInWithRedirect":
                const user = getCurrentUser();
                console.log(user);
                return(
                    <><Home /></>
                )
                break;
            case "signInWithRedirect_failure":
                // handle sign in failure
                console.log(payload.event);
                break;
            case "customOAuthState":
                const state = payload.data; // this will be customState provided on signInWithRedirect function
                console.log(state);
                break;
      }
    });

    const openSaml = () => {
//         if (typeof window !== "undefined") {
//             window.location.href(url);
//         }
        return(
            <script type="text/javascript">
                const url = "https://chatmc.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=i72c9bfndnimh63o0nuoalvrq&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fchatgpt-dev.marketcast.ninja%2F";
                window.location.href(url);
            </script>
        );
    };

    return (
        <div>
            { openSaml() }
        </div>
    );
}

