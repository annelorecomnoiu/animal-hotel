import "./foodList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { deleteFood, getFoods } from "../../redux/apiCalls";
import { useDispatch, useSelector} from "react-redux";

export default function FoodList() {
  const dispatch = useDispatch();
  const foods = useSelector(state => state.food.foods);

  useEffect(() => {
    getFoods(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteFood(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "food",
      headerName: "Food",
      width: 650,
      renderCell: (params) => {
        return (
          <div className="foodListItem">
            <img className="foodListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/foods/" + params.row._id}>
              <button className="foodListEdit">Edit</button>
            </Link>
            <DeleteOutline 
                className="foodListDelete" onClick={() => handleDelete(params.row._id)}
              />
          </>
        );
      },
    },
  ];

  return (
    <div className="foodList">
      <Link to="/newFood">
            <button className="foodAddButton">Add new food</button>
        </Link>
      <DataGrid
        rows={foods} 
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}