import React from "react";

import { FaqBlock } from "@/models/datocms.model";
import { StructuredText } from "react-datocms";

const FAQBlock: React.FC<FaqBlock> = ({ title, faqs, intro }) => {
  return (
    <>
      <section className="mb-32">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="mb-6 md:mb-0">
            {title && <h2 className="mb-6 text-3xl font-bold">{title}</h2>}
            {intro?.value && <StructuredText data={intro.value} />}
          </div>
          {faqs && (
            <div className="mb-6 md:mb-0">
              {faqs?.map((item) => (
                <React.Fragment key={item.question}>
                  <p className="mb-4 font-bold">{item?.question}</p>
                  {item?.answer.value && (
                    <StructuredText data={item?.answer.value} />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FAQBlock;
