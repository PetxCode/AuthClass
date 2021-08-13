import axios from 'axios'
import React from 'react'

const LetBuild = () => {
  const [files, setFiles] = React.useState([])

  const getData = async() => {
    const r = await axios.get("https://bdcl-api.herokuapp.com/api/bdcl/students")

    setFiles(r.data.students)
    console.log(files)
    console.log("files: ", r.data)
  }

  React.useEffect(() => {
      getData()
  }, [])
  return (
    <div style={{
      paddingTop: "80px",
      width:"100%",
      display:"flex",
      justifyContent:"center",
      flexWrap:"wrap"
    }}>
      {
        files.map(q => (
         <div key={q.id} style={{
           margin: "20px"
         }}>
           <div
           style={{
             fontWeight:"bold",
             fontSize: "20px",
             marginBottom:"10px",
             textAlign:"center",
             textTransform: "uppercase",
             
           }}
           > {q.firstname} </div>
           <img src={q.image} 
           style={{
             width: "250px",
             height: "300px",
             objectFit:"cover",
             borderRadius: "10px"
           }}
           />
           <div
           style={{
            width:"250px",
            display: "flex",
            justifyContent:"center",
            flexDirection:"column",
            alignItems: "center"
           }}
           > 
            <div
            style={{
              fontWeight:"bold",
              marginBottom: "10px",
            }}
            > {q.course} </div>
            <div
            style={{
              fontSize: "12px",
            }}
            > {q.testimony} </div>
            </div>
         </div>
        ))
      }
    </div>
  )
}

export default LetBuild
