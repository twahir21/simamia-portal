"use client";

import { Github, Linkedin, Twitter } from "lucide-react";

type TeamMember = {
    name: string;
    nickname?: string;
    role: string;
    roleSw?: string;
    bio: string;
    avatarBg: string; // sky shade
    initials: string;
    socials?: { github?: string; twitter?: string; linkedin?: string };
};

const team: TeamMember[] = [
    {
        name: "Twahir Sudy",
        role: "Chief Executive Officer",
        roleSw: "Mkurugenzi Mkuu",
        bio: "Founder & visionary behind Simamia App. Passionate about building tools that empower small businesses across Tanzania.",
        avatarBg: "bg-sky-600",
        initials: "TS",
        socials: { github: "#", twitter: "#", linkedin: "#" },
    },
    {
        name: "Suleiman Masoud",
        role: "Chief Sponsor",
        roleSw: "Mdhamini Mkuu",
        bio: "The backbone of our mission. Providing strategic guidance and unwavering support to help Simamia grow and reach more merchants.",
        avatarBg: "bg-sky-500",
        initials: "SM",
        socials: { github: "#", linkedin: "#" },
    },
    {
        name: "Abubakari Fahmy",
        role: "Market Agent",
        roleSw: "Wakala wa Masoko",
        bio: "Connecting Simamia App with merchants on the ground. Ensuring every shop, kiosk, and duka gets the tools they need to thrive.",
        avatarBg: "bg-sky-400",
        initials: "AF",
        socials: { twitter: "#", linkedin: "#" },
    },
];

export default function TeamSection() {
    return (
        <section className="bg-white py-20 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold tracking-wide mb-4">
                        Timu Yetu
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                        Watu Waliopo Nyuma ya <span className="text-sky-600">Simamia App</span>
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Timu ndogo yenye moyo mkubwa — inayojitolea kuwapa wafanyabiashara
                        wadogo zana za kisasa za kusimamia biashara zao.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {team.map((member, idx) => (
                        <article
                            key={member.name}
                            className="group relative bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Decorative top bar */}
                            <div className="absolute top-0 left-8 right-8 h-1 bg-linear-to-r from-sky-400 to-sky-600 rounded-b-full opacity-80" />

                            {/* Avatar */}
                            <div className="flex justify-center mb-5">
                                <div
                                    className={`${member.avatarBg} w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold ring-4 ring-sky-100 group-hover:ring-sky-200 transition-all`}
                                >
                                    {member.initials}
                                </div>
                            </div>

                            {/* Name + Nickname */}
                            <div className="text-center mb-4">
                                <h3 className="text-xl font-bold text-slate-900">
                                    {member.name}
                                </h3>
                                {member.nickname && (
                                    <span className="inline-block mt-1 px-3 py-0.5 bg-slate-900 text-sky-100 text-xs font-mono rounded-full">
                                        @{member.nickname}
                                    </span>
                                )}
                                <p className="text-sky-600 font-semibold mt-2">
                                    {member.role}
                                </p>
                                {member.roleSw && (
                                    <p className="text-slate-500 text-sm italic">
                                        {member.roleSw}
                                    </p>
                                )}
                            </div>

                            {/* Bio */}
                            <p className="text-slate-600 text-sm text-center leading-relaxed mb-6">
                                {member.bio}
                            </p>

                            {/* Socials */}
                            <div className="flex justify-center gap-3 pt-4 border-t border-slate-100">
                                {member.socials?.github && (
                                    <a
                                        href={member.socials.github}
                                        aria-label="GitHub"
                                        className="p-2 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition"
                                    >
                                        <Github size={18} />
                                    </a>
                                )}
                                {member.socials?.twitter && (
                                    <a
                                        href={member.socials.twitter}
                                        aria-label="Twitter"
                                        className="p-2 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition"
                                    >
                                        <Twitter size={18} />
                                    </a>
                                )}
                                {member.socials?.linkedin && (
                                    <a
                                        href={member.socials.linkedin}
                                        aria-label="LinkedIn"
                                        className="p-2 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition"
                                    >
                                        <Linkedin size={18} />
                                    </a>
                                )}
                            </div>

                            {/* Index badge */}
                            <div className="absolute top-4 right-4 text-slate-300 text-xs font-mono">
                                0{idx + 1}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}