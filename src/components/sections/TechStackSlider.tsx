"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faAngular,
  faNodeJs,
  faPython,
  faJava,
  faAws,
  faDocker,
} from "@fortawesome/free-brands-svg-icons";

// Expanded list of technologies with custom SVG / FontAwesome brand icons
const techList = [
  {
    name: "Next.js",
    icon: (
      <svg className="w-5 h-5 text-black" viewBox="0 0 128 128" fill="currentColor">
        <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c18 0 34.3-7.5 45.9-19.5L52.8 45.4h-9v37.2h8.3V56.3L97.5 110C115.8 99.4 128 79.6 128 64c0-35.3-28.7-64-64-64zm0 20.7c15 0 28.5 7.4 36.8 18.7L54.7 93.3v8.3h9.6l46.2-61.9c4 7.6 6.3 16.3 6.3 25.5 0 23.4-12.7 43.8-31.5 54.7L64 20.7z" />
      </svg>
    ),
  },
  {
    name: "React",
    icon: <FontAwesomeIcon icon={faReact} className="w-5 h-5 text-[#61DAFB]" />,
  },
  {
    name: "TypeScript",
    icon: (
      <div className="w-5 h-5 bg-[#3178C6] text-white flex items-end justify-end font-bold rounded-[3px] text-[8px] p-0.5 select-none leading-none">
        TS
      </div>
    ),
  },
  {
    name: "React Native",
    icon: <FontAwesomeIcon icon={faReact} className="w-5 h-5 text-[#61DAFB]" />,
  },
  {
    name: "Flutter",
    icon: (
      <svg className="w-5 h-5 text-[#02569B]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.3 0L5.5 8.8 14.3 17.6h4.4L9.9 8.8 18.7 0h-4.4zm4.4 17.6L14.3 22l-4.4-4.4 4.4-4.4 4.4 4.4z" />
      </svg>
    ),
  },
  {
    name: "Swift",
    icon: (
      <svg className="w-5 h-5 text-[#FA7329]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.75 14.75c-1.5 2.5-4.5 4.5-8.5 4.5-5.5 0-9.5-4-9.5-9.5 0-3.5 1.5-6.5 4.5-8.5-4.5.5-8.5 4-9.25 8.5C-.75 14.25 3 22 9.5 23.5c5.5 1 10.5-2.5 12.25-7.75-.5.5-.75 1-1 1z" />
      </svg>
    ),
  },
  {
    name: "Kotlin",
    icon: (
      <svg className="w-5 h-5 text-[#7F52FF]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 24H0V0h24L12 12z" />
      </svg>
    ),
  },
  {
    name: "OpenAI / GPT-4",
    icon: (
      <svg className="w-5 h-5 text-[#10a37f]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.74 11.43a5.53 5.53 0 0 0-1.87-4.14 5.75 5.75 0 0 0-5.74-.93 5.6 5.6 0 0 0-4.87-2.82 5.55 5.55 0 0 0-5.46 4.39 5.72 5.72 0 0 0-2.4 5.14 5.54 5.54 0 0 0 1.86 4.14 5.76 5.76 0 0 0 5.75.93 5.6 5.6 0 0 0 4.86 2.82 5.55 5.55 0 0 0 5.46-4.39 5.72 5.72 0 0 0 2.4-5.14zm-11-6.14a3.62 3.62 0 0 1 2.3 1.05v3.13L10.3 8a1.64 1.64 0 0 0-.82 1.4v4.55L6.63 12.2a3.63 3.63 0 0 1 .4-5.26 3.54 3.54 0 0 1 3.71-.65zm-5 8.94a3.63 3.63 0 0 1-.4-5.26 3.54 3.54 0 0 1 1.76-1.57l2.71 1.57a1.64 1.64 0 0 0-.17 1.6l2.45 4.25-3.66-2.11a3.62 3.62 0 0 1-2.69-3.48zm5.72 4.41L8.6 17v-3.13l2.75 1.58a1.64 1.64 0 0 0 .82-1.4V9.5l2.84 1.64a3.63 3.63 0 0 1-.4 5.26 3.54 3.54 0 0 1-3.71.65zm8-1.58a3.63 3.63 0 0 1-1.76 1.57l-2.71-1.57a1.64 1.64 0 0 0 .17-1.6l-2.45-4.25 3.66 2.11a3.62 3.62 0 0 1 2.69 3.48l.4.26z" />
      </svg>
    ),
  },
  {
    name: "LangChain",
    icon: <span className="text-sm select-none">🦜</span>,
  },
  {
    name: "TensorFlow",
    icon: (
      <svg className="w-5 h-5 text-[#FF6F00]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 3.3L19 7.3v9.4l-7 4-7-4V7.3l7-4z" />
      </svg>
    ),
  },
  {
    name: "PyTorch",
    icon: (
      <svg className="w-5 h-5 text-[#EE4C2C]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4.5h-2V7h2v5z" />
      </svg>
    ),
  },
  {
    name: "Scikit-learn",
    icon: (
      <svg className="w-5 h-5 text-[#F7931E]" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="8" cy="8" r="4" fill="#3776AB" />
        <circle cx="16" cy="16" r="4" fill="#F7931E" />
        <line x1="8" y1="8" x2="16" y2="16" stroke="gray" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Gemini",
    icon: (
      <svg className="w-5 h-5 text-[#1A73E8]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C12 7.5 16.5 12 22 12c-5.5 0-10 4.5-10 10c0-5.5-4.5-10-10-10c5.5 0 10-4.5 10-10z" fill="url(#gemini-grad)" />
        <defs>
          <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7a95ff" />
            <stop offset="100%" stopColor="#1a73e8" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "DeepSeek",
    icon: (
      <div className="w-5 h-5 bg-[#0052FF] text-white flex items-center justify-center font-black rounded-lg text-[9px] select-none leading-none shadow-sm">
        ds
      </div>
    ),
  },
  {
    name: "D3.js",
    icon: (
      <svg className="w-5 h-5 text-[#F9A03F]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 2v20h9.2c4.4 0 8.8-3.6 8.8-10S17.6 2 13.2 2H4zm6 6h3.2c1.7 0 2.8 1.1 2.8 4s-1.1 4-2.8 4H10V8z" />
      </svg>
    ),
  },
  {
    name: "Chart.js",
    icon: (
      <svg className="w-5 h-5 text-[#FF6384]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 7.5L13.5 13.5L9.5 9.5L5.5 14.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Angular",
    icon: <FontAwesomeIcon icon={faAngular} className="w-5 h-5 text-[#DD0031]" />,
  },
  {
    name: "Node.js",
    icon: <FontAwesomeIcon icon={faNodeJs} className="w-5 h-5 text-[#339933]" />,
  },
  {
    name: "Python",
    icon: <FontAwesomeIcon icon={faPython} className="w-5 h-5 text-[#3776AB]" />,
  },
  {
    name: "Java",
    icon: <FontAwesomeIcon icon={faJava} className="w-5 h-5 text-[#007396]" />,
  },
  {
    name: "Tailwind CSS",
    icon: (
      <svg className="w-5 h-5 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    icon: (
      <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 22h20L12 2z" />
      </svg>
    ),
  },
  {
    name: "Figma",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M8 5a3 3 0 1 1 3 3H8V5z" fill="#F24E1E" />
        <path d="M8 11a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" fill="#A259FF" />
        <path d="M8 17a3 3 0 1 1 3-3v3H8z" fill="#0ACF83" />
        <path d="M14 5a3 3 0 0 1 3 3 3 3 0 0 1-3 3V5z" fill="#FF7262" />
        <path d="M14 17a3 3 0 1 1-3-3h3v3z" fill="#1ABC9C" />
      </svg>
    ),
  },
  {
    name: "Neon DB",
    icon: (
      <svg className="w-5 h-5 text-[#00E599]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 21V3h4.81l5.19 8.31V3H19v18h-4.81L9 12.69V21H5z" />
      </svg>
    ),
  },
  {
    name: "AWS S3",
    icon: (
      <svg className="w-5 h-5 text-[#E05243]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 4.5 2 7v10c0 2.5 4.48 5 10 5s10-2.5 10-5V7c0-2.5-4.48-5-10-5zm0 3c4.1 0 7 1.5 7 2s-2.9 2-7 2-7-1.5-7-2 2.9-2 7-2zm-7 5.2c1.4.6 3.9 1.3 7 1.3s5.6-.7 7-1.3V11c0 .5-2.9 2-7 2s-7-1.5-7-2v-.8zm0 5c1.4.6 3.9 1.3 7 1.3s5.6-.7 7-1.3v.8c0 .5-2.9 2-7 2s-7-1.5-7-2v-.8z" />
      </svg>
    ),
  },
  {
    name: "AWS RDS",
    icon: (
      <svg className="w-5 h-5 text-[#527FFF]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 3.8 2 6v12c0 2.2 4.48 4 10 4s10-1.8 10-4V6c0-2.2-4.48-4-10-4zm0 2.5c4.1 0 7 1.2 7 1.5s-2.9 1.5-7 1.5-7-1.2-7-1.5 2.9-1.5 7-1.5zm-7 4.2c1.4.5 3.9 1.1 7 1.1s5.6-.6 7-1.1v1.3c0 .3-2.9 1.5-7 1.5s-7-1.2-7-1.5v-1.3zm0 4.5c1.4.5 3.9 1.1 7 1.1s5.6-.6 7-1.1v1.3c0 .3-2.9 1.5-7 1.5s-7-1.2-7-1.5v-1.3z" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    icon: (
      <svg className="w-5 h-5 text-[#336791]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.164.047c-.504 0-1.02.046-1.535.152C7.308.799 4.708 3.518 4.28 7.078c-.024.195-.043.393-.058.59-.012.162-.057.29-.126.402A4.07 4.07 0 0 0 3.01 9.44c-.752 1.096-1.127 2.456-1.034 3.738.082 1.134.582 2.215 1.34 3.033.456.49 1.027.868 1.637 1.11.198.077.302.268.257.48a13.34 13.34 0 0 0-.25 2.128c-.015.424.084.81.282 1.144a1.86 1.86 0 0 0 1.25.922 4.14 4.14 0 0 0 .973.117 7.08 7.08 0 0 0 2.29-.44c.484-.183.69-.64.484-1.12-.178-.413-.628-.602-1.042-.423a5.1 5.1 0 0 1-1.63.32c-.368.016-.628-.158-.75-.5-.11-.312-.047-.69-.024-1.077.017-.282.162-.533.4-.68.896-.547 1.956-.84 3.047-.84h.023c.513 0 1.01.072 1.492.203.492.133 1.008.203 1.52.203 2.923 0 5.485-2.023 6.134-4.87a6.22 6.22 0 0 0-.323-3.79c-.588-1.272-1.657-2.222-2.905-2.827C15.823 5.44 14.074 5.34 12.35 5.567c-.506.067-.788.583-.63 1.066.152.464.63.722 1.1.653 1.155-.164 2.333-.092 3.42.348a4.93 4.93 0 0 1 2.21 2.054 4.3 4.3 0 0 1 .235 2.768c-.463 2.028-2.296 3.473-4.382 3.473-.36 0-.722-.05-1.076-.145a8.77 8.77 0 0 0-2.47-.367h-.032c-1.123 0-2.207.25-3.138.718l-.13.064c-.167.085-.308.214-.403.377a11.13 11.13 0 0 0-.414 1.34c.594.316 1.25.534 1.928.647h.04c.96.16 1.93.24 2.89.24 3.522 0 6.64-1.928 8.04-5.003a8.13 8.13 0 0 0 .584-5.63C21.847 4.9 17.568.047 12.164.047z" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    icon: (
      <svg className="w-5 h-5 text-[#13aa52]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-.5 0-1 .4-1.3.9L5.3 11c-1.3 2.6-1.5 5.5-.6 8.3.7 2.2 2.4 3.9 4.6 4.5.6.2 1.2.3 1.7.3.3 0 .6-.1.8-.2.8-.4 1.2-1.3 1-2.2-.2-.9-.8-1.5-1.7-1.5h-.1c-.9 0-1.6.7-1.6 1.6 0 .3.1.5.2.7-1.1-.5-1.9-1.4-2.2-2.5-.6-2-.4-4.2.5-6.1l4-8.1c.2-.4.1-.9-.3-1.1-.2-.1-.4-.2-.6-.2zM12 0c.5 0 1 .4 1.3.9l5.4 10.1c1.3 2.6 1.5 5.5.6 8.3-.7 2.2-2.4 3.9-4.6 4.5-.6.2-1.2.3-1.7.3-.3 0-.6-.1-.8-.2-.8-.4-1.2-1.3-1-2.2.2-.9.8-1.5 1.7-1.5h.1c.9 0 1.6.7 1.6 1.6 0 .3-.1.5-.2.7 1.1-.5 1.9-1.4 2.2-2.5.6-2 .4-4.2-.5-6.1l-4-8.1c-.2-.4-.1-.9.3-1.1.2-.1.4-.2.6-.2z" />
      </svg>
    ),
  },
  {
    name: "Firebase",
    icon: (
      <svg className="w-5 h-5 text-[#FFCA28]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.89 15.572L6.009.973A.446.446 0 0 1 6.84.717l2.809 5.378-5.759 9.477zM18.89 12.338l-1.916-3.673L12 18.067l6.89-5.729zm1.22 3.234l-1.916-11.493a.446.446 0 0 0-.776-.237L3.11 18.736l8.89 5.093c.31.177.69.177 1 0l7.11-4.072a.446.446 0 0 0 .27-.375c.01-.19-.08-.375-.27-.584z" />
      </svg>
    ),
  },
  {
    name: "Redis",
    icon: (
      <svg className="w-5 h-5 text-[#D82C20]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 3.3L19 7.3v9.4l-7 4-7-4V7.3l7-4zm0 2.2L6.8 8.5v7l5.2 3 5.2-3v-7L12 5.5z" />
      </svg>
    ),
  },
  {
    name: "Docker",
    icon: <FontAwesomeIcon icon={faDocker} className="w-5 h-5 text-[#2496ED]" />,
  },
  {
    name: "HTML5",
    icon: <FontAwesomeIcon icon={faHtml5} className="w-5 h-5 text-[#E34F26]" />,
  },
  {
    name: "CSS3",
    icon: <FontAwesomeIcon icon={faCss3Alt} className="w-5 h-5 text-[#1572B6]" />,
  },
  {
    name: "JavaScript",
    icon: <FontAwesomeIcon icon={faJs} className="w-5 h-5 text-[#F7DF1E]" />,
  },
];

export default function TechStackSlider() {
  const doubledTechList = [...techList, ...techList];

  return (
    <section className="py-20 bg-brand-50/50 border-y border-brand-100 overflow-hidden relative">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-200 rounded-full mb-3">
          Technologies
        </span>
        <h3 className="text-3xl font-black text-slate-900 mb-4">Our Tech Stack</h3>
        <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
          The cutting-edge tools and frameworks we leverage to build fast, scalable, and secure digital products.
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full flex overflow-hidden py-4 select-none">
        {/* Left and Right Visual Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-50/50 via-brand-50/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-50/50 via-brand-50/30 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Items */}
        <div className="animate-marquee flex items-center flex-nowrap shrink-0">
          {doubledTechList.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-3 px-5 py-3.5 bg-white border border-gray-100 shadow-sm rounded-2xl shrink-0 min-w-[150px] mr-4 transition-all duration-200 hover:border-brand-200 hover:shadow-md cursor-default"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-gray-50 border border-gray-100">
                {tech.icon}
              </div>
              <span className="text-sm font-bold text-slate-800">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
