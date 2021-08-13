import React, { useState } from 'react';
import { Button, Input, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import app from '../base';
import firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

export const CropImage = () => {
  const [fileList, setFileList] = useState([]);
  const [addFile, setAddFile] = useState('');
  const [addFile1, setAddFile1] = useState('');
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(0);

  const uploadToStorage = async(e) => {
    const file = e.target.files[0]
    const fileRef = app.storage().ref()
    const storageRef = fileRef.child(file.name)
    await storageRef.put(file)
    setAddFile(await storageRef.getDownloadURL())  
  }

const uploadToStorage1 = async(e) => {

// Create the file metadata
var metadata = {
  contentType: 'image/jpeg'
};
const file = e.target.files[0]
const storageRef = app.storage().ref()
// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');

    setProgress(progress)
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);

}
  

  const postImage = async() => {
    await app.firestore().collection("images").doc().set({
      avatar: addFile
    })
  }

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    
  };

  const displayImg = async(e) => {
    const reader = new FileReader()
    reader.onload = () => {
      if(reader.readyState === 2){
        setAddFile1(reader.result)
      }
    }
  
  }

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);

        uploadToStorage()
    postImage()
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
    
  };

  React.useEffect(() => {
    setShow(progress)
  }, [show])

  return (
    <div>
    <ImgCrop rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length <= 0 && '+ Upload'}
      </Upload>
      
    </ImgCrop>

    <img 
    src={addFile1}
    style={{
      width:"200px",
      height: "200px",
      objectFit:"cover"
    }}
    />

    <div 
    style={{
      width: "400px",
      // backgroundColor: "red",
      height: "40px",
      borderRadius: "5px",
      border: "1px solid lightgray",
      margin: "10px"
    }}
    >
      <div 
      style={{
        width: `${show}`,
        backgroundColor: "red",
        height: "100%",
      }}
      />
    </div>
    {/* <CircularProgress  /> */}
    <Input 
        type="file"
        onChange={uploadToStorage1}
      />
      <p>{
        progress === 0 ? null : <p>{Math.floor(progress)}% </p>
      }
      <p>
        {
          progress === 0 || progress === 100 ? null: <CircularProgress  /> 
        }
      </p>
      </p>
      <Button
      onClick={postImage}
      >Add</Button>
    </div>
  );

};