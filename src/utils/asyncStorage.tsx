import AsyncStorage from '@react-native-async-storage/async-storage';

export  const storeData = async (key:string,value: object) => {
    try {
      const jsonValue = JSON.stringify(value)
      console.log('jsonValue',jsonValue)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
  }

export const getData = async (key:string) => {
try {
    const jsonValue = await AsyncStorage.getItem(key)
    console.log('getdata',jsonValue)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
} catch(e) {
    // error reading value
}
}