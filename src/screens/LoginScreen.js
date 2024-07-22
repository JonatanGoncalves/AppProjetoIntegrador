import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "../../styles";
import { Image, ImageBackground, View } from "react-native";
import { useState, useEffect, useContext } from "react";
import axios from "axios";


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    async function handleLogin() {
        try {
            const response = await axios.post("https://restfulapi-ecommerce.onrender.com/api/auth/login", { email, password });
            if (response.status === 200) {
                alert("Usuário Logado com sucesso!");
                navigation.navigate("homeStack");
            }
        } catch (error) {
            alert("Erro ao logar usuário: " + error);
        }
    }

    return (
        <ImageBackground source={require("../../assets/ImagemFundo.png")} style={styles.container}>
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
                <Text>{"\n"}</Text>
                <Button textColor="#FFF" mode="outlined" style={styles.button} onPress={handleLogin}>LOGAR</Button>
                <Text>{"\n"}</Text>
                <Button textColor="#FFF" onPress={() => navigation.navigate("registroscreen")}>
                    Fazer cadastro
                </Button>
            </View>
        </ImageBackground>
    );
}