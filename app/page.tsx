'use client'
import { Amplify } from 'aws-amplify';
import { signInWithRedirect, getCurrentUser, AuthUser } from 'aws-amplify/auth';
import { Hub } from "aws-amplify/utils";
import awsExports from '../src/aws-exports';
Amplify.configure(awsExports);

import { Home } from "./components/home";

import { getServerSideConfig } from "./config/server";

const serverConfig = getServerSideConfig();

export default async function App() {


  return (
    <>
      <Home />
    </>
  );
}

