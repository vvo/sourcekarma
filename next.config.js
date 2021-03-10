module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      // already includes svgo plugin
      use: ["@svgr/webpack"],
    });

    // Important: return the modified config
    return config;
  },
  experimental: { optimizeCss: true },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
};
