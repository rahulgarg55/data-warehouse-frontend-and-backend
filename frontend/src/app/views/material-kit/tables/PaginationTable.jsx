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
  const [incomingGoodsCount, setIncomingGoodsCount] = useState(0);
  const [outgoingGoodsCount, setOutgoingGoodsCount] = useState(0);

  useEffect(() => {
    fetch('/api/incoming-goods-count')
      .then((response) => response.json())
      .then((data) => {
        setIncomingGoodsCount(data.count);
      })
      .catch((error) => {
        console.error('Error fetching incoming goods count:', error);
      });

    fetch('/api/outgoing-goods-count')
      .then((response) => response.json())
      .then((data) => {
        setOutgoingGoodsCount(data.count);
      })
      .catch((error) => {
        console.error('Error fetching outgoing goods count:', error);
      });
  }, []);

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      <Grid item xs={12} md={6}>
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">group</Icon>
            <Box ml="12px">
              <Small>Incoming Goods</Small>
              <Heading>{incomingGoodsCount}</Heading>
            </Box>
          </ContentBox>

          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">attach_money</Icon>
            <Box ml="12px">
              <Small>Outgoing Goods</Small>
              <Heading>{outgoingGoodsCount}</Heading>
            </Box>
          </ContentBox>

          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default StatCards;
