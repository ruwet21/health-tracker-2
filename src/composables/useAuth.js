import { ref } from 'vue';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const user = ref(null);
const isAuthReady = ref(false);

// Initialize auth listener
onAuthStateChanged(auth, (_user) => {
  user.value = _user;
  isAuthReady.value = true;
});

export function useAuth() {
  const isLoading = ref(false);
  const error = ref(null);

  const login = async (email, password) => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      user.value = res.user;
      return true;
    } catch (err) {
      console.error("Login error:", err);
      // Simplify error message for user
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        error.value = 'Email atau Password salah.';
      } else {
        error.value = 'Gagal masuk. Silakan periksa koneksi Anda.';
      }
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      await signOut(auth);
      user.value = null;
      return true;
    } catch (err) {
      console.error("Logout error:", err);
      error.value = 'Gagal keluar.';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    user,
    isAuthReady,
    isLoading,
    error,
    login,
    logout
  };
}
