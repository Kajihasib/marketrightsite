import { Grid } from "@mui/material";
import Head from "next/head";
import { Fragment } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import PublicLayout from "../../components/public-layout";
import { getServerApiRequest } from "../../utils/serverApi";
const ToolsDetails = (props) => {
  console.log(props.details, "details");
  return (
    <Fragment>
      <Head>
        <title>{props.details.name} </title>
        {/* <meta name="description" content={props.details.seo_description} />
        <meta name="keywords" content={props.details.seo_keyword} />
        <meta property="og:image" content={props.details.image} />
        <meta property="og:title" content={props.details.name} />
        <meta
          property="og:description"
          content={props.details.seo_description}
        />
        <meta name="twitter:title" content={props.details.name} />
        <meta
          name="twitter:description"
          content={props.details.seo_description}
        />
        <meta name="twitter:image" content={props.details.image} />
        <meta name="robots" content="max-image-preview:large" /> */}
      </Head>
      <ParallaxProvider>
        <PublicLayout>
          <Grid className="tools-details-area ptb-50">
            <Grid className="container public-container">
              <h1 className="tools-details-title">{props.details.name}</h1>
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: props.details.description,
                }}
              />
            </Grid>
          </Grid>
        </PublicLayout>
      </ParallaxProvider>
    </Fragment>
  );
};
ToolsDetails.getInitialProps = async (ctx) => {
  const { data } = await getServerApiRequest(
    `tool-details/${ctx.query.slug}`,
    null,
    ctx.req?.cookies?.user_token
  );
  return {
    details: data.data.tool,
  };
};
export default ToolsDetails;
