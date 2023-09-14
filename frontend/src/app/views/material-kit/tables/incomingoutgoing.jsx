// import React, { useState, useEffect } from "react";
// import { Box, styled } from "@mui/material";
// import { Breadcrumb, SimpleCard } from "app/components";
// import incomingoutgoing from "./incomingoutgoing";

// const Container = styled("div")(({ theme }) => ({
//   margin: "30px",
//   [theme.breakpoints.down("sm")]: { margin: "16px" },
//   "& .breadcrumb": {
//     marginBottom: "30px",
//     [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
//   },
// }));

// const AppTable = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTransactionData = async () => {
//       try {
//         const res = await fetch('http://localhost:5001/api/get-transactions');
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await res.json();
//         setTransactions(data);
//         setError(null); 
//       } catch (error) {
//         console.error("Error fetching transaction data:", error);
//         setError(error.message); 
//       }
//     };

//     fetchTransactionData();
//   }, []);

//   return (
//     <Container>
//       <Box className="breadcrumb">
//         <Breadcrumb
//           routeSegments={[
//             { name: "Material", path: "/material" },
//             { name: "Table" },
//           ]}
//         />
//       </Box>

//       <SimpleCard title="View Transaction Data">
//         {error ? (
//           <div>Error: {error}</div>
//         ) : (
//           <incomingoutgoing transactions={transactions} />
//         )}
//       </SimpleCard>
//     </Container>
//   );
// };

// export default AppTable;
