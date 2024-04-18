'use client';
import '@aws-amplify/ui-react/styles.css';
import OktaSignIn from "@/app/signin";
// import ConfigureAmplifyClientSide from './ConfigureAmplify';
// import { signInWithRedirect, AuthError, signOut, getCurrentUser } from 'aws-amplify/auth';
// import { Hub } from "aws-amplify/utils";
// import { Home } from "./components/home";
// import { useRouter } from 'next/navigation'

// import { Amplify } from "aws-amplify";
// import awsExports from '../src/aws-exports';
// // Amplify.configure(awsExports, { ssr: true });
// Amplify.configure(awsExports);


// import dynamic from 'next/dynamic'
// const HomeWithNoSSR = dynamic(() => import('./components/home'), {
//   ssr: false
// })
// export default () => <DynamicComponentWithNoSSR />


export default async function App() {

    // const router = useRouter();
    // const home_page = (<div><ConfigureAmplifyClientSide /><Home/></div>);
    // const error_page = (<div><ConfigureAmplifyClientSide />Site Unavailable</div>);
    const test_page_signed_out = (<div>Test Page 1 - Signed Out</div>);
    const test_page_signed_in = (<div>Test Page 2 - Signed In</div>);

    // Hub.listen('auth', ({ payload }) => {
    //     console.log(payload.event)
    //     switch (payload.event) {
    //         case 'signedIn':
    //             console.log('user have been signedIn successfully.');
    //             // setPage(home_page)
    //             break;
    //         case 'signedOut':
    //             console.log('user have been signedOut successfully.');
    //             // setPage(error_page)
    //             break;
    //         case 'tokenRefresh':
    //             console.log('auth tokens have been refreshed.');
    //             // setPage(home_page)
    //             break;
    //         case 'tokenRefresh_failure':
    //             console.log('failure while refreshing auth tokens.');
    //             // setPage(error_page)
    //             break;
    //         case 'signInWithRedirect':
    //             console.log('signInWithRedirect API has successfully been resolved.');
    //             // setPage(home_page)
    //             break;
    //         case 'signInWithRedirect_failure':
    //             console.log('failure while trying to resolve signInWithRedirect API.');
    //             // setPage(error_page)
    //             break;
    //         case 'customOAuthState':
    //             console.log('custom state returned from CognitoHosted UI');
    //             break;
    //     }
    // });

        let page = test_page_signed_out
        const signedIn = await OktaSignIn()

        if (signedIn) {
            // return home_page;
            console.log(`signedIn: test_page_signed_in`);
            page = test_page_signed_in;
        } else {
            // return error_page;
            console.log(`signedIn: test_page_signed_out`);
        }

    return (
        <div> { page } </div>
    );
}

