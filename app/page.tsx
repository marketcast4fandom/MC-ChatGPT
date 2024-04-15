'use client'
import React, { useEffect, useState } from "react";
import { Amplify } from 'aws-amplify';
import { signInWithRedirect, signOut, getCurrentUser } from 'aws-amplify/auth';
import { Hub } from "aws-amplify/utils";
import awsExports from '../src/aws-exports';
Amplify.configure(awsExports);

import { Analytics } from "@vercel/analytics/react";

import { Home } from "./components/home";

import { getServerSideConfig } from "./config/server";

const serverConfig = getServerSideConfig();

export default async function App() {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [customState, setCustomState] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
//           getUser();
          break;
        case "signInWithRedirect_failure":
          console.log("An error has ocurred during the OAuth flow.");
          break;
        case "customOAuthState":
//           setCustomState(payload.data); // this is the customState provided on signInWithRedirect function
          break;
      }
    });
//     getUser();
    return unsubscribe;
  }, []);

//   const getUser = async () => {
//     try {
//       const currentUser = await getCurrentUser();
//       setUser(currentUser);
//     } catch (error) {
//       console.error(error);
//       console.log("Not signed in");
//     }
//   };

  return (
    <>
      {signInWithRedirect({ customState: "MarketCastOkta"})}
      <Home />
    </>
  );
}

