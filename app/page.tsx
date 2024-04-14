'use client'
// import { useForm } from 'react-hook-form';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

import { Analytics } from "@vercel/analytics/react";

import { Home } from "./components/home";

import { getServerSideConfig } from "./config/server";

const serverConfig = getServerSideConfig();

export default async function App() {
  return (
    <Authenticator loginMechanisms={['MarketCastOkta']}>
        {({ signOut, user }) => (
            <>
              <Home />
              {serverConfig?.isVercel && (
                <>
                  <Analytics />
                </>
              )}
            </>
        )}
    </Authenticator>
  );
}
