import { Grid } from "@mui/material";
import Head from "next/head";
import { Fragment } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import PublicLayout from "../components/public-layout";
import SidebarWidget from "../components/sidebar-widget";
import { getServerApiRequest } from "../utils/serverApi";

const AboutUs = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.about.title} </title>
        {/* <meta name="description" content={props.about.seo_description} />
        <meta name="keywords" content={props.about.seo_keyword} />
        <meta property="og:image" content={props.about.image} />
        <meta property="og:title" content={props.about.title} />
        <meta property="og:description" content={props.about.seo_description} />
        <meta name="twitter:title" content={props.about.title} />
        <meta
          name="twitter:description"
          content={props.about.seo_description}
        />
        <meta name="twitter:image" content={props.about.image} />
        <meta name="robots" content="max-image-preview:large" /> */}
      </Head>
      <ParallaxProvider>
        <PublicLayout>
          <Grid
            className="about-breadcumb-area"
            style={{
              background: `url(/images/about.jpg) no-repeat center center / cover`,
            }}
          >
            <Grid className="container public-container">
              <h1 className="title">{props.about.title}</h1>
            </Grid>
          </Grid>
          <Grid className="trems-condition-area ptb-100">
            <Grid className="container public-container">
              <Grid className="row">
                <Grid className="col-lg-8 col-12">
                  <div
                    className="description about-content"
                    dangerouslySetInnerHTML={{
                      __html: props.about.content,
                    }}
                  />
                </Grid>
                <Grid className="col-lg-4 col-12">
                  <SidebarWidget />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </PublicLayout>
      </ParallaxProvider>
    </Fragment>
  );
};
AboutUs.getInitialProps = async (ctx) => {
  const { data } = await getServerApiRequest(
    `page-content/about-us`,
    null,
    ctx.req?.cookies?.user_token
  );
  return {
    about: data.data.page,
  };
};
export default AboutUs;
