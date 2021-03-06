const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'The Headless WordPress Framework',
  tagline: 'Faust.js focuses on delivering the best developer experience and features you need when building Headless WordPress websites with support for: static site generation, server-side rendering, TypeScript, data-fetching, post and page previews, and more.',
  customFields: {
    description:
      'Faust.js is the Headless WordPress Framework. Faust.js provides a set of tools to make building front-end applications with WordPress as the headless CMS a pleasant experience for both developers and publishers. This framework consists of a WordPress plugin, a set of npm packages, and guides to get you started building headless WordPress sites React/Next.js/etc.',
  },
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'wpengine', // Usually your GitHub org/user name.
  projectName: 'headless-framework', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Faust.js',
      // logo: {
      //   alt: 'My Site Logo',
      //   src: 'img/logo.svg',
      // },
      items: [
        {
          type: 'doc',
          docId: 'next/getting-started',
          position: 'right',
          label: 'Docs',
        },
        {
          href: 'https://github.com/wpengine/headless-framework',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/tutorial/setting-up-wordpress',
            },
            {
              label: 'Getting Started',
              to: '/next/getting-started',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/wpengine/headless-framework',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/wpedecode',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/channel/UCh1WuL54XFb9ZI6m6goFv1g',
            },
          ],
        },
        {
          title: 'WP Engine',
          items: [
            {
              label: "We're Hiring!",
              to: 'https://wpengine.careers/',
            },
            {
              label: 'Headless WordPress Hosting',
              href: 'https://wpengine.com/atlas',
            },
          ],
        },
      ],
      copyright: `&copy; ${new Date().getFullYear()} WPEngine, Inc. All rights reserved.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/wpengine/headless-framework/edit/docs-setup-docusaurus/internal/website/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
