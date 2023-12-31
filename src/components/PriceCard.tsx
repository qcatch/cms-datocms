import React from "react";

export interface PriceCardProps {
  _key?: string;
  title: string;
  price: string;
  term: string;
  options: string[];
}

const TickIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="mr-3 h-5 w-5 text-primary "
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

const PriceCard: React.FC<PriceCardProps> = ({
  title,
  price,
  term,
  options,
}) => {
  return (
    <div className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
      <div className="border-b-2 border-neutral-100 border-opacity-100 p-6 text-center">
        <p className="mb-4 text-sm uppercase">
          <strong>{title}</strong>
        </p>
        <h3 className="mb-6 text-3xl">
          <strong>${price}</strong>
          <small className="text-base text-neutral-500">/{term}</small>
        </h3>
        <button
          type="button"
          className="inline-block bg-blue-500 w-full rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
        >
          Buy
        </button>
      </div>
      <div className="p-6">
        {/*<ol className="list-inside">*/}
        {/*  {options &&*/}
        {/*    options?.map((option, index) => (*/}
        {/*      <li key={index} className="mb-4 flex">*/}
        {/*        <TickIcon />*/}
        {/*        {option}*/}
        {/*      </li>*/}
        {/*    ))}*/}
        {/*</ol>*/}
      </div>
    </div>
  );
};

export default PriceCard;
