import { Input } from 'antd'
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import app from '../base'

const Images = () => {
  const [myUploadedImage, setMyUploadedImage] = useState([])
  const [fileUpload, setFileUpload] = useState('')
  const [file, setFile] = useState('')

const onPush = async(e) => {
  const file = e.target.files[0]
  const fileRef = await app.storage().ref()
  const storageRef = fileRef.child(file.name)
  await storageRef.put(file)
  setFileUpload(await storageRef.getDownloadURL())
}

const inputFile = (e) => {
  const reader = new FileReader()
  reader.onload = () => {
    if(reader.readyState === 2){
      setFile(reader.result())
    }
  }
  setFile(e.target.files[0])
}

console.log(file)


  useEffect(() => {
      // getData()
  }, [])

  return (
    <Container>
      <Wrapper>
        <ImageGrad>
        <Display
        src={file}
        />
        </ImageGrad>

        <EnterInput 
        placeholder = "Enter"
        type="file"
        onClick={inputFile}
        />
      </Wrapper>
    </Container>
  )
}

export default Images

const Container = styled.div`
width: 100%;
height: 100;
display: flex;
justify-content: center;
align-items: center;
`
const Wrapper = styled.div`
width: 500px;
height: 900px;
background-color: aliceblue;
align-items: center;
display: flex;
flex-direction: column;
`
const ImageGrad = styled.div`
  width:300px;
  height: 300px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 20px;

`
const Display = styled.img`
width:100%;
height: 100%;
object-fit: cover;
border-radius: 10px;

`
const EnterInput = styled(Input)`
width: 300px
`