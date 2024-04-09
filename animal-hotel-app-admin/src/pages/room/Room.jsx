import "./room.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateRoom } from "../../redux/apiCalls";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../../firebase";

export default function Room() {
    const navigate = useNavigate();
    const location = useLocation();
    const roomId = location.pathname.split("/")[2];
    const [ file, setFile ] = useState(null);
    const [ categories, setCategories ] = useState([]);
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [inStock, setInStock] = useState(false);

    const room = useSelector((state) => 
        state.room.rooms.find((room) => room._id === roomId) 
    );

    
      useEffect(() => {
        if (room) {
          setTitle(room.title || "");
          setPrice(room.price || 0);
          setDescription(room.description || "");
          setInStock(room.inStock || false);
          setCategories(room.categories || "");
          setFile(room.img || null);
        }
      }, [room]);

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
      
        if (!(file === room.img)) {
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
                const updatedRoom = { _id: roomId, title, description, inStock, price, img: downloadURL, categories };
                console.log("Room to update: ", updatedRoom);
                updateRoom(roomId, updatedRoom, dispatch);
                alert("Room updated successfully");
                navigate("/rooms");
              });
            }
          );
        } else {
          const updatedRoom = {_id: roomId, title, description, inStock, price, img: room.img, categories };
          console.log("Room to update: ", updatedRoom);
          updateRoom(roomId, updatedRoom, dispatch);
          alert("Room updated successfully");
          navigate("/rooms");
        }
      };
    

  return (
    <div className="room">
      <div className="roomTitleContainer">
        <h1 className="roomTitle">Edit Room</h1>
      </div>
     
      <div className="roomBottom">
        <form className="roomForm">
            <div className="roomFormLeft">
                <label>Room Title</label>
                <input type ="text" name="title" placeholder={room ? room.title : ""} onChange={handleChange}/>
                <label>Room Description</label>
                <input type ="text" name="description" placeholder={room ? room.description : ""} onChange={handleChange}/>
                <label>Room Price</label>
                <input type ="number" name = "price" placeholder={room ? room.price : ""} onChange={handleChange} />
                <label>Room Categories</label>
                <input type ="text" name="categories" placeholder={room ? room.categories : ""}  onChange={handleChange}/>
                
        
            </div>
            <div className="roomFormRight">
                <div className="roomUpload">
                    <img 
                    src={room ? room.img : ""}
                    alt=""
                    className="roomUploadingImg"
                    />
                    <label htmlFor="file">
                        <Publish/>
                    </label>
                    <input type="file" id="file" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])} />
                </div>
                
                <button className="roomButton" onClick={handleUpdate} >Update</button>
               
                
            </div>
        </form>
      </div>
    </div>
  )
}
