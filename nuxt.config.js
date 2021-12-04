const imageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const isDev = process.env.NODE_ENV !== 'production';

export default {
  mode: 'universal',
  ...(!isDev && {
    modern: 'client',
  }),
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'shop',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  rootDir: __dirname,

  serverMiddleware: [],

  // router: {
  //   prefetchLinks: false,
  // },

  loading: { color: '#ddd' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['normalize.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~~/plugins/vue-lazy-load.ts' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-trailingslash-module',
    'nuxt-webfontloader',
    'cookie-universal-nuxt',
    '@nuxtjs/style-resources',
    [
      'nuxt-vuex-localstorage',
      {
        ...(isDev && {
          mode: 'debug',
        }),
        localStorage: ['cart'], //  If not entered, “localStorage” is the default value
      },
    ],
  ],

  webfontloader: {
    events: false,
    google: {
      families: ['Montserrat:400,500,600:cyrillic&display=swap'],
    },
    timeout: 5000,
  },

  styleResources: {
    // your settings here
    // scss: ['./assets/scss/global-variables.scss'], // alternative: scss
    less: [],
    stylus: [],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  render: {
    // http2: {
    //     push: true,
    //     pushAssets: (req, res, publicPath, preloadFiles) => preloadFiles
    //     .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
    //   },
    // compressor: false,
    resourceHints: false,
    etag: false,
    static: {
      etag: false,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    optimizeCss: false,

    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },

    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : 'js/[contenthash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : 'js/[contenthash].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : 'css/[contenthash].css'),
      img: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]',
    },

    ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true,
        },
      },
    }),

    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },

    optimization: {
      minimize: !isDev,
    },

    ...(!isDev && {
      extractCSS: {
        ignoreOrder: true,
      },
    }),

    transpile: ['vue-lazy-hydration', 'intersection-observer'],

    postcss: {
      plugins: {
        ...(!isDev && {
          cssnano: {
            preset: [
              'advanced',
              {
                autoprefixer: false,
                cssDeclarationSorter: false,
                zindex: false,
                discardComments: {
                  removeAll: true,
                },
              },
            ],
          },
        }),
      },

      ...(!isDev && {
        preset: {
          browsers: 'cover 99.5%',
          autoprefixer: true,
        },
      }),

      order: 'cssnanoLast',
    },

    extend(config, ctx) {
      const ORIGINAL_TEST = '/\\.(png|jpe?g|gif|svg|webp)$/i';
      const vueSvgLoader = [
        {
          loader: 'vue-svg-loader',
          options: {
            svgo: false,
          },
        },
      ];

      const imageMinPlugin = new ImageminPlugin({
        pngquant: {
          quality: '5-30',
          speed: 7,
          strip: true,
        },
        jpegtran: {
          progressive: true,
        },
        gifsicle: {
          interlaced: true,
        },
        plugins: [
          imageminMozjpeg({
            quality: 70,
            progressive: true,
          }),
        ],
      });

      if (!ctx.isDev) config.plugins.push(imageMinPlugin);

      config.module.rules.forEach((rule) => {
        if (rule.test.toString() === ORIGINAL_TEST) {
          rule.test = /\.(png|jpe?g|gif|webp)$/i;
          rule.use = [
            {
              loader: 'url-loader',
              options: {
                limit: 1000,
                name: ctx.isDev
                  ? '[path][name].[ext]'
                  : 'img/[contenthash:7].[ext]',
              },
            },
          ];
        }
      });

      //  Create the custom SVG rule
      const svgRule = {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: vueSvgLoader,
          },
          {
            resourceQuery: /data/,
            loader: 'url-loader',
          },
          {
            resourceQuery: /raw/,
            loader: 'raw-loader',
          },
          {
            loader: 'file-loader', // By default, always use file-loader
          },
        ],
      };

      config.module.rules.push(svgRule); // Actually add the rule
    },
  },
};
