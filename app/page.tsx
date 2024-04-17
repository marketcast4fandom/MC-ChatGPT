'use client';
import React, { useEffect, useState } from "react";
import '@aws-amplify/ui-react/styles.css';
import ConfigureAmplifyClientSide from './ConfigureAmplify';
import { signInWithRedirect, AuthError, signOut, getCurrentUser } from 'aws-amplify/auth';
import { Hub } from "aws-amplify/utils";
import { Home } from "./components/home";

export default async function App() {

    const home_page = (<><Home/></>)
    const error_page = (<>Site Unavailable</>)
    const [page, setPage] = useState(error_page);

    async function currentAuthenticatedUser() {
        try {
            const { username, userId } = await getCurrentUser();
            console.log(`The username: ${username}`);
            console.log(`The userId: ${userId}`);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        Hub.listen('auth', ({ payload }) => {
            console.log(payload.event)
            switch (payload.event) {
                case 'signedIn':
                    console.log('user have been signedIn successfully.');
                    setPage(home_page)
                    break;
                case 'signedOut':
                    console.log('user have been signedOut successfully.');
                    setPage(error_page)
                    break;
                case 'tokenRefresh':
                    console.log('auth tokens have been refreshed.');
                    setPage(home_page)
                    break;
                case 'tokenRefresh_failure':
                    console.log('failure while refreshing auth tokens.');
                    setPage(error_page)
                    break;
                case 'signInWithRedirect':
                    console.log('signInWithRedirect API has successfully been resolved.');
                    setPage(home_page)
                    break;
                case 'signInWithRedirect_failure':
                    console.log('failure while trying to resolve signInWithRedirect API.');
                    setPage(error_page)
                    break;
                case 'customOAuthState':
                    console.log('custom state returned from CognitoHosted UI');
                    break;
            }
        });
    });

    async function handleSignIn() {
        await currentAuthenticatedUser()
        try {
            await signInWithRedirect({
                provider: {
                    custom: "MarketCastOkta"
                },
            });
        } catch (error) {
            error instanceof AuthError && console.log(error.name, error.message, error.recoverySuggestion)
            // if (error instanceof AuthError && error.name === 'UserAlreadyAuthenticatedException') {
            //     setPage(home_page)
            // } else {
            //     setPage(error_page)
            // }
        }
        return(page)
    }

    return (
        <>
            <ConfigureAmplifyClientSide />
            { await handleSignIn() }
        </>
    );
}

