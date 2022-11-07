import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import createEmotionCache from "../components/createEmotionCache";
import Loading from "../components/loading";
import theme from "../components/theme";
import { wrapper } from "../redux/store";
import "../styles/animate.min.css";
import "../styles/default.css";
import "../styles/style.scss";

const clientSideEmotionCache = createEmotionCache();
const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  });

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }));
    };

    const handleRouteChangeEnd = (url) => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }));
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeEnd);
    router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeEnd);
      router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, [router.events]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Loading
          isRouteChanging={state.isRouteChanging}
          key={state.loadingKey}
        />
        <CssBaseline />
        <Loading
          isRouteChanging={state.isRouteChanging}
          key={state.loadingKey}
        />
        <Component {...pageProps} />
        <ToastContainer position="top-center" autoClose={2000} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default wrapper.withRedux(MyApp);
