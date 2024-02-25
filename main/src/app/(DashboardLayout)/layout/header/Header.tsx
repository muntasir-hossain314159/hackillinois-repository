import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

// components
import Profile from "./Profile";
import StreakButton from "./StreakButton";
import { IconBellRinging, IconMenu } from "@tabler/icons-react";
import { BudgetPlanDialog } from "../../components/dashboard/BudgetPlanDialog";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  // State to control the opening of the budget plan dialog
  const [isBudgetPlanDialogOpen, setBudgetPlanDialogOpen] = useState(false);

  // Function to open the dialog
  const handleOpenBudgetPlanDialog = () => {
    setBudgetPlanDialogOpen(true);
  };

  // Function to close the dialog
  const handleCloseBudgetPlanDialog = () => {
    setBudgetPlanDialogOpen(false);
  };
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        >
          {/* <Badge variant="dot" color="primary">   // Notification icon can add later if needed
            <IconBellRinging size="21" stroke="1.5" />
          </Badge> */}
        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
        <Box display="flex" justifyContent="center" p={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenBudgetPlanDialog}
        >
          Start My Budget Plan
        </Button>

        <BudgetPlanDialog
          open={isBudgetPlanDialogOpen}
          onClose={handleCloseBudgetPlanDialog}
        />
      </Box>
          <StreakButton/>
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
