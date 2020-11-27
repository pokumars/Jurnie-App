import 'react-native-get-random-values';
import storage, { firebase } from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { generate as generateName } from './randomUsernameGenerator';

const profilePicStorageRef = firebase
  .app()
  .storage('gs://journeyapplicatio.appspot.com/profilePics');

const annotationStorageRef = firebase
  .app()
  .storage('gs://journeyapplicatio.appspot.com/annotationMedia');

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
 * so we can get the file extension from it
 * @param {string|any} oldProfileImageRef the filename of the old image so that it can be deleted
 *@returns url of where the image is stored
 */
const uploadProfileImage = (imageURI, originalFilename, oldProfileImageRef) => {
  const fileExtension = originalFilename.split('.').pop();
  // using generateName(); only because uuid was having rrors so I use the random username generator
  const uuid = generateName();

  const filename = `${uuid}.${fileExtension}`;

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
      storageRef.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        auth().currentUser.updateProfile({ photoURL: downloadURL });
        deleteOldProfileImage(oldProfileImageRef);
      });
    }
  );

  return task.then((snapshot) => {
    return storageRef.getDownloadURL();
  });
};


/**
 *
 * @param {string|any} imageURI image uri to be uploaded
 * @param {string|any} originalFilename name of the file gotten from image-picker
 *  so we can get the file extension from it
 *@returns url of where the image is stored
 */
const uploadAnnotationImage = (imageURI, originalFilename) => {
  const fileExtension = originalFilename.split('.').pop();
  // using generateName(); only because uuid was having rrors so I use the random username generator
  const uuid = generateName();

  const filename = `${uuid}.${fileExtension}`;

  const storageRef = annotationStorageRef.ref(`${filename}`);

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
      storageRef.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
  );

  return task.then((snapshot) => {
    return storageRef.getDownloadURL();
  });
};
export { uploadProfileImage, uploadAnnotationImage };
