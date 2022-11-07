import { Grid } from "@mui/material";
import Head from "next/head";
import { Fragment } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import PublicLayout from "../components/public-layout";
import { getServerApiRequest } from "../utils/serverApi";
const Disclaimer = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.disclaimer.title} </title>
        {/* <meta name="description" content={props.disclaimer.seo_description} />
        <meta name="keywords" content={props.disclaimer.seo_keyword} />
        <meta property="og:image" content={props.disclaimer.image} />
        <meta property="og:title" content={props.disclaimer.title} />
        <meta
          property="og:description"
          content={props.disclaimer.seo_description}
        />
        <meta name="twitter:title" content={props.disclaimer.title} />
        <meta
          name="twitter:description"
          content={props.disclaimer.seo_description}
        />
        <meta name="twitter:image" content={props.disclaimer.image} />
        <meta name="robots" content="max-image-preview:large" /> */}
      </Head>
      <ParallaxProvider>
        <PublicLayout>
          <Grid className="trems-condition-area ptb-50">
            <Grid className="container public-container">
              <h1 className="title">{props.disclaimer.title}</h1>
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: props.disclaimer.content,
                }}
              />
            </Grid>
          </Grid>
        </PublicLayout>
      </ParallaxProvider>
    </Fragment>
  );
};
Disclaimer.getInitialProps = async (ctx) => {
  const { data } = await getServerApiRequest(
    `page-content/disclaimer`,
    null,
    ctx.req?.cookies?.user_token
  );
  return {
    disclaimer: data.data.page,
  };
};
export default Disclaimer;
