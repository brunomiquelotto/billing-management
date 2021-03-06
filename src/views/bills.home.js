import React, { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import moment from "moment";

// API
import { getBills, deleteBill, payBill, copyBillFromLastMonth } from '../services/bills.service';

// Bar
import DefaultAppBar from '../components/default.header';
import AddIcon from '@mui/icons-material/Add';
import FileCopyIcon from '@mui/icons-material/FileCopy';

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
import { Box, Stack } from "@mui/material";

function Home() {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchBills() {
      const result = await getBills();
      setBills(result.data);
    }
    fetchBills();
  }, [bills]);

  async function removeBill(billID) {
    /**
      @todo: Create a dialog with MUI components
    **/
    if (window.confirm('Do you really want to delete the bill?')) {
      try {
        await deleteBill(billID)
        let remainingBills = bills.filter((bill) => { return bill.id !== billID });
        setBills(remainingBills);
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
      @todo: Create a dialog with MUI components
    **/
    if (window.confirm('Do you really want do pay the bill?')) {
      try {
        let result = await payBill(billID).then()
        let index = bills.findIndex((bill) => bill.id === billID);
        bills[index] = result.data
        setBills(bills);
      } catch (error) {
        /**
          @todo: Create an alert message
        **/
        window.alert(error.response.status)
      }
    }
  }

  async function copy() {
    /**
      @todo: Create a dialog with MUI components
    **/
    if (window.confirm('Do you really want do copy the bills from last month?')) {
      try {
        await copyBillFromLastMonth();
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
    <Box padding={1}>
      <DefaultAppBar
        title={"Billing Management"}
        rightButtonBar={
          <>
            <IconButton
              color="inherit"
              onClick={ () => copy() }>
              <FileCopyIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={ () => navigate('/Create') }>
              <AddIcon />
            </IconButton>
          </>
        } />
      <Paper elevation={1}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Payment Date</TableCell>
                <TableCell width={15}/>
              </TableRow>
            </TableHead>
            <TableBody>
              {bills.map((bill) => (
                <TableRow hover tabIndex={-1} key={bill.id}>
                  <TableCell onClick={ () => onSelectCell(bill) }> {bill.id} </TableCell>
                  <TableCell onClick={ () => onSelectCell(bill) }> {bill.description ? bill.description : "-"} </TableCell>
                  <TableCell onClick={ () => onSelectCell(bill) }>{bill.group ? bill.group : "-"}</TableCell>
                  <TableCell onClick={ () => onSelectCell(bill) }>{bill.value ? `$ ${bill.value}` : "-"}</TableCell>
                  <TableCell onClick={ () => onSelectCell(bill) }>
                    {bill.paymentDate ? moment(bill.paymentDate).format('MM/DD/YY HH:mm').toString() : "-"}
                  </TableCell>
                  <TableCell width={15}>
                    <Stack spacing={2} direction="row" justifyContent="right">
                      {!bill.paymentDate && 
                        <IconButton                            
                            color="success"
                            aria-label="open drawer"
                            edge="end"
                            onClick={ () => { pay(bill.id) }}>
                            <CheckIcon />
                          </IconButton>
                      }
                      <IconButton
                        sx={{marginRight:.1,  color: "#db2424"}}
                        color="secondary"
                        aria-label="open drawer"
                        edge="end"
                        onClick={ () => { removeBill(bill.id) }}>
                        <DeleteIcon color="white" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default Home;