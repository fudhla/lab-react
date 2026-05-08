import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTag, setSelectedTag] = useState("");
	const [dataForm, setDataForm] = useState({
			searchTerm: "",
			selectedTag: "",
			/*Tambah state lain beserta default value*/
			});
		
		/*Inisialisasi Handle perubahan nilai input form*/
		const handleChange = (evt) => {
			const { name, value } = evt.target;
			setDataForm({
				...dataForm,
				[name]: value,
			});
		};

  /** Deklarasi Logic Search & Filter **/
  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name
             .toLowerCase()
             .includes(_searchTerm) ||
      framework.description
             .toLowerCase()
             .includes(_searchTerm);

    const matchesTag = dataForm.selectedTag 
    ? framework.tags.includes(dataForm.selectedTag) 
    : true;

    return matchesSearch && matchesTag;
  });

  /** Deklarasi pengambilan unique tags di frameworkData **/
  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

    return (
        // Latar belakang diubah menjadi sangat terang/putih (slate-50)
        <div className="p-8 min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center">
            
            {/* Efek cahaya ambient di background versi terang (pastel) */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300/40 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-300/30 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-7xl mx-auto relative z-10">

                <input
                  type="text"
                  name="searchTerm"
                  placeholder="Search framework..."
                  className="w-full p-3 bg-white/[0.05] border border-white/10 rounded-xl text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md"
                  onChange={handleChange}
                />

                <select
                  name="selectedTag"
                  className="w-full p-3 bg-slate-100 border border-white/10 rounded-xl text-slate-900 cursor-pointer focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md"
                  onChange={handleChange}
                >
                 <option value="">All Tags</option>
                  {allTags.map((tag, index) => (
                    <option key={index} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredFrameworks.map((item) => (
                        <div 
                            key={item.id} 
                            // Card Light Mode: Latar putih, border tipis, hover shadow kebiruan
                            className="group relative bg-white p-7 rounded-[2rem] border border-slate-100 hover:border-blue-100 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] flex flex-col"
                        >
                            {/* Efek kilauan halus dari biru ke transparan */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none"></div>

                            {/* Judul Gradient yang cocok untuk background putih */}
                            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 tracking-tight relative z-10">
                                {item.name}
                            </h2>
                            
                            {/* Teks deskripsi gelap agar mudah dibaca */}
                            <p className="text-slate-600 mt-3 mb-6 flex-grow leading-relaxed relative z-10 font-normal text-sm">
                                {item.description}
                            </p>
                            
                            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium relative z-10">
                                <span className="bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                                    👨‍💻 {item.details.developer}
                                </span>
                                <span className="bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                                    📅 {item.details.releaseYear}
                                </span>
                            </div>

                            {/* Tags versi Light Mode */}
                            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                                {item.tags.map((tag, index) => (
                                    <span 
                                        key={index} 
                                        className="bg-blue-50 text-blue-600 border border-blue-100 font-medium text-xs px-3 py-1.5 rounded-full"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Tombol Gradient Elegan */}
                            <a 
                                href={item.details.officialWebsite} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-auto flex items-center justify-center w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-500 hover:to-violet-500 transition-all duration-300 relative z-10"
                            >
                                Visit Website 
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}