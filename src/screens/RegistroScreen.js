import { Image, ImageBackground, View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { registerWithEmailAndPassword } from "../features/firebase/userAuth";
import { styles } from "../../styles";
import { useState, useContext } from "react";
import AuthContext from "../features/authContext";

export default function RegistroScreen({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(AuthContext);

    async function handleRegister() {
        if (password !== confirmarSenha) {
            alert("Senhas Não São Iguais.");
            return;
        }
        if (email && password == "") {
            alert("Por Favor preencha os campos.");
            return;
        }
        registerWithEmailAndPassword;
        const res = await registerWithEmailAndPassword(name, email, password)
        if (res.success === true) {
            setCurrentUser({ name, email })
            setIsLoggedIn(true)
        }
        console.log("Usuário registrado com sucesso!");
        navigation.navigate("loginscreen");
    }
    return (
        <ImageBackground source={require("../../assets/ImagemFundo.png")} style={styles.container}>
            <View style={styles.container_inner}>
                <Image source={require("../../assets/ImagemPI.png")} />
                <Text>{"\n"}</Text>
                <TextInput
                    label="Nome"
                    value={name}
                    onChangeText={setName}
                    placeholder="Nome"
                    style={styles.input}
                    left={<TextInput.Icon
                        icon={"account"}
                    />}
                />
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
                <TextInput
                    label="Confirmar Senha"
                    style={styles.input}
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    placeholder="Confirme sua senha"
                    secureTextEntry={hidePassword}
                    right={<TextInput.Icon
                        icon={hidePassword ? "eye" : "eye-off"}
                        onPress={() => setHidePassword(!hidePassword)}
                    />}
                    left={<TextInput.Icon
                        icon={"lock"}
                    />}
                />
                <Text>{"\n"}</Text>
                <Button style={styles.button} textColor="#FFF" mode="outlined" onPress={handleRegister}>REGISTRAR-SE</Button>
                <Text>{"\n"}</Text>
                <Button textColor="#FFF" mode="text" onPress={() => navigation.navigate("loginscreen")}>
                    Já possui uma conta?
                </Button>
            </View>
        </ImageBackground>
    );
}
