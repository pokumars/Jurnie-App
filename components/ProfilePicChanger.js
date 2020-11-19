/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet, Image, Button, Alert, Modal } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import globalStyles from '../constants/globalStyle';
import color from '../constants/color';
import { uploadProfileImage } from '../helpers/firebaseStorage';

const ImagePickerComponent = ({visible, toggleVisibility}) => {
  const [selectedImage, setSelectedImage] = useState(null)

  const pickImageHandler= () => {
    const options= {
      title: "Pick an Image",
      maxWidth: 800,
      maxHeight: 600,
      noData: true
    }
  
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if(response.error){
        console.log("Image Error------" , response.error)
      } else {
        console.log('Image: ', response)
        setSelectedImage(response.uri)
        //onImagePicked({ uri: response.uri })
      }
    })
  }
  const cancelHandler = () => {
    toggleVisibility();
    setSelectedImage(null)
  }
  const saveImageHandler = () => {
    console.log('save image clicked')
    uploadProfileImage(selectedImage).then(() => {
      toggleVisibility();
      setSelectedImage(null)
    })
  }


  return (
    <Modal 
    animationType="slide"
    visible={visible}
    presentationStyle="fullScreen"
    onRequestClose={cancelHandler}>
      
      <View style= {[globalStyles.CENTER, styles.container]}>
        {/* dont show pick image button when an image has been picked.
        Use "try again"instead */
        selectedImage=== null && 
          <View style= {[styles.wideBtn]}>
            <Button title="Pick Image" onPress= {pickImageHandler}/>
          </View>
        }

        {/* when an image has been picked display it and ask
         if they want to save or try again */
          selectedImage && (
            <View style= {[globalStyles.profilePicContainer, ]}>
              <View style= {globalStyles.profilePicView}>
              <Image
                source={{ uri: selectedImage }}
                style={globalStyles.profilePic}
                resizeMode='contain'
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
        //yes or no buttons
        }
        <View style= {[styles.wideBtn, {marginTop: 20}]}>
          <Button title="cancel"
           onPress= {cancelHandler}
           color={color.ERR_RED}
          />
        </View>
        {/*gallery or camera buttons*/}
        {/*abort*/}

      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: '30%',
    width:'100%'
  },
  imageContainer: {
    borderWidth:1,
    borderColor: 'black',
    width: '80%',
    height: 200
  },
  img: {
    width: 200,
    height: 200
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

export default ImagePickerComponent;
