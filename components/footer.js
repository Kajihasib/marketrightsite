import { Grid } from "@mui/material";
import Link from "next/link";

const Footer = (props) => {
  return (
    <footer
      className={
        props.classNameParent
          ? `footer-admin-area ${
              props.classNameParent ? props.classNameParent : ""
            }`
          : "footer-admin-area"
      }
    >
      <Grid className={props.className ? props.className : ""}>
        <Grid className="row align-items-center">
          <Grid className="col-md-6 col-12">
            <ul className="footer-menu">
              <li>
                <Link href="/terms-conditions">
                  <a>Terms & Conditions</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <a>Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/disclaimer">
                  <a>Disclaimer</a>
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid className="col-md-6 col-12">
            <p className="copyright text-right">
              &copy;{new Date().getFullYear()} Market Right Side. All Rights
              Reserved.
            </p>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};
export default Footer;
