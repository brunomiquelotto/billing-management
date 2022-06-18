import { useNavigate } from "react-router-dom";
import { addBill } from "../services/bills.service";

// Bar
import IconButton from '@mui/material/IconButton';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DefaultAppBar from '../components/default.header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Form
import React, { useState } from "react";
import { Box, Checkbox, InputAdornment, Paper, Stack, TextField } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function CreateBill() {
  const navigate = useNavigate()

  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [group, setGroup] = useState("");
  const [obs, setObs] = useState("");
  const [dueDate, setDueDate] = React.useState(Date());
  const [isFixed, setFixed] = React.useState(false);

  const onDescriptionChanged = (event) => { setDescription(event.target.value)}
  const onValueChanged = (event) => { setValue(event.target.value)}
  const onGroupChanged = (event) => { setGroup(event.target.value)}
  const onObsChanged = (event) => { setObs(event.target.value)}
  const onDueDateChanged = (value) => { setDueDate(value)}
  const onIsFixedChanged = (event) => { setFixed(event.target.checked)}
  
  async function saveBill() {
    const bill = {
      description: description,
      group: group,
      value: value,
      dueDate: dueDate,
      isFixed: isFixed,
      obs: obs
    }
    await addBill(bill).then((response) => {
      console.log(response.data)
      navigate('/', { replace: true })
    }).catch((error) => {
      window.alert(error.status)
    })
  }

  return (
    <Box>
      <DefaultAppBar
        title={"Create Bill"}
        leftButtonBar={
          <IconButton
            color="inherit"
            onClick={() => { navigate('/', { replace: true }) }}>
            <ArrowBackIcon />
          </IconButton>
        }
        rightButtonBar={
          <IconButton
            color="inherit"
            onClick={saveBill}>
            <SaveAsIcon />
          </IconButton>} 
      />
      <Paper sx={{padding: 1}}>
      <Stack spacing={1} direction="column" justifyContent="center">
        <TextField label="Description" variant="outlined" onChange={onDescriptionChanged} />
        <TextField label="Value" variant="outlined" onChange={onValueChanged} type="number" 
          InputProps={{
             min: 0,
             startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
          onKeyPress={(event) => {
            if (event?.key === '-' || event?.key === '+') {
              event.preventDefault();
            }
          }}/>
        <TextField label="Group" variant="outlined" onChange={onGroupChanged} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Due Date"
            value={dueDate}
            onChange={onDueDateChanged}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField label="Obs" variant="outlined" onChange={onObsChanged} />
        <FormControlLabel control={<Checkbox />} onChange={onIsFixedChanged} label="Is Fixed" />
      </Stack>
      </Paper>
    </Box>
  )
}

export default CreateBill;