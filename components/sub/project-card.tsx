import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
}: ProjectCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-[#2A0E61] shadow-lg hover:shadow-purple-500/30 transition duration-300">

      {/* Project Image */}
      <div className="overflow-hidden">
        <Image
          src={src}
          alt={title}
          width={1000}
          height={1000}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 bg-[#0f0824]">
        <h1 className="text-xl font-semibold text-white">{title}</h1>

        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-3">

          <Link
            href={link}
            target="_blank"
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm rounded-lg hover:opacity-90 transition"
          >
            View Project
          </Link>

          <Link
            href={link}
            target="_blank"
            className="px-4 py-2 border border-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition"
          >
            GitHub
          </Link>

        </div>
      </div>
    </div>
  );
};