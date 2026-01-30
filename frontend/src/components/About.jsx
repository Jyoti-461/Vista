import VerticalImageScroll from "./VerticalImageScroll";

const eventImages = Array.from({ length: 9 }, (_, i) =>
  `/about/event/${i + 1}.jpg`
);

const collegeImages = Array.from({ length: 9 }, (_, i) =>
  `/about/college/${i + 1}.jpg`
);

const About = () => {
  return (
    <section
      id="about"
      className="relative py-16 px-4 sm:px-6"
    >
      {/* Simple Static Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-950 dark:to-gray-900" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* ===== ABOUT COLLEGE ===== */}
        <div className="relative">
          <div className="relative bg-white/95 dark:bg-gray-900/95 rounded-xl p-6 md:p-10 border border-gray-200 dark:border-gray-800 shadow-sm">
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Text */}
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">TIMSCDR</span>
                </h2>

                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      Thakur Institute of Management Studies, Career Development & Research (TIMSCDR)
                    </span> is an autonomous institute renowned for academic excellence and innovation-driven learning.
                  </p>
                  
                  <div className="p-4 bg-cyan-50 dark:bg-cyan-900/10 rounded-lg border border-cyan-200 dark:border-cyan-800">
                    <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                      As an autonomous and linguistic minority institute, TIMSCDR proudly presents 
                      <strong className="text-gray-800 dark:text-gray-200"> Tech-Verse-Vista 2026</strong> — 
                      a dynamic fusion of technical brilliance, cultural expression, and sporting enthusiasm.
                    </p>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="relative">
                <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-sm border border-gray-800">
                  <VerticalImageScroll 
                    images={collegeImages} 
                    speed={80}
                  />
                  
                  {/* Image Label */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-3 py-1.5 bg-black/80 rounded-full">
                      <p className="text-xs sm:text-sm text-white font-medium">
                        Campus Gallery
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== ABOUT EVENT ===== */}
        <div className="relative">
          <div className="relative bg-white/95 dark:bg-gray-900/95 rounded-xl p-6 md:p-10 border border-gray-200 dark:border-gray-800 shadow-sm">
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Images */}
              <div className="relative order-2 md:order-1">
                <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-sm border border-gray-800">
                  <VerticalImageScroll 
                    images={eventImages} 
                    speed={80}
                  />
                  
                  {/* Image Label */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-3 py-1.5 bg-black/80 rounded-full">
                      <p className="text-xs sm:text-sm text-white font-medium">
                        Event Memories
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="relative order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">TechVerse Vista</span>
                </h2>

                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      We are proudly celebrating the{" "}
                      <strong className="text-purple-600 dark:text-purple-400">26th edition</strong> of our Technical Fest,
                      continuing a legacy of excellence spanning over{" "}
                      <strong className="text-purple-600 dark:text-purple-400">20 years</strong>.
                    </p>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong className="text-gray-800 dark:text-gray-200">
                      TechVerse Vista 2026
                    </strong> is TIMSCDR's flagship techno-cultural festival, bringing together innovation, creativity, and collaboration. 
                    Established in <strong className="text-gray-800 dark:text-gray-200">2006</strong>, the TIMSCDR Technical Fest has been a cornerstone of technological innovation.
                  </p>
                  
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 italic text-center">
                      <span className="text-blue-500 dark:text-blue-400 font-semibold">Tech</span> +{" "}
                      <span className="text-purple-500 dark:text-purple-400 font-semibold">Verse</span> +{" "}
                      <span className="text-cyan-500 dark:text-cyan-400 font-semibold">Vista</span> represents 
                      technology, a universe of ideas, and a forward-looking vision that shapes tomorrow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;