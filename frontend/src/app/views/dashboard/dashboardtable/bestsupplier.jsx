import React, { useEffect, useState } from 'react';
import { Button, Card, styled } from '@mui/material';
import { convertHexToRGB } from 'app/utils/utils';

const CardRoot = styled(Card)(({ theme }) => ({
  marginBottom: '24px',
  padding: '24px !important',
  [theme.breakpoints.down('sm')]: { paddingLeft: '16px !important' },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  position: 'relative',
  padding: '24px !important',
  background: `rgb(${convertHexToRGB(theme.palette.primary.main)}, 0.15) !important`,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const Paragraph = styled('p')(({ theme }) => ({
  margin: 0,
  paddingTop: '24px',
  paddingBottom: '24px',
  color: theme.palette.text.secondary,
}));

const UpgradeCard = () => {
  const [supplierWithLeastStock, setSupplierWithLeastStock] = useState('');

  useEffect(() => {
    const fetchSupplierWithLeastStock = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/supplier-with-least-stock');
        const data = await res.json();
        if (data) {
          setSupplierWithLeastStock(data.supplierName);
        }
      } catch (err) {
        console.error('Error fetching supplier with least stock:', err);
      }
    };

    fetchSupplierWithLeastStock();
  }, []);

  return (
    <CardRoot>
      <StyledCard elevation={0}>
        <img src="/assets/images/illustrations/upgrade.svg" alt="upgrade" />

        <Paragraph>
          {supplierWithLeastStock ? `Supplier with least stock: ${supplierWithLeastStock}` : 'No supplier found'}
        </Paragraph>
      </StyledCard>
    </CardRoot>
  );
};

export default UpgradeCard;
