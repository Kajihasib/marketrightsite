import { Grid } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { ParallaxProvider } from "react-scroll-parallax";
import PublicLayout from "../../components/public-layout";
import { getEducationAction } from "../../redux/actions/public";

const Education = (props) => {
  useEffect(() => {
    props.getEducationAction();
  }, []);
  return (
    <Fragment>
      <Head>
        <title>Educations</title>
        {/* <meta name="description" content={props.trading.seo_description} />
        <meta name="keywords" content={props.trading.seo_keyword} />
        <meta property="og:image" content={props.trading.image} />
        <meta property="og:title" content={props.trading.title} />
        <meta
          property="og:description"
          content={props.trading.seo_description}
        />
        <meta name="twitter:title" content={props.trading.title} />
        <meta
          name="twitter:description"
          content={props.trading.seo_description}
        />
        <meta name="twitter:image" content={props.trading.image} />
        <meta name="robots" content="max-image-preview:large" /> */}
      </Head>
      <ParallaxProvider>
        <PublicLayout>
          <Grid className="tools-area ptb-50">
            <Grid className="container public-container">
              <Grid className="text-center">
                <h1 className="tool-title education-title">Education</h1>
              </Grid>
              <Grid className="row">
                {props.educations.map((item) => (
                  <Grid key={item.id} className="col-lg-6 col-12">
                    <Grid className="education-wrap">
                      <h3 className="title">
                        <Link
                          href="/education/[slug]"
                          as={`/education/${item.slug}`}
                        >
                          <a>{item.name}</a>
                        </Link>
                      </h3>
                      <p>{item.description}</p>
                      <Grid className="eduction-btn">
                        <span>
                          <Link
                            href="/education/[slug]"
                            as={`/education/${item.slug}`}
                          >
                            <a>
                              Start Learning
                              <svg
                                width="21"
                                height="18"
                                viewBox="0 0 21 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.74263 8.78203H3.55912L1.82573 1.88618C1.81463 1.8461 1.80787 1.80495 1.80557 1.76343C1.78628 1.13127 2.48244 0.692881 3.08566 0.982218L19.3411 8.78203L3.08566 16.5818C2.48945 16.8685 1.80206 16.4424 1.80557 15.8217C1.80734 15.7662 1.81709 15.7113 1.8345 15.6586L3.12073 11.4124"
                                  stroke="#47BB02"
                                  strokeWidth="1.75355"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          </Link>
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </PublicLayout>
      </ParallaxProvider>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  educations: state.public.educations,
});
export default connect(mapStateToProps, {
  getEducationAction,
})(Education);
