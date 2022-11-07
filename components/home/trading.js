import { Grid, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { Parallax } from "react-scroll-parallax";
const Trading = (props) => {
  const [value, setValue] = useState(1);
  const [getDetilas, setDetails] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleGetDetails = (text) => {
    setDetails(text);
  };
  useEffect(() => {
    setValue(props.trading[0]?.id);
    setDetails(props.trading[0]?.description);
  }, [props.trading]);
  return (
    <Parallax className="trading-area" speed={10}>
      <Grid className="public-container container">
        <Grid className="row justify-content-center">
          <Grid className="col-lg-10 col-12">
            <Tabs
              classes={{
                root: "trading-tab",
                flexContainer: "trading-container",
                scroller: "trading-scroller",
                indicator: "trading-indicator",
              }}
              value={value}
              onChange={handleChange}
            >
              {props.trading?.map((item) => (
                <Tab
                  key={item.id}
                  value={item.id}
                  label={item.title}
                  onClick={() => handleGetDetails(item.description)}
                />
              ))}
            </Tabs>
            <Grid className="trading-wrap">
              <Grid className="content">{getDetilas}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Parallax>
  );
};
export default Trading;
