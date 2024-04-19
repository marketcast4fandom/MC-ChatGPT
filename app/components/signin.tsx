import {Amplify} from "aws-amplify";
import {AuthError, getCurrentUser, signInWithRedirect} from "aws-amplify/auth";
import awsExports from '../../src/aws-exports';

Amplify.configure(awsExports);

export const dynamic = "force-dynamic";

export default async function OktaSignIn() {

    const isAuthUser = async () => {
        try {
            const { username, userId } = await getCurrentUser();
            console.log(`username ${username} is signed in`);
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
            return true;
        } else {
            try {
                console.log(`signInWithRedirect`);
                await signInWithRedirect({
                    provider: {
                        custom: "MarketCastOkta"
                    },
                });
            } catch (error) {
                error instanceof AuthError && console.log(error.name, error.message, error.recoverySuggestion);
                error instanceof TypeError && console.log(error.name, error.message);
            }
            isAuth = await isAuthUser();
            return isAuth;
        }
    }

    return await signInUser()
}
