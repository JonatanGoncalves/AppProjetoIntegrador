import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import TabNavigator from "./TabNavigator";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import { ShopScreen } from "../screens/ShopScreen";
import { EditProductScreen } from "../screens/EditProductScreen";

const Stack = createStackNavigator();

// Separar LoginScreen Com o HomeScreen

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="loginscreen" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="registroscreen" component={RegistroScreen} options={{ headerShown: false }} />
                <Stack.Screen name="homeStack" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name='vendasScreen' component={ShopScreen} options={{title: 'Minha Loja'}} />
                <Stack.Screen name='produtoScreen' component={EditProductScreen} options={{title: 'Criar Produto'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export { AppNavigator };