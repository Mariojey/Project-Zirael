import { AsyncStorage } from 'react-native';

export async function storeToken(token) {
    try {
        await AsyncStorage.setItem('TOKEN', token);
    } catch (error) {
        // Error saving data
    }
}

export async function storeUser(user) {
    try {
        await AsyncStorage.setItem('USER', user);
    } catch (error) {
        // Error saving data
    }
}

export async function verifyToken() {
    try {
        const token = await AsyncStorage.getItem('TOKEN');
        const user = await AsyncStorage.getItem('USER');

        //fetch /auth/verifytoken
        //w body dajesz token i user
        //jeśli response status === "OK" | return true
        //jeśli nie to return false

        ////fetch(aders).then((response) => response.json())

        if (value === "razdwatry") {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

