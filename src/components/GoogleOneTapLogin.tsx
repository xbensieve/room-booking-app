import { useEffect } from "react";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/services/firebase";
import axiosClient from "@/api/axiosClient";
import { toast } from "sonner";

declare global {
  interface Window {
    google: any;
  }
}

const GOOGLE_CLIENT_ID =
  "26444011058-qg68td79asote4jtguitn5kkrtddtnr5.apps.googleusercontent.com";

export default function GoogleOneTap() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleOneTap,
          auto_select: true,
          cancel_on_tap_outside: false,
        });

        window.google.accounts.id.prompt();
      }
    };

    const handleGoogleOneTap = async (response: any) => {
      try {
        const credential = GoogleAuthProvider.credential(response.credential);
        const userCredential = await signInWithCredential(auth, credential);
        const user = userCredential.user;
        const idToken = await user.getIdToken();

        const apiResponse = await axiosClient.post(
          "/api/auth/login",
          { idToken },
          { withCredentials: true }
        );

        toast.success("Đăng nhập bằng Google thành công!");
        console.log("One Tap Login success:", apiResponse);
      } catch (error) {
        toast.error("Đăng nhập Google thất bại.");
        console.error("Google One Tap login error:", error);
      }
    };
  }, []);

  return null;
}
