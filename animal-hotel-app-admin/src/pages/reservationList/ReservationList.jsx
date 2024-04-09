import "./reservationList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect } from "react";
import { deleteReservation, getReservations } from "../../redux/apiCalls";
import { useDispatch, useSelector} from "react-redux";

export default function ReservationList() {
  const dispatch = useDispatch();
  const reservations = useSelector(state => state.reservation.reservations);

  useEffect(() => {
    getReservations(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    const updatedReservations = reservations.filter((reservation) => reservation._id !== id);
    deleteReservation(id, dispatch);
    dispatch({ type: 'DELETE_RESERVATION', payload: updatedReservations });
  };

  const columns = [
    { field: "_id", 
      headerName: "ID", 
      width: 200 
    },
    {
      field: "reservation",
      headerName: "Check-in / Check-out Dates",
      width: 237,
      renderCell: (params) => {
        return (
          <div className="reservationListItem">
            {params.row.startDate} - {params.row.endDate}
          </div>
        );
      },
    },
    {
      field: "customer",
      headerName: "Customer",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="reservationListItem">
            {params.row.billingDetails.name}
          </div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="reservationListItem">
            ${params.row.amount}
          </div>
        );
      },
    },
    {
      field: "userId",
      headerName: "User ID",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="reservationListItem">
            {params.row.userId}
          </div>
        );
      },
    },
    {
      field: "rooms",
      headerName: "Room ID",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="reservationListItem">
            {params.row.rooms[0]._id.toString()}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
            <DeleteOutline 
                className="reservationListDelete" onClick={() => handleDelete(params.row._id)}
              />
        );
      },
    },
  ];

  return (
    <div className="reservationList">
      <DataGrid
        rows={reservations} 
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