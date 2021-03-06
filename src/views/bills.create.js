import { useNavigate, useLocation  } from "react-router-dom";
import { addOrUpdateBill } from "../services/bills.service";

// Bar
import IconButton from '@mui/material/IconButton';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DefaultAppBar from '../components/default.header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Form
import React, { useState  } from "react";
import { Box, Checkbox, Paper, Stack, TextField } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function CreateBill() {
  const navigate = useNavigate()
  const location = useLocation();
  let bill = location.state

  const [description, setDescription] = useState(bill && bill.description);
  const [value, setValue] = useState(bill && bill.value);
  const [group, setGroup] = useState(bill && bill.group);
  const [obs, setObs] = useState(bill && bill.obs);
  const [dueDate, setDueDate] = React.useState(bill ? bill.dueDate : Date());
  const [isFixed, setFixed] = React.useState(bill && bill.isFixed);

  const onDescriptionChanged = (event) => { setDescription(event.target.value)}
  const onValueChanged = (event) => { setValue(event.target.value)}
  const onGroupChanged = (event) => { setGroup(event.target.value)}
  const onObsChanged = (event) => { setObs(event.target.value)}
  const onDueDateChanged = (value) => { setDueDate(value)}
  const onIsFixedChanged = (event) => { setFixed(event.target.checked)}
  
  async function saveBill() {
    const newBill = {
      id: bill && bill.id,
      description: description,
      group: group,
      value: value,
      dueDate: dueDate,
      isFixed: isFixed,
      obs: obs
    }

    await addOrUpdateBill(newBill).then(() => {
      navigate('/', { replace: true })
    }).catch((error) => {
      window.alert(error.status)
    })
  }

  return (
    <Box padding={1}>
      <DefaultAppBar
        title={"Create Bill"}
        leftButtonBar={
          <IconButton
            color="inherit"
            onClick={ () => navigate('/', { replace: true }) }>
            <ArrowBackIcon />
          </IconButton>
        }
        rightButtonBar={
          <IconButton
            color="inherit"
            onClick={ () => saveBill() }>
            <SaveAsIcon />
          </IconButton>} 
      />
      <Paper elevation={2}>
        <Stack spacing={1} direction="column" justifyContent="center">
          <TextField label="Description" variant="outlined" defaultValue={description} onChange={onDescriptionChanged} />
          <TextField label="Value" variant="outlined" defaultValue={value} onChange={onValueChanged} type="number"/>
          <TextField label="Group" variant="outlined" defaultValue={group} onChange={onGroupChanged} />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Due Date"
              defaultValue={dueDate}
              {...dueDate ? {value: dueDate} : null }
              onChange={onDueDateChanged}
              components={{
                OpenPickerIcon: () => ( <CalendarMonthIcon color="primary" />),
              }}
              renderInput={(params) => (
                <TextField {...params} />
            )}
            />
          </LocalizationProvider>
          <Stack spacing={1} direction="row">
            <TextField label="Obs" variant="outlined" defaultValue={obs} onChange={onObsChanged} sx={{ flex:8 }} />
            <FormControlLabel control={isFixed ? <Checkbox defaultChecked /> : <Checkbox />} onChange={onIsFixedChanged} label="Is Fixed" sx={{ flex:2 }} />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export default CreateBill;