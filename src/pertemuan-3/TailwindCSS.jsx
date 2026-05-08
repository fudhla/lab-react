export default function TailwindCSS() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <FlexboxGrid />
      
      {/* Hero Section / Welcome Area */}
      <div className="max-w-4xl mx-auto px-4 pt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-950 pl-4">
            Belajar Tailwind CSS 4
          </h1>
          <button className="bg-blue-950 text-white px-6 py-2.5 rounded-full shadow-md 
                           hover:bg-blue-900 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95">
            Click Me
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Spacing />
          <BackgroundColors />
        </div>

        <div className="mt-10">
          <Typography />
        </div>

        <div className="mt-8 flex gap-4">
          <BorderRadius />
        </div>

        <div className="mt-12">
          <ShadowEffects />
        </div>
      </div>
    </div>
  );
}

function FlexboxGrid() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center bg-blue-950 px-6 py-4 text-white shadow-lg">
      <h1 className="text-xl font-extrabold tracking-tight text-orange-300 italic">
        MyWebsite
      </h1>
      <ul className="hidden md:flex space-x-8 font-medium">
        <li><a href="#" className="hover:text-orange-300 transition-colors">Home</a></li>
        <li><a href="#" className="hover:text-orange-300 transition-colors">About</a></li>
        <li><a href="#" className="hover:text-orange-300 transition-colors">Contact</a></li>
      </ul>
      <button className="text-sm font-bold text-orange-300 border border-orange-300 px-4 py-1.5 rounded hover:bg-orange-300 hover:text-blue-950 transition-all">
        LOGOUT
      </button>
    </nav>
  );
}

function Spacing() {
  return (
    <div className="bg-blue-950 shadow-xl p-8 rounded-2xl border-t-4 border-orange-300 h-full">
      <h2 className="text-white text-xl font-semibold mb-3">Card Title</h2>
      <p className="text-orange-200 leading-relaxed">
        Ini adalah contoh penggunaan padding dan margin di Tailwind dengan kontras yang lebih tajam dan modern.
      </p>
    </div>
  );
}

function BackgroundColors() {
  return (
    <div className="bg-orange-300 text-blue-950 p-8 rounded-2xl shadow-lg flex flex-col justify-center">
      <h3 className="text-2xl font-black uppercase tracking-wider">Tailwind Colors</h3>
      <p className="mt-3 font-medium opacity-90 text-lg">
        Belajar Tailwind itu seru dan sangat fleksibel untuk desain modern!
      </p>
    </div>
  );
}

function Typography() {
  return (
    <div className="text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-black text-blue-950 leading-tight">
        Tailwind <span className="text-orange-400 font-light underline decoration-blue-950">Typography</span>
      </h1>
      <p className="text-gray-500 text-lg mt-4 max-w-lg">
        Belajar Tailwind sangat menyenangkan dan cepat dengan sistem utility-first.
      </p>
    </div>
  );
}

function BorderRadius() {
  return (
    <div className="flex flex-wrap gap-4">
      <button className="border-2 border-orange-300 text-orange-300 bg-blue-950 px-8 py-3 rounded-l-full font-bold hover:bg-orange-300 hover:text-blue-950 transition-all duration-300">
        Kiri Bulat
      </button>
      <button className="border-2 border-orange-300 text-orange-300 bg-blue-950 px-8 py-3 rounded-r-full font-bold hover:bg-orange-300 hover:text-blue-950 transition-all duration-300">
        Kanan Bulat
      </button>
    </div>
  );
}

function ShadowEffects() {
  return (
    <div className="group bg-white border border-gray-100 shadow-sm p-10 rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden relative hover:rotate-2">
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-300/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
      <h3 className="text-2xl font-bold text-blue-950 group-hover:text-orange-400 transition-colors">Hover me!</h3>
      <p className="text-gray-500 mt-3 text-lg">
        Sentuh kartu ini untuk melihat efek transisi rotasi dan bayangan yang halus.
      </p>
      <div className="mt-4 inline-block text-blue-950 font-bold group-hover:translate-x-2 transition-transform italic">
        Read More &rarr;
      </div>
    </div>
  );
}