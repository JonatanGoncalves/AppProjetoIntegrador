import * as firebase from "firebase";
import 'firebase/storage';

const storage = firebase.storage();

export const uploadImageToFirebase = async (imageUri) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const ref = storage.ref().child(`users/${firebase.auth().currentUser.id_image}`);
  await ref.put(blob);
  const url = await ref.getDownloadURL();
  return url;
};

const db = firebase.firestore();

export const updateUserProfileImage = async (userId, imageUrl) => {
  try {
    await db.collection('users').doc(userId).update({
      profileImage: imageUrl,
    });
    return true;
  } catch (error) {
    console.error('Erro ao atualizar imagem de perfil:', error);
    return false;
  }
};

