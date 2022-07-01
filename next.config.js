/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   experimental: {
//     images: {
//       unoptimized: true,
//     },
//   },
//   // basePath: "",
// }

module.exports = {
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "https://example.com/myaccount/",
  },
  // basePath: "",
}
