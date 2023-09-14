import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { Paragraph } from 'app/components/Typography';

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const TopSellingTable = ({ userRole }) => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/list-products'); 
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setProductList(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  const editProduct = async (productId, updatedProductData) => {
    try {
      const response = await fetch(`http://localhost:5001/api/edit-product/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductData),
      });
  
      if (!response.ok) {
        console.error('Network response not ok:', response.status, response.statusText);
        return;
      }
  
      const updatedProductList = productList.map((product) =>
        product.product_id === productId ? updatedProductData : product
      );
  
      setProductList(updatedProductList);
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };
  
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/delete-product/${productId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        console.error('Network response not ok:', response.status, response.statusText);
        return;
      }
  
      const updatedProductList = productList.filter((product) => product.product_id !== productId);
      setProductList(updatedProductList);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3, width: '100%' }}>
      <CardHeader>
        <Title>View Goods Data</Title>
        <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }} colSpan={4}>
                Goods
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Price
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Brand
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Stock
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Date
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productList.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Avatar src={product.imgUrl} />
                    <Paragraph sx={{ m: 0, ml: 4 }}>{product.product_name}</Paragraph>
                  </Box>
                </TableCell>
                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {product.price > 999 ? (product.price / 1000).toFixed(1) + 'k' : product.price}
                </TableCell>
                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {product.brand}
                </TableCell>
                <TableCell sx={{ px: 0 }} align="left" colSpan={1}>
                  {product.current_stock ? (
                    product.current_stock < 20 ? (
                      <Small bgcolor={bgSecondary}>{product.current_stock} available</Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>in stock</Small>
                    )
                  ) : (
                    <Small bgcolor={bgError}>out of stock</Small>
                  )}
                </TableCell>
                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  Created: {product.created_at} 
                  <br />
                  Last Modified: {product.updated_at} 
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={1}>
                  {userRole === 'customer' ? (
                    <IconButton>
                      <Icon color="primary">visibility</Icon>
                    </IconButton>
                  ) : (
                    <>
                      <IconButton>
                        <Icon color="primary">edit</Icon>
                      </IconButton>
                      <IconButton>
                        <Icon color="error">delete</Icon>
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

export default TopSellingTable;
