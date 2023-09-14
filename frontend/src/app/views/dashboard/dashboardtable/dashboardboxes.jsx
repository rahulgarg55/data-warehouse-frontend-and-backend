import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main }
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main
}));

const StatCards = () => {
  const [incomingCount, setIncomingCount] = useState(0);
  const [outgoingCount, setOutgoingCount] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
      } catch (err) {
        console.error('Error fetching data:', err);
        return null;
      }
    };

    const fetchIncoming = async () => {
      const data = await fetchData('http://localhost:5001/api/incoming-goods-data');
      if (data) {
        setIncomingCount(data.count);
      }
    };

    const fetchOutgoing = async () => {
      const data = await fetchData('http://localhost:5001/api/outgoing-goods-data');
      if (data) {
        setOutgoingCount(data.count);
      }
    };

    const fetchSuppliers = async () => {
      const data = await fetchData('http://localhost:5001/api/suppliers-data');
      if (data) {
        setSupplierCount(data.count);
      }
    };

    const fetchCustomers = async () => {
      const data = await fetchData('http://localhost:5001/api/customers-data');
      if (data) {
        setCustomerCount(data.count);
      }
    };

    fetchIncoming();
    fetchOutgoing();
    fetchSuppliers();
    fetchCustomers();
  }, []);

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      <Grid item xs={12} md={6}>
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">group</Icon>
            <Box ml="12px">
              <Small>Incoming Goods</Small>
              <Heading>{incomingCount}</Heading>
            </Box>
          </ContentBox>

         
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">attach_money</Icon>
            <Box ml="12px">
              <Small>Outgoing Goods</Small>
              <Heading>{outgoingCount}</Heading>
            </Box>
          </ContentBox>

      
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">person</Icon>
            <Box ml="12px">
              <Small>Suppliers</Small>
              <Heading>{supplierCount}</Heading>
            </Box>
          </ContentBox>
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">people</Icon>
            <Box ml="12px">
              <Small>Customers</Small>
              <Heading>{customerCount}</Heading>
            </Box>
          </ContentBox>

        
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default StatCards;
