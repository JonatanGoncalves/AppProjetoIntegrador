import { useEffect, useContext, useState } from "react";
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import ProductContext from "../features/productContext";
import NewArrivalsCard from "../components/NewArrivalsCard";
import AuthContext from "../features/authContext"; 
import { getProductsByUserId } from "../features/firebase/product"; 

const ShopScreen = ({ navigation }) => { 
    const { products, setProducts } = useContext(ProductContext);
    const { user } = useContext(AuthContext);
    const [userProducts, setUserProducts] = useState([]);

    useEffect(() => {
        const fetchUserProducts = async () => {
            if (user && user.uid) {
                console.log("Fetching products for user:", user.uid); // Log para depuração
                try {
                    const productsFromDB = await getProductsByUserId(user.uid);
                    console.log("Products fetched:", productsFromDB); // Log para depuração
                    setUserProducts(productsFromDB);
                } catch (error) {
                    console.error("Error fetching user products:", error);
                }
            }
        };
        fetchUserProducts();
    }, [user]);

    const handleAdd = () => {
        navigation.navigate("produtoScreen");
    };

    return (
        <SafeAreaView className="bg-white">
            <Text>{"\n\n"}</Text>
            <View className="flex flex-row gap-4 self-center">
                <View className="items-center border p-2.5 rounded-xl">
                    <Text>Anunciados</Text>
                    <Text>{userProducts.length}</Text>
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
                    {userProducts.map(product =>
                        <Pressable key={product.id}
                            onPress={() => navigation.navigate("detailscreen", { productId: product.id })}>
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
    );
};

export  {ShopScreen};
