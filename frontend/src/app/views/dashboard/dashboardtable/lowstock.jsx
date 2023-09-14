import React, { useState, useEffect } from 'react';
import {
  Card,
  Fab,
  Grid,
  Icon,
  lighten,
  styled,
  useTheme,
} from '@mui/material';

const ContentBox = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
}));

const FabIcon = styled(Fab)(() => ({
  width: '44px !important',
  height: '44px !important',
  boxShadow: 'none !important',
}));

const H3 = styled('h3')(({ textcolor }) => ({
  margin: 0,
  color: textcolor,
  fontWeight: '500',
  marginLeft: '12px',
}));

const H1 = styled('h1')(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary,
}));

const Span = styled('span')(({ textcolor }) => ({
  fontSize: '13px',
  color: textcolor,
  marginLeft: '4px',
}));

const IconBox = styled('div')(() => ({
  width: 16,
  height: 16,
  color: '#fff',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '300px ',
  justifyContent: 'center',
  '& .icon': { fontSize: '14px' },
}));

const StatCards2 = () => {
  const { palette } = useTheme();
  const textError = palette.error.main;
  const bgError = lighten(palette.error.main, 0.85);

  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [veryLowStockProducts, setVeryLowStockProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/list-products');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();

        const lowStock = data.filter(product => product.current_stock < 10 && product.current_stock >= 5);
        const veryLowStock = data.filter(product => product.current_stock < 5);

        setLowStockProducts(lowStock);
        setVeryLowStockProducts(veryLowStock);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{ p: 2 }}>
          <ContentBox>
            <FabIcon size="medium" sx={{ background: 'rgba(9, 182, 109, 0.15)' }}>
              <Icon sx={{ color: '#08ad6c' }}>trending_down</Icon>
            </FabIcon>
            <H3 textcolor={'#08ad6c'}>Low Stock Goods</H3>
          </ContentBox>

          {lowStockProducts.map((product, index) => (
            <ContentBox key={index} sx={{ pt: 2 }}>
              <H1>{product.product_name} has only {product.current_stock} stock left</H1>
              <IconBox sx={{ background: 'rgba(9, 182, 109, 0.15)' }}>
                <Icon className="icon">trending_down</Icon>
              </IconBox>
              <Span textcolor={'#08ad6c'}>(-50%)</Span>
            </ContentBox>
          ))}
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{ p: 2 }}>
          <ContentBox>
            <FabIcon size="medium" sx={{ background: 'rgba(255, 0, 0, 0.15)' }}>
              <Icon sx={{ color: 'red' }}>trending_down</Icon>
            </FabIcon>
            <H3 textcolor={'red'}>Very Low Stock Goods</H3>
          </ContentBox>

          {veryLowStockProducts.map((product, index) => (
            <ContentBox key={index} sx={{ pt: 2 }}>
              <H1>{product.product_name} has only {product.current_stock} stock left</H1>
              <IconBox sx={{ background: 'rgba(255, 0, 0, 0.15)' }}>
                <Icon className="icon">trending_down</Icon>
              </IconBox>
              <Span textcolor={'red'}>(-50%)</Span>
            </ContentBox>
          ))}
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatCards2;