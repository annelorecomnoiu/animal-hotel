import "./newService.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addService } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewService() {
  const navigate = useNavigate();
  const [ inputs, setInputs ] = useState({});
  const [ file, setFile ] = useState(null);
  const [ categories, setCategories ] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs(prev=>{
      return {...prev, [e.target.name]:e.target.value}
    })
  };

  const handleCategories = (e) => {
    setCategories(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.preventDefault();
    const isAnyFieldEmpty = Object.values(inputs).some((value) => value === null || value === "");
    if (isAnyFieldEmpty || !file || categories.length === 0) {
      alert("Please fill all fields");
      return;
    }
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default:
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const service = { ...inputs, img: downloadURL, categories: categories };
        addService(service, dispatch)
        alert("Service added successfully");
        navigate("/services");
      });
    }
   );
  };

    return (
        <div className="newService">
          <h1 className="addServiceTitle">Add New Service</h1>
          <form className="addServiceForm">
            <div className="addServiceItem">
              <label>Image</label>
              <input type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
            </div>
            <div className="addServiceItem">
              <label>Title</label>
              <input name="title" type="text" placeholder="Dog Service" onChange={handleChange} />
            </div>
            <div className="addServiceItem">
              <label>Description</label>
              <input name="description" type="text" placeholder="description..." onChange={handleChange} />
            </div>
            <div className="addServiceItem">
              <label>Price($)</label>
              <input name="price" type="number" placeholder="100" onChange={handleChange}/>
            </div>
            <div className="addServiceItem">
              <label>Categories</label>
              <input type="text" placeholder="dog" onChange={handleCategories}/>
            </div>
            <div className="addServiceItem">
            </div>
            <button onClick={handleClick} className="addServiceButton">ADD SERVICE</button>
          </form>
        </div>
      );
    }