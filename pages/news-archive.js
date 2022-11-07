import { Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ParallaxProvider } from "react-scroll-parallax";
import PublicLayout from "../components/public-layout";
import { getBrakingNewsAction, getNewsAction } from "../redux/actions/public";
import { getShortContent } from "../utils/commonFunctions";
const NewsArchive = (props) => {
  const [getData, setData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    props.getBrakingNewsAction(`limit=${3}`);
    props.getNewsAction();
  }, []);
  useEffect(() => {
    setData(props.braking_news[0]);
  }, [props.braking_news]);
  const getDetailsData = (item) => {
    setData(item);
  };
  const count = Math.ceil(props.news?.total / props.news?.per_page);
  const handleChange = (e, p) => {
    setPage(p);
    window.scrollTo({
      top: 0,
    });
    props.getAllBlogsDataAction(`page=${p}`);
  };

  return (
    <Fragment>
      <Head>
        <title>News Archive</title>
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
          <Grid className="news-archive-braking-area">
            <Grid className="container public-container">
              <Grid className="row">
                <Grid className="col-lg-8 col-12">
                  {getData !== undefined ? (
                    <Grid
                      className="braking-details-wrap"
                      style={{
                        background: `url(${getData?.image}) no-repeat center center / cover`,
                      }}
                    >
                      <Grid className="braking-details-content">
                        <Link href="/news/[slug]" as={`/news/${getData?.slug}`}>
                          <a className="title">{getData?.title}</a>
                        </Link>
                        <span className="time">
                          {moment(getData?.created_at).format("dddd h:m A")}
                        </span>
                      </Grid>
                    </Grid>
                  ) : null}
                </Grid>
                <Grid className="col-lg-4 col-12">
                  <Grid className="braking-wrapper">
                    <h4 className="news-title">News</h4>
                    <ul className="braking-news">
                      {props.braking_news?.map((item) => (
                        <li
                          key={item.id}
                          className={getData?.id == item.id ? "active" : ""}
                          onClick={() => getDetailsData(item)}
                        >
                          <a>
                            <span className="title">{item.title}</span>
                            <span className="time">
                              {moment(item.created_at).format("dddd h:m A")}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="news-archive-area ptb-50">
            <Grid className="container public-container">
              <Grid className="row">
                {props.news?.data?.map((item) => (
                  <Grid className="col-lg-4 col-md-6 col-12">
                    <Grid className="news-archive-wrap">
                      <Link href="/news/[slug]" as={`/news/${item.slug}`}>
                        <a className="news-img">
                          <img src={item.image} alt={item.title} />
                        </a>
                      </Link>
                      <Grid className="news-content">
                        <Link href="/news/[slug]" as={`/news/${item.slug}`}>
                          <a className="title">
                            {getShortContent(item.title, 60)}
                          </a>
                        </Link>
                        <p className="text">
                          {getShortContent(item.description, 200)}
                        </p>
                        <div className="text-right">
                          <span className="time">
                            {moment(getData?.created_at).format("dddd h:m A")}
                          </span>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
                <Grid className="col-12">
                  {props.news?.total > props.news?.per_page && (
                    <Pagination
                      count={count}
                      page={page}
                      showFirstButton
                      showLastButton
                      onChange={handleChange}
                      className="paginationWrap"
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </PublicLayout>
      </ParallaxProvider>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  braking_news: state.public.braking_news,
  news: state.public.news,
});
export default connect(mapStateToProps, {
  getBrakingNewsAction,
  getNewsAction,
})(NewsArchive);
