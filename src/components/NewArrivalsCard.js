import { StyleSheet, Text, View,Image } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const NewArrivalsCard = ({ name, brand, price, images }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const getImageUrl = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await getImageUrl(images);
      setImageUrl(url);
    };
    fetchImageUrl();
  }, [images]);

  return (
    <View className="max-w-[150px] justify-center items-center overflow-hidden mr-6">
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} className="rounded-xl  h-36 w-32" />
      ) : (
        <Image className="rounded-xl  h-36 w-32" />
      )}
      <View className="mt-2 justify-center items-center">
        <Text className="font-bold">{name}</Text>
        <Text className="text-xs">{brand}</Text>
        <Text className="font-extrabold">${price}</Text>
      </View>
    </View>
  );
};

export default NewArrivalsCard