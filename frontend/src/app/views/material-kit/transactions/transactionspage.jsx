import React, { useState, useEffect } from 'react';
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
  TextField,
  Typography,
} from '@mui/material';

const API_URL = 'http://localhost:5001/api';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    transaction_date: '',
    user_id: null,
    total_amount: '',
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${API_URL}/get-transactions`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const openAddDialog = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const addTransaction = async () => {
    try {
      const response = await fetch(`${API_URL}/add-transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });
      if (!response.ok) {
        console.error('Network response not ok:', response.status, response.statusText);
        return;
      }
      const data = await response.json();
      setTransactions([...transactions, data]);
      setNewTransaction({
        transaction_date: '',
        user_id: null,
        total_amount: '',
      });
      setOpenDialog(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const openEditDialog = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenDialog(true);
  };

  const updateTransaction = async () => {
    try {
      const response = await fetch(
        `${API_URL}/update-transaction/${selectedTransaction.transaction_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedTransaction),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const updatedTransactions = transactions.map((t) =>
        t.transaction_id === selectedTransaction.transaction_id ? data : t
      );
      setTransactions(updatedTransactions);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/delete-transaction/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedTransactions = transactions.filter((t) => t.transaction_id !== id);
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const generateTransactionPDF = async (transaction) => {
    try {
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Transactions
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.transaction_id}>
              <TableCell>{transaction.transaction_date}</TableCell>
              <TableCell>{transaction.user_id}</TableCell>
              <TableCell>{transaction.total_amount}</TableCell>
              <TableCell>
                {/* <Button onClick={() => openEditDialog(transaction)}>Edit</Button>
                <Button onClick={() => deleteTransaction(transaction.transaction_id)}>
                  Delete
                </Button> */}
                <Button onClick={() => generateTransactionPDF(transaction)}>Download PDF</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <Dialog open={openDialog} onClose={closeDialog}>
        <DialogContent>
          <Button onClick={selectedTransaction ? updateTransaction : addTransaction}>
            
          </Button>
        </DialogContent>
      </Dialog> */}
    </Box>
  );
};

export default Transactions;
