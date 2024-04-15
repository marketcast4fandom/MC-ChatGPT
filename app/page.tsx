'use client'
import { Amplify } from 'aws-amplify';
import { signInWithRedirect, getCurrentUser, AuthUser } from 'aws-amplify/auth';
import { Hub } from "aws-amplify/utils";
import awsExports from '../app/aws-exports';

import {
  fetchAuthSession,
  CredentialsAndIdentityIdProvider,
  CredentialsAndIdentityId,
  GetCredentialsOptions,
  AuthTokens,
} from 'aws-amplify/auth';
import { CognitoIdentity } from '@aws-sdk/client-cognito-identity';
const cognitoidentity = new CognitoIdentity({
  region: awsExports.aws_project_region,
});

// Note: The custom provider class must implement CredentialsAndIdentityIdProvider
class CustomCredentialsProvider implements CredentialsAndIdentityIdProvider {

  // Example class member that holds the login information
  federatedLogin?: {
    domain: string,
    token: string
  };

  // Custom method to load the federated login information
  loadFederatedLogin(login?: typeof this.federatedLogin) {
    // You may also persist this by caching if needed
    this.federatedLogin = login;
  }

  async getCredentialsAndIdentityId(
    getCredentialsOptions: GetCredentialsOptions
  ): Promise<CredentialsAndIdentityId | undefined> {
    try {

      // You can add in some validation to check if the token is available before proceeding
      // You can also refresh the token if it's expired before proceeding

      const getIdResult = await cognitoidentity.getId({
        // Get the identityPoolId from config
        IdentityPoolId: awsExports.aws_cognito_identity_pool_id,
        Logins: { [this.federatedLogin!.domain]: this.federatedLogin!.token },
      });

      const cognitoCredentialsResult = await cognitoidentity.getCredentialsForIdentity({
        IdentityId: getIdResult.IdentityId,
        Logins: { [this.federatedLogin!.domain]: this.federatedLogin!.token },
      });

      const credentials: CredentialsAndIdentityId = {
        credentials: {
          accessKeyId: cognitoCredentialsResult.Credentials?.AccessKeyId!,
          secretAccessKey: cognitoCredentialsResult.Credentials?.SecretKey!,
          sessionToken: cognitoCredentialsResult.Credentials?.SessionToken!,
          expiration: cognitoCredentialsResult.Credentials?.Expiration!,
        },
        identityId: getIdResult.IdentityId,
      };
      return credentials;
    } catch (e) {
      console.log('Error getting credentials: ', e);
    }
  }
  // Implement this to clear any cached credentials and identityId. This can be called when signing out of the federation service.
  clearCredentialsAndIdentityId(): void {}
}

// Create an instance of your custom provider
const customCredentialsProvider = new CustomCredentialsProvider();
Amplify.configure(awsExports, {
  Auth: {
    // Supply the custom credentials provider to Amplify
    credentialsProvider: customCredentialsProvider
  },
});

import { Home } from "./components/home";
import { getServerSideConfig } from "./config/server";
const serverConfig = getServerSideConfig();

export default async function App() {

    Hub.listen("auth", ({ payload }) => {
        switch (payload.event) {
            case "signInWithRedirect":
                const user = getCurrentUser();
                console.log(user);
                return(
                    <><Home /></>
                )
                break;
            case "signInWithRedirect_failure":
                // handle sign in failure
                console.log(payload.event);
                break;
            case "customOAuthState":
                const state = payload.data; // this will be customState provided on signInWithRedirect function
                console.log(state);
                break;
      }
    });

    const signIn = () => {
        signInWithRedirect()
        return(
            <div />
        )
    }

    return (
        <div>
            { signIn() }
        </div>
    );
}

