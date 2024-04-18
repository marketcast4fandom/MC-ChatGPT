import { Amplify } from "aws-amplify";
import {AuthError, getCurrentUser, signInWithRedirect} from "aws-amplify/auth";
import awsExports from '../src/aws-exports';
Amplify.configure(awsExports);

// // Need the following to work around a Cognito issue. See link for further details:
// // https://stackoverflow.com/questions/40219518/aws-cognito-unauthenticated-login-error-window-is-not-defined-js
// // @ts-ignore
// import WindowMock from 'window-mock';
// // @ts-ignore
// global.window = new WindowMock()

export const dynamic = "force-dynamic";

export default async function OktaSignIn() {

       const isAuthUser = async () => {
        try {
            const { username, userId } = await getCurrentUser();
            console.log(`username: ${username}`);
            return true;
        } catch (error) {
            error instanceof AuthError && console.log(error.name, error.message, error.recoverySuggestion);
            error instanceof TypeError && console.log(error.name, error.message);
        }
        return false;
    }

    const signInUser = async () => {
        let isAuth = await isAuthUser();
        if (isAuth) {
            console.log(`signInUser 1: ${isAuth}`);
            return true;
        } else {
            try {
                console.log(`signInUser 2a`);
                await signInWithRedirect({
                    provider: {
                        custom: "MarketCastOkta"
                    },
                });
                console.log(`signInUser 2b`);
            } catch (error) {
                error instanceof AuthError && console.log(error.name, error.message, error.recoverySuggestion);
                error instanceof TypeError && console.log(error.name, error.message);
            }
            console.log(`signInUser 3`);
            isAuth = await isAuthUser();
            return isAuth;
        }
    }

      const signedIn = await signInUser();
      console.log(`signedIn: ${signedIn}`);
      return signedIn
}
