import { Grid } from "@mui/material";
import Head from "next/head";
import { Fragment } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import PublicLayout from "../components/public-layout";
import { getServerApiRequest } from "../utils/serverApi";
const TermsAndCondition = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.terms_condition.title} </title>
        {/* <meta
          name="description"
          content={props.terms_condition.seo_description}
        />
        <meta name="keywords" content={props.terms_condition.seo_keyword} />
        <meta property="og:image" content={props.terms_condition.image} />
        <meta property="og:title" content={props.terms_condition.title} />
        <meta
          property="og:description"
          content={props.terms_condition.seo_description}
        />
        <meta name="twitter:title" content={props.terms_condition.title} />
        <meta
          name="twitter:description"
          content={props.terms_condition.seo_description}
        />
        <meta name="twitter:image" content={props.terms_condition.image} />
        <meta name="robots" content="max-image-preview:large" /> */}
      </Head>
      <ParallaxProvider>
        <PublicLayout>
          <Grid className="trems-condition-area ptb-50">
            <Grid className="container public-container">
              <h1 className="title">{props.terms_condition.title}</h1>
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: props.terms_condition.content,
                }}
              />
            </Grid>
          </Grid>
        </PublicLayout>
      </ParallaxProvider>
    </Fragment>
  );
};
TermsAndCondition.getInitialProps = async (ctx) => {
  const { data } = await getServerApiRequest(
    `page-content/terms-conditions`,
    null,
    ctx.req?.cookies?.user_token
  );
  return {
    terms_condition: data.data.page,
  };
};
export default TermsAndCondition;
