import { Fragment, useEffect } from 'react';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { userOrders as userOrdersAction } from '../../actions/orderActions';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Eye } from 'lucide-react';

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
            <Eye />
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
      <h1 className="text-center text-3xl sm:text-4xl font-bold text-emerald-400 mb-8">My Orders</h1>
      <DataTable
        className="px-3 "
        columns={columns}
        data={rows}
        striped
        highlightOnHover
        pagination
      />
    </Fragment>
  );
}
