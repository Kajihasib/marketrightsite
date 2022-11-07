import { Button, Grid } from "@mui/material";
import Link from "next/link";
const RightSideHub = (props) => {
  return (
    <Grid
      style={{
        background: `url(/images/hub.jpg) no-repeat center center / cover`,
      }}
      className="right-side-area"
    >
      <Grid className="public-container container">
        <Grid className="right-side-wrap">
          <h2 className="title">Be Part of an Incredible Right Side Hub</h2>
          <p className="subtitle">
            Everyday We Share a Consistent Update of the Markets
          </p>
          <Link href="/plans-pricing">
            <Button className="plan-btn" component="a">
              Choose Your Plan
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default RightSideHub;
