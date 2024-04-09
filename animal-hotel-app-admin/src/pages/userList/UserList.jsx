import { DeleteOutline } from "@material-ui/icons";
import "./userList.css";
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/apiCalls";
import { useEffect } from "react";


export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const filteredUsers = users?.filter((item) => item.isAdmin == false);


  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const columns = [
      { 
        field: 'id', 
        headerName: 'ID', 
        width: 230, 
        renderCell: (params) => {
          return (
            <div className="userListUser">
              {params.row._id}
            </div>
          );
        }, 
      },
      { 
        field: 'username', 
        headerName: 'User', 
        width: 200,
        renderCell: (params) => {
          return (
            <div className="userListUser">
              <img className="userListImg" src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" alt ="" />
              {params.row.username}
            </div>
          );
        },
      },
      { 
        field: 'email', 
        headerName: 'Email', 
        width: 200 
      },
      { 
        field: 'status', 
        headerName: 'Status', 
        width: 120 
      },
      { 
        field: 'action', 
        headerName: 'Action', 
        width: 115,
        renderCell: (params) => {
          return(
            <>
              <DeleteOutline 
                className="userListDelete" onClick={() => handleDelete(params.row._id)}
              />
            </>
          );
        }, 
      },
    ];
  
  return (
    <div className="userList">
      <DataGrid
        rows={filteredUsers} 
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}
