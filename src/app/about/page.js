"use client";

import {
  CloudIcon,
  FlameIcon,
  UserIcon,
  CodeIcon,
  RocketIcon,
  FileTextIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Dock, DockIcon } from "@/components/magicui/dock";
import useScrollRestoration from "@/hooks/useScrollRestoration";
import MiniMusicPlayer from "@/components/MiniMusicPlayer";

export default function About() {
  // Use the hook to fix scrolling issues
  useScrollRestoration();

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
              About Me
            </div>
            <div className="flex items-center gap-2">
              <MiniMusicPlayer />
              <Link
                href="/"
                className="hover:opacity-80 transition-opacity p-2"
              >
                <FlameIcon className="w-6 h-6" />
              </Link>
            </div>
          </header>
        </div>
      </div>

      {/* Main Content with side-by-side layout */}
      <main className="grid grid-cols-1 px-6 sm:px-12 md:px-24 lg:px-32 min-h-[80vh] relative py-10 sm:py-16">
        <div className="mx-auto w-full max-w-6xl">
          {/* About Section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Text content - left side */}
            <div className="md:w-3/5">
              <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tighter leading-[0.9] mb-8 sm:mb-10">
                Persona
              </h1>

              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg">
                <p>
                  Hello! I&apos;m a passionate designer and developer with a
                  love for creating beautiful, functional digital experiences.
                </p>

                <p>
                  With experience spanning from web development to UI/UX design,
                  I strive to bring a blend of technical expertise and creative
                  thinking to every project.
                </p>

                <p>
                  When I&apos;m not coding, you might find me watching movies,
                  bingeing a good series, or just unwinding with some screen
                  time.
                </p>

                <div
                  className="japanese-text text-xl sm:text-2xl md:text-3xl my-8 sm:my-10"
                  data-meaning="'Curiosity is the driving force that moves me forward.'"
                >
                  「好奇心が私を
                  <br />
                  動かす原動力です。」
                </div>

                {/* Resume Button */}
                <div className="mt-6 sm:mt-8">
                  <a
                    href="/docs/Resume-Saad Arqam.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-button px-6 sm:px-8 md:px-12 py-2.5 sm:py-3 bg-white hover:bg-gray-100 transition-colors border border-gray-300 text-sm sm:text-base"
                  >
                    <div className="flex items-center gap-2">
                      <FileTextIcon className="w-4 h-4" />
                      <span>Resume</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Diagonal images - right side */}
            <div className="md:w-2/5 relative hidden md:block">
              <div className="relative h-full">
                {/* First image - top */}
                <div className="absolute left-0 top-0 w-76 h-76 z-30">
                  <div className="relative w-full h-full rounded-lg overflow-hidden border border-black shadow-lg">
                    <Image
                      src="/img/img1.jpg"
                      alt="Decorative image"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Second image - middle diagonal */}
                <div className="absolute left-64 top-58 w-74 h-74 z-20">
                  <div className="relative w-full h-full rounded-lg overflow-hidden border border-black shadow-lg">
                    <Image
                      src="/img/img2.jpg"
                      alt="Decorative image"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Third image - bottom diagonal */}
                <div className="absolute left-24 top-128 w-70 h-70 z-10">
                  <div className="relative w-full h-full rounded-lg overflow-hidden border border-black shadow-lg">
                    <Image
                      src="/img/img3.jpg"
                      alt="Decorative image"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-only images in simpler layout */}
            <div className="md:hidden">
              <div className="w-full aspect-square rounded-lg overflow-hidden border border-black shadow-lg">
                <div className="relative w-full h-full">
                  <Image
                    src="/img/img1.jpg"
                    alt="Decorative image"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="w-full aspect-square rounded-lg overflow-hidden border border-black shadow-lg -mt-8 ml-12">
                <div className="relative w-full h-full">
                  <Image
                    src="/img/img2.jpg"
                    alt="Decorative image"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full aspect-square rounded-lg overflow-hidden border border-black shadow-lg -mt-8 -ml-4">
                <div className="relative w-full h-full">
                  <Image
                    src="/img/img3.jpg"
                    alt="Decorative image"
                    fill
                    className="object-cover"
                  />
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
            <DockIcon isActive={true}>
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
