import { Grid } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import PublicLayout from "../../components/public-layout";
import SidebarWidget from "../../components/sidebar-widget";
import { getServerApiRequest } from "../../utils/serverApi";
const ToolsDetails = (props) => {
  console.log(props.details, "details");
  return (
    <Fragment>
      <Head>
        <title>{props.details.education.name} </title>
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
              <h1 className="tools-details-title">
                {props.details.education.name}
              </h1>
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: props.details.education.description,
                }}
              />
            </Grid>
          </Grid>
          <Grid className="related-topics-area">
            <Grid className="container public-container">
              <Grid className="row">
                <Grid className="col-lg-8 col-12">
                  <h3 className="related-title">Related Topics</h3>
                  <ul className="related-education-items">
                    {props.details.relatedTopic.map((item) => (
                      <li key={item.id}>
                        <h3 className="title">
                          <Link
                            href="/education/[slug]"
                            as={`/education/${item.slug}`}
                          >
                            <a>{item.name}</a>
                          </Link>
                        </h3>
                        <p>{item.description}</p>
                      </li>
                    ))}
                  </ul>
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
ToolsDetails.getInitialProps = async (ctx) => {
  const { data } = await getServerApiRequest(
    `education-details/${ctx.query.slug}`,
    null,
    ctx.req?.cookies?.user_token
  );
  return {
    details: data.data,
  };
};
export default ToolsDetails;
