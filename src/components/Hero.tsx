import React from "react";
import Link from "next/link";
import { HeroBlock } from "@/models/datocms.model";
import { Image as DatoImage } from "react-datocms";

const Hero: React.FC<HeroBlock> = ({ title, buttons, image }) => {
  return (
    <section className="mb-10">
      <div className="bg-neutral-50 px-6 py-12 text-center md:px-12 lg:text-left">
        <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="mt-12 lg:mt-0">
              {title && (
                <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                  {title}
                </h1>
              )}
              {buttons?.length &&
                buttons?.map((button, index) => {
                  // console.log(button);
                  return (
                    <Link
                      key={button.title}
                      href={button.link || "/"}
                      className="bg-blue-500 mb-2 inline-block rounded bg-primary px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] md:mr-2 md:mb-0"
                      data-te-ripple-color="light"
                      role="button"
                      target={"_blank"}
                    >
                      {button.title}
                    </Link>
                  );
                })}
            </div>
            <div className="mb-12 lg:mb-0">
              {image && (
                <DatoImage
                  data={image?.responsiveImage!}
                  className="w-full rounded-lg shadow-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
