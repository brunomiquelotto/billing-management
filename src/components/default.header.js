import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function DefaultAppBar({title, leftButtonBar, rightButtonBar}) {
    return (
        <div>
          <MuiAppBar>
          <Toolbar>
            <div>
            {leftButtonBar}
            </div>
            <Typography variant="h5" noWrap  component="div">
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