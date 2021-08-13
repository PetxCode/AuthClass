import React, {useState, useEffect, Fragment} from 'react'
import styled from 'styled-components'
import {AiFillDelete,AiFillCreditCard} from "react-icons/ai"
import app from '../base'
import { Button, Input } from 'antd'
import firebase from 'firebase'
import Images from './Images'
import { CropImage } from './CropImage'

const HomeScreen = () => {
const myStore = app.firestore().collection("task")
  const [data, setData] = useState([])
  const [myTask, setMyTask] = useState("")

const onCreate = async() => {
  await app.firestore().collection("task").doc().set({
    title: myTask,
    done: false,
    time: firebase.firestore.FieldValue.serverTimestamp()
  })
  setMyTask("")
}

const onUpdate = async(id) => {
  await app.firestore().collection("task").doc(id).update({
    done: true
  })
}

const onDelete = async(id) => {
  await app.firestore().collection("task").doc(id).delete()
  
}


  const getData = async() => {
    await app.firestore().collection("task")
    .orderBy("time", "asc")
    .onSnapshot((snapshot) => {
      const item = []
      snapshot.forEach(doc => {
        item.push({...doc.data(), id: doc.id})
      })
      setData(item)
      console.log(data)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Fragment>
      <InputContainer>
      <EnterInput
      placeholder="Enter a Task to do"
      value={myTask}
      onChange = {(e) => {
        setMyTask(e.target.value)
      }}
      />
      <MyButton
      onClick={(e) => {
        onCreate()
      }}
      >Submit</MyButton>     
      </InputContainer>
   
    <Container>
      
      {
        data.map(({title, time, done, id}) => (
          <Wrapper key={id} >
        {
          done ? 
          <Indicator brg > 
            <Icon 
            onClick={() => {
              onDelete(id)
              console.log(id)
            }}
            /> 
          </Indicator> : 
          <Indicator> 
            <Icon 
            onClick={() => {
              onDelete(id)
              console.log(id)
            }}
            /> 
          </Indicator> 
        }
          
        <Title>{title}</Title>
        <EditIcon 
        onClick={() => {
          onUpdate(id)
        }}
        />
      </Wrapper>
        ) )
      }
    </Container>
    
    {/* <CropImage /> */}
    </Fragment>
  )}

export default HomeScreen

const InputContainer = styled.div`
  padding-top: 70px;
  width:100%;
  justify-content: center;
  display: flex;
  height: 100px;
  align-items: center;
  
`
const MyButton = styled(Button)`
margin-top: 50px;
margin-left: 30px;
width: 150px;
height: 60px;
font-weight: bold;
text-transform: uppercase;
`
const EnterInput = styled(Input)`
  width: 500px;
  height: 60px;
  margin-top: 50px;
  justify-content: center;
  display: flex;
`

const Indicator = styled.div`
  width: 50px;
  height: 100%;
  background-color: ${({brg})=>brg ? "green":"red"};
  border-radius: 5px 0 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Icon = styled(AiFillDelete)`
  color: white;
  cursor: pointer;
`
const Title = styled.div`
flex: 1;
margin-left: 10px;
font-weight: bold;
`
const EditIcon = styled(AiFillCreditCard)`
margin-right: 10px;
cursor: pointer;
`

const Container = styled.div`
padding-top: 80px;
display: flex;
justify-content: center;
flex-wrap: wrap;
`
const Wrapper = styled.div`
  margin: 20px;
  width: 300px;
  height: 40px;
  border: 1px solid lightgray;
  border-radius: 5px;
  display: flex;
  align-items: center;
  box-shadow: rgb(0 0 0 / 49%) 0px 16px 10px -15px;
`