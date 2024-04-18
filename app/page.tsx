'use client';
import '@aws-amplify/ui-react/styles.css';
import OktaSignIn from "@/app/signin";


export default function App() {

    return (
        <script>
            const signedIn = OktaSignIn();
            {/*if (signedIn) {*/}
            {/*    // return home_page;*/}
            {/*    console.log(`signedIn: test_page_signed_in`);*/}
            {/*    page = test_page_signed_in;*/}
            {/*} else {*/}
            {/*    // return error_page;*/}
            {/*    console.log(`signedIn: test_page_signed_out`);*/}
            {/*};*/}
        </script>
    );
}

