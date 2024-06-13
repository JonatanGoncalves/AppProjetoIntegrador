import { Image, ImageBackground, View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { styles } from "../../config/styles";
import { useState } from "react";

export default function RegisterScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  async function handleRegister() {
    if (senha !== confirmarSenha) {
      alert("Senhas Não São Iguais.");
      return;
    }
    if (email && senha == "") {
      alert("Por Favor preencha os campos.");
      return;
    }
    try {
      const userRef = await createUserWithEmailAndPassword(auth, email, senha);
      if (userRef) {
        console.log("Usuário registrado com sucesso!");
        navigation.navigate("LoginScreen");
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
        <TextInput 
          value={nome}
          onChangeText={setNome}
          placeholder="Nome"
          style={styles.input}
          mode="outlined"
          left={ <TextInput.Icon 
            icon={"account"}
          />}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
          style={styles.input}
          mode="outlined"
          left={ <TextInput.Icon 
            icon={"email-outline"}
          />}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          value={senha}
          onChangeText={setSenha}
          placeholder="Senha"
          secureTextEntry={hidePassword}
          right={ <TextInput.Icon 
            icon= { hidePassword ? "eye" : "eye-off" } 
            onPress={() => setHidePassword(!hidePassword)}
          /> }
          left={ <TextInput.Icon 
            icon={"lock"}
          />}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          placeholder="Confirmar Senha"
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
        <Button style={styles.button} textColor="#FFF" mode="outlined" onPress={handleRegister}>REGISTRAR-SE</Button>
        <Text>{"\n"}</Text>
        <Button textColor="#FFF" mode="text" onPress={() => navigation.navigate("LoginScreen")}>
          Já possui uma conta?
        </Button>
      </View>
    </ImageBackground>
  );
}
