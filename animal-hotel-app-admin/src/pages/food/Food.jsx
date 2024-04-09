import "./food.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateFood } from "../../redux/apiCalls";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../../firebase";

export default function Food() {


    const navigate = useNavigate();
    const location = useLocation();
    const foodId = location.pathname.split("/")[2];
    const [ file, setFile ] = useState(null);
    const [ categories, setCategories ] = useState([]);
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [inStock, setInStock] = useState(false);

    const food = useSelector((state) => 
        state.food.foods.find((food) => food._id === foodId) 
    );

      useEffect(() => {
        if (food) {
          setTitle(food.title || "");
          setPrice(food.price || 0);
          setDescription(food.description || "");
          setInStock(food.inStock || false);
          setCategories(food.categories || []);
          setFile(food.img || null);
        }
      }, [food]);

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
      
        if (!(file === food.img)) {
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
                const updatedFood = { _id: foodId, title, description, inStock, price, img: downloadURL, categories };
                console.log("Food to update: ", updatedFood);
                updateFood(foodId, updatedFood, dispatch);
                alert("Food updated successfully");

 
                navigate("/foods");


              });
            }
          );
        } else {
          const updatedFood = {_id: foodId, title, description, inStock, price, img: food.img, categories };
          console.log("Food to update: ", updatedFood);
          updateFood(foodId, updatedFood, dispatch);
          alert("Food updated successfully");
          navigate("/foods");
        }
      };
    

  return (
    <div className="food">
      <div className="foodTitleContainer">
        <h1 className="foodTitle">Edit Food</h1>
        
      </div>
      
      <div className="foodBottom">
        <form className="foodForm">
            <div className="foodFormLeft">
                <label>Food Title</label>
                <input type ="text" name="title" placeholder={food ? food.title : ""} onChange={handleChange}/>
                <label>Food Description</label>
                <input type ="text" name="description" placeholder={food ? food.description : ""} onChange={handleChange}/>
                <label>Food Price</label>
                <input type ="number" name = "price" placeholder={food ? food.price : ""} onChange={handleChange} />
                <label>Food Categories</label>
                <input type ="text" name="categories" placeholder={food ? food.categories : ""}  onChange={handleChange}/>
              
            </div>
            <div className="foodFormRight">
                <div className="foodUpload">
                    <img 
                    src={food ? food.img : ""}
                    alt=""
                    className="foodUploadingImg"
                    />
                    <label htmlFor="file">
                        <Publish/>
                    </label>
                    <input type="file" id="file" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])} />
                </div>
                
                <button className="foodButton" onClick={handleUpdate} >Update</button>
            </div>
        </form>
      </div>
    </div>
  )
}
