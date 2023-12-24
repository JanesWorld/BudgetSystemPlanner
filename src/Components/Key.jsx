import { Box, Typography } from "@mui/material";

export const KeySystem = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        marginBottom: 2,
        marginTop: 2,
        width: "30%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginRight: 4 }}>
        <Box
          sx={{
            width: 20,
            height: 20,
            backgroundColor: "#f2b8b5",
            marginRight: 1,
          }}
        />
        <Typography variant="body2">JARS System</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: 20,
            height: 20,
            backgroundColor: "#ccc2dc",
            marginRight: 1,
          }}
        />
        <Typography variant="body2">Your Budget</Typography>
      </Box>
    </Box>
  );
};
