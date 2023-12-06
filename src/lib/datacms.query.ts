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
        title
        cards {
          id
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
      ... on TextimageRecord {
        id
        _modelApiKey        
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
        }
        content {
          value
          blocks
          links
        }
      }
    }
    id
  }
}`;

export const PAGE_QUERY = `query Page($slug: String) {
  page(filter: {slug: {eq: $slug}}) {
    content {
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
      ... on CardblockRecord {
        __typename
        id
        title
        cards {
          quote
          name
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
              aspectRatio
            }
            size
            smartTags
            tags
            thumbhash
            url
            width
          }
          _status
        }
        _status
        _updatedAt
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
