import frameworkData from "./framework.json";

export default function FrameworkList() {
    return (
        // Background dengan pattern polka-dot (titik-titik retro)
        <div 
            className="p-8 min-h-screen bg-[#f8f9fa] font-sans"
            style={{ 
                backgroundImage: 'radial-gradient(#d1d5db 2px, transparent 2px)', 
                backgroundSize: '24px 24px' 
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {frameworkData.map((item) => (
                    <div 
                        key={item.id} 
                        // Border lebih tebal, bayangan lebih tegas
                        className="bg-white border-[3px] border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200 flex flex-col"
                    >
                        {/* Header Kartu: Judul + Garis Bawah + Emoji */}
                        <div className="flex justify-between items-start mb-4 border-b-[3px] border-black pb-4">
                            <h2 className="text-3xl font-black text-black uppercase tracking-tight">
                                {item.name}
                            </h2>
                            <span className="text-3xl ml-2 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">✨</span>
                        </div>
                        
                        <p className="text-gray-800 font-bold text-base mb-6 flex-grow">
                            {item.description}
                        </p>
                        
                        {/* Info Developer (Pill Style) */}
                        <div className="mb-6 flex flex-wrap items-center gap-3">
                            <span className="bg-[#a7f3d0] text-black text-xs font-black px-3 py-1.5 border-2 border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
                                👨‍💻 {item.details.developer}
                            </span>
                            <span className="bg-[#fef08a] text-black text-xs font-black px-3 py-1.5 border-2 border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
                                📅 {item.details.releaseYear}
                            </span>
                        </div>

                        {/* Tags (Interactive) */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {item.tags.map((tag, index) => (
                                <span 
                                    key={index} 
                                    className="bg-white text-black border-2 border-black font-bold text-xs px-3 py-1 rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e9d5ff] transition-colors cursor-default"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Tombol Neo-Brutalist: Efek "Press" saat di-klik */}
                        <a 
                            href={item.details.officialWebsite} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-auto block text-center w-full py-3.5 bg-[#FF90E8] text-black text-lg font-black uppercase tracking-widest border-[3px] border-black rounded-xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ff6be0] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-y-[5px] active:translate-x-[5px] transition-all"
                        >
                            Let's Go 🚀
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}