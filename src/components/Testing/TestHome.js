import axios from 'axios'
import React, {useState, useEffect} from 'react'

const TestHome = () => {
  const [test, setTest] = useState([])

  const getData = async() => {
    const res = await axios.get("'http://localhost:2210/api")
    console.log(res)
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      
    </div>
  )
}

export default TestHome
