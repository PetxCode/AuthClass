import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import styled from "styled-components";
import app from "../base";
import firebase from "firebase";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";

const YouPost = () => {
  const [myVideo, setMyVideo] = useState(" ");
  const [myProfPix, setMyProfPix] = useState("");
  const [myImage, setMyImage] = useState("");
  const [myTitle, setMyTitle] = useState("");
  const [myDesc, setMyDesc] = useState("");
  const [myView, setMyView] = useState("");
  const [myName, setMyName] = useState("");
  const [show, setShow] = useState(0);

  const getPost = async () => {
    await app.firestore().collection("youtubePost").doc().set({
      image: myImage,
      avatar: myProfPix,
      video: myVideo,
      title: myTitle,
      name: myName,
      description: myDesc,
      view: myView,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMyDesc("");
    setMyTitle("");
    setMyName("");
    setMyView("");
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const fileRef = app.storage().ref();
    const storageRef = fileRef.child(file.name);
    await storageRef
      .put(file)
      .then(() => {
        console.log("completed");
      })
      .catch((err) => console.log(err.message));

    setMyImage(await storageRef.getDownloadURL());
  };

  const monitorProgressAvatar = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();

    const uploadTask = storageRef.child("avatar/" + file.name).put(file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setShow(progress);
        console.log("Upload for Avatar is " + progress + "% done");
      },

      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setMyProfPix(downloadURL);
        });
      }
    );
  };

  const monitorProgressImage = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();

    const uploadTask = storageRef.child("images/" + file.name).put(file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setShow(progress);
        console.log("Upload for Image is " + progress + "% done");
      },

      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setMyImage(downloadURL);
        });
      }
    );
  };

  const monitorProgressVideo = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();

    const uploadTask = storageRef.child("video/" + file.name).put(file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setShow(progress);
        console.log("Upload for Video is " + progress + "% done");
      },

      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setMyVideo(downloadURL);
        });
      }
    );
  };

  React.useEffect(() => {
    // uploadImage()
  }, []);

  return (
    <Container>
      <Wrapper>
        <p>
          {
            // show === 0.0000001 || show === 100 ? <CircularProgress /> : null
          }
        </p>
        <h3>{`${Math.floor(show)}%`}</h3>
        <VideoInput
          type="video/mp4"
          placeholder="Enter Video "
          type="file"
          onChange={monitorProgressVideo}
        />
        <ImageInput
          placeholder="Enter Image "
          type="file"
          onChange={monitorProgressImage}
        />
        <ProfileInput
          placeholder="Enter ProfilePix "
          type="file"
          onChange={monitorProgressAvatar}
        />
        <TitleInput
          placeholder="Enter Name "
          value={myName}
          onChange={(e) => {
            setMyName(e.target.value);
          }}
        />
        <TitleInput
          placeholder="Enter Title "
          value={myTitle}
          onChange={(e) => {
            setMyTitle(e.target.value);
          }}
        />
        <DescriptionInput
          placeholder="Enter Description "
          type="text"
          value={myDesc}
          onChange={(e) => {
            setMyDesc(e.target.value);
          }}
        />
        <ViewInput
          placeholder="Enter View "
          value={myView}
          onChange={(e) => {
            setMyView(e.target.value);
          }}
        />
        <MyButton danger type="primary" onClick={getPost}>
          Submit
        </MyButton>
      </Wrapper>
    </Container>
  );
};

export default YouPost;

const MyButton = styled(Button)`
  height: 60px;
`;

const Container = styled.div`
  padding-top: 100px;
  width: 100%;
  justify-content: center;
  display: flex;
`;
const Wrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  height: 480px;
  justify-content: space-around;
`;
const VideoInput = styled(Input)``;
const ImageInput = styled(Input)``;
const ProfileInput = styled(Input)``;
const TitleInput = styled(Input)``;
const DescriptionInput = styled(TextArea)`
  resize: none;
  height: 100px;
`;
const ViewInput = styled(Input)``;
