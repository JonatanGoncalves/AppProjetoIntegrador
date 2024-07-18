import { Text, View, Image, ScrollView, Pressable } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UserLogo from "../../assets/user.png";
import OfferCard from "../components/OfferCard";
import NewArrivalsCard from "../components/NewArrivalsCard";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "../features/authContext";
import ProductContext from "../features/productContext";
import { getProducts } from "../features/firebase/product";

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  const { products, setProducts } = useContext(ProductContext);

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
        <View className="mb-10 px-5">
          <Text className="font-bold text-2xl">Bem Vindo(a), <Text className="font-bold text-slate-500">{currentUser?.name}</Text></Text>
          <Text className="font-semibold text-xl text-gray-500">
            Ao Kjave App
          </Text>
        </View>
        <View className="px-5">
          <View className="flex-row bg-gray-200 p-2 px-3 items-center rounded-3xl">
            <View>
              <MaterialIcons name="search" size={24} color={"#111"} />
            </View>
            <TextInput
              placeholder="Search..."
              placeholderTextColor={"#666666"}
              className="px-2"
            />
          </View>
        </View>
        <View className="mt-12">
          <View className="flex-row justify-between items-center px-5">
            <Text className="text-lg font-extrabold">Recomendados</Text>
            <Pressable onPress={() => navigation.navigate("productlistscreen")}>
              <Text className="text-xs text-gray-500">Ver Tudo</Text>
            </Pressable>
          </View>
          <ScrollView>

            <ScrollView
              className="mt-1.5"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {products?.map(product =>
                <Pressable key={product.id}
                  onPress={() => navigation.navigate("detailscreen",
                    { productId: product.id })}>
                  <NewArrivalsCard title={product.title} image={product.image} price={product.price} brand={product.brand} />
                </Pressable>
              )}
              {products?.map(product =>
                <Pressable key={product.id}
                  onPress={() => navigation.navigate("detailscreen",
                    { productId: product.id })}>
                  <NewArrivalsCard title={product.title} image={product.image} price={product.price} brand={product.brand} />
                </Pressable>
              )}
              {products?.map(product =>
                <Pressable key={product.id}
                  onPress={() => navigation.navigate("detailscreen",
                    { productId: product.id })}>
                  <NewArrivalsCard title={product.title} image={product.image} price={product.price} brand={product.brand} />
                </Pressable>
              )}
            </ScrollView>
            <ScrollView
              className="mt-1.5"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {products?.map(product =>
                <Pressable key={product.id}
                  onPress={() => navigation.navigate("detailscreen",
                    { productId: product.id })}>
                  <NewArrivalsCard title={product.title} image={product.image} price={product.price} brand={product.brand} />
                </Pressable>
              )}
              {products?.map(product =>
                <Pressable key={product.id}
                  onPress={() => navigation.navigate("detailscreen",
                    { productId: product.id })}>
                  <NewArrivalsCard title={product.title} image={product.image} price={product.price} brand={product.brand} />
                </Pressable>
              )}
              {products?.map(product =>
                <Pressable key={product.id}
                  onPress={() => navigation.navigate("detailscreen",
                    { productId: product.id })}>
                  <NewArrivalsCard title={product.title} image={product.image} price={product.price} brand={product.brand} />
                </Pressable>
              )}
            </ScrollView>
            <ScrollView
              className="mt-1.5 mb-8"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {products?.map(product =>
                <Pressable key={product.id}
                  onPress={() => navigation.navigate("detailscreen",
                    { productId: product.id })}>
                  <NewArrivalsCard title={product.title} image={product.image} price={product.price} brand={product.brand} />
                </Pressable>
              )}
              {products?.map(product =>
                <Pressable key={product.id}
                  onPress={() => navigation.navigate("detailscreen",
                    { productId: product.id })}>
                  <NewArrivalsCard title={product.title} image={product.image} price={product.price} brand={product.brand} />
                </Pressable>
              )}
              {products?.map(product =>
                <Pressable key={product.id}
                  onPress={() => navigation.navigate("detailscreen",
                    { productId: product.id })}>
                  <NewArrivalsCard title={product.title} image={product.image} price={product.price} brand={product.brand} />
                </Pressable>
              )}
            </ScrollView>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
