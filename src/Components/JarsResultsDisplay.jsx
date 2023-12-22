import { Typography, Grid } from "@mui/material";
import { formatName } from "../Utils/formatName";
import Tooltip from "@mui/material/Tooltip";
import { jarsDescription } from "./BudgetSystemInfo";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const JARSResultsDisplay = ({ jarsAllocation, income }) => {
  return (
    <Grid container spacing={2}>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Monthly Gross Income: {`£${income}`}
      </Typography>

      {Object.entries(jarsAllocation).map(([jar, amount]) => (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
          key={jar}
        >
          <Tooltip title={jarsDescription[jar] || ""} placement="left">
            <HelpOutlineIcon sx={{ cursor: "pointer", marginRight: "8px" }} />
          </Tooltip>
          <Typography>{`${formatName(jar)}: £${amount.toFixed(2)}`}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default JARSResultsDisplay;
