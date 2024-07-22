import { Image, ImageBackground, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "../../styles";
import { useState } from "react";
import axios from "axios";

export default function RegistroScreen({ navigation }) {
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    async function handleRegister({ navigation }) {
        try {
            const response = await axios.post("https://restfulapi-ecommerce.onrender.com/api/user/register", { name, username, email, password });
            if (response.status === 201) {
                alert("Usuário cadastrado com sucessoo!");
                navigation.navigate("loginscreen");
            }
        } catch (error) {
            alert("Erro ao cadastrar usuário: " + error);
        }
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
                    placeholder="Digite seu Nome"
                    style={styles.input}
                    left={<TextInput.Icon
                        icon={"account"}
                    />}
                />
                <TextInput
                    label="Username"
                    value={username}
                    onChangeText={setUserName}
                    placeholder="Digite seu Nome"
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
                    placeholder="Repita sua senha"
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