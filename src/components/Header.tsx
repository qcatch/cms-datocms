import React from "react";
import Link from "next/link";

const Header = ({ data }: { data: any[] }) => {
  const navigation = data;

  // console.log(data);
  return (
    navigation &&
    navigation.length && (
      <header>
        <nav className="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 md:flex-wrap md:justify-start">
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <div className="grow basis-[100%] items-center lg:!flex lg:basis-auto">
              <ul className="mr-auto flex flex-col lg:flex-row">
                {navigation?.map(({ link }, i) => {
                  return (
                    <li className="mb-4 lg:mb-0 lg:pr-2" key={i}>
                      <Link
                        className={`block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 lg:p-2 [&.active]:text-black/90`}
                        href={link?.slug || "/"}
                      >
                        {link?.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  );
};

export default Header;
