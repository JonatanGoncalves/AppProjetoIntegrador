import { Button, Surface, Text, TextInput } from "react-native-paper";
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
          left={ <TextInput.Icon 
            icon={"email-outline"}
          />}
        />
        <TextInput
          label="Senha"
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite sua senha"
          secureTextEntry={hidePassword}
          right={ <TextInput.Icon 
            icon= { hidePassword ? "eye" : "eye-off" } 
            onPress={() => setHidePassword(!hidePassword)}
          /> }
          left={ <TextInput.Icon 
            icon={"lock"}
          />}
        />
        <Text>{"\n"}</Text>
        <Button textColor="#FFF" mode="outlined" style={styles.button} onPress={handleLogin}>LOGAR</Button>
        <Text>{"\n"}</Text>
        <Button textColor="#FFF" onPress={() => navigation.navigate("RegisterScreen")}>
          Fazer cadastro
        </Button>
      </View>
    </Surface>
  );
}
