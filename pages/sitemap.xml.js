import fs from "fs";
import { domain } from "../utils/constants";
const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = {
    development: domain,
    production: domain,
  }[process.env.NODE_ENV];

  const staticPages = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "_app.js",
        "_document.js",
        "_error.js",
        "sitemap.xml.js",
        "my-profile",
        "my-group",
        "[slug]",
        "reset-password",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`;
    });
  const new_data = await fetch(`${process.env.BASE_URL}blog-list`);
  const data_array = await new_data.json();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
        ${data_array?.data?.blogs?.data
          ?.map((url) => {
            return `
                  <url>
                    <loc>${domain}/blog/${url.slug}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>1.0</priority>
                  </url>
                `;
          })
          .join("")}
          ${data_array?.data?.blogs?.data
            ?.map((url) => {
              return `
                    <url>
                      <loc>${domain}/blog/${url.bn_slug}</loc>
                      <lastmod>${new Date().toISOString()}</lastmod>
                      <changefreq>monthly</changefreq>
                      <priority>1.0</priority>
                    </url>
                  `;
            })
            .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
