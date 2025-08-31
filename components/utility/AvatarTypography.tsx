import React from "react";

const AvatarTypography = ({ name = "John Doe" }: { name?: string }) => {
  const [firstLetter, lastLetter] = [
    name.charAt(0),
    name.charAt(name.length - 1),
  ];
  return (
    <span className="bg-secondary text-background text-md flex h-8 w-8 cursor-pointer items-center justify-center rounded-full font-semibold lg:h-10 lg:w-10 lg:text-lg">
      {(firstLetter + lastLetter).toUpperCase()}
    </span>
  );
};

export default AvatarTypography;
