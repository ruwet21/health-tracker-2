import { ref } from 'vue';
import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

const logs = ref([]);
const isLoading = ref(false);
const error = ref(null);

export function useHealthLogs() {
  const collectionRef = collection(db, 'health_logs');

  const fetchLogs = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const q = query(collectionRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      logs.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (err) {
      console.error("Error fetching logs:", err);
      error.value = "Failed to fetch data. Please check your Firebase configuration.";
    } finally {
      isLoading.value = false;
    }
  };

  const addLog = async (logData) => {
    isLoading.value = true;
    error.value = null;
    try {
      const docRef = await addDoc(collectionRef, {
        ...logData,
        createdAt: serverTimestamp()
      });
      // Prepend to local state
      logs.value.unshift({
        id: docRef.id,
        ...logData,
        createdAt: new Date() // rough approximation until fetch
      });
      return true;
    } catch (err) {
      console.error("Error adding log:", err);
      error.value = "Failed to save data. Please check your Firebase configuration.";
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteLog = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      await deleteDoc(doc(db, 'health_logs', id));
      logs.value = logs.value.filter(log => log.id !== id);
      return true;
    } catch (err) {
      console.error("Error deleting log:", err);
      error.value = "Failed to delete data. Please check your Firebase configuration.";
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    logs,
    isLoading,
    error,
    fetchLogs,
    addLog,
    deleteLog
  };
}
