import axiosClient from "./axiosClient";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import { toast } from "sonner";

async function syncLoginWithBackend(idToken: string) {
  return axiosClient.post(
    "/api/auth/login",
    { idToken },
    { withCredentials: true }
  );
}

async function loginWithEmail(email: string, password: string) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await user.getIdToken();
    return await syncLoginWithBackend(idToken);
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

async function loginWithGoogle() {
  try {
    const { user } = await signInWithPopup(auth, googleProvider);
    const idToken = await user.getIdToken();
    return await syncLoginWithBackend(idToken);
  } catch (error) {
    console.error("Google login failed:", error);
    throw error;
  }
}

async function registerWithEmail(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (!user.emailVerified) {
      await sendEmailVerification(user);
      toast.success("Vui lòng kiểm tra email để xác minh tài khoản.");
    }

    return true;
  } catch (error) {
    toast.error(error.message || "Đăng ký thất bại.");
    throw error;
  }
}

async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Email đặt lại mật khẩu đã được gửi.");
  } catch (error) {
    const errorCode = error?.code;
    if (errorCode === "auth/user-not-found") {
      toast.error("Email chưa được đăng ký.");
    } else {
      toast.error("Gửi email thất bại.");
    }
  }
}

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
};
