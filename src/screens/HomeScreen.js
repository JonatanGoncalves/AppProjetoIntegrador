import { Text, View, ScrollView, Pressable } from "react-native";
import React, {useContext, useEffect} from "react";
import { TextInput } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import OfferCard from "../components/OfferCard";
import NewArrivalsCard from "../components/NewArrivalsCard";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "../features/authContext";
import ProductContext from "../features/productContext";
import { getProducts } from "../features/firebase/product";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const Home = ({ navigation }) => {
  const { isLoggedIn,currentUser} = useContext(AuthContext);
  const {products,setProducts} = useContext(ProductContext);
  const storage = getStorage(); // Initialize Firebase Storage
  const db = getFirestore(); // Initialize Firebase Firestore

  const fetchAllProducts = async () => {
    const result = await getProducts()
    setProducts(result)
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    fetchAllProducts()
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <Text>{"\n\n"}</Text>
        <View className="mt-6 px-5">
          <Text className="font-bold text-2xl">Welcome, <Text className="font-bold text-slate-500">{currentUser?.name}</Text></Text>
          <Text className="font-semibold text-xl text-gray-500">
            Our Fashions App
          </Text>
        </View>

        <View className="mt-6 px-5">
          <View className="flex-row bg-gray-200 p-2 px-3 items-center rounded-3xl">
            <View className="">
              <MaterialIcons name="search" size={24} color={"#111"} />
            </View>
            <TextInput
              placeholder="Search..."
              placeholderTextColor={"#666666"}
              className="px-2"
            />
          </View>
        </View>
        
        <View className="mt-4">
          <View className="flex-row justify-between items-center px-5">
            <Text className="text-lg font-extrabold">New Arrivals</Text>
            <Pressable onPress={() => navigation.navigate("productlistscreen")}>
              <Text className="text-xs text-gray-500">View All</Text>
            </Pressable>
          </View>
          <ScrollView
            className="mt-4 ml-5"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {products?.map(product=>
            <Pressable key={product.id} 
            onPress={() => navigation.navigate("detailscreen",
            {productId:product.id})}>
              <NewArrivalsCard name={product.name} images={product.images} price={product.price} brand={product.brand} />
            </Pressable>
              )}
            
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
