import { Grid } from "@mui/material";
import moment from "moment/moment";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import Cookies from "universal-cookie";
import NoLogin from "../../components/no-login";
import PublicLayout from "../../components/public-layout";
import SidebarWidget from "../../components/sidebar-widget";
import { getServerApiRequest } from "../../utils/serverApi";
const NewsDetails = (props) => {
  const cookie = new Cookies();

  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(cookie.get("user_token"));
  }, [cookie.get("user_token")]);
  return (
    <Fragment>
      <Head>
        <title>{props.details?.title} </title>
        {/* <meta name="description" content={props.details.seo_description} />
        <meta name="keywords" content={props.details.seo_keyword} />
        <meta property="og:image" content={props.details.image} />
        <meta property="og:title" content={props.details.seo_title} />
        <meta
          property="og:description"
          content={props.details.seo_description}
        />
        <meta name="twitter:title" content={props.details.seo_title} />
        <meta
          name="twitter:description"
          content={props.details.seo_description}
        />
        <meta name="twitter:image" content={props.details.image} />
        <meta name="robots" content="max-image-preview:large" /> */}
      </Head>
      <ParallaxProvider>
        <PublicLayout>
          <Grid className="blog-details-area">
            <Grid className="container public-container">
              <Grid className="row">
                <Grid className="col-lg-8 col-12">
                  <Grid className="blog-details-wrap">
                    <span className="time">
                      {moment(props.details?.created_at).format(
                        "MMMM DD, YYYY h:m A"
                      )}
                    </span>
                    <h1 className="details-title">{props.details?.title}</h1>
                  </Grid>
                </Grid>
                <Grid className="col-lg-8 col-12">
                  <Grid className="blog-details-wrap">
                    <img
                      className="blog-image"
                      src={props.details?.image}
                      alt={props.details?.title}
                    />
                    <div
                      className="description"
                      dangerouslySetInnerHTML={{
                        __html: props.details?.description,
                      }}
                    />
                    {token ? null : <NoLogin className="details-no-login" />}
                  </Grid>
                </Grid>
                <Grid className="col-lg-4 col-12">
                  <aside className="sidebar">
                    <SidebarWidget />
                  </aside>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </PublicLayout>
      </ParallaxProvider>
    </Fragment>
  );
};
NewsDetails.getInitialProps = async (ctx) => {
  const { data } = await getServerApiRequest(
    `news-details/${ctx.query.slug}`,
    null,
    ctx.req?.cookies?.user_token
  );
  return {
    details: ctx.req?.cookies?.user_token ? data.data.news : data.data,
  };
};
export default NewsDetails;
