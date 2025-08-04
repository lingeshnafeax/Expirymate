import React from "react";

const AvatarTypography = ({ name = "John Doe" }: { name?: string }) => {
  const [firstLetter, lastLetter] = [
    name.charAt(0),
    name.charAt(name.length - 1),
  ];
  return (
    <span className="bg-secondary text-background flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-lg font-semibold lg:h-12 lg:w-12 lg:text-2xl">
      {(firstLetter + lastLetter).toUpperCase()}
    </span>
  );
};

export default AvatarTypography;
