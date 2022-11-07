import { useEffect, useRef } from "react";
export const objectToArray = (input) => {
  const entries = Object.entries(input);
  entries.forEach((entry) => (entry[0] = +entry[0]));
  return entries;
};

export function translateToString(string) {
  string = string?.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
  string = string?.replace(/\s/g, "-");
  return string;
}

export const socialShare = (social, url, title) => {
  if (social === "facebook") {
    return `https://web.facebook.com/sharer.php?u=${url}`;
  }
  if (social === "twitter") {
    return `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
  }
  if (social === "linkedin") {
    return `https://www.linkedin.com/sharing/share-offsite?url=${url}`;
  }
  if (social === "pinterest") {
    return `http://pinterest.com/pin/create/button?url=${url}&description=${title}`;
  }
};

function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i) rv[i] = arr[i];
  return rv;
}

/*
k format 
num = int  
*/
export const kFormatter = (num) => {
  if (num < 1e3) return num;
  if (num >= 1e3 && num < 1e6)
    return +(num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  if (num >= 1e6 && num < 1e9)
    return +(num / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1e9 && num < 1e12)
    return +(num / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  if (num >= 1e12) return +(num / 1e12).toFixed(1).replace(/\.0$/, "") + "T";
};

export const getShortContent = (str = "", num = 150) => {
  let str_len = str?.length;
  if (str_len > num) {
    return str?.substring(0, num) + "...";
  }
  return str;
};

export const getNameMonthDateFormat = (date = null, full_month) => {
  const da = new Date(date);
  let month_names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let months_short_name = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (full_month) {
    return (
      ("0" + da.getDate()).slice(-2) +
      " " +
      month_names[da.getMonth()] +
      " " +
      da.getFullYear()
    );
  } else {
    return (
      ("0" + da.getDate()).slice(-2) +
      " " +
      months_short_name[da.getMonth()] +
      " " +
      da.getFullYear()
    );
  }
};

export const getFormattedDate = (today) => {
  const get_day = new Date(today);
  const week = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  return week[get_day.getDay()];
};

export const formatAMPM = (date) => {
  const date_format = date?.split(":");
  let hours = parseInt(date_format[0]);
  let minutes = parseInt(date_format[1]);
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
export const stringSplit = (str) => {
  var names = str.split(" "),
    initials = names[0].substring(0, 1);
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const displayLocation = (latitude, longitude, setLocation) => {
  let geocoder;
  geocoder = new google.maps.Geocoder();
  let latlng = new google.maps.LatLng(latitude, longitude);

  geocoder.geocode({ latLng: latlng }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        let add = results[0].formatted_address;
        setLocation(add);
      } else {
        console.log("address not found");
      }
    } else {
      console.log("Geocoder failed due to", status);
    }
  });
};
// object to query string
export const objectToQueryString = (obj) => {
  let str = [];
  for (let data in obj)
    if (obj.hasOwnProperty(data)) {
      if (obj[data] !== "" && obj[data] !== null) {
        str.push(
          encodeURIComponent(data) + "=" + encodeURIComponent(obj[data])
        );
      }
    }
  return str.join("&");
};
export const timePaased = (date) => {
  var beforeDate = new Date(date).getTime();
  var nowTime = new Date().getTime();
  var diff = nowTime - beforeDate;
  // setting interval
  var intervals = new Array();
  intervals["year"] = 31556926000;
  intervals["month"] = 2629744000;
  intervals["week"] = 604800000;
  intervals["day"] = 86400000;
  intervals["hour"] = 3600000;
  intervals["minute"] = 60000;
  // taking decision, which should be show
  if (diff < 1000) {
    return "just now";
  } else if (diff < 60000) {
    return diff == 1000
      ? diff / 1000 + " second ago"
      : Math.floor(diff / 1000) + " seconds ago";
  } else if (diff >= 60000 && diff < intervals["hour"]) {
    diff = Math.floor(diff / intervals["minute"]);
    return diff == 1 ? diff + " minute ago" : diff + " minutes ago";
  } else if (diff >= intervals["hour"] && diff < intervals["day"]) {
    diff = Math.floor(diff / intervals["hour"]);
    return diff == 1 ? diff + " hour ago" : diff + " hours ago";
  } else if (diff >= intervals["day"] && diff < intervals["week"]) {
    diff = Math.floor(diff / intervals["day"]);
    return diff == 1 ? diff + " day ago" : diff + " days ago";
  } else if (diff >= intervals["week"] && diff < intervals["month"]) {
    diff = Math.floor(diff / intervals["week"]);
    return diff == 1 ? diff + " week ago" : diff + " weeks ago";
  } else if (diff >= intervals["month"] && diff < intervals["year"]) {
    diff = Math.floor(diff / intervals["month"]);
    return diff == 1 ? diff + " month ago" : diff + " months ago";
  } else if (diff >= intervals["year"]) {
    diff = Math.floor(diff / intervals["year"]);
    return diff == 1 ? diff + " year ago" : diff + " years ago";
  }
};
export const calculateSavedAmount = (
  monthlyBudget,
  currentBudget,
  currentPlan
) => {
  let time = 1;
  if (currentPlan == "quarter") {
    time = 3;
  } else if (currentPlan == "half") {
    time = 6;
  } else if (currentPlan == "year") {
    time = 12;
  }

  let savedAmount = parseInt(monthlyBudget) * time - parseInt(currentBudget);

  return savedAmount;
};
