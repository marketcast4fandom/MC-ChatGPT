import { Amplify } from "aws-amplify";
import awsExports from '../src/aws-exports';
Amplify.configure(awsExports, { ssr: true });

export default function ConfigureAmplifyClientSide() {
  return null;
}

// Amplify.configure(awsExports);