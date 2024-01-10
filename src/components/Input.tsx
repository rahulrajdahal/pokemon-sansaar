"use client";

import React from "react";
import { Search } from "meistericons-react";

interface IInput extends React.ComponentPropsWithoutRef<"span"> {
  wrapperClassName?: string;
  inputProps?: React.ComponentPropsWithoutRef<"input">;
}
export default function Input({
  wrapperClassName,
  inputProps,
  ...props
}: IInput) {
  return (
    <span
      className={`max-w-[20rem] py-2 px-4 w-full flex items-center gap-2 border-gray-300 border rounded-lg ${wrapperClassName}`}
      {...props}
    >
      <Search />
      <input
        type="search"
        name="search"
        className="w-full outline-none border-none"
        {...inputProps}
      />
    </span>
  );
}
