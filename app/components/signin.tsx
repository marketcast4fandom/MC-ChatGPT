import { Amplify } from "aws-amplify";
import { AuthError, getCurrentUser, signInWithRedirect } from "aws-amplify/auth";
import awsExports from '../../src/aws-exports';

// Configure Amplify with our AWS exports
console.log("[Auth] Configuring Amplify with AWS exports");
Amplify.configure(awsExports);

export const dynamic = "force-dynamic";

export default async function OktaSignIn() {
    console.log("[Auth] Starting OktaSignIn process");

    // Check if user is already authenticated
    const isAuthUser = async () => {
        try {
            const { username, userId } = await getCurrentUser();
            console.log(`[Auth] User ${username} is already signed in with ID ${userId}`);
            return true;
        } catch (error) {
            if (error instanceof AuthError) {
                console.error(`[Auth] AuthError: ${error.name}, ${error.message}, ${error.recoverySuggestion}`);
            } else if (error instanceof TypeError) {
                console.error(`[Auth] TypeError: ${error.name}, ${error.message}`);
            } else {
                console.error(`[Auth] Unknown error checking authentication:`, error);
            }
        }
        console.log("[Auth] No authenticated user found");
        return false;
    }

    // Sign in the user if not already authenticated
    const signInUser = async () => {
        console.log("[Auth] Checking if user is already authenticated");
        let isAuth = await isAuthUser();
        
        if (isAuth) {
            console.log("[Auth] User is already authenticated, returning true");
            return true;
        } else {
            console.log("[Auth] User is not authenticated, attempting sign in with redirect");
            try {
                await signInWithRedirect({
                    provider: {
                        custom: "MarketCastOkta"
                    },
                });
                // Note: The code below won't execute immediately after redirect
                console.log("[Auth] Redirect initiated, this code runs after redirect back");
                isAuth = await isAuthUser();
                return isAuth;
            } catch (error) {
                if (error instanceof AuthError) {
                    console.error(`[Auth] AuthError during redirect: ${error.name}, ${error.message}, ${error.recoverySuggestion}`);
                } else if (error instanceof TypeError) {
                    console.error(`[Auth] TypeError during redirect: ${error.name}, ${error.message}`);
                } else {
                    console.error(`[Auth] Unknown error during sign in:`, error);
                }
                return false;
            }
        }
    }

    console.log("[Auth] Executing signInUser function");
    return await signInUser();
}
