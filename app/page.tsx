'use client'
import { Amplify } from 'aws-amplify';
import { signInWithRedirect, getCurrentUser, AuthUser } from 'aws-amplify/auth';
import { Hub } from "aws-amplify/utils";
import awsExports from '../src/aws-exports';
Amplify.configure(awsExports);

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

    const signIn = () => {
        signInWithRedirect()
        return(
            <div />
        )
    }

    return (
        <div>
            { signIn() }
        </div>
    );
}

