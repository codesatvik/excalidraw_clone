import React from "react";
import Link from "next/link";
import { Patrick_Hand, Inter } from "next/font/google";
import { 
  Pencil, 
  Github, 
  Share2, 
  Lock, 
  MousePointer2, 
  Menu, 
  X, 
  Download,
  Eraser,
  Undo
} from "lucide-react";

// 1. Font Optimization (Works perfectly in Server Components)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const patrickHand = Patrick_Hand({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-patrick" 
});

// This is now a Server Component by default (no "use client")
export default function LandingPage() {
  return (
    <div className={`${inter.variable} ${patrickHand.variable} font-sans min-h-screen bg-[#fcfcfc] text-slate-900 selection:bg-orange-100 selection:text-orange-600`}>
      
      {/* Background Dot Pattern */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-orange-100 p-1.5 rounded-lg rotate-3">
                <Pencil className="w-6 h-6 text-orange-600" />
              </div>
              <span className="font-hand text-2xl font-bold text-slate-800">SketchFlow</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 font-medium text-slate-600">
              <Link href={"/signin"} className="hover:text-orange-600 transition">Sign in</Link>
              <Link href={"/signup"} className="hover:text-orange-600 transition">Sign up</Link>
              <Link href="https://github.com/codesatvik" className="hover:text-orange-600 transition">GitHub</Link>
              <button className="group relative">
                <div className="absolute -inset-0.5 bg-slate-800 rounded-lg blur opacity-20 group-hover:opacity-40 transition"></div>
                <div className="relative flex items-center px-6 py-2 bg-white border-2 border-slate-800 rounded-lg font-hand text-lg hover:-translate-y-0.5 transition-transform shadow-[4px_4px_0px_0px_rgba(30,41,59,0.2)]">
                  Start Drawing
                </div>
              </button>
            </div>

            {/* Mobile Menu - CSS ONLY (No JS) */}
            <div className="md:hidden">
              <label className="cursor-pointer p-2" htmlFor="mobile-menu-toggle">
                <Menu className="w-6 h-6 text-slate-600" />
              </label>
            </div>
          </div>
        </div>
        
        {/* CSS-Based Mobile Dropdown Toggle */}
        <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />
        <div className="hidden peer-checked:flex flex-col bg-white border-b border-slate-200 p-4 gap-4 shadow-lg absolute w-full md:hidden">
           <Link href={"/signin"} className="block py-2 text-slate-600 font-medium">Sing in</Link>
            <Link href={"/signup"} className="block py-2 text-slate-600 font-medium">Sign up</Link>
            <button className="w-full text-center py-3 bg-slate-900 text-white rounded-lg font-bold">Start Drawing</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-32 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            
          {/* The "Anti-Neon" Blob */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-orange-100/80 to-rose-100/80 opacity-60 blur-3xl rounded-full -z-10 pointer-events-none" />

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6">
            Virtual whiteboards,<br /> 
            <span className="font-hand text-orange-600 relative inline-block mt-2 px-2">
              hand-drawn style.
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-200 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none"/>
              </svg>
            </span>
          </h1>
            
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed">
            Collaborate, sketch, and brainstorm diagrams that look like you drew them on a napkin. Open source, encrypted, and infinite.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4">
            <button className="group inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold text-white transition-all duration-200 bg-slate-900 rounded-xl hover:bg-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 focus:ring-2 focus:ring-offset-2 focus:ring-slate-900">
              Launch App
              <Pencil className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
            </button>
           <a href="https://github.com/codesatvik/excalidraw_clone">
            <button className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-medium text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-sm hover:shadow-md">
              <Github className="w-5 h-5 mr-2" />
              Star on GitHub
              </button>
            </a>
          </div>

          {/* Browser Mockup */}
          <div className="mt-20 relative max-w-5xl mx-auto px-2 sm:px-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-rose-400 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden">
              
              {/* Mockup Header */}
              <div className="bg-slate-50 border-b border-slate-200 p-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                </div>
                <div className="ml-4 bg-white px-3 py-1 rounded-md text-xs text-slate-400 border border-slate-200 flex-1 max-w-sm text-left font-mono">
                  sketchflow.io/board/untitled-2
                </div>
              </div>

              {/* Mockup Canvas Area */}
              <div className="aspect-[16/9] md:aspect-[21/9] bg-[#fcfcfc] relative overflow-hidden cursor-crosshair group">
                <div className="absolute inset-0 opacity-30" style={{backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "20px 20px"}}></div>
                
                {/* Mockup Toolbar */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2 bg-white p-1.5 rounded-lg border border-slate-200 shadow-lg">
                  <div className="p-2 hover:bg-slate-100 rounded cursor-pointer text-slate-600"><MousePointer2 size={18} /></div>
                  <div className="p-2 bg-orange-100 text-orange-600 rounded cursor-pointer"><Pencil size={18} /></div>
                  <div className="p-2 hover:bg-slate-100 rounded cursor-pointer text-slate-600"><Eraser size={18} /></div>
                  <div className="w-px bg-slate-200 my-1"></div>
                  <div className="p-2 hover:bg-slate-100 rounded cursor-pointer text-slate-600"><Undo size={18} /></div>
                </div>

                {/* Mockup Elements */}
                <div className="absolute top-1/3 left-1/4 p-4 border-2 border-slate-800 rounded-lg transform -rotate-1 font-hand text-xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                   Serverless Fn
                </div>

                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path 
                        d="M300 160 Q 450 120 550 160" 
                        stroke="#1e293b" 
                        strokeWidth="2" 
                        fill="none" 
                        strokeDasharray="8,4"
                        className="drop-shadow-sm"
                    />
                    <path d="M540 150 L 550 160 L 540 170" stroke="#1e293b" strokeWidth="2" fill="none" />
                </svg>

                <div className="absolute top-1/3 right-1/4 p-4 border-2 border-slate-800 rounded-[50%] transform rotate-2 font-hand text-xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] flex items-center justify-center h-20 w-32">
                   Database
                </div>

                {/* CSS-Only Hover Cursor */}
                <div className="absolute top-1/2 left-1/2 transform translate-x-10 translate-y-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    <MousePointer2 className="text-orange-500 fill-orange-500" />
                    <span className="bg-orange-500 text-white text-xs px-1 rounded ml-2">You</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="py-24 bg-white border-t border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-slate-900">Why use SketchFlow?</h2>
                <p className="text-slate-500 mt-4 text-xl">
                    It strikes the balance between <span className="font-hand text-orange-600 font-bold">messy creativity</span> and structured diagrams.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={<Share2 className="text-blue-600" />}
                    bg="bg-blue-50"
                    title="Real-time Collab"
                    description="Share a URL and start drawing with your team instantly. Multiplayer is built-in by default."
                />
                <FeatureCard 
                    icon={<Download className="text-orange-600" />}
                    bg="bg-orange-50"
                    title="Export to Anywhere"
                    description="Export your diagrams to PNG, SVG, or copy them directly to your clipboard as code."
                />
                <FeatureCard 
                    icon={<Lock className="text-emerald-600" />}
                    bg="bg-emerald-50"
                    title="End-to-End Encrypted"
                    description="Your ideas are yours. Data is encrypted locally in your browser before it touches our servers."
                />
            </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-900 rounded-3xl p-10 sm:p-20 relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 relative z-10">
              Ready to unleash your ideas?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto relative z-10">
              No credit card required. Open source and free forever for individuals.
            </p>
            
            <button className="relative z-10 bg-orange-600 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg hover:bg-orange-500 transition hover:-translate-y-1 active:translate-y-0">
              Open Whiteboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-hand text-xl font-bold text-slate-900">SketchFlow</span>
            <span className="text-slate-400 text-sm">© 2024</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-600">
            <Link href="#" className="hover:text-orange-600 transition">Privacy</Link>
            <Link href="#" className="hover:text-orange-600 transition">Terms</Link>
            <Link href="#" className="hover:text-orange-600 transition">Twitter</Link>
            <Link href="https://github.com/codesatvik" className="hover:text-orange-600 transition">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper Component
function FeatureCard({ icon, title, description, bg }: { icon: React.ReactNode, title: string, description: string, bg: string }) {
    return (
        <div className="group p-8 bg-white rounded-2xl border border-slate-100 hover:border-orange-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300">
            <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{description}</p>
        </div>
    )
}