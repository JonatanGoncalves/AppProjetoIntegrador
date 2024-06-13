import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "../../config/styles";
import { Image, ImageBackground, View } from "react-native";
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
    <ImageBackground source={require("../../../assets/ImagemFundo.png")} style={styles.container}>
      <View style={styles.container_inner}>
        <Image source={require("../../../assets/ImagemPI.png")} />
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
          style={styles.input}
          left={ <TextInput.Icon 
            icon={"email-outline"}
          />}
          
        />
        <TextInput
          style={styles.input}
          value={senha} 
          placeholder="Senha"
          onChangeText={setSenha}
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
    </ImageBackground>
  );
}
