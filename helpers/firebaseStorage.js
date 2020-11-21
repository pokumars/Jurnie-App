import 'react-native-get-random-values';
import storage, { firebase } from '@react-native-firebase/storage';
import { generate as generateName } from './randomUsernameGenerator';
import auth from '@react-native-firebase/auth';

const profilePicStorageRef = firebase
  .app()
  .storage('gs://journeyapplicatio.appspot.com/profilePics');

const deleteOldProfileImage = (filename) => {
  const oldProfilePicRef = profilePicStorageRef.ref(`${filename}`);
  oldProfilePicRef
    .delete()
    .then(function () {
      console.log('File deleted successfully');
    })
    .catch(function (error) {
      console.log('Uh-oh, an error occurred!-----------', error);
    });
};

/**
 *
 * @param {string|any} imageURI image uri to be uploaded
 * @param {string|any} originalFilename name of the file gotten from image-picker
 *  so we can get the file extension from it
 *@returns url of where the image is stored
 */
const uploadProfileImage = (imageURI, originalFilename, oldProfileImageRef) => {
  const fileExtension = originalFilename.split('.').pop();
  // console.log('fileExtension-------', fileExtension);
  // only because uuid was havinge rrors so I use the random username generator
  const uuid = generateName();

  const filename = `${uuid}.${fileExtension}`;
  // console.log('filename----', filename);

  const storageRef = profilePicStorageRef.ref(`${filename}`);

  const task = storageRef.putFile(imageURI);

  task.on(
    'state_changed',
    (taskSnapshot) => {
      // console.log(`snapshot: ${taskSnapshot.state}`);
      console.log(
        `progress: ${(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100} % transferred`
      );
    },
    (error) => {
      console.log('image upload error', error.toString());
    },
    () => {
      // after completion of upload
      console.log('after completion of upload-------------------------------------');
      storageRef.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        auth().currentUser.updateProfile({ photoURL: downloadURL });
        deleteOldProfileImage(oldProfileImageRef);
      });
    }
  );

  return task.then((snapshot) => {
    //console.log('Image uploaded to the bucket!');
    //console.log('letsSee---', snapshot);
    console.log('task.then((-------------------------------------');
    return storageRef.getDownloadURL();
    //return "the return from upload.then............................. sending-------"
  });
};

export { uploadProfileImage };
