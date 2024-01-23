import AsyncStorage from '@react-native-async-storage/async-storage';

export function useStorage() {
  const saveToStorage = async (request) => {
    try {
      const saved = await AsyncStorage.getItem('history');
      let updatedRequests = [];
      if (saved) {
        const parsedHistory = JSON.parse(saved);
        updatedRequests = [request, ...parsedHistory];
      } else {
        updatedRequests = [request];
      }

      if (updatedRequests.length > 10) {
        updatedRequests.shift();
      }

      await AsyncStorage.setItem('history', JSON.stringify(updatedRequests));
    } catch (error) {
      console.error(error);
    }
  };

  const getFromStorage = async () => {
    try {
      const saved = await AsyncStorage.getItem('history');
      if (saved) {
        return JSON.parse(saved);
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('history');
    } catch (error) {
      console.error(error);
    }
  };

  return { saveToStorage, getFromStorage, clearStorage };
}
