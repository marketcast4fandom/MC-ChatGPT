'use client'
import { Amplify } from 'aws-amplify';
import { signInWithRedirect } from 'aws-amplify/auth';
import awsExports from '../src/aws-exports';
Amplify.configure(awsExports);

import { Analytics } from "@vercel/analytics/react";

import { Home } from "./components/home";

import { getServerSideConfig } from "./config/server";

const serverConfig = getServerSideConfig();

export default async function App() {
    signInWithRedirect();
    return (
    <>
      <Home />
      {serverConfig?.isVercel && (
        <>
          <Analytics />
        </>
      )}
    </>
  );
}

