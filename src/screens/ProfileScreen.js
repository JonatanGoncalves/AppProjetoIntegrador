import { Text, View, Image, Pressable, ToastAndroid } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import User from "../../assets/user.png";
import AuthContext from "../features/authContext";
import { logout } from "../features/firebase/userAuth";

const ProfileScreen = ({ navigation }) => {
  
  const {currentUser,setCurrentUser,isLoggedIn,setIsLoggedIn} = useContext(AuthContext);

  const handleShop = () => {
    navigation.navigate("vendasScreen");
  }

  const handleLogout = async () => {
    const res = await logout()
    if(res.success===true){
      ToastAndroid.show("Logged Out Successfully",ToastAndroid.BOTTOM)
      setIsLoggedIn(false);
      setCurrentUser(null)
    }
    navigation.navigate("login");
  }

  return (
    <SafeAreaView className="bg-white h-full p-6 justify-between">
      <View>
      <View className="mt-16 justify-center items-center">
        <View className="border border-slate-200 rounded-lg">
          <Image source={User} className="h-32 w-32 object-cover" />
        </View>
      </View>
        <View className="mt-6">
          {isLoggedIn
            ?
          <View className="items-center justify-center">
            <Text className="text-lg font-bold">{currentUser?.name}</Text>
            <Text className="text-xs, font-bold text-gray-500">{currentUser?.email}</Text>
            <Text>{"\n\n\n"}</Text>
            <Pressable onPress={handleShop} className="bg-black p-3 w-32 right-32 rounded-lg mt-6">
                <Text className="font-semibold text-white text-center">Histórico</Text>
            </Pressable>
          </View>
          :
          <View className="items-center justify-center">
            <Text className="text-lg font-bold">Login to view your Profile!</Text>
          </View>
          }
        </View>
        </View>
        {isLoggedIn &&
        <View className="justify-center items-center">
          <Pressable onPress={handleLogout} className="bg-black w-full py-4
           rounded-lg">
            <Text className="font-bold text-white text-center">Desconectar-se</Text>
          </Pressable>
        </View>
        }
    </SafeAreaView>
  );
};

export default ProfileScreen;
