import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import img from '../components/1.jpg'

const DetailPage = () => {
  const {id} = useParams()
  const location = useLocation()
  const path = location.pathname.split("/")[1] 

  console.log(location)
  console.log("the path: "+path)
  const [items, setItems] = useState([])

  const getData = async (id) => {
   const res =  await axios.get(`http://localhost:2110/api/`)
    console.log("show me: "+ res)
  }
  console.log("show me: "+id)
  useEffect(() => {
  //  getData()
   const makePost = async() => {
      const res = await axios.get('http://localhost:2110/api/' + path)
      console.log(res)
   }
    makePost()
  }, [id])
  return (
    <Container>
      <Wrapper>
        <Image src={items.image} />
        <Holder>
          <Category>{items.category}</Category>
          <p>{id}</p>
          <Price>{items.price}</Price>
        </Holder>
        <Description>{items.description}</Description>
      </Wrapper>
    </Container>
  )
}

export default DetailPage

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 50px;

`
const Wrapper = styled.div`
/* width: 100%;
  height: 100vh; */
  display: flex;
  align-items: center;
  flex-direction: column;
`
const Image = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  border-radius: 0 0 10px 10px;
  margin-bottom: 50px;
`
const Holder = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
margin: 0 40px;
height: 80px;
align-items: center;
background-color: red;
padding: 0 80px;
margin-bottom: 50px;
border-radius: 5px;
color: white;
font-weight: bold;
text-transform: uppercase;
`
const Category = styled.div``
const Price = styled.div``
const Description = styled.div``