import { Amplify } from "aws-amplify";
import {AuthError, getCurrentUser, signInWithRedirect} from "aws-amplify/auth";
import awsExports from '../../src/aws-exports';
Amplify.configure(awsExports);

// // Need the following to work around a Cognito issue. See link for further details:
// // https://stackoverflow.com/questions/40219518/aws-cognito-unauthenticated-login-error-window-is-not-defined-js
// // @ts-ignore
// import WindowMock from 'window-mock';
// // @ts-ignore
// global.window = new WindowMock()

export const dynamic = "force-dynamic";

// import React, { Component } from 'react';
//
// export enum AuthStatus {
//   isLoggedIn = "isLoggedIn",
//   isNotLoggedIn = "isNotLoggedIn",
//   Uninitialized = "uninitialized"
// }
//
// export enum ProgressStatus {
//   InProgress = "InProgress",
//   Uninitialized = "Uninitialized",
//   Done = "Done",
//   Error = "Error"
// }
//
// class AuthenticationShell extends Component {
//
//   state = {
//     authStatus: AuthStatus.Uninitialized,
//     user: undefined
//   }
//
//   componentDidMount = () => {
//     // this function will launch when the component is mounted to the dom
//     this.getCurrentUser()
//   }
//
//   getCurrentUser = () => {
//     getCurrentUser().then(user => {
//       // if user is authenticated update authStatus & user state here
//       this.setState({
//         authStatus: AuthStatus.isLoggedIn,
//         user: user.username
//       })
//     }).catch(e => {
//       // if user is not authenticated update authStatus
//       this.setState({ authStatus: AuthStatus.isNotLoggedIn })
//     });
//   }
//
//   render() {
//     const { authStatus } = this.state;
//     switch (authStatus) {
//       case AuthStatus.isLoggedIn:
//         return (
//           <div>
//             isLoggedIn
//           </div>
//         )
//       case AuthStatus.isNotLoggedIn:
//         return (
//           <div>
//             isNotLoggedIn
//           </div>
//         )
//       default: return null;
//       // when authstatus is Uninitialized or not isLoggedIn and not isNotLoggedIn null will be rendered
//       // Rendering null while waiting on some async function is not ideal
//     }
//   }
// }
//
// export default AuthenticationShell;


export default async function OktaSignIn() {

    // const home_page = (<div><Home/></div>);
    // const error_page = (<div>Site Unavailable</div>);
    const test_page_signed_out = (<div>Test Page 1 - Signed Out</div>);
    const test_page_signed_in = (<div>Test Page 2 - Signed In</div>);

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
