import { Auth } from "@aws-amplify/auth";

async function signOut(event, onError) {
  event.preventDefault();
  try {
    await Auth.signOut();
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
}

export default signOut;
