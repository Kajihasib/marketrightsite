import React, { Fragment, useEffect, useState } from "react";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Grid, Menu } from "@mui/material";
import Cookies from "universal-cookie";

const languages = [
  {
    title: "English",
    code: "en",
    lang: "googtrans(en|en)",
  },
  {
    title: "Spanish",
    code: "es",
    lang: "googtrans(en|es)",
  },
  {
    title: "Japanese",
    code: "ja",
    lang: "googtrans(en|ja)",
  },
  {
    title: "Chinese",
    code: "zh-CN",
    lang: "googtrans(en|zh-CN)",
  },
  {
    title: "Hindi",
    code: "hi",
    lang: "googtrans(en|hi)",
  },
  {
    title: "Korean",
    code: "ko",
    lang: "googtrans(en|ko)",
  },
];
const LanguageSwitcher = () => {
  const cookie = new Cookies();

  const [language, setLang] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentLang, setCurrentLang] = useState("en");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const langChangeHandler = (lang) => {
    setLang(lang);
    handleClose();
  };
  useEffect(() => {
    setCurrentLang(cookie.get("langcode"));
  }, [cookie.get("langcode")]);
  useEffect(() => {
    if (language) {
      var lang = language.lang
        .replace("googtrans(", "/")
        .replace(")", "")
        .replace("|", "/");
      document.cookie = "googtrans=" + lang;
      document.cookie = "googtrans=" + lang + ";domain=localhost:3000;path=/";
      document.cookie =
        "googtrans=" + lang + ";domain=marketrightside.vercel.app;path=/";
      document.cookie = "langname=" + language?.title;
      document.cookie = "langcode=" + language?.code;
      window.location.reload();
    }
  }, [language]);
  return (
    <Fragment>
      <Grid onClick={handleClick} className="language">
        <span>
          <img
            src={`/images/flags/${currentLang ?? "en"}.svg`}
            alt={currentLang ?? "en"}
          />{" "}
          {languages.find((item) => item.code == currentLang)?.title
            ? languages.find((item) => item.code == currentLang)?.title
            : "English"}
        </span>
        <ArrowDropDownIcon />
      </Grid>
      <Menu
        classes={{
          root: "language-dropdown",
          paper: "language-dropdown-paper",
          list: "language-dropdown-list",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {languages.map((item, i) => (
          <li onClick={() => langChangeHandler(item)} key={item.code}>
            <img
              src={`/images/flags/${item.code ?? "en"}.svg`}
              alt={item.code ?? "en"}
            />
            {item.title}
          </li>
        ))}
      </Menu>
    </Fragment>
  );
};

export default LanguageSwitcher;
