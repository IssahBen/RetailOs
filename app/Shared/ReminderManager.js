import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@reminders";

export const saveReminder = async (reminder) => {
  const existing = await getReminders();
  const updated = [...existing, reminder];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getReminders = async () => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const deleteReminder = async (id) => {
  const existing = await getReminders();
  const updated = existing.filter((r) => r.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const updateReminder = async (id, updatedData) => {
  const existing = await getReminders();
  const updated = existing.map((r) =>
    r.id === id ? { ...r, ...updatedData } : r
  );
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const clearAllReminders = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return "success";
  } catch (error) {
    console.error("Failed to clear reminders:", error);
  }
};
