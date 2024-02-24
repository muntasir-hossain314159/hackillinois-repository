import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface BudgetPlanDialogProps {
  open: boolean; // Explicitly typing the 'open' prop as boolean
  onClose: () => void; // Explicitly typing the 'onClose' prop as a function that returns void
}

function BudgetPlanDialog({ open, onClose }) {
  const [amount, setAmount] = useState("");

  const handleConfirm = () => {
    // You would also call the local API here
    console.log(`User wants to save: $${amount} per month`);
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Start My Budget Plan</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="amount"
          label="How much do you want to save monthly?"
          type="number"
          fullWidth
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

export { BudgetPlanDialog };
