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
    let page = error_page;

    async function isAuthenticatedUser() {
        try {
            const { username, userId } = await getCurrentUser();
            console.log(`username: ${username}`);
            return true
        } catch (error) {
            error instanceof AuthError && console.log(error.name, error.message, error.recoverySuggestion)
        }
        return false
    }

    useEffect(() => {
        Hub.listen('auth', ({ payload }) => {
            console.log(payload.event)
            switch (payload.event) {
                case 'signedIn':
                    console.log('user have been signedIn successfully.');
                    page = home_page
                    break;
                case 'signedOut':
                    console.log('user have been signedOut successfully.');
                    page = error_page
                    break;
                case 'tokenRefresh':
                    console.log('auth tokens have been refreshed.');
                    page = home_page
                    break;
                case 'tokenRefresh_failure':
                    console.log('failure while refreshing auth tokens.');
                    page = error_page
                    break;
                case 'signInWithRedirect':
                    console.log('signInWithRedirect API has successfully been resolved.');
                    page = home_page
                    break;
                case 'signInWithRedirect_failure':
                    console.log('failure while trying to resolve signInWithRedirect API.');
                    page = error_page
                    break;
                case 'customOAuthState':
                    console.log('custom state returned from CognitoHosted UI');
                    break;
            }
        });
    });

    async function handleSignIn() {
        if  (!await isAuthenticatedUser()) {
            try {
                await signInWithRedirect({
                    provider: {
                        custom: "MarketCastOkta"
                    },
                });
            } catch (error) {
                error instanceof AuthError && console.log(error.name, error.message, error.recoverySuggestion)
            }
        } else {
            page = home_page
        }
        return (page)
    }

    return (
        <>
            <ConfigureAmplifyClientSide />
            { await handleSignIn() }
        </>
    );
}

