import { Box, Typography } from "@mui/material";

export const KeySystem = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        backgroundColor: "var(--key-bg-color)",
        borderRadius: "8px",
        width: "62%",
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
        <Typography
          variant="body2"
          sx={{ color: "var(--text-subtitle-color)" }}
        >
          Budget System
        </Typography>
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
        <Typography
          variant="body2"
          sx={{ color: "var(--text-subtitle-color)" }}
        >
          Your Budget
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", marginLeft: 4 }}>
        <Typography
          variant="body2"
          sx={{ color: "var(--text-subtitle-color)" }}
        >
          (£x) Overbudget
        </Typography>
      </Box>
    </Box>
  );
};
