import { Image, View } from "react-native";
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
    <Surface style={styles.container}>
      <View style={styles.container_inner}>
      <Image source={require("../../../assets/ImagemPI.png")} />
      <Text>{"\n"}</Text>
        <TextInput 
          label="Nome"
          value={nome}
          onChangeText={setNome}
          placeholder="Nome"
          style={styles.input}
          left={ <TextInput.Icon 
            icon={"account"}
          />}
        />
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
        <TextInput
          label="Confirmar Senha"
          style={styles.input}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          placeholder="Confirme sua senha"
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
    </Surface>
  );
}
