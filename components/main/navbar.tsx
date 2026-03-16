"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { NAV_LINKS, SOCIALS } from "@/constants";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full h-[70px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">

        {/* Logo + Name */}
        <Link href="#about-me" className="flex items-center">
          <Image
            src="/logo.png?v=2"
            alt="Satyam Kumar"
            width={60}
            height={60}
            draggable={false}
            className="cursor-pointer"
          />

          <div className="hidden md:flex font-bold ml-[10px] text-gray-300">
            Satyam Kumar
          </div>
        </Link>

        {/* Desktop Navbar */}
        <div className="hidden md:flex h-full flex-row items-center justify-between md:mr-10">
          <div className="flex items-center justify-between gap-6 h-auto border border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] px-[24px] py-[10px] rounded-full text-gray-200">

            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-purple-400 transition"
              >
                {link.title}
              </Link>
            ))}


          </div>
        </div>

        {/* Social Icons */}
        <div className="hidden md:flex flex-row gap-5">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
              aria-label={`Visit my ${name} profile`}
            >
              <Icon className="h-6 w-6 text-white hover:text-purple-400 transition" />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-4xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-[#030014] p-6 flex flex-col items-center text-gray-300 md:hidden">

          <div className="flex flex-col items-center gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-purple-400 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}


          </div>

          {/* Mobile Social */}
          <div className="flex justify-center gap-6 mt-6">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                href={link}
                target="_blank"
                key={name}
                aria-label={`Visit my ${name} profile`}
              >
                <Icon className="h-8 w-8 text-white hover:text-purple-400 transition" />
              </Link>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};