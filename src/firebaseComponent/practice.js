import app from "../base"

const getData = async() => {

  await app.firestore().collection("task").onSnapshot( snapshot => {
      const r = []
      snapshot.forEach(doc => {
        r.push({...doc.data(), id: doc.id })
      })

      setState(r)
  }) 
}

// post
const getPost = async() => {
  await app,firestore().collection("task").doc().set({
    email,
    password,
    userName,
  })
  setEmail("")
}

// update
const getUpdate = async(id) => {
  await app.firestore().collection("task").doc(id).update({
    
    userName,
  })
  setEmail("")
}

// delete
const getDelete = async(id) => {
  await app.firestore().collection("task").doc(id).delete()
}

const [uploadImage, setUploadImage] = useState('')

const uploadFile = (e) => {
  const file = e.target.files[0]
  const fileRef = app.storage().ref()
  const myFile = fileRef.child(file.name)
  await fileRef.put(file)
  setUploadImage(await fileRef.getDownloadURL())
}


// const imageDisplay = (e) => {
//   const reader = new FileReader()
//   reader.onload = () => {
//     if(reader.readyState === 2){
//       setDisplay(reader.result)
//     }
//   } 
//   reader.readAsDataURL(e.target.files[0])
// }


const imageDisplay = (e) => {
  const reader = new FileReader()
  reader.onload = () => {
    if(reader.readyState === 2){
      setDisplay(reader.result)
    }
  }
  reader.readAsDataURL(e.target.files[0])
}