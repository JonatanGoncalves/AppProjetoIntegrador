import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = await AsyncStorage.getItem('userToken');
      try {
        const response = await axios.get(`https://restfulapi-ecommerce.onrender.com/api/user/${user}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setName(user.name);
        setEmail(user.email);
        setProfileImage(user.img);
      } catch (error) {
        alert('Failed to load profile: ' + error.response.data.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('password', password);
    if (profileImage) {
      formData.append('profileImage', {
        uri: profileImage.uri,
        type: profileImage.type,
        name: profileImage.fileName,
      });
    }

    try {
      const response = await axios.patch('https://restfulapi-ecommerce.onrender.com/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      if (response.status === 200) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      alert('Profile update failed: ' + error.response.data.message);
    }
  };

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
        setProfileImage(response.assets[0]);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {profileImage && (
        <Image source={{ uri: profileImage.uri }} style={styles.profileImage} />
      )}
      <Button title="Choose Profile Image" onPress={handleImagePicker} />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
});

export default ProfileScreen;