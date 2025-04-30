import Image from "next/image";
import { FlameIcon, CloudIcon, UserIcon, RocketIcon } from "lucide-react";
import Link from "next/link";

import { Dock, DockIcon } from "@/components/magicui/dock";
import MusicPlayer from "@/components/MusicPlayer";
import TimeDisplay from "@/components/TimeDisplay";

export default function Home() {
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

      {/* Header */}
      <div className="flex justify-center w-full pt-6 px-4 sm:px-0">
        <div className="w-full sm:w-[80%] border border-black rounded-lg bg-white/50 backdrop-blur-sm">
          <header className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6">
            <div
              className="text-xl sm:text-2xl font-black uppercase mb-2 sm:mb-0"
              style={{ fontFamily: "var(--font-dela-gothic)" }}
            >
              Saad Arqam
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">Pune</span>
              <TimeDisplay />
              <CloudIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </header>
        </div>
      </div>

      {/* Main Hero Content - Styled like the image */}
      <main className="grid grid-cols-1 md:grid-cols-5 items-center px-6 sm:px-12 md:px-24 lg:px-32 min-h-[80vh] relative pt-10 sm:pt-0">
        {/* Hero Text - Left-aligned like in the image - Taking 3 columns */}
        <div className="md:col-span-3">
          <h1 className="text-5xl sm:text-7xl md:text-8xl tracking-tighter leading-[0.9] mb-4 sm:mb-6">
            A Journey of
            <br />
            Curiosity
          </h1>
          <div
            className="japanese-text text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8"
            data-meaning="'There are no experts. There's only us.'"
          >
            「専門家はい
            <br />
            ません。いる
            <br />
            のは私たちだ
            <br />
            けです。」
          </div>
          <p
            className="text-lg sm:text-xl mb-8 sm:mb-10"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Design and code{" "}
            <span className="text-gray-500">beneath midnight thoughts</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link href="/projects">
              <button className="rounded-button px-6 sm:px-8 md:px-12 py-2.5 sm:py-3 bg-white hover:bg-gray-100 transition-colors border border-gray-300 text-sm sm:text-base">
                Works
              </button>
            </Link>
            <Link href="/contact">
              <button className="rounded-button px-6 sm:px-8 md:px-12 py-2.5 sm:py-3 bg-white hover:bg-gray-100 transition-colors border border-gray-300 text-sm sm:text-base">
                Get in touch
              </button>
            </Link>
          </div>
        </div>

        {/* Music Player - Taking 2 columns */}
        <div className="md:col-span-2 flex justify-center items-center mt-12 md:mt-0">
          <MusicPlayer />
        </div>

        {/* Badge in top-right */}
        <div className="absolute top-2 right-6 sm:top-12 sm:right-8 md:top-24 md:right-24 bg-white rounded-full p-0.5 sm:p-1 border border-black">
          <div className="rounded-full bg-black text-white p-1.5 sm:p-2 flex items-center justify-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[60px] md:h-[60px]">
            <span className="text-sm sm:text-base md:text-lg">★</span>
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
