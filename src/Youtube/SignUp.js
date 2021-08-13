import { Button, Input } from "antd";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import app from "../base";
import firebase from "firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const SignUp = () => {
  const [show, setShow] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4pnSV_ir_K_rN8voKL2QRhgtuGJF5-n-H9A&usqp=CAU"
  );
  const [myURL, setMyURL] = useState("");
  const [count, setCount] = useState(0.00000001);

  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(true);

  const onToggle = () => {
    setShowPassword(!showPassword);
  };

  const signUp = async () => {
    await app.auth().createUserWithEmailAndPassword(user, password);
  };
  const signUpWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await app.auth().signInWithPopup(provider);
  };

  const signUpWithGitHub = async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    await app.auth().signInWithPopup(provider);
  };

  const displayPix = async (e) => {
    const file = e.target.files[0];
    const saveMyFile = URL.createObjectURL(file);
    console.log(saveMyFile);
    setShow(saveMyFile);
  };

  const myUploadedImage = async (e) => {
    const file = e.target.files[0];
    const saveMyFile = URL.createObjectURL(file);
    console.log(saveMyFile);
    setShow(saveMyFile);

    // const file = e.target.files[0];

    const fileRef = await app.storage().ref();
    const storageRef = fileRef.child("signUp/" + file.name).put(file);

    storageRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setCount(percent);
        console.log(`${count}%`);
      },
      (err) => {
        console.log(err.message);
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((URL) => {
          setMyURL(URL);
          console.log("This is the URL: ", URL);
        });
      }
    );
  };

  useEffect(() => {}, []);
  return (
    <Container>
      <Wrapper>
        <Inputs>
          <Avatar type="file" onChange={myUploadedImage} />

          <MyInput
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <MyInput
            placeholder="Enter your User Name"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />

          <PasswordForm>
            <MyPasswordInput
              placeholder="Enter your Password"
              type={showPassword ? "password" : null}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {showPassword ? (
              <VisibilityIcon onClick={onToggle} />
            ) : (
              <VisibilityOffIcon onClick={onToggle} />
            )}
          </PasswordForm>

          <MyButton type="primary" danger onClick={signUp}>
            Submit
          </MyButton>
          <Statement>
            <p>or sign up with</p>
            <span onClick={signUpWithGoogle}>Google</span>
            <span onClick={signUpWithGitHub}>GitHub</span>
          </Statement>
        </Inputs>
        <DisplayContainer>
          <Display>
            {count === 0.00000001 || count === 100 ? null : (
              <Cover>
                <Icon />
                <p>{Math.round(count)}%</p>
              </Cover>
            )}

            <Image src={show} />
          </Display>
        </DisplayContainer>
      </Wrapper>
    </Container>
  );
};

export default SignUp;

const Statement = styled.div`
  display: flex;
  width: 300px;
  justify-content: center;

  span {
    margin-left: 5px;
    color: red;
    font-weight: bold;
    cursor: pointer;
  }
`;

const PasswordForm = styled.div`
  height: 40px;
  width: 300px;
  background-color: white;
  margin: 20px;
  border: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border: 1px solid lightblue;
  }

  .MuiSvgIcon-root {
    padding-right: 10px;
    cursor: pointer;
  }
`;

const MyPasswordInput = styled.input`
  height: 40px;
  width: 200px;
  border-width: 0;
  background-color: transparent;
  outline: none;
  padding-left: 10px;

  &:hover {
    border: 0;
    outline: none;
  }

  ::placeholder {
    color: lightgray;
    padding-left: 10px;
    font-size: 15px;
  }
`;

const Cover = styled.div`
  width: 500px;
  height: 300px;
  border-radius: 10px;
  background-color: black;
  opacity: 0.4;
  position: absolute;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    font-weight: bolder;
    font-size: 12px;
    color: white;
  }
`;

const Icon = styled(CircularProgress)`
  position: absolute;
  bottom: 20;
`;

const Image = styled.img`
  width: 500px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  position: absolute;
  z-index: -1;
`;

const Display = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  z-index: 1001;
`;

const Container = styled.div`
  padding-top: 80px;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  width: 100%;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const DisplayContainer = styled.div`
  width: 500px;
  height: 300px;
  margin-left: 50px;
`;
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
`;
const Avatar = styled(Input)`
  width: 300px;
  margin: 20px;
`;
const MyInput = styled(Input)`
  margin: 20px;
  height: 40px;
  width: 300px;
`;
const MyButton = styled(Button)`
  margin: 20px;
  height: 40px;
  width: 300px;
`;
