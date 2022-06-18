import { getBills, deleteBill } from './services/bills.service';
import React, { useEffect, useState } from "react";
import DefaultAppBar from './components/default.header';
import IconButton from '@mui/material/IconButton';

// Bar
import AddIcon from '@mui/icons-material/Add';

// Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    async function fetchBills() {
      const result = await getBills();
      setBills(result.data);
    }
    fetchBills();
  }, []);

  async function removeBill(billID) {
    /**
      @todo: Create an dialog with MUI components
    **/
    if(window.confirm('Do you really want do delete bill?')) {
      try {
        await deleteBill(billID)
        let remainingBills = bills.filter((bill) => {return bill.id !== billID});   
        setBills(remainingBills)
      } catch (err) {
        /**
          @todo: Create an alert message
        **/
        window.alert(err.response.status)
      }
    }
  }

  function navigateToAddBill() {
    /**
      @todo: Create a Navigation for Add Bill Screen
    **/
    console.log("TODO: Create a Navigation for Add Bill Screen")
  }
  
  function onSelectCell(billID) {
    console.log(billID);
  }

  return (
    <>
      <DefaultAppBar 
        title={"Billing Management"}
        rightButtonBar={
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={navigateToAddBill}>
            <AddIcon />
          </IconButton>}>
        </DefaultAppBar>
      <Paper sx={{ width: '100%', marginTop: 10 }}>
        <TableContainer >
          <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Value</TableCell>
                <TableCell sx={{ width: 50 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bills.map((bill) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={bill.id}>
                  <TableCell onClick={() => onSelectCell(bill.id)}> {bill.id} </TableCell>
                  <TableCell onClick={() => onSelectCell(bill.id)}> {bill.description} </TableCell>
                  <TableCell onClick={() => onSelectCell(bill.id)}>{bill.group}</TableCell>
                  <TableCell onClick={() => onSelectCell(bill.id)}>R$ {bill.value}</TableCell>
                  <TableCell sx={{ width: 50 }}>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="end"
                      onClick={() => { removeBill(bill.id) }}>
                      <DeleteIcon ></DeleteIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}

export default App;