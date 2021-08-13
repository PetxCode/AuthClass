import styled from "styled-components"
import img from "./1.jpg"
import React, {useState, useEffect} from "react"
import axios from "axios"
import {AiFillCloseCircle} from "react-icons/ai"
import { Link } from "react-router-dom"

const Home = () => {

  const [backendData, setBackendData] = useState([])

  const getData = async() => {
  const result =  await axios.get("http://localhost:2110/api/")
  // const result =  await axios.get("http://localhost:4001/")
    if(result){
      setBackendData(result.data)
      console.log(backendData)
    }
  }

  
const deleteFile = async(id) => {
  await axios.delete(`http://localhost:2110/api/${id}`)
  window.location.reload()
}


  useEffect(() => {
    getData()
  }, [])

  return (
    <Container>
      {
        backendData?.map(item => (
          <Wrapper key={item._id}>
            <ImageWrapper>
              <Icon 
              onClick={() => {
                deleteFile(item._id)
              }}
              />
              <Avatar src={item.image} />
            </ImageWrapper>
        
        <Category>{item.category}</Category>
        <Card>{item.title}</Card>
        <Description>{item.description}</Description>
        <Data>
          <Price>
            <Cost>{item.price}</Cost>
            <CostTitle>Price</CostTitle>
          </Price>
          <Vr/>
          <Price>
            <Cost
            to={`/${item._id}`}
            >Read</Cost>
            <CostTitle>More</CostTitle>
            </Price>
       
          <Vr/>
          <Price>
          <Cost>{backendData.length}</Cost>
            <CostTitle>Total Entry</CostTitle>
          </Price>
          
        </Data>
      </Wrapper>
        ))
      }
    </Container>
  )
}

export default Home

const ImageWrapper = styled.div`
position: relative;
width:100%;
height: 200px;
`
const Icon = styled(AiFillCloseCircle)`
position: absolute;
z-index: 111;
right: 0;
margin-right: 10px;
margin-top: 10px;
color: red;
cursor: pointer;
font-size: 20px;
box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px;
/* z-index: 0 ; */
`
const Avatar = styled.img`
width:100%;
height: 100%;
object-fit: cover;
border-radius: 5px 5px 0 0;
position: absolute

`

const Vr = styled.div`
  height: 80%;
  width: 2px;
  background-color: black;
  opacity: 0.2;
`

const Data = styled.div`
/* background-color: #FC4B0B; */
background-color: #fd6805;
height: 70px;
width:100%;
font-weight: bold;
display: flex;
justify-content: space-around;
align-items: center;
border-radius: 0 0 5px 5px;
`
const Price = styled.div`
display: flex;
width:100%;
height: 100%;
flex-direction: column;
justify-content: center;
align-items: center;
`
const Cost = styled(Link)`
color:white;
cursor: pointer;

&:hover{
 color: lightgray
}

`
const CostTitle = styled.div`
  color: lightgray;
  font-size: 10px;
  margin-top: 5px;
  cursor: pointer;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 50px
`
const Wrapper = styled.div`
margin: 20px;
  width: 300px;
  height: 430px;
  background-color: lightblue;
  border-radius: 5px;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  display: flex;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
  rgb(0 0 0 / 53%) 0px 16px 10px -10px;
    

`
const Card = styled.div`
margin-top:5px;
font-weight: 500;
font-size: 20px;
text-transform: capitalize;
`
const Description = styled.div`
margin-top: 5px;
font-weight: 500;
font-size: 10px;
color: gray;
flex: 1;
width: 90%;
margin-bottom:5px;
`
const Category = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 11px;
  margin-top: 10px;
  color: #FF4A08;
`
