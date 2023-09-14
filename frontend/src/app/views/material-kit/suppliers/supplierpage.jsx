import React, { useState, useEffect,RefreshUI } from 'react';
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

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [newSupplier, setNewSupplier] = useState({
    supplier_name: '',
    supplier_address: '',
    supplier_phone: '',
    role_code: null
  });

    const fetchSuppliers = async () => {
      try {
        const response = await fetch(`${API_URL}/get-suppliers`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
useEffect(() =>{
    fetchSuppliers();
  }, []);

  const openAddDialog = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const addSupplier = async () => {
    if (!newSupplier.supplier_name || !newSupplier.supplier_address || !newSupplier.supplier_phone) {
      alert('Please fill in all supplier details.');
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/add-supplier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSupplier)
      });
  
      if (!response.ok) {
        console.error('Network response not ok:', response.status, response.statusText);
        return;
      }
      const data = await response.json();
      setSuppliers(suppliers=>[data,...suppliers ]);
      fetchSuppliers();
    
      setNewSupplier({
        supplier_name: '',
        supplier_address: '',
        supplier_phone: '',
        role_code: null
      });
      setOpenDialog(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Supplier added successfully!',
        showConfirmButton: false,
         timer: 1500
      });

    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };
  

  const openEditDialog = (supplier) => {
    setSelectedSupplier(supplier);
    setOpenDialog(true);

  };

  const updateSupplier = async () => {
    try {
      const response = await fetch(`${API_URL}/update-supplier/${selectedSupplier.supplier_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedSupplier)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const updatedSuppliers = suppliers.map((s) =>
        s.supplier_id === selectedSupplier.supplier_id ? data : s
      );
      setSuppliers(updatedSuppliers);
       fetchSuppliers(updatedSuppliers); 
        RefreshUI();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  const deleteSupplier = async (id) => {
    try {
      const response = await fetch(`${API_URL}/delete-supplier/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedSuppliers = suppliers.filter((s) => s.supplier_id !== id);
      setSuppliers(updatedSuppliers);
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  return (
    <Box>
      <Button variant="outlined" onClick={openAddDialog}>
        Add Supplier
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.supplier_id}>
              <TableCell>{supplier.supplier_name}</TableCell>
              <TableCell>{supplier.supplier_address}</TableCell>
              <TableCell>{supplier.supplier_phone}</TableCell>
              <TableCell>
                <Button onClick={() => openEditDialog(supplier)}>Edit</Button>
                <Button onClick={() => deleteSupplier(supplier.supplier_id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>{selectedSupplier ? 'Edit Supplier' : 'Add Supplier'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={selectedSupplier ? selectedSupplier.supplier_name : newSupplier.supplier_name}
            onChange={(e) => {
              if (selectedSupplier) {
                setSelectedSupplier({ ...selectedSupplier, supplier_name: e.target.value });
              } else {
                setNewSupplier({ ...newSupplier, supplier_name: e.target.value });
              }
            }}
          />
          <TextField
            label="Address"
            fullWidth
            value={
              selectedSupplier ? selectedSupplier.supplier_address : newSupplier.supplier_address
            }
            onChange={(e) => {
              if (selectedSupplier) {
                setSelectedSupplier({ ...selectedSupplier, supplier_address: e.target.value });
              } else {
                setNewSupplier({ ...newSupplier, supplier_address: e.target.value });
              }
            }}
          />
          <TextField
            label="Phone"
            fullWidth
            value={selectedSupplier ? selectedSupplier.supplier_phone : newSupplier.supplier_phone}
            onChange={(e) => {
              if (selectedSupplier) {
                setSelectedSupplier({ ...selectedSupplier, supplier_phone: e.target.value });
              } else {
                setNewSupplier({ ...newSupplier, supplier_phone: e.target.value });
              }
            }}
          />
          <Button onClick={selectedSupplier ? updateSupplier : addSupplier}>
            {selectedSupplier ? 'Save' : 'Add'}
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Suppliers;
