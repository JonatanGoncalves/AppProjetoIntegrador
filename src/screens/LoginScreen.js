import { Button, Surface, Text, TextInput } from "react-native-paper";
import { loginWithEmailAndPassword } from "../features/firebase/userAuth";
import { styles } from "../../styles";
import { Image, View } from "react-native";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../features/authContext";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(AuthContext);

    async function handleLogin() {
        loginWithEmailAndPassword;
        const res = await loginWithEmailAndPassword(email, password)
        if (res.success === true) {
            console.log("res", res)
            setCurrentUser(res.user)
            setIsLoggedIn(true)
        }
        navigation.navigate('homescreen');
    }

    useEffect(() => {
        if (currentUser) {
            setIsLoggedIn(true);
        }
    }, [currentUser]);

    return (
        <Surface style={styles.container}>
            <View style={styles.container_inner}>
                <Image source={require("../../assets/ImagemPI.png")} />
                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Digite seu e-mail"
                    style={styles.input}
                    left={<TextInput.Icon
                        icon={"email-outline"}
                    />}
                />
                <TextInput
                    label="Senha"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Digite sua senha"
                    secureTextEntry={hidePassword}
                    right={<TextInput.Icon
                        icon={hidePassword ? "eye" : "eye-off"}
                        onPress={() => setHidePassword(!hidePassword)}
                    />}
                    left={<TextInput.Icon
                        icon={"lock"}
                    />}
                />
                <View style={styles.containerLogin}>
                    <Button textColor="#FFF" mode="outlined" style={styles.button} onPress={handleLogin}>LOGAR</Button>
                    <Button textColor="#FFF" mode="outlined">
                        Usar Conta do Google
                    </Button>
                    <Button textColor="#FFF" onPress={() => navigation.navigate("registerscreen")}>
                        Fazer cadastro
                    </Button>
                </View>
            </View>
        </Surface>
    );
}
