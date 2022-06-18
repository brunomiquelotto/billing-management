import React, { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

// API
import { getBills, deleteBill, payBill } from '../services/bills.service';

// Bar
import DefaultAppBar from '../components/default.header';
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
import CheckIcon from '@mui/icons-material/Check';

function Home() {
  const [bills, setBills] = useState({update: 0, data: []});
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchBills() {
      const result = await getBills();
      setBills({update: bills.update += 1, data: result.data});
    }
    fetchBills();
  }, []);

  async function removeBill(billID) {
    /**
      @todo: Create an dialog with MUI components
    **/
    if (window.confirm('Do you really want do delete bill?')) {
      try {
        await deleteBill(billID)
        let remainingBills = bills.data.filter((bill) => { return bill.id !== billID });
        setBills({update: bills.update += 1, data: remainingBills});
      } catch (error) {
        /**
          @todo: Create an alert message
        **/
        window.alert(error.response.status)
      }
    }
  }

  async function pay(billID) {
    /**
      @todo: Create an dialog with MUI components
    **/
    if (window.confirm('Do you really want do pay bill?')) {
      try {
        let result = await payBill(billID).then()
        let index = bills.data.findIndex((bill) => bill.id === billID);
        bills.data[index] = result.data
        setBills({update: bills.update += 1, data: bills.data});
      } catch (error) {
        /**
          @todo: Create an alert message
        **/
        window.alert(error.response.status)
      }
    }
  }

  function onSelectCell(bill) {
    navigate('/Create',{state: bill})
  }

  return (
    <>
      <DefaultAppBar
        title={"Billing Management"}
        rightButtonBar={
          <IconButton
            color="inherit"
            onClick={() => { navigate('/Create') }}>
            <AddIcon />
          </IconButton>
        } />
      <Paper sx={{ width: '100%', display: 'block' }}>
        <TableContainer >
          <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Payment Date</TableCell>
                <TableCell sx={{ width: 20 }}/>
                <TableCell sx={{ width: 20 }}/>
              </TableRow>
            </TableHead>
            <TableBody>
              {bills.data.map((bill) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={bill.id}>
                  <TableCell onClick={() => onSelectCell(bill)}> {bill.id} </TableCell>
                  <TableCell onClick={() => onSelectCell(bill)}> {bill.description} </TableCell>
                  <TableCell onClick={() => onSelectCell(bill)}>{bill.group}</TableCell>
                  <TableCell onClick={() => onSelectCell(bill)}>$ {bill.value}</TableCell>
                  <TableCell onClick={() => onSelectCell(bill)}>{bill.paymentDate ? bill.paymentDate : "-"}</TableCell>
                  <TableCell sx={{ width: 20 }}>
                    {!bill.paymentDate && 
                      <IconButton
                          color="inherit"
                          aria-label="open drawer"
                          edge="end"
                          onClick={() => { pay(bill.id) }}>
                          <CheckIcon />
                        </IconButton>
                    }
                  </TableCell>
                  <TableCell sx={{ width: 20 }}>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="end"
                      onClick={() => { removeBill(bill.id) }}>
                      <DeleteIcon />
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

export default Home;