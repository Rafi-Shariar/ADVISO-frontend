import Link from "next/link";
import React from "react";

const Header = () => {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
    { name: "Contact", url: "/contact" },
    { name: "login", url: "/login" },
  ];
  return (
    <div className="w-full h-16 border-b flex justify-center items-center gap-6">
      {routes.map((route) => (
        <Link key={route.name} href={route.url}>
          {" "}
          {route.name}
        </Link>
      ))}
    </div>
  );
};

export default Header;
