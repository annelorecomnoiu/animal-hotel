import "./service.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { updateService } from "../../redux/apiCalls";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../../firebase";

export default function Service() {
    const navigate = useNavigate();
    const location = useLocation();
    const serviceId = location.pathname.split("/")[2];
    const [ file, setFile ] = useState(null);
    const [ categories, setCategories ] = useState([]);
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [inStock, setInStock] = useState(false);

    const service = useSelector((state) => 
        state.service.services.find((service) => service._id === serviceId) 
    );

      useEffect(() => {
        if (service) {
          setTitle(service.title || "");
          setPrice(service.price || 0);
          setDescription(service.description || "");
          setInStock(service.inStock || false);
          setCategories(service.categories || []);
          setFile(service.img || null);
        }
      }, [service]);

      const handleChange = (e) => {
        e.preventDefault();
        if(e.target.name == "title")
          setTitle(e.target.value);
        else if(e.target.name == "price")
          setPrice(e.target.value);
        else if(e.target.name == "description")
          setDescription(e.target.value);
        else if(e.target.name == "inStock")
          setInStock(e.target.value);
        else if(e.target.name == "categories")
          setCategories(e.target.value.split(","));
        
      };



      const handleUpdate = (e) => {
        e.preventDefault();
      
        if (!(file === service.img)) {
          const fileName = new Date().getTime() + file.name;
          const storage = getStorage(app);
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
      
          // Register the observers for upload progress and completion
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              // ...
            },
            (error) => {
              // Handle unsuccessful uploads
            },
            () => {
              // Handle successful upload completion
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const updatedService = { _id: serviceId, title, description, inStock, price, img: downloadURL, categories };
                console.log("Service to update: ", updatedService);
                updateService(serviceId, updatedService, dispatch);
                alert("Service updated successfully");
                navigate("/services");
              });
            }
          );
        } else {
          const updatedService = {_id: serviceId, title, description, inStock, price, img: service.img, categories };
          console.log("Service to update: ", updatedService);
          updateService(serviceId, updatedService, dispatch);
          alert("Service updated successfully");
          navigate("/services");
        }
      };
    

  return (
    <div className="service">
      <div className="serviceTitleContainer">
        <h1 className="serviceTitle">Add Service</h1>
      </div>
     
      <div className="serviceBottom">
        <form className="serviceForm">
            <div className="serviceFormLeft">
                <label>Service Title</label>
                <input type ="text" name="title" placeholder={service ? service.title : ""} onChange={handleChange}/>
                <label>Service Description</label>
                <input type ="text" name="description" placeholder={service ? service.description : ""} onChange={handleChange}/>
                <label>Service Price</label>
                <input type ="number" name = "price" placeholder={service ? service.price : ""} onChange={handleChange} />
                <label>Service Categories</label>
                <input type ="text" name="categories" placeholder={service ? service.categories : ""}  onChange={handleChange}/>
                
            </div>
            <div className="serviceFormRight">
                <div className="serviceUpload">
                    <img 
                    src={service ? service.img : ""}
                    alt=""
                    className="serviceUploadingImg"
                    />
                    <label htmlFor="file">
                        <Publish/>
                    </label>
                    <input type="file" id="file" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])} />
                </div>
                
                <button className="serviceButton" onClick={handleUpdate} >Update</button>
               
                
            </div>
        </form>
      </div>
    </div>
  )
}
