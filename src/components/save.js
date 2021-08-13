
 const handleFile = (e) =>{
  const file = e.target.files[0]
   setImage ( file)
   console.log(image)
}

 const submitEntry = async() => {

   
    const formData = new FormData()
   //  const [image, setImage] = useState(file)

     formData.append("image", image)
     formData.append("title", title)
     formData.append("price", price)
     formData.append("category", category)
     formData.append("description", description)

     // const options = { content: formData };

   // console.log(options)
   console.log(image)
   axios.post("http://localhost:2110/api/", formData, {
     onUploadProgress: progressEvent => console.log(
     "upload progress: " +  Math.round(progressEvent.load/progressEvent.total) * 100     
     )
   }).then(res => console.log(res)).catch(err=>console.log(err))
 }



 
  const handleUpload = (e) => {
    setImage(e.target.files[0])
    console.log(image)
  }

  const onSubmitPost = async(e) => {

    const myData = new FormData()
    
    myData.append("image", image)
    myData.append("title", title)
    myData.append("category", category)
    myData.append("price", price)
    myData.append("description", image)

    await axios.post(
      "http://localhost:2110/api", myData, {
        onUploadProgress: ProgressEvent => console.log(
         Math.round( ProgressEvent.load / ProgressEvent.total) * 100
        )
      }
    ).then(res => console.log(res)).catch(err => console.log(err.message))
  }
