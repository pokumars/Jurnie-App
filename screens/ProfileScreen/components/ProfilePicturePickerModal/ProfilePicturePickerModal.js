/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Button,
  Alert,
  Modal,
  ActivityIndicator,
  Text,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import globalStyles from '../../../../constants/globalStyle';
import color from '../../../../constants/color';
import { uploadProfileImage } from '../../../../helpers/firebaseStorage';
import LoadingFullScreen from '../../../../components/LoadingFullScreen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ProfilePicturePickerModal = ({
  visible,
  toggleVisibility,
  update,
  oldProfileImageRef,
}) => {
  // selectedImage is an object with properties "fileName", "fileSize", height, isVertical, "originalRotation", width, path, type
  const [selectedImage, setSelectedImage] = useState(null);
  const [savingLoader, setSavingLoader] = useState(false);

  const pickImageHandler = () => {
    const options = {
      title: 'Pick an Image',
      noData: true,
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('Image Error------', response.error);
        Alert.alert('There was an error somewhere');
      } else {
        setSelectedImage(response);
      }
    });
  };
  const cancelHandler = () => {
    toggleVisibility();
    setSelectedImage(null);
  };

  const saveImageHandler = () => {
    /* TODO: when the image is saving to firebase, we should have a 
    loading screen so that it doesnt appear unresponive to the user while it waits */
    setSavingLoader(true);

    uploadProfileImage(
      selectedImage.uri,
      selectedImage.fileName,
      oldProfileImageRef,
    ).then((downloadUrl) => {// downloadUrl is the url of the newly uploaded image in firebase storage
      // console.log('return value in modal after upload-------------------------', downloadUrl)

      firestore().collection('users').doc(auth().currentUser.email).update({
        profileImgUrl: downloadUrl,
      });
      toggleVisibility();// close the modal for picking image
      setSavingLoader(false); // close the modal that says saving image
      setSelectedImage(null); 

      update(downloadUrl);
    });
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="fullScreen"
      onRequestClose={cancelHandler}>
      <View style={[globalStyles.CENTER, styles.container]}>
        {
          /* dont show pick image button when an image has been picked.
        Use "try again"instead */
          selectedImage === null && (
            <View style={[styles.wideBtn]}>
              <Button title="Pick Image" onPress={pickImageHandler} />
            </View>
          )
        }

        {
          /* when an image has been picked display it and ask
         if they want to save or try again */
          selectedImage && (
            <View style={[globalStyles.profilePicContainer]}>
              <View style={globalStyles.profilePicView}>
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={globalStyles.profilePic}
                />
              </View>
              <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                  <Button
                    title="save"
                    color={color.STEEL_BLUE}
                    onPress={saveImageHandler}
                  />
                </View>

                <View style={styles.button}>
                  <Button
                    style={styles.button}
                    title="try again"
                    color={color.RAJAH}
                    onPress={pickImageHandler}
                  />
                </View>
              </View>
            </View>
          )
          // yes or no buttons
        }
        <View style={[styles.wideBtn, { marginTop: 20 }]}>
          <Button
            title="cancel"
            onPress={cancelHandler}
            color={color.ERR_RED}
          />
        </View>
        <LoadingFullScreen visible={savingLoader} text="Saving" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '30%',
    width: '100%',
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    height: 200,
  },
  img: {
    width: 200,
    height: 200,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-around',
  },
  button: {
    width: '40%',
  },
  wideBtn: {
    width: '70%',
  },
});

export default ProfilePicturePickerModal;
