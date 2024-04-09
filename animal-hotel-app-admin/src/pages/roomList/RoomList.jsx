import "./roomList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { deleteRoom, getRooms } from "../../redux/apiCalls";
import { useDispatch, useSelector} from "react-redux";

export default function RoomList() {
  const dispatch = useDispatch();
  const rooms = useSelector(state => state.room.rooms);

  useEffect(() => {
    getRooms(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteRoom(id, dispatch);
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 290 },
    {
      field: "room",
      headerName: "Room",
      width: 290,
      renderCell: (params) => {
        return (
          <div className="roomListItem">
            <img className="roomListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/rooms/" + params.row._id}>
              <button className="roomListEdit">Edit</button>
            </Link>
            <DeleteOutline 
                className="roomListDelete" onClick={() => handleDelete(params.row._id)}
              />
          </>
        );
      },
    },
  ];

  return (
    <div className="roomList">
      <Link to="/newRoom">
            <button className="roomAddButton">Add new room</button>
        </Link>
      <DataGrid
        rows={rooms} 
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