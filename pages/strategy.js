import { Grid } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { ParallaxProvider } from "react-scroll-parallax";
import PublicLayout from "../components/public-layout";
import { getAllToolsAction } from "../redux/actions/public";
import { getServerApiRequest } from "../utils/serverApi";
const Strategy = (props) => {
  useEffect(() => {
    props.getAllToolsAction();
  }, []);
  return (
    <Fragment>
      <Head>
        <title>All Our Tools</title>
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
                <h1 className="tool-title">All Our Tools</h1>
              </Grid>
              <ul className="tools-items mb-40">
                {props.tools.map((item) => (
                  <li key={item.id}>
                    <Grid className="tools-wrap">
                      <h3 className="title">
                        <Link href="/tool/[slug]" as={`/tool/${item.slug}`}>
                          <a>{item.name}</a>
                        </Link>
                      </h3>
                      <p className="text">{item.description}</p>
                      <Grid className="text-right">
                        <Link href="/tool/[slug]" as={`/tool/${item.slug}`}>
                          <a className="view-more">View More</a>
                        </Link>
                      </Grid>
                    </Grid>
                  </li>
                ))}
              </ul>
              <Grid className="product-title ">
                <h2 className="title mb-0">
                  <img src="/images/market.svg" alt="" />
                  <span>{props.trading.title}</span>
                </h2>
              </Grid>
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: props.trading.content,
                }}
              />
            </Grid>
          </Grid>
        </PublicLayout>
      </ParallaxProvider>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  tools: state.public.tools,
});
Strategy.getInitialProps = async (ctx) => {
  const { data } = await getServerApiRequest(
    `page-content/strategy`,
    null,
    ctx.req?.cookies?.user_token
  );
  return {
    trading: data.data.page,
  };
};
export default connect(mapStateToProps, {
  getAllToolsAction,
})(Strategy);
