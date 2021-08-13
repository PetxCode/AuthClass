import img from "./images/44.jpg"
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import app from "../base"
import { useParams } from "react-router-dom"
import axios from "axios"


const db = app.firestore().collection("youtube")


const YouDetail = () => {
  const {id} = useParams()

const [data, setData] = useState([])
console.log( " This is the ID: ", id)

const getData = async(id) => {
 await app.firestore()
 .collection("youtube")
 .doc(id)
 .get()
 .then((show) => {
  console.log(show.data())
  console.log(id)
  setData(show.data())
 })
}

const getData1 = async(id) => {
 const res = await db
 .doc(id)
 .get()
 
 console.log("this is it: ", res.data())
}




useEffect(() => {
  getData(id)
  getData1(id)
 
}, [])
  return (
    <Container>
      <Wrapper>
        <Image 
        src={data && data.image}
        />
        <div>
          <span>{data && data.name}</span>
          <span>{data && data.view}</span>
        </div>
        <span>{data && data.title}</span>
        <p>{data && data.description}</p>
      </Wrapper>
    </Container>
  )
}

export default YouDetail

const Container = styled.div`
padding-top: 80px;
width: 100%;
height: 100vh;
display: flex;
align-items: center;
flex-direction: column;
`
const Wrapper = styled.div`
width: 100%;
height: 100vh;
display: flex;
align-items: center;
flex-direction: column;

div{
  width: 500px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
span{
  font-weight: bold;
  margin-bottom: 20px;
}

p{
  width: 600px;
}

`
const Image = styled.img`
  width: 720px;
  height: 480px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 40px;
`