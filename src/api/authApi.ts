import axiosClient from "./axiosClient";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";

async function loginWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const idToken = await user.getIdToken();

    const response = await axiosClient.post(
      "/api/auth/login",
      {
        idToken,
      },
      {
        withCredentials: true,
      }
    );

    console.log("Login successful:", response);
  } catch (error) {
    console.error("Login failed:", error);
  }
}

async function loginWithGoogle() {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    const idToken = await user.getIdToken();

    const response = await axiosClient.post(
      "/api/auth/login",
      {
        idToken,
      },
      {
        withCredentials: true,
      }
    );
    console.log("Login successful");
  } catch (error) {
    console.error("Google login failed:", error);
    throw error;
  }
}

async function registerWithEmail(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  if (!user.emailVerified) {
    await sendEmailVerification(user);
    alert("Please verify your email address. We've sent a verification email.");
  }
}

async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("A password reset email has been sent to your inbox.");
  } catch (error: unknown) {
    console.error("Failed to send reset email:", error);
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "auth/user-not-found"
    ) {
      alert("Email not registered.");
    } else {
      alert("Failed to send reset email.");
    }
  }
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const idToken = await user.getIdToken(true);
      const response = await axiosClient.get("/api/auth/protected");
      console.log("Access to protected endpoint successful");
    } catch (error) {
      console.error("Access denied:", error);
    }
  } else {
    console.log("No user logged in");
    try {
      await axiosClient.post("/api/auth/logout");
      console.log("Logged out");
    } catch (error) {
      console.error("Logout request failed:", error);
    }
  }
});

async function logout() {
  try {
    await auth.signOut();
    await axiosClient.post("/api/auth/logout");
    console.log("Logged out and cookie cleared");
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
}

export {
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
  resetPassword,
  logout,
  onAuthStateChanged,
};
