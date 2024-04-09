import "./serviceList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { deleteService, getServices } from "../../redux/apiCalls";
import { useDispatch, useSelector} from "react-redux";

export default function ServiceList() {
  const dispatch = useDispatch();
  const services = useSelector(state => state.service.services);

  useEffect(() => {
    getServices(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteService(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "service",
      headerName: "Service",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="serviceListItem">
            <img className="serviceListImg" src={params.row.img} alt="" />
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
            <Link to={"/services/" + params.row._id}>
              <button className="serviceListEdit">Edit</button>
            </Link>
            <DeleteOutline 
                className="serviceListDelete" onClick={() => handleDelete(params.row._id)}
              />
          </>
        );
      },
    },
  ];

  return (
    <div className="serviceList">
      <Link to="/newService">
            <button className="serviceAddButton">Add new service</button>
        </Link>
      <DataGrid
        rows={services} 
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