import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import FireIcon from '@mui/icons-material/Whatshot';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // You can use a check mark icon here
import Box from '@mui/material/Box';

interface StreakButtonProps {
  streakDays: number;
  // Additional props for each day's completion status can be added here
}

const StreakButton: React.FC<StreakButtonProps> = ({ streakDays }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'streak-popover' : undefined;
  streakDays = 3;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="warning"
        startIcon={<FireIcon />}
        onClick={handleClick}
      >
        {`${streakDays} days`}
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

export default StreakButton;
