import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, Grid } from "@mui/material";
import Slider from "react-slick";
const Testmonial = (props) => {
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
    <Grid className="testmonial-area">
      <svg
        width="509"
        height="320"
        viewBox="0 0 509 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shape-left"
      >
        <path
          d="M96.8936 319.498C77.4968 319.798 55.2538 318.697 33.7487 312.294C10.2406 305.19 -0.0902627 292.283 0.647658 269.07C0.96391 258.665 2.65059 248.159 5.39144 238.154C14.2465 206.037 30.4807 177.221 49.3504 149.507C77.8131 107.784 111.336 70.3642 152.976 39.8479C171.424 26.3406 191.137 15.1346 213.169 7.43048C239.418 -1.77444 265.14 -0.773884 291.178 8.33099C328.179 21.2379 361.175 40.6483 391.851 63.6606C427.588 90.4749 459.424 120.891 484.618 157.211C494.949 172.119 504.226 187.727 507.494 205.637C510.762 223.946 505.596 236.253 487.254 243.557C455.207 256.364 421.895 265.569 388.478 274.273C334.61 288.281 280.109 299.787 224.976 308.292C183.336 314.495 141.801 319.698 96.8936 319.498Z"
          fill="#EBF9FF"
        />
      </svg>

      <svg
        width="487"
        height="352"
        viewBox="0 0 487 352"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shape-right"
      >
        <path
          d="M378.927 6.58836C397.789 2.28726 419.751 -1.23485 442.209 0.571184C466.783 2.64688 479.827 13.1094 484.431 35.9175C486.509 46.1388 487.273 56.7409 486.893 67.0726C485.618 100.249 476.383 131.728 464.323 162.677C446.114 209.28 421.979 252.73 388.338 291.119C373.431 308.114 356.762 323.125 337.025 335.197C313.518 349.605 288.183 353.943 260.681 350.437C221.607 345.486 184.95 333.359 149.731 317.238C108.701 298.452 70.6512 275.344 37.7295 245.102C24.2267 232.686 11.5921 219.369 4.29434 202.564C-3.09528 185.369 -0.8767 172.29 15.3505 161.371C43.6908 142.249 74.0921 126.382 104.711 110.981C154.074 86.1778 204.628 63.6856 256.488 43.9924C295.706 29.3334 335.05 15.6728 378.927 6.58836Z"
          fill="#EBF9FF"
        />
      </svg>

      <Grid className="public-container container">
        <h2 className="test-title">Check what our clients say</h2>
        {props.clients?.length > 1 ? (
          <Slider {...settings}>
            {props.clients?.map((item) => (
              <Grid key={item.id} className="testmonial-wrap">
                <Grid className="testmonial-info">
                  <img className="image" src={item?.image} alt={item.name} />
                  <Grid className="content">
                    <h4 className="name">{item.name}</h4>
                    <span>{item.country}</span>
                  </Grid>
                </Grid>
                <Grid
                  className="text"
                  dangerouslySetInnerHTML={{
                    __html: item.message,
                  }}
                />
              </Grid>
            ))}
          </Slider>
        ) : (
          <Grid className="row">
            {props.clients?.map((item) => (
              <Grid className="col-lg-6 col-12">
                <Grid key={item.id} className="testmonial-wrap">
                  <Grid className="testmonial-info">
                    <img className="image" src={item?.image} alt={item.name} />
                    <Grid className="content">
                      <h4 className="name">{item.name}</h4>
                      <span>{item.country}</span>
                    </Grid>
                  </Grid>
                  <Grid
                    className="text"
                    dangerouslySetInnerHTML={{
                      __html: item.message,
                    }}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
export default Testmonial;
