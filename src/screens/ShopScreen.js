import { Image, Pressable, SafeAreaView, ScrollView, Text, View, AsyncStorage } from "react-native";
import ProductContext from "../features/productContext";
import NewArrivalsCard from "../components/NewArrivalsCard";
import { useContext, useState, useEffect } from "react";

const ShopScreen = ({ navigation }) => {
  const { setProducts } = useContext(ProductContext);
  const [localProducts, setLocalProducts] = useState([])
  const userId = 'user-123'; // substitua com o ID de usuário real

  useEffect(() => {
    AsyncStorage.getItem(`products-${userId}`)
      .then(products => {
        if (products) {
          setLocalProducts(JSON.parse(products));
        } else {
          setLocalProducts([]);
        }
      });
  }, [userId]);

  useEffect(() => {
    setProducts(localProducts);
  }, [localProducts]);

  const handleAdd = () => {
    navigation.navigate("produtoScreen");
  }

  const handleSaveProduct = (product) => {
    const newProducts = [...localProducts, product];
    AsyncStorage.setItem(`products-${userId}`, JSON.stringify(newProducts));
    setLocalProducts(newProducts);
  }

  return (
    <SafeAreaView className="bg-white">
      <Text>{"\n\n"}</Text>
      <View className="flex flex-row gap-4 self-center">
        <View className="items-center border p-2.5 rounded-xl">
          <Text>Anunciados</Text>
          <Text>0</Text>
        </View>
        <View className="items-center p-2.5 pr-6 pl-6 border rounded-xl">
          <Text>Doados</Text>
          <Text>0</Text>
        </View>
      </View>
      <Text>{"\n"}</Text>
      <View className="mt-4">
        <View className="flex-row justify-between items-center px-5">
          <Text className="text-lg font-extrabold">Meus Produtos</Text>
          <Pressable onPress={() => navigation.navigate("productlistscreen")}>
            <Text className="text-xs text-gray-500">Ver Tudo</Text>
          </Pressable>
        </View>
        <ScrollView
          className="mt-4 ml-5"
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {localProducts?.map(product =>
            <Pressable key={product.id}
              onPress={() => navigation.navigate("detailscreen",
                { productId: product.id })}>
              <NewArrivalsCard name={product.name} images={product.images} price={product.price} brand={product.brand} />
            </Pressable>
          )}
        </ScrollView>
      </View>
      <Text>{"\n\n\n\n\n\n"}</Text>
      <View>
        <Pressable onPress={handleAdd} className="bg-black w-3/4 left-12 py-4 rounded-lg mb-28 mt-36">
          <Text className="font-semibold text-white text-center ">Publicar novo Produto</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default ShopScreen;