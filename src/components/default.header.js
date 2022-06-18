import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function DefaultAppBar({title, rightButtonBar}) {
    return (
        <MuiAppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
              {title}
            </Typography>
            {rightButtonBar}
          </Toolbar>
        </MuiAppBar>
    )
  }
  
  export default DefaultAppBar;