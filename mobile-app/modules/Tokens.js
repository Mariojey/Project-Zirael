import GlobalVariabls from './GlobalVariables'
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

export async function clearData() {
    await AsyncStorage.setItem('USER', "");
    await AsyncStorage.setItem('TOKEN', token);
}

export async function getTokenData() {
    const token = await AsyncStorage.getItem('TOKEN') ?? "";
    const user = await AsyncStorage.getItem('USER') ?? "";

    return {
        user, 
        token
    }
}

export async function verifyToken() {
    //console.log("funkcja wywołana")
    try {
        const token = await AsyncStorage.getItem('TOKEN') ?? "";
        const user = await AsyncStorage.getItem('USER') ?? "";
        //console.log(token)
        //console.log(user)

        const body = { user, token }

        //console.log(body)
        //console.log(JSON.stringify(body))

        //fetch /auth/verifytoken
        //w body dajesz token i user
        //jeśli response status === "OK" | return true
        //jeśli nie to return false

        ////fetch(aders).then((response) => response.json())

        return fetch(`${GlobalVariabls.apiUrl}/auth/verifytoken`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then((response) => response.json())
            .then((response) => {
                //console.log("test")
                //console.log(response)
                if (response.status === "OK") {
                    return true;
                }
                return false;
            })

    } catch (error) {
        return false;
    }
}