// 'use client';
import '@aws-amplify/ui-react/styles.css';
import ConfigureAmplifyClientSide from './ConfigureAmplify';
import { signInWithRedirect, AuthError, signOut, getCurrentUser } from 'aws-amplify/auth';
import { Hub } from "aws-amplify/utils";
import { Home } from "./components/home";
import { useRouter } from 'next/navigation'

export const dynamic = "force-dynamic";

export default async function App() {

    // const router = useRouter();
    // const home_page = (<div><ConfigureAmplifyClientSide /><Home/></div>);
    // const error_page = (<div><ConfigureAmplifyClientSide />Site Unavailable</div>);
    const test_page_signed_out = (<div><ConfigureAmplifyClientSide />Test Page 1 - Signed Out</div>);
    const test_page_signed_in = (<div><ConfigureAmplifyClientSide />Test Page 2 - Signed In</div>);

    Hub.listen('auth', ({ payload }) => {
        console.log(payload.event)
        switch (payload.event) {
            case 'signedIn':
                console.log('user have been signedIn successfully.');
                // setPage(home_page)
                break;
            case 'signedOut':
                console.log('user have been signedOut successfully.');
                // setPage(error_page)
                break;
            case 'tokenRefresh':
                console.log('auth tokens have been refreshed.');
                // setPage(home_page)
                break;
            case 'tokenRefresh_failure':
                console.log('failure while refreshing auth tokens.');
                // setPage(error_page)
                break;
            case 'signInWithRedirect':
                console.log('signInWithRedirect API has successfully been resolved.');
                // setPage(home_page)
                break;
            case 'signInWithRedirect_failure':
                console.log('failure while trying to resolve signInWithRedirect API.');
                // setPage(error_page)
                break;
            case 'customOAuthState':
                console.log('custom state returned from CognitoHosted UI');
                break;
        }
    });

    const isAuthUser = async () => {
        try {
            const { username, userId } = await getCurrentUser();
            console.log(`username: ${username}`);
            return true;
        } catch (error) {
            error instanceof AuthError && console.log(error.name, error.message, error.recoverySuggestion);
        }
        return false;
    }

    const signInUser = async () => {
        const isAuth = await isAuthUser();
        if (isAuth) {
            console.log(`signInUser 1: ${isAuth}`);
            return true;
        } else {
            try {
                await signInWithRedirect({
                    provider: {
                        custom: "MarketCastOkta"
                    },
                });
                console.log(`signInUser 2`);
            } catch (error) {
                error instanceof AuthError && console.log(error.name, error.message, error.recoverySuggestion);
            }
            console.log(`signInUser 3`);
            return isAuthUser();
        }
    }

    const handleSignIn = async () => {

        const signedIn = await signInUser();
        console.log(`signedIn: ${signedIn}`);
        if (signedIn) {
            // return home_page;
            console.log(`signedIn: test_page_signed_in`);
            return test_page_signed_in;
        } else {
            // return error_page;
            console.log(`signedIn: test_page_signed_out`);
            return test_page_signed_out;
        }
    }

    return (
        <div> { await handleSignIn() } </div>
    );
}

