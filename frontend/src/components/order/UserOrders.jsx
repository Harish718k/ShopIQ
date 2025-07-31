// import { Fragment, useEffect} from 'react'
// import MetaData from '../layouts/MetaData';
// import DataTable from 'react-data-table-component';
// import { useDispatch, useSelector } from 'react-redux';
// import { userOrders as userOrdersAction } from '../../actions/orderActions';
// import { Link } from 'react-router-dom';

// export default function UserOrders () {
//     const { userOrders = []} = useSelector(state => state.orderState)
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(userOrdersAction)
//     },[dispatch])

//     const setOrders = () => {
//         const data = {
//             columns: [
//                 {
//                     label: "Order ID",
//                     field: 'id',
//                     sort: "asc"
//                 },
//                 {
//                     label: "Number of Items",
//                     field: 'numOfItems',
//                     sort: "asc"
//                 },
//                 {
//                     label: "Amount",
//                     field: 'amount',
//                     sort: "asc"
//                 },
//                 {
//                     label: "Status",
//                     field: 'status',
//                     sort: "asc"
//                 },
//                 {
//                     label: "Actions",
//                     field: 'actions',
//                     sort: "asc"
//                 }
//             ],
//             rows:[]
//         }

//         userOrders.forEach(userOrder => {
//             data.rows.push({
//                 id:  userOrder._id,
//                 numOfItems: userOrder.orderItems.length,
//                 amount: `$${userOrder.totalPrice}`,
//                 status: userOrder.orderStatus && userOrder.orderStatus.includes('Delivered') ?
//                 (<p style={{color: 'green'}}> {userOrder.orderStatus} </p>):
//                 (<p style={{color: 'red'}}> {userOrder.orderStatus} </p>),
//                 actions: <Link to={`/order/${userOrder._id}`} className="btn btn-primary" >
//                     <i className='fa fa-eye'></i>
//                 </Link>
//             })
//         })


//         return  data;
//     }


//     return (
//         <Fragment>
//             <MetaData title="My Orders" />
//             <h1 className='mt-5'>My Orders</h1> 
//             <DataTable
//                 className='px-3'
//                 bordered
//                 striped
//                 hover
//                 data={setOrders()}
//             />
//         </Fragment>
//     )
// }


import { Fragment, useEffect } from 'react';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { userOrders as userOrdersAction } from '../../actions/orderActions';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

export default function UserOrders() {
  const { userOrders = [] } = useSelector(state => state.orderState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrdersAction());
  }, [dispatch]);

  // Convert orders into table format
  const getTableData = () => {
    const columns = [
      {
        name: 'Order ID',
        selector: row => row.id,
        sortable: true,
      },
      {
        name: 'Number of Items',
        selector: row => row.numOfItems,
        sortable: true,
      },
      {
        name: 'Amount',
        selector: row => row.amount,
        sortable: true,
      },
      {
        name: 'Status',
        cell: row => (
          <p style={{ color: row.status.includes('Delivered') ? 'green' : 'red' }}>
            {row.status}
          </p>
        ),
        sortable: true,
      },
      {
        name: 'Actions',
        cell: row => (
          <Link to={`/order/${row.id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      },
    ];

    const rows = userOrders.map(order => ({
      id: order._id,
      numOfItems: order.orderItems.length,
      amount: `$${order.totalPrice}`,
      status: order.orderStatus,
    }));

    return { columns, rows };
  };

  const { columns, rows } = getTableData();

  return (
    <Fragment>
      <MetaData title="My Orders" />
      <h1 className="mt-5">My Orders</h1>
      <DataTable
        className="px-3"
        columns={columns}
        data={rows}
        striped
        highlightOnHover
        pagination
      />
    </Fragment>
  );
}
