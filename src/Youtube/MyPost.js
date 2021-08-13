import React, {useState} from 'react'
import styled from 'styled-components'
import {Input,Button} from "antd"
import TextArea from 'antd/lib/input/TextArea'
import app from '../base'
import firebase from 'firebase'
import CircularProgress from '@material-ui/core/CircularProgress';

const MyPost = () => {
  const [profilePix, setProfilePix] = useState("")
  const [imagePix, setImagePix] = useState("")
  const [myVideo, setMyVideo] = useState("")
  const [title, setTitle] = useState("")
  const [name, setName] = useState("")
  const [view, setView] = useState("")
  const [description, setDescription] = useState("")

  const [showP, setShowP] = useState(0)
  const [showI, setShowI] = useState(0)
  const [showV, setShowV] = useState(0)

const uploadProfile = async({target}) => {
  const file = target.files[0]
  const fileRef = await app.storage().ref()
  const storageRef = fileRef.child("Profile/" + file.name).put(file)


  storageRef.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot)=>{
    const uploadedByte = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
    console.log(`${Math.round(uploadedByte)}%`)
    setShowP(Math.round(uploadedByte))
  },
  (err)=>{
    console.log(err.message)
  },
  () => {
    storageRef.snapshot.ref.getDownloadURL().then((URL)=>{
      console.log(URL)
      setProfilePix(URL)
    })
  })
}

const uploadImage = async({target}) => {
  const file = target.files[0]
  const fileRef = await app.storage().ref()
  const storageRef = fileRef.child("Image/" + file.name).put(file)


  storageRef.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot)=>{
    const uploadedByte = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
    console.log(`${Math.round(uploadedByte)}%`)
    setShowI(Math.round(uploadedByte))
  },
  (err)=>{
    console.log(err.message)
  },
  () => {
    storageRef.snapshot.ref.getDownloadURL().then((URL)=>{
      console.log(URL)
      setImagePix(URL)
    })
  })
}

const uploadVideo = async({target}) => {
  const file = target.files[0]
  const fileRef = await app.storage().ref()
  const storageRef = fileRef.child("Video/" + file.name).put(file)


  storageRef.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot)=>{
    const uploadedByte = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
    console.log(`${Math.round(uploadedByte)}%`)
    setShowV(Math.round(uploadedByte))
  },
  (err)=>{
    console.log(err.message)
  },
  () => {
    storageRef.snapshot.ref.getDownloadURL().then((URL)=>{
      console.log(URL)
      setMyVideo(URL)
    })
  })
}

const makePost = async() => {
  await app.firestore().collection("youtube").doc().set({
    avatar: profilePix,
    image: imagePix,
    video: myVideo,
    name,
    title,
    description,
    view,
    time: firebase.firestore.FieldValue.serverTimestamp()
  })
  setName("")
  setTitle("")
  setDescription("")
  setView("")

  console.log("File has been uploaded..!")
  window.location.reload()
}


  return (
    <Container>
      <Wrapper>
        <ProfileWrapper>
        <ProfilePix 
          placeholder="Profile Pix"
          type="file"
          onChange={uploadProfile}
        />
       {
         showP === 0 || showP === 100 ? null :  <CircularProgress color="secondary" />
       }
        </ProfileWrapper>
        <ProfileWrapper>
        <Image 
          placeholder="Profile Pix"
          type="file"
          onChange={uploadImage} 
          />
          {
         showI === 0 || showI === 100 ? null :  <CircularProgress />
       }
          </ProfileWrapper>
          <ProfileWrapper>
        <Video 
          placeholder="Profile Pix"
          type="file"
          onChange={uploadVideo} 
          />
          {
         showV === 0 || showV === 100 ? null :  <CircularProgress color="secondary" />
       }
          </ProfileWrapper>
        <Name  
          placeholder="Enter Name"
          value={name}
          onChange={(e)=>{
            setName(e.target.value)
          }}/>
        <Title 
          placeholder="Enter Title"
          value={title}
          onChange={(e)=>{
            setTitle(e.target.value)
          }} />
        <Description 
          placeholder="Enter Description"
          value={description}
          onChange={(e)=>{
            setDescription(e.target.value)
          }} />
        <View  
          placeholder="Enter View"
          value={view}
          onChange={(e)=>{
            setView(e.target.value)
          }}/>
        <MyButton
        onClick={makePost}
        >Add</MyButton>
      </Wrapper>
    </Container>
  )
}

export default MyPost

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .MuiSvgIcons-root {
    font-size: 10px;
  }
`

const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`
const Wrapper = styled.div`
display: flex;
flex-direction: column;
width: 500px;
height: 500px;
justify-content: space-around;
`
const ProfilePix = styled(Input)`
width: 70%
`
const Image = styled(Input)`
width: 70%
`
const Video = styled(Input)`
width: 70%
`
const Name = styled(Input)``
const Title = styled(Input)``
const Description = styled(TextArea)`
  height: 100px;
  resize: none;
`
const View = styled(Input)``
const MyButton = styled(Button)``
