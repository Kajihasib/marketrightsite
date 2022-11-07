import { Grid } from "@mui/material";
import Head from "next/head";
import { Fragment } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import PublicLayout from "../components/public-layout";
import { getServerApiRequest } from "../utils/serverApi";
const PrivacyPolicy = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.privacy_policy.title} </title>
        {/* <meta
          name="description"
          content={props.privacy_policy.seo_description}
        />
        <meta name="keywords" content={props.privacy_policy.seo_keyword} />
        <meta property="og:image" content={props.privacy_policy.image} />
        <meta property="og:title" content={props.privacy_policy.title} />
        <meta
          property="og:description"
          content={props.privacy_policy.seo_description}
        />
        <meta name="twitter:title" content={props.privacy_policy.title} />
        <meta
          name="twitter:description"
          content={props.privacy_policy.seo_description}
        />
        <meta name="twitter:image" content={props.privacy_policy.image} />
        <meta name="robots" content="max-image-preview:large" /> */}
      </Head>
      <ParallaxProvider>
        <PublicLayout>
          <Grid className="trems-condition-area ptb-50">
            <Grid className="container public-container">
              <h1 className="title">{props.privacy_policy.title}</h1>
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: props.privacy_policy.content,
                }}
              />
            </Grid>
          </Grid>
        </PublicLayout>
      </ParallaxProvider>
    </Fragment>
  );
};
PrivacyPolicy.getInitialProps = async (ctx) => {
  const { data } = await getServerApiRequest(
    `page-content/privacy-policy`,
    null,
    ctx.req?.cookies?.user_token
  );
  return {
    privacy_policy: data.data.page,
  };
};
export default PrivacyPolicy;
