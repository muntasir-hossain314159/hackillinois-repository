import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import FireIcon from '@mui/icons-material/Whatshot';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // You can use a check mark icon here
import Box from '@mui/material/Box';

interface StreakButtonProps {
  streakDays: number;
  // startDate: Date,
  // currDate: Date;
  // Additional props for each day's completion status can be added here
}

const defaultProps: Props = {
  streakDays: 0,
  startDate: new Date(),
  currDate: new Date(),
}
const StreakButton: React.FC<StreakButtonProps> = ({ streakDays, currDate, startDate }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [state, setState] = useState<StreakButton>({ streakDays: 0 });

  const streakIncrement = () => {
    // streakDays++;
    setState(prevState => ({
      ...prevState,
      streakDays: prevState.streakDays + 1
    }));
  };

  const streakReset = () => {
    setState(prevState => ({
      ...prevState,
      streakDays: 0
    }));
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    // streakIncrement();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'streak-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="warning"
        startIcon={<FireIcon />}
        onClick={handleClick}
      >
        {`${streakDays} day${streakDays != 1 ? "s" : ""}`}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ width: 'auto' }} // Adjust width as needed
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Streak
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Complete a lesson every day to build your streak.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            {/* Render a check mark for each day of the week */}
            {Array.from({ length: 7 }, (_, i) => (
  <CheckCircleOutlineIcon 
    key={i} 
    color={i < streakDays ? "warning" : "primary"} 
    sx={{ mx: 0.5 }} 
  />
))}
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

StreakButton.defaultProps = defaultProps;

export default StreakButton;
