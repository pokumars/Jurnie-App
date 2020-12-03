/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Button, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import globalStyles from '../../constants/globalStyle';
import color from '../../constants/color';
import { uploadAnnotationImage } from '../../helpers/firebaseStorage';
import LoadingFullScreen from "../LoadingFullScreen";


const ImageResponse = (props) => {
  // selectedImage is an object with properties "fileName", "fileSize", height, isVertical, "originalRotation", width, path, type
  const [selectedImage, setSelectedImage] = useState(null)
  const [savingLoader, setSavingLoader] = useState(false)
  useEffect(() => {
    props.setMediaOrDone('photo');
  })
  
  const pickImageHandler= () => {
    const options= {
      title: "Pick an Image",
      noData: true
    }
  
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        props.setAnswered(true);
        Alert.alert('You did not select any image');
      } else if(response.error){
        console.log("Image Error------" , response.error)
        Alert.alert('There was an error somewhere');
      } else {
        setSelectedImage(response)
      }
    })
  }// TODO: abort vs no image
  const cancelHandler = () => {
    // if they cancel, give them option to proceed withouth having to provide image
    props.setAnswered(true);
    props.setAnswer(null);
    setSelectedImage(null)
  }
  
  const saveImageHandler = () => {
    /* TODO: when the image is saving to firebase, we should have a 
  loading screen so that it doesnt appear unresponive to the user while it waits */
  setSavingLoader(true)
  
  uploadAnnotationImage(selectedImage.uri, selectedImage.fileName)
      .then((downloadUrl) =>{
        // console.log('return value in modal after upload-------------------------', downloadUrl)
        // Todo: show a toast that image url received

        
        setSelectedImage(null);
        props.setAnswer(downloadUrl)
        // true means next button appears
        props.setAnswered(true)
        setSavingLoader(false)
      })
      
  }


  return (
    <View style= {[globalStyles.CENTER, styles.container, globalStyles.responderViewContainer]}>
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
          <View style= {styles.imageView}>
          <Image
            source={{ uri: selectedImage.uri }}
            style={globalStyles.profilePic}
          />
        </View>
        <View style={globalStyles.buttonsSideBySideContainer}>
          <View style={globalStyles.sideBySideButtonView}>
            <Button
              title="save"
              color={color.STEEL_BLUE}
              onPress={saveImageHandler}
            />
          </View>
          <View style={globalStyles.sideBySideButtonView}>
          <Button
            title="try again"
            color={color.RAJAH}
            onPress={pickImageHandler}
          />
        </View>
        <LoadingFullScreen visible={savingLoader} text="saving" />
      </View>
        </View>
      )
    // yes or no buttons
    }
    <View style= {[styles.wideBtn, {marginTop: 20}]}>
      <Button title="cancel"
       onPress= {cancelHandler}
       color={color.ERR_RED}
      />
    </View>
    {/* gallery or camera buttons */}
    {/* abort */}

  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    width:'100%'
  },
  imageContainer: {
    borderWidth:1,
    borderColor: 'black',
    width: '80%',
    height: 200
  },
  imageView: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: color.STEEL_BLUE,
    marginBottom: 20
  },
  wideBtn: {
    width: '70%',
  },

});

export default ImageResponse;
