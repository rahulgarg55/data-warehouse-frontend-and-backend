import React, { useState, useEffect, refreshUI } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField
} from '@mui/material';

const API_URL = 'http://localhost:5001/api';
const TableComponent = React.memo(Table);

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${API_URL}/list-customers`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const openAddDialog = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };
  const addCustomer = async () => {
    if (!newCustomer.name || !newCustomer.address || !newCustomer.phone) {
      alert('Please fill in all customer details.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/add-customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomer)
      });

      if (!response.ok) {
        console.error('Network response not ok:', response.status, response.statusText);
        return;
      }

      const data = await response.json();
      setCustomers(customers=>[data, ...customers]);
       fetchCustomers();
      setNewCustomer({
        name: '',
        address: '',
        phone: ''
      });
      setOpenDialog(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Customer added successfully!',
        showConfirmButton: false,
         timer: 1500
      });
    
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const openEditDialog = (customer) => {
    setSelectedCustomer(customer);
    setOpenDialog(true);
  };

  const updateCustomer = async () => {
    try {
      const response = await fetch(`${API_URL}/update-customer/${selectedCustomer.customer_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedCustomer)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const updatedCustomers = customers.map((c) =>
        c.customer_id === selectedCustomer.customer_id ? data : c
      );
      setCustomers(updatedCustomers);
      fetchCustomers(updatedCustomers);
      refreshUI();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      const response = await fetch(`${API_URL}/delete-customer/${customerId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedCustomers = customers.filter((c) => c.customer_id !== customerId);
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <Box>
      <Button variant="outlined" onClick={openAddDialog}>
        Add Customer
      </Button>

      <Table>
        <TableComponent>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.customer_id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  <Button onClick={() => openEditDialog(customer)}>Edit</Button>
                  <Button onClick={() => deleteCustomer(customer.customer_id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableComponent>
      </Table>

      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>{selectedCustomer ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={selectedCustomer ? selectedCustomer.name : newCustomer.name}
            onChange={(e) => {
              if (selectedCustomer) {
                setSelectedCustomer({ ...selectedCustomer, name: e.target.value });
              } else {
                setNewCustomer({ ...newCustomer, name: e.target.value });
              }
            }}
          />
          <TextField
            label="Address"
            fullWidth
            value={selectedCustomer ? selectedCustomer.address : newCustomer.address}
            onChange={(e) => {
              if (selectedCustomer) {
                setSelectedCustomer({ ...selectedCustomer, address: e.target.value });
              } else {
                setNewCustomer({ ...newCustomer, address: e.target.value });
              }
            }}
          />
          <TextField
            label="Phone"
            fullWidth
            value={selectedCustomer ? selectedCustomer.phone : newCustomer.phone}
            onChange={(e) => {
              if (selectedCustomer) {
                setSelectedCustomer({ ...selectedCustomer, phone: e.target.value });
              } else {
                setNewCustomer({ ...newCustomer, phone: e.target.value });
              }
            }}
          />
          <Button onClick={selectedCustomer ? updateCustomer : addCustomer}>
            {selectedCustomer ? 'Save' : 'Add'}
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Customers;
