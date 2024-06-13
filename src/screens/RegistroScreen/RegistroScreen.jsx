import { Image, ImageBackground, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "../../config/styles";

export default function RegisterScreen({ navigation }) {
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
        <Button style={styles.button} textColor="#FFF" mode="outlined">REGISTRAR-SE</Button>
        <Text>{"\n"}</Text>
        <Button textColor="#FFF" mode="text" onPress={() => navigation.navigate("LoginScreen")}>
          Já possui uma conta?
        </Button>
      </View>
    </ImageBackground>
  );
}
