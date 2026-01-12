import React from 'react';

export default function EmbeddedSite() {
    return (
        <div className="bg-black text-white min-h-[1400px] font-sans overflow-hidden">
            {/* Hero Section with Moon Background */}
            <div className="relative min-h-[600px]">
                {/* Starfield background */}
                <div className="absolute inset-0 bg-black">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(1px 1px at 20px 30px, white, transparent),
                                          radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
                                          radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.6), transparent),
                                          radial-gradient(1px 1px at 90px 40px, white, transparent),
                                          radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
                                          radial-gradient(1px 1px at 160px 120px, white, transparent),
                                          radial-gradient(1.5px 1.5px at 200px 50px, white, transparent),
                                          radial-gradient(1px 1px at 220px 130px, rgba(255,255,255,0.6), transparent),
                                          radial-gradient(1px 1px at 280px 90px, white, transparent),
                                          radial-gradient(1px 1px at 320px 160px, rgba(255,255,255,0.8), transparent),
                                          radial-gradient(1px 1px at 350px 30px, white, transparent),
                                          radial-gradient(1.5px 1.5px at 400px 100px, white, transparent),
                                          radial-gradient(1px 1px at 450px 60px, rgba(255,255,255,0.7), transparent),
                                          radial-gradient(1px 1px at 500px 140px, white, transparent)`,
                        backgroundSize: '550px 200px'
                    }}></div>
                </div>

                {/* Moon glow */}
                <div className="absolute top-20 right-10 w-[200px] h-[200px] rounded-full bg-gradient-to-br from-gray-200 to-gray-400 opacity-90 shadow-[0_0_80px_20px_rgba(255,255,255,0.3)]"></div>
                <div className="absolute top-24 right-14 w-[180px] h-[180px] rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-400"></div>
                    <div className="absolute top-8 left-6 w-8 h-8 rounded-full bg-gray-400/50"></div>
                    <div className="absolute top-20 left-20 w-12 h-12 rounded-full bg-gray-400/40"></div>
                    <div className="absolute top-12 right-8 w-6 h-6 rounded-full bg-gray-400/30"></div>
                    <div className="absolute bottom-10 left-10 w-10 h-10 rounded-full bg-gray-400/35"></div>
                </div>

                {/* Navigation */}
                <nav className="relative z-10 flex items-center justify-between px-8 py-6">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold tracking-[0.3em]">SPACEX</span>
                    </div>
                    <div className="flex gap-8 text-xs tracking-[0.2em] text-gray-400">
                        <span className="hover:text-white cursor-pointer transition">FALCON 9</span>
                        <span className="hover:text-white cursor-pointer transition">STARSHIP</span>
                        <span className="hover:text-white cursor-pointer transition">DRAGON</span>
                        <span className="text-white cursor-pointer">LUNAR</span>
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="relative z-10 px-8 pt-16 pb-32">
                    <div className="max-w-3xl">
                        <p className="text-xs tracking-[0.3em] text-gray-400 mb-4">INTRODUCING</p>
                        <h1 className="text-6xl md:text-8xl font-light mb-6 leading-[0.9]">
                            LUNAR<br />
                            <span className="font-bold">VOYAGER</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-xl mb-8 leading-relaxed">
                            The first civilian mission around the Moon. Experience the journey of a lifetime aboard Starship.
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-white text-black px-8 py-4 text-sm font-bold tracking-wider hover:bg-gray-200 transition">
                                RESERVE YOUR SEAT
                            </button>
                            <button className="border border-white/50 px-8 py-4 text-sm tracking-wider hover:bg-white/10 transition">
                                WATCH FILM
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
                    <span className="text-xs tracking-[0.2em]">SCROLL</span>
                    <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent"></div>
                </div>
            </div>

            {/* Mission Stats */}
            <div className="bg-zinc-950 border-y border-white/10">
                <div className="grid grid-cols-4 divide-x divide-white/10">
                    <div className="py-12 px-6 text-center">
                        <div className="text-4xl font-light mb-2">6</div>
                        <div className="text-xs tracking-[0.2em] text-gray-500">DAY MISSION</div>
                    </div>
                    <div className="py-12 px-6 text-center">
                        <div className="text-4xl font-light mb-2">384K</div>
                        <div className="text-xs tracking-[0.2em] text-gray-500">KM FROM EARTH</div>
                    </div>
                    <div className="py-12 px-6 text-center">
                        <div className="text-4xl font-light mb-2">12</div>
                        <div className="text-xs tracking-[0.2em] text-gray-500">PASSENGERS</div>
                    </div>
                    <div className="py-12 px-6 text-center">
                        <div className="text-4xl font-light mb-2">2026</div>
                        <div className="text-xs tracking-[0.2em] text-gray-500">LAUNCH YEAR</div>
                    </div>
                </div>
            </div>

            {/* Mission Overview */}
            <div className="py-24 px-8">
                <div className="max-w-4xl mx-auto">
                    <p className="text-xs tracking-[0.3em] text-gray-500 mb-4">THE MISSION</p>
                    <h2 className="text-4xl font-light mb-8">Around the Moon and back</h2>
                    <div className="grid grid-cols-2 gap-12">
                        <div>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Lunar Voyager will carry 12 civilians on a free-return trajectory around the Moon, passing within 200 kilometers of the lunar surface before returning safely to Earth.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Passengers will experience up to 6 days in space, with unparalleled views of both the Moon and Earth from distances never before seen by private citizens.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="border-l-2 border-white/20 pl-6">
                                <div className="text-2xl font-light mb-1">Day 1-2</div>
                                <div className="text-gray-500 text-sm">Earth departure & transit</div>
                            </div>
                            <div className="border-l-2 border-white/20 pl-6">
                                <div className="text-2xl font-light mb-1">Day 3-4</div>
                                <div className="text-gray-500 text-sm">Lunar flyby & far side observation</div>
                            </div>
                            <div className="border-l-2 border-white/20 pl-6">
                                <div className="text-2xl font-light mb-1">Day 5-6</div>
                                <div className="text-gray-500 text-sm">Return transit & Earth reentry</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Starship Section */}
            <div className="bg-zinc-950 py-24 px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-xs tracking-[0.3em] text-gray-500 mb-4">THE VEHICLE</p>
                    <h2 className="text-5xl font-light mb-6">Starship</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                        The most powerful rocket ever built. Fully reusable. Designed for both Earth orbit and deep space missions.
                    </p>

                    {/* Rocket Illustration */}
                    <div className="relative h-64 mb-12">
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-56 bg-gradient-to-t from-zinc-700 via-zinc-400 to-white rounded-t-full"></div>
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-20 h-20 bg-gradient-to-t from-zinc-800 to-zinc-600"></div>
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-24 h-8">
                            <div className="absolute left-0 w-6 h-8 bg-zinc-700 -skew-x-12"></div>
                            <div className="absolute right-0 w-6 h-8 bg-zinc-700 skew-x-12"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 text-left">
                        <div>
                            <div className="text-3xl font-light mb-2">120m</div>
                            <div className="text-xs tracking-[0.15em] text-gray-500">TOTAL HEIGHT</div>
                        </div>
                        <div>
                            <div className="text-3xl font-light mb-2">100+ t</div>
                            <div className="text-xs tracking-[0.15em] text-gray-500">PAYLOAD TO LEO</div>
                        </div>
                        <div>
                            <div className="text-3xl font-light mb-2">1000m³</div>
                            <div className="text-xs tracking-[0.15em] text-gray-500">CABIN VOLUME</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing */}
            <div className="py-24 px-8 border-t border-white/10">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-xs tracking-[0.3em] text-gray-500 mb-4">RESERVATIONS</p>
                    <h2 className="text-4xl font-light mb-4">Join the mission</h2>
                    <p className="text-gray-500 mb-12">Limited to 12 seats per mission</p>

                    <div className="inline-block bg-zinc-900 border border-white/10 p-12 text-left">
                        <div className="text-xs tracking-[0.2em] text-gray-500 mb-2">STARTING FROM</div>
                        <div className="text-5xl font-light mb-4">$55M <span className="text-lg text-gray-500">USD</span></div>
                        <ul className="text-gray-400 text-sm space-y-3 mb-8">
                            <li className="flex items-center gap-3">
                                <span className="text-green-400">✓</span> Full mission training program
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-green-400">✓</span> Custom flight suit & equipment
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-green-400">✓</span> Premium cabin accommodations
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-green-400">✓</span> Lifetime SpaceX membership
                            </li>
                        </ul>
                        <button className="w-full bg-white text-black py-4 font-bold tracking-wider hover:bg-gray-200 transition">
                            APPLY NOW
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 px-8">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div className="text-xl font-bold tracking-[0.3em]">SPACEX</div>
                    <div className="text-xs text-gray-500 tracking-wider">© 2026 SPACE EXPLORATION TECHNOLOGIES CORP.</div>
                </div>
            </footer>
        </div>
    );
}
