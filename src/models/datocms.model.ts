// export interface MenuItem {
//   _type: string;
//   slug?: string;
//   title?: string;
// }
//
// export interface ShowcaseProject {
//   _type: string;
//   coverImage?: Image;
//   overview?: PortableTextBlock[];
//   slug?: string;
//   tags?: string[];
//   title?: string;
// }
//
// // Page payloads
//
import { ImagePropTypes } from "react-datocms";

export interface HomePagePayload {
  title?: string;
  content: HeroBlock[];
}

export interface HeroBlock {
  _key?: string;
  _type?: string;
  title: string;
  buttons: Button[];
  image: ImagePropTypes;
}

export interface Button {
  title?: string;
  link?: string;
}

// export interface PagePayload {
//   title?: string;
//   slug?: string;
//   body?: TextImageBlock[] | FaqBlock[] | CardPriceBlock[];
// }
//
// export interface TextImageBlock {
//   _key?: string;
//   _type?: string;
//   image?: Image;
//   content?: PortableTextBlock[];
// }

export interface DataCmsStructuredText {
  value?: any;
}

export interface FaqBlock {
  title?: string;
  intro?: DataCmsStructuredText;
  faqs?: FaqQuestion[];
}

export interface FaqQuestion {
  question: string;
  answer: DataCmsStructuredText;
}

// export interface CardPriceBlock {
//   _key?: string;
//   _type?: string;
//   title?: string;
//   cards?: Card[];
// }
//
// export interface Card {
//   title?: string;
//   price?: number;
//   options?: string[];
// }
//
// export interface ProjectPayload {
//   client?: string;
//   coverImage?: Image;
//   description?: PortableTextBlock[];
//   duration?: {
//     start?: string;
//     end?: string;
//   };
//   overview?: PortableTextBlock[];
//   site?: string;
//   slug: string;
//   tags?: string[];
//   title?: string;
// }
//
// export interface SettingsPayload {
//   footer?: PortableTextBlock[];
//   menuItems?: MenuItem[];
//   ogImage?: Image;
// }
