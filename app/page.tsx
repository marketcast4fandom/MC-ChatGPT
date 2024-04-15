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
                const url = https%3A%2F%2Fchatmc.auth.us-east-1.amazoncognito.com%2Foauth2%2Fauthorize%3Fclient_id%3Di72c9bfndnimh63o0nuoalvrq&response_type%3Dcode&scope%3Daws.cognito.signin.user.admin%2Bemail%2Bopenid%2Bphone%2Bprofile&redirect_uri%3Dhttps%3A%2F%2Fchatgpt-dev.marketcast.ninja%2F;
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

