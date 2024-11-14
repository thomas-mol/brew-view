import { auth } from "../../config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginPage = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default LoginPage;
