import './App.css';
import { getBills } from './services/bills.service';
import React, { useEffect, useState } from "react";

// Bar
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

// Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function App() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    async function fetchBills() {
      const result = await getBills();
      console.log(result.data);
      setBills(result.data);
    }
    fetchBills();
  }, []);

  function navigateToAddBill() {
    console.log("TODO: Create a Navigation for an Add Bill Screen")
  }

  return (
    <>
      <MuiAppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Billing Management
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={navigateToAddBill}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>
      <TableContainer >
        <Table sx={{ minWidth: 650, marginTop: 10 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Bill Fixed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell> {bill.id} </TableCell>
                <TableCell> {bill.description} </TableCell>
                <TableCell>{bill.group}</TableCell>
                <TableCell>R$ {bill.value}</TableCell>
                <TableCell>´${bill.isFixed ? "True icone" : "False icone"}´</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
  )
}

export default App;