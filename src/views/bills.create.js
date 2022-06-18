import IconButton from '@mui/material/IconButton';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DefaultAppBar from '../components/default.header';

function saveBill() {
    /**
      @todo: Create logic to save bill
    **/
    console.log("TODO: Create logic to save bill")
}

function CreateBill() {
    return (
        <DefaultAppBar
            title={"Create Bill"}
            rightButtonBar={
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={saveBill}>
                    <SaveAsIcon />
                </IconButton>}>
        </DefaultAppBar>
    )
}

export default CreateBill;