import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function DefaultAppBar({title, leftButtonBar, rightButtonBar}) {
    return (
        <div>
          <MuiAppBar position="fixed">
          <Toolbar>
            <div sx={{marginLeft:0}}>
            {leftButtonBar}
            </div>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1, marginLeft: 2}} component="div">
              {title}
            </Typography>
            {rightButtonBar}
          </Toolbar>
        </MuiAppBar>
        <Toolbar />
        </div>
    )
  }
  
  export default DefaultAppBar;