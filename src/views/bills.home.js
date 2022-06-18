import React, { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import moment from "moment";

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
import Typography from '@mui/material/Typography';
import { Stack } from "@mui/material";

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
    if (window.confirm('Do you really want to delete the bill?')) {
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
    if (window.confirm('Do you really want do pay the bill?')) {
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
    <Box sx={{padding: 1}}>
      <DefaultAppBar
        title={"Billing Management"}
        rightButtonBar={
          <IconButton
            color="inherit"
            onClick={() => { navigate('/Create') }}>
            <AddIcon />
          </IconButton>
        } />
      <Paper sx={{ padding: 1}}>
        <TableContainer >
          <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell><Typography style={{ fontWeight: 600 }}>ID</Typography></TableCell>
                <TableCell><Typography style={{ fontWeight: 600 }}>Description</Typography></TableCell>
                <TableCell><Typography style={{ fontWeight: 600 }}>Group</Typography></TableCell>
                <TableCell><Typography style={{ fontWeight: 600 }}>Value</Typography></TableCell>
                <TableCell><Typography style={{ fontWeight: 600 }}>Payment Date</Typography></TableCell>
                <TableCell sx={{ width: 15 }}/>
              </TableRow>
            </TableHead>
            <TableBody>
              {bills.data.map((bill) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={bill.id}>
                  <TableCell onClick={() => onSelectCell(bill)}> {bill.id} </TableCell>
                  <TableCell onClick={() => onSelectCell(bill)}> {bill.description ? bill.description : "-"} </TableCell>
                  <TableCell onClick={() => onSelectCell(bill)}>{bill.group ? bill.group : "-"}</TableCell>
                  <TableCell onClick={() => onSelectCell(bill)}>{bill.value ? `$ ${bill.value}` : "-"}</TableCell>
                  <TableCell onClick={() => onSelectCell(bill)}>
                    {bill.paymentDate ? moment(bill.paymentDate).format('mm/DD/yyyy HH:mm:ss').toString() : "-"}
                  </TableCell>
                  <TableCell sx={{ width: 15 }}>
                    <Stack spacing={2} direction="row" justifyContent="right">
                      {!bill.paymentDate && 
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={() => { pay(bill.id) }}>
                            <CheckIcon />
                          </IconButton>
                      }
                      <IconButton
                        sx={{marginRight:.1}}
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={() => { removeBill(bill.id) }}>
                        <DeleteIcon />
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