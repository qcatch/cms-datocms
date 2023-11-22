export const ALL_PATHS_QUERY = `
query Pages {
  allPages {    
    slug
  }
}`;

export const PAGE_QUERY = `query Page($slug: String) {
  page(filter: {slug: {eq: $slug}}) {
    content {
      ... on CardpriceblockRecord {
        __typename
        id
        cards {
          button {
            id
            link
            title
          }
          options
          price
          term
          title
        }
        title
      }
      ... on FaqblockRecord {
        __typename
        id
        faqs {
          id
          question
          answer {
            blocks
            links
            value
          }
        }
        intro {
          value
        }
        title
      }
      ... on HeroRecord {
        __typename
        image {
          responsiveImage(imgixParams: { fit: crop, w: 1200, h: 1200 }) {
            sizes
            src
            width
            height
            alt
            title
            base64
          }
          url
        }
        title
        buttons {
          link
          title
        }
      }
      ... on TextimageRecord {
        __typename
        content {
          blocks
          links
          value
        }
        id
        image {
          responsiveImage(imgixParams: { fit: crop, w: 1200, h: 1200 }) {
            sizes
            src
            width
            height
            alt
            title
            base64
          }
        }
      }
    }
    title
    slug
    id
  }
  home {
    id
  }
  allPages {
    id
  }
}`;

export const MAIN_MENU_QUERY = `query Navigation {
  siteConfig {
    navigation {
      link {
        ... on HomeRecord {
          title
          id
        }
        ... on PageRecord {
          id
          title
          slug
        }
      }
    }
    footer {
      links {
        url
        title
      }
      title
    }
    footerTagline {
      value
    }
  }
}`;
