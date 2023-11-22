import React from "react";
import Link from "next/link";
import { StructuredText } from "react-datocms";

const LinkItem = ({ url, title }: { url: string; title: string }) => {
  return (
    <li>
      <Link href={url} className="text-neutral-800 dark:text-neutral-200">
        {title}
      </Link>
    </li>
  );
};

const LinkGroup = ({
  title,
  links,
}: {
  title: string;
  links: Array<{
    url: string;
    title: string;
  }>;
}) => {
  // console.log(links);
  return (
    <div className="mb-6">
      <h5 className="mb-2.5 font-bold uppercase text-neutral-800 dark:text-neutral-200">
        {title}
      </h5>

      <ul className="mb-0 list-none">
        {links.map((link, index) => (
          <LinkItem url={link.url} key={index} title={link.title} />
        ))}
      </ul>
    </div>
  );
};

const Footer = ({ links, tagline }: { links: any[]; tagline: any }) => {
  // console.log(tagline);
  return (
    <>
      <footer className="flex flex-col items-center bg-neutral-100 text-center dark:bg-neutral-600 lg:text-left">
        <div className="container p-6">
          <div className="grid place-items-top md:grid-cols-2 lg:grid-cols-4">
            {links.map((group, index) => (
              <LinkGroup
                key={group.title}
                title={group.title}
                links={group.links}
              />
            ))}
          </div>
        </div>

        {tagline && tagline?.value && (
          <div className="w-full bg-neutral-200 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
            <StructuredText data={tagline?.value} />
          </div>
        )}
      </footer>
    </>
  );
};

export default Footer;
