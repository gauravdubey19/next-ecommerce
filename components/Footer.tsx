import React from "react";
import Link from "next/link";

const Footer: React.FC<{ devName: string }> = ({ devName }) => {
  return (
    <>
      <div className="w-full py-4 flex-center gap-1 text-md">
        <Link
          href="https://github.com/gauravdubey19"
          target="_blank"
          rel="noreferrer"
          className="group flex-center gap-1"
        >
          ©{new Date().getFullYear()} || All rights reserved by
          <span className="group-hover:text-cyan-300 group-active:scale-110 ease-in-out duration-300">
            {devName}
          </span>
        </Link>
      </div>
    </>
  );
};

export default Footer;
