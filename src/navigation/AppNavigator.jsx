import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-native-paper";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/RegistroScreen/RegistroScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

    return (
        <Provider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{
                            headerShown: false
                        }} />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
