'use client';
import '@aws-amplify/ui-react/styles.css';
import ConfigureAmplifyClientSide from './ConfigureAmplify';
import { signInWithRedirect, AuthError, signOut, getCurrentUser } from 'aws-amplify/auth';
import { Hub } from "aws-amplify/utils";
import { Home } from "./components/home";

export default async function App() {

    const home_page = (<><ConfigureAmplifyClientSide /><Home/></>);
    const error_page = (<><ConfigureAmplifyClientSide />Site Unavailable</>);
    const test_page_1 = (<><ConfigureAmplifyClientSide />Test Page 1</>);
    const test_page_2 = (<><ConfigureAmplifyClientSide />Test Page 2</>);

    // useEffect(() => {
    //     Hub.listen('auth', ({ payload }) => {
    //         console.log(payload.event)
    //         switch (payload.event) {
    //             case 'signedIn':
    //                 console.log('user have been signedIn successfully.');
    //                 setPage(home_page)
    //                 break;
    //             case 'signedOut':
    //                 console.log('user have been signedOut successfully.');
    //                 setPage(error_page)
    //                 break;
    //             case 'tokenRefresh':
    //                 console.log('auth tokens have been refreshed.');
    //                 setPage(home_page)
    //                 break;
    //             case 'tokenRefresh_failure':
    //                 console.log('failure while refreshing auth tokens.');
    //                 setPage(error_page)
    //                 break;
    //             case 'signInWithRedirect':
    //                 console.log('signInWithRedirect API has successfully been resolved.');
    //                 setPage(home_page)
    //                 break;
    //             case 'signInWithRedirect_failure':
    //                 console.log('failure while trying to resolve signInWithRedirect API.');
    //                 setPage(error_page)
    //                 break;
    //             case 'customOAuthState':
    //                 console.log('custom state returned from CognitoHosted UI');
    //                 break;
    //         }
    //     });
    // });

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

    const signInUser = async (isAuthUser: boolean) => {
        if  (isAuthUser) {
            console.log(`signInUser 1: ${isAuthUser}`);
            return true;
        } else {
            try {
                await signInWithRedirect({
                    provider: {
                        custom: "MarketCastOkta"
                    },
                });
                console.log(`signInUser 2`);
                return true;
            } catch (error) {
                error instanceof AuthError && console.log(error.name, error.message, error.recoverySuggestion);
            }
            console.log(`signInUser 3`);
            return false;
        }
    }

    const handleSignIn = async () => {
        const userAuth = await isAuthUser();
        console.log(`userAuth: ${userAuth}`);
        const signedIn = await signInUser(userAuth);
        console.log(`signedIn: ${signedIn}`);
        if (signedIn) {
            // return home_page;
            return test_page_2;
        }
        // return error_page;
        return test_page_1;
    }

    return (
        await handleSignIn()
    );
}

