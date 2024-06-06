import { Button, Icon, Surface, Text, TextInput } from "react-native-paper";
import { styles } from "../../config/styles";
import { Image, View } from "react-native";
import { useState } from "react";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  async function handleLogin() {
    try {
      const user = await signInWithEmailAndPassword(auth, email, senha);
      if (user) {
        console.log("Usuário Logado com sucesso!");
        navigation.navigate("Home");
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Surface style={styles.container}>
      <View style={styles.container_inner}>
        <Image source={require("../../../assets/ImagemPI.png")} />
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          style={styles.input}
        />
        <TextInput
          label="Senha"
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite sua senha"
          secureTextEntry={hidePassword}
          right={
            <Icon
              name={hidePassword ? "eye" : "eye-off"}
              onPress={() => setHidePassword(!hidePassword)}
            />
          }
        />
        <Text>{"\n"}</Text>
        <Button mode="contained" onPress={handleLogin}>Logar</Button>
        <Text>{"\n"}</Text>
        <Button onPress={() => navigation.navigate("RegisterScreen")}>
          Fazer cadastro
        </Button>
      </View>
    </Surface>
  );
}
