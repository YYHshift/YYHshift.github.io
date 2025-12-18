// src/app/page.tsx
import { supabase } from '@/lib/supabaseClient';
import ScrollFade from '@/components/ScrollFade';
import { Mail, Github, Linkedin, ExternalLink, MapPin, Briefcase, GraduationCap, Code, Cpu } from 'lucide-react';
import { Skill } from '@/types/database';

export const revalidate = 0;

export default async function Home() {
  const { data: profile } = await supabase.from('profile').select('*').single();
  const { data: experiences } = await supabase.from('experience').select('*').order('start_date', { ascending: false });
  const { data: education } = await supabase.from('education').select('*').order('start_date', { ascending: false });
  const { data: projects } = await supabase.from('projects').select('*');
  const { data: skillsData } = await supabase.from('skills').select('*').order('display_order', { ascending: true });

  if (!profile) return <div className="p-20 text-center text-slate-500">Loading Profile...</div>;

  const getSkillStyle = (category: string) => {
    switch (category) {
      case 'Languages':
        return 'text-base md:text-xl font-bold text-white bg-blue-500/20 border-blue-500/30 px-4 py-2 md:px-5 md:py-2.5';
      case 'Frameworks':
        return 'text-sm md:text-lg font-semibold text-blue-100 bg-cyan-500/15 border-cyan-500/20 px-3 py-1.5 md:px-4 md:py-2';
      case 'Libraries':
        return 'text-xs md:text-base font-medium text-slate-200 bg-purple-500/10 border-purple-500/20 px-2.5 py-1 md:px-3 md:py-1.5';
      default:
        return 'text-[10px] md:text-sm font-normal text-slate-400 bg-slate-500/10 border-slate-500/20 px-2 py-1 md:px-3 md:py-1';
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black font-sans text-slate-300 overflow-hidden">
      
      {/* ================= HEADER ================= */}
      <header className="shrink-0 bg-transparent backdrop-blur-sm py-6 px-5 sm:px-8 z-50 relative">
        <div className="max-w-6xl mx-auto md:flex md:items-start md:justify-between gap-6 md:gap-0">
          
          {/* 左侧：名字部分 */}
          <div className="md:pr-8 text-center md:text-left">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200">
              {profile.full_name}
            </h1>
            <p className="text-base sm:text-lg text-blue-300/80 font-medium mb-4 sm:mb-5">
              {profile.headline}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {profile.github_url && (
                <a href={profile.github_url} target="_blank" className="flex items-center gap-2 bg-white/5 active:bg-white/20 hover:bg-white/10 px-3 py-1.5 rounded-md transition-all border border-white/5 text-xs sm:text-sm text-white">
                  <Github size={16} /> <span>GitHub</span>
                </a>
              )}
              {profile.linkedin_url && (
                <a href={profile.linkedin_url} target="_blank" className="flex items-center gap-2 bg-blue-600/80 active:bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-md transition-all text-xs sm:text-sm text-white shadow-lg shadow-blue-900/20">
                  <Linkedin size={16} /> <span>LinkedIn</span>
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="flex items-center gap-2 bg-white/5 active:bg-white/20 hover:bg-white/10 px-3 py-1.5 rounded-md transition-all border border-white/5 text-xs sm:text-sm text-white">
                  <Mail size={16} /> <span>Email Me</span>
                </a>
              )}
            </div>
          </div>

          {/* 右侧：简介 (只在电脑显示) */}
          <div className="hidden md:block md:w-2/5 pt-2">
             <p className="text-slate-400/80 leading-relaxed italic text-sm text-justify">
               "{profile.summary}"
             </p>
          </div>

        </div>
      </header>

      {/* ================= SCROLLABLE CONTENT ================= */}
      <main className="flex-1 overflow-y-auto scroll-smooth [mask-image:linear-gradient(to_bottom,transparent,black_40px_calc(100%-40px),transparent)] md:[mask-image:linear-gradient(to_bottom,transparent,black_100px_calc(100%-100px),transparent)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24 pb-24">

          {/* ================= 手机版简介 (只在手机显示) ================= */}
          {/* 修改点：把原来的 -mb-6 改成了 mb-12，拉开间距 */}
          <div className="md:hidden mb-12">
            <ScrollFade>
              <div className="bg-white/5 p-5 rounded-xl border border-white/10 italic text-slate-400 text-sm leading-relaxed text-justify">
                "{profile.summary}"
              </div>
            </ScrollFade>
          </div>

          {/* ================= TECHNICAL SKILLS ================= */}
          <section>
            <div className="flex items-center gap-3 mb-6 -mx-5 px-5 sm:mx-0 sm:px-0">
              <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-300"><Cpu size={20} className="sm:w-6 sm:h-6" /></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Technical Skills</h2>
            </div>

            <ScrollFade>
              <div className="bg-white/5 p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-white/10 backdrop-blur-sm shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <div className="relative flex flex-wrap justify-center items-center gap-2 sm:gap-4">
                  {skillsData?.map((skill) => (
                    <span 
                      key={skill.id} 
                      className={`
                        rounded-lg sm:rounded-xl border transition-all duration-300 cursor-default hover:scale-110 
                        ${getSkillStyle(skill.category)}
                      `}
                    >
                      {skill.skill_name}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollFade>
          </section>
          
          {/* ================= WORK EXPERIENCE ================= */}
          <section>
            <div className="flex items-center gap-3 mb-8 -mx-5 px-5 sm:mx-0 sm:px-0">
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-300"><Briefcase size={20} className="sm:w-6 sm:h-6" /></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Work Experience</h2>
            </div>

            <div className="relative border-l-2 border-white/10 ml-2 sm:ml-3 space-y-10 sm:space-y-12">
              {experiences?.map((job: any) => (
                <ScrollFade key={job.id}>
                  <div className="relative pl-6 sm:pl-10 group">
                    <div className="absolute -left-[7px] sm:-left-[9px] top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 sm:border-4 border-[#0f172a] bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] z-10"></div>
                    
                    <div className="bg-white/5 p-5 sm:p-6 rounded-xl border border-white/10 active:bg-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                        <h3 className="font-bold text-lg sm:text-xl text-white">{job.position}</h3>
                        <span className="text-xs font-bold uppercase text-purple-200 bg-purple-500/20 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full whitespace-nowrap mt-2 sm:mt-0 w-fit border border-purple-500/20">{job.start_date} - {job.end_date}</span>
                      </div>
                      <div className="text-slate-400 font-medium mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
                         {job.company} <span className="hidden sm:inline text-slate-600">|</span> <span className="flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
                      </div>
                      <ul className="space-y-3">
                        {job.description && job.description.map((point: string, idx: number) => (
                          <li key={idx} className="text-slate-300 text-sm leading-relaxed flex items-start gap-2 text-justify">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-purple-400 rounded-full shrink-0"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollFade>
              ))}
            </div>
          </section>

          {/* ================= PROJECTS ================= */}
          <section>
            <div className="flex items-center gap-3 mb-8 -mx-5 px-5 sm:mx-0 sm:px-0">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300"><Code size={20} className="sm:w-6 sm:h-6" /></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Featured Projects</h2>
            </div>
            
            <div className="relative border-l-2 border-white/10 ml-2 sm:ml-3 space-y-10 sm:space-y-12">
              {projects?.map((proj: any) => (
                <ScrollFade key={proj.id}>
                  <div className="relative pl-6 sm:pl-10 group">
                     <div className="absolute -left-[7px] sm:-left-[9px] top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 sm:border-4 border-[#0f172a] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10"></div>

                    <div className="bg-white/5 rounded-xl p-5 sm:p-6 border border-white/10 active:bg-white/10 hover:border-blue-500/30 hover:bg-white/10 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-8">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{proj.title}</h3>
                        <ul className="space-y-3">
                          {proj.description && proj.description.map((point: string, idx: number) => (
                            <li key={idx} className="text-slate-300 text-sm leading-relaxed flex items-start gap-2 text-justify">
                              <span className="mt-1.5 w-1.5 h-1.5 bg-slate-500 rounded-full shrink-0"></span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="md:col-span-4 flex flex-col gap-4 border-t border-white/10 pt-4 md:pt-0 md:border-t-0 md:border-l md:pl-6">
                        <div>
                          <h4 className="text-[10px] font-bold uppercase text-slate-500 mb-1 tracking-wider">Timeline</h4>
                          <p className="text-sm font-medium text-slate-200">{proj.date_range}</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold uppercase text-slate-500 mb-2 tracking-wider">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {proj.tech_stack?.split(',').map((tech: string, i: number) => (
                               <span key={i} className="inline-block px-2 py-0.5 bg-blue-500/10 text-blue-200 text-xs font-medium rounded border border-blue-500/20">
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                        {proj.link_url && (
                          <div className="mt-auto pt-2">
                             <a href={proj.link_url} target="_blank" className="text-sm font-bold text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 transition-colors">
                               View Project <ExternalLink size={14} />
                             </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollFade>
              ))}
            </div>
          </section>

          {/* ================= EDUCATION ================= */}
          <section>
            <div className="flex items-center gap-3 mb-8 -mx-5 px-5 sm:mx-0 sm:px-0">
              <div className="p-2 bg-teal-500/20 rounded-lg text-teal-300"><GraduationCap size={20} className="sm:w-6 sm:h-6" /></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Education</h2>
            </div>
            
            <div className="space-y-4">
              {education?.map((edu: any) => (
                <ScrollFade key={edu.id}>
                  <div className="bg-white/5 p-5 rounded-xl border border-white/10 active:bg-white/10 hover:border-teal-500/30 hover:bg-white/10 transition-all duration-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                     <div>
                        <h3 className="text-base sm:text-lg font-bold text-white">{edu.school}</h3>
                        <p className="text-slate-400 text-sm mt-1">{edu.degree}</p>
                     </div>
                     <div className="text-left sm:text-right text-sm shrink-0">
                        <div className="font-bold text-teal-200 bg-teal-500/20 px-3 py-1 rounded-full inline-block mb-1 whitespace-nowrap border border-teal-500/20 text-xs sm:text-sm">{edu.start_date} - {edu.end_date}</div>
                        <div className="text-slate-500 flex items-center justify-start sm:justify-end gap-1 mt-1">
                          <MapPin size={12} /> {edu.location}
                        </div>
                     </div>
                  </div>
                </ScrollFade>
              ))}
            </div>
          </section>

          <footer className="pt-10 text-center text-slate-600 text-xs sm:text-sm">
            <p>© {new Date().getFullYear()} {profile.full_name}.</p>
          </footer>

        </div>
      </main>
    </div>
  );
}