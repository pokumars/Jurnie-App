import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import storage, { firebase } from '@react-native-firebase/storage';
import { generate as generateName } from './randomUsernameGenerator';
import auth from '@react-native-firebase/auth';


const profilePicStorage = firebase.app().storage('gs://journeyapplicatio.appspot.com/profilePics');

/**
 *
 * @param {string|any} imageURI image uri to be uploaded
 *@returns url of where the image is stored
 */
const uploadProfileImage = (imageURI) => {
  const fileExtension = imageURI.split('.').pop();
  console.log('fileExtension----', fileExtension);
  // only because uuid was havinge rrors so I use the random username generator
  const uuid = generateName();

  const filename = `${uuid}.${fileExtension}`;
  console.log('filename----', filename);

  const storageRef = profilePicStorage.ref(`test/${filename}`);

  const task = storageRef.putFile(imageURI);

  task.on(
    'state_changed',
    (taskSnapshot) => {
      console.log(`snapshot: ${taskSnapshot.state}`);
      console.log(
        `progress: ${(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100} % transferred`
      );
    },
    (error) => {
      console.log('image upload error', error.toString());
    },
    () => {//after completion of upload
      storageRef.getDownloadURL()
      .then((downloadURL)=> {
        console.log('File available at', downloadURL);
        return auth()
      .currentUser.updateProfile({photoURL: downloadURL})
      })
    }
  );

  return task.then(() => {
    console.log('Image uploaded to the bucket!');
  });
};

export { uploadProfileImage };
