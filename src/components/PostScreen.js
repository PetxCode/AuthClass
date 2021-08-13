import { Button, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const PostScreen = (files) => {
  const [price, setPrice] = useState('')
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState("")

  const handleUpload = (e) => {
    const file = e.target.files[0]
    setImage(file)
    console.log(image)
  }

  const onSubmitPost = async() => {
    const formData = new FormData()

    formData.append("image", image)
    formData.append("title", title)
    formData.append("category", category)
    formData.append("price", price)
    formData.append("description", description)

    await axios.post("http://localhost:2110/api", formData)
    .then(res => console.log(res)).catch(err => console.log(err.message))
  }

  return (
    <Container>
      <Wrapper >
      <Image 
        type="file"
        onChange={(e) => {
          handleUpload(e)
        }}
        />
        <TitleInput
        placeholder="Enter Title"
        value={title}
        onChange={(e) => {
            setTitle(e.target.value)
        }}
        />
        <CategoryInput
         placeholder="Enter Category"
         value={category}
         onChange={(e) => {
           setCategory(e.target.value)
         }}
        />
        <PriceInput
         placeholder="Enter Price"
         type="Number"
         value={price}
         onChange={(e) => {
           setPrice(e.target.value)
           
         }}
        />
        <DescriptionInput
         placeholder="Enter Description"
         value={description}
         onChange={(e) => {
           setDescription(e.target.value)
         }}
        />
        <Button
        onClick={() => {
          onSubmitPost()
        }}
        >Submit</Button>
      </Wrapper>
    </Container>
  )
}

export default PostScreen

const Image = styled(Input)`
width: 500px;
margin: 10px;
`

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100vh;
background-color: aliceblue;
`
const Wrapper = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 100vh;
`
const TitleInput = styled(Input)`
width: 500px;
margin: 10px;
`
const CategoryInput = styled(Input)`
width: 500px;
margin: 10px;`
const DescriptionInput = styled(TextArea)`
resize: none;
width: 500px;
height: 1000px;
margin: 10px;
`
const PriceInput = styled(Input)`
width: 500px;
margin: 10px;
`