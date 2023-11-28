export const ALL_PATHS_QUERY = `
query Pages {
  allPages {    
    slug
  }
}`;

export const HOME_QUERY = `query Home {
  home {
    content {
      ... on HeroRecord {
        _modelApiKey
        id
        _createdAt
        image {
          responsiveImage(imgixParams: {fit: crop, w: 1200, h: 1200}) {
            width
            webpSrcSet
            srcSet
            src
            title
            sizes
            height
            bgColor
            base64
            aspectRatio
            alt
          }
          title
        }
        buttons {
          title
          link
        }
        title
      }
      ... on RichtextBlockRecord {
        _modelApiKey
        id
        content {
          value
        }
      }
      ... on CardblockRecord {
        id
        _modelApiKey
        price
        title
        cards {
          id
          job
          name
          quote
          image {
            responsiveImage(imgixParams: {fit: crop, w: 1200, h: 1200}) {
              alt
              sizes
              src
              srcSet
              title
              webpSrcSet
              width
              height
              bgColor
              base64
              aspectRatio
            }
          }
        }
      }
    }
    title
    id
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
          responsiveImage(imgixParams: {fit: crop, w: 1200, h: 1200}) {
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
          value
        }
        id
        image {
          responsiveImage(imgixParams: {fit: crop, w: 1200, h: 1200}) {
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
      ... on RichtextBlockRecord {
        __typename
        id
        content {
          value
        }
      }
      ... on CardRecord {
        __typename
        id
        name
        image {
          responsiveImage(imgixParams: {fit: crop, w: 1200, h: 1200}) {
            sizes
            src
            width
            height
            alt
            title
            base64
          }
        }
        quote
        job
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
