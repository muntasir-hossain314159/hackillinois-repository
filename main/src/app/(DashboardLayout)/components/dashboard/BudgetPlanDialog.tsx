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
  const [amountMonths, setAmountMonths] = useState("");

  const handleConfirm = () => {
    // You would also call the local API here
    console.log(`User wants to save: $${amount} per month`);
    console.log(`User wants to save over: ${amountMonths} months`)
    onClose(); // Close the dialog
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: "30%", // You can specify the width as a percentage or pixels
          maxWidth: "none", // This overrides the default maxWidth
          height: "auto", // You can also specify the height
          maxHeight: "90vh", // This sets the max height to 90% of the viewport height
          // Add more custom styles if needed
        },
      }}
    >
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
        <TextField
          autoFocus
          margin="dense"
          id="amountMonths"
          label="How many months will this plan last?"
          type="number"
          fullWidth
          variant="outlined"
          value={amountMonths}
          onChange={(e) => setAmountMonths(e.target.value)}
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
