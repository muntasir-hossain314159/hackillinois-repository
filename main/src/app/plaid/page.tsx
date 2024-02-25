"use client";

import React, { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

const Plaid = () => {
  const [linkToken, setLinkToken] = useState(null);

  const generateToken = async () => {
    const response = await fetch("/api/create_link_token", {
      method: "POST",
    });
    const data = await response.json();
    setLinkToken(data.link_token);
  };

  useEffect(() => {
    generateToken();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        background: "linear-gradient(135deg, #A9C9FF 10%, #FFBBEC 100%)", // Soft blue gradient background
      }}
    >
      {linkToken != null ? <Link linkToken={linkToken} /> : <></>}
    </Box>
  );
};

interface LinkProps {
  linkToken: string | null;
}

const Link: React.FC<LinkProps> = ({ linkToken }) => {
  const router = useRouter();
  const onSuccess = React.useCallback(
    (public_token: any, metadata: any) => {
      fetch("/api/set_access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_token }),
      })
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    },
    [router]
  );

  const { open, ready } = usePlaidLink({
    token: linkToken!,
    onSuccess,
  });

  return (
    <Box
      textAlign="center"
      p={4}
      sx={{
        maxWidth: 400,
        backgroundColor: "rgba(211, 211, 211, 0.5)", // Light gray with some transparency
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Logo />
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{ fontWeight: "bold", color: "#333", marginTop: "20px" }}
      >
        Connect Your Bank Account
      </Typography>
      <Button
        variant="contained"
        onClick={() => open()}
        disabled={!ready}
        sx={{
          minWidth: "200px",
          backgroundColor: "#6488ea",
          ":hover": {
            backgroundColor: "#4768b7",
          },
          color: "white",
          fontWeight: "bold",
          marginTop: "20px",
        }}
      >
        Link My Account
      </Button>
    </Box>
  );
};

export default Plaid;
