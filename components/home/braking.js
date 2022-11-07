import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, Grid } from "@mui/material";
import Link from "next/link";
import Slider from "react-slick";
const BrakingNews = (props) => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 2000,
    autoplay: false,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    slidesToScroll: 2,
    className: "braking-news-active",
    nextArrow: (
      <Button>
        <ArrowForwardIcon />
      </Button>
    ),
    prevArrow: (
      <Button>
        <ArrowBackIcon />
      </Button>
    ),
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Grid className="braking-news-area">
      <Grid className="public-container container">
        <Grid className="row">
          <Grid className="col-12">
            <h2 className="braking-title">Breaking news</h2>
          </Grid>
          {props.news?.length > 1 ? (
            <Grid className="col-12">
              <Slider {...settings}>
                {props.news?.map((item) => (
                  <Grid key={item.id} className="braking-wrap">
                    <Link href="/news/[slug]" as={`/news/${item.slug}`}>
                      <a className="braking-img">
                        <img src={item.image} alt={item.title} />
                      </a>
                    </Link>
                    <Grid className="braking-content">
                      <Link href="/news/[slug]" as={`/news/${item.slug}`}>
                        <a className="title">{item.title}</a>
                      </Link>
                      <span className="text">{item.description}</span>
                    </Grid>
                  </Grid>
                ))}
              </Slider>
            </Grid>
          ) : (
            props.news?.map((item) => (
              <Grid item key={item.id} className="col-12 col-lg-6">
                <Grid className="braking-wrap">
                  <Link href="/news/[slug]" as={`/news/${item.slug}`}>
                    <a className="braking-img">
                      <img src={item.image} alt={item.title} />
                    </a>
                  </Link>
                  <Grid className="braking-content">
                    <Link href="/">
                      <a className="title">{item.title}</a>
                    </Link>
                    <span className="text">{item.description}</span>
                  </Grid>
                </Grid>
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default BrakingNews;
