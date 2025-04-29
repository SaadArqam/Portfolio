import {
  CloudIcon,
  FlameIcon,
  UserIcon,
  CodeIcon,
  RocketIcon,
  GithubIcon,
  ExternalLinkIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Dock, DockIcon } from "@/components/magicui/dock";

export default function Projects() {
  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      {/* Background Clouds */}
      <div className="absolute top-20 right-20">
        <CloudIcon className="w-32 h-32 text-gray-200" />
      </div>
      <div className="absolute bottom-40 left-20">
        <CloudIcon className="w-24 h-24 text-gray-200" />
      </div>
      <div className="absolute top-1/2 right-1/4">
        <CloudIcon className="w-40 h-40 text-gray-200" />
      </div>
      <div className="absolute bottom-20 right-32">
        <CloudIcon className="w-36 h-36 text-gray-200" />
      </div>
      <div className="absolute top-40 left-1/4">
        <CloudIcon className="w-28 h-28 text-gray-200" />
      </div>
      <div className="absolute top-60 right-60">
        <CloudIcon className="w-20 h-20 text-gray-200" />
      </div>

      {/* Header */}
      <div className="flex justify-center w-full pt-6 px-4 sm:px-0">
        <div className="w-full sm:w-[80%] border border-black rounded-lg bg-white/50 backdrop-blur-sm">
          <header className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6">
            <div
              className="text-xl sm:text-2xl font-black uppercase mb-2 sm:mb-0"
              style={{ fontFamily: "var(--font-dela-gothic)" }}
            >
              Projects
            </div>
            <Link href="/" className="hover:opacity-80 transition-opacity p-2">
              <FlameIcon className="w-6 h-6" />
            </Link>
          </header>
        </div>
      </div>

      {/* Main Content */}
      <main className="grid grid-cols-1 px-6 sm:px-12 md:px-24 lg:px-32 min-h-[80vh] relative py-10 sm:py-16">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tighter leading-[0.9] mb-6 sm:mb-10">
            Creations
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {/* Project Card 1 */}
            <div className="group border border-black rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative bg-white">
              <div className="absolute top-3 right-3 z-20 bg-black text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <RocketIcon className="w-4 h-4" />
              </div>
              <div className="h-52 bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
                <Image
                  src="/img/project1.jpg"
                  alt="Project preview"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  priority
                />
              </div>
              <div className="p-6 border-t border-gray-100">
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-800 transition-colors">
                  GALACTUS
                </h3>
                <p className="text-gray-600 mb-6">
                  Galactus – A sleek web experience built for immersive comic
                  exploration.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="https://github.com/SaadArqam/GALACTUS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://galactus-three.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="group border border-black rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative bg-white">
              <div className="absolute top-3 right-3 z-20 bg-black text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <CodeIcon className="w-4 h-4" />
              </div>
              <div className="h-52 bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
                <Image
                  src="/img/project2.jpg"
                  alt="Project preview"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 border-t border-gray-100">
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-800 transition-colors">
                  TEKRON
                </h3>
                <p className="text-gray-600 mb-6">Where future tech unfolds.</p>
                <div className="flex justify-between items-center">
                  <a
                    href="https://github.com/SaadArqam/TEKRON"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://tekronfest.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="group border border-black rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative bg-white">
              <div className="absolute top-3 right-3 z-20 bg-black text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <CloudIcon className="w-4 h-4" />
              </div>
              <div className="h-52 bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
                <Image
                  src="/img/project3.jpg"
                  alt="Project preview"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 border-t border-gray-100">
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-800 transition-colors">
                  SHARK&apos;S SPHERE
                </h3>
                <p className="text-gray-600 mb-6">
                  A sleek web platform empowering young visionaries and future
                  entrepreneurs through innovation and community.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="https://github.com/SaadArqam/E-Cell-2.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://e-cell20.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Project Card 4 */}
            <div className="group border border-black rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative bg-white">
              <div className="absolute top-3 right-3 z-20 bg-black text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <RocketIcon className="w-4 h-4" />
              </div>
              <div className="h-52 bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
                <Image
                  src="/img/project4.jpg"
                  alt="Project preview"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 border-t border-gray-100">
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-800 transition-colors">
                  WHO&apos;S THAT POKEMON?
                </h3>
                <p className="text-gray-600 mb-6">
                  A fun, modern web game with a clean UI and interactive UX for
                  every Pokémon enthusiast.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="https://github.com/SaadArqam/Whos-That-Pokemon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://whos-that-pokemon-zeta.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Project Card 5 */}
            <div className="group border border-black rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative bg-white">
              <div className="absolute top-3 right-3 z-20 bg-black text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <CodeIcon className="w-4 h-4" />
              </div>
              <div className="h-52 bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
                <Image
                  src="/img/project5.jpg"
                  alt="Project preview"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 border-t border-gray-100">
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-800 transition-colors">
                  EMO
                </h3>
                <p className="text-gray-600 mb-6">
                  A minimal yet expressive platform that bridges emotion and
                  interaction with clean design and thoughtful UX.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="https://github.com/SaadArqam/emo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://emo-lime.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Project Card 6 */}
            <div className="group border border-black rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative bg-white">
              <div className="absolute top-3 right-3 z-20 bg-black text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <CloudIcon className="w-4 h-4" />
              </div>
              <div className="h-52 bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
                <Image
                  src="/img/project6.jpg"
                  alt="Project preview"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 border-t border-gray-100">
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-800 transition-colors">
                  Comming Soon
                </h3>
                <p className="text-gray-600 mb-6">
                  This Project is Under Way
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="https://github.com/username/ai-integration"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://ai-integration-demo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Dock at the bottom */}
      <div className="fixed bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 z-50">
        <Dock className="scale-75 sm:scale-100">
          <Link href="/">
            <DockIcon>
              <FlameIcon className="h-5 w-5" />
            </DockIcon>
          </Link>
          <Link href="/about">
            <DockIcon>
              <UserIcon className="h-5 w-5" />
            </DockIcon>
          </Link>
          <Link href="/projects">
            <DockIcon>
              <RocketIcon className="h-5 w-5" />
            </DockIcon>
          </Link>
          <Link href="/contact">
            <DockIcon>
              <CloudIcon className="h-5 w-5" />
            </DockIcon>
          </Link>
        </Dock>
      </div>
    </div>
  );
}
