import { Authenticated, Unauthenticated, useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { useState, useEffect } from "react";
import { MapPin, Quote, Calendar, Globe, Menu, X } from "lucide-react";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50">
      <Toaster />
      <Navigation 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      <main className="pt-16">
        <Content />
      </main>
    </div>
  );
}

function Navigation({ isMobileMenuOpen, setIsMobileMenuOpen }: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-red-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-red-800 font-bold text-sm">HCM</span>
            </div>
            <h1 className="text-xl font-bold">Hành Trình Bác Hồ</h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <button onClick={() => scrollToSection('hero')} className="hover:text-yellow-300 transition-colors">
              Trang chủ
            </button>
            <button onClick={() => scrollToSection('timeline')} className="hover:text-yellow-300 transition-colors">
              Hành trình
            </button>
            <button onClick={() => scrollToSection('map')} className="hover:text-yellow-300 transition-colors">
              Bản đồ
            </button>
            <button onClick={() => scrollToSection('quotes')} className="hover:text-yellow-300 transition-colors">
              Danh ngôn
            </button>
            <button onClick={() => scrollToSection('gallery')} className="hover:text-yellow-300 transition-colors">
              Thư viện
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:block">
            <SignOutButton />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-red-900 border-t border-red-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('hero')} className="block w-full text-left px-3 py-2 hover:bg-red-700 rounded">
                Trang chủ
              </button>
              <button onClick={() => scrollToSection('timeline')} className="block w-full text-left px-3 py-2 hover:bg-red-700 rounded">
                Hành trình
              </button>
              <button onClick={() => scrollToSection('map')} className="block w-full text-left px-3 py-2 hover:bg-red-700 rounded">
                Bản đồ
              </button>
              <button onClick={() => scrollToSection('quotes')} className="block w-full text-left px-3 py-2 hover:bg-red-700 rounded">
                Danh ngôn
              </button>
              <button onClick={() => scrollToSection('gallery')} className="block w-full text-left px-3 py-2 hover:bg-red-700 rounded">
                Thư viện
              </button>
              <div className="px-3 py-2">
                <SignOutButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const seedData = useMutation(api.journeyData.seedJourneyData);

  useEffect(() => {
    if (loggedInUser) {
      seedData();
    }
  }, [loggedInUser, seedData]);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800"></div>
      </div>
    );
  }

  return (
    <>
      <Authenticated>
        <HeroSection />
        <TimelineSection />
        <InteractiveMap />
        <QuotesSection />
        <GallerySection />
        <Footer />
      </Authenticated>
      <Unauthenticated>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-red-800 mb-4">
                Hành Trình Tìm Đường Cứu Nước
              </h1>
              <p className="text-gray-600">
                Khám phá hành trình vĩ đại của Chủ tịch Hồ Chí Minh
              </p>
            </div>
            <SignInForm />
          </div>
        </div>
      </Unauthenticated>
    </>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-800 to-red-600 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Hành Trình Tìm Đường Cứu Nước
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Khám phá chặng đường vĩ đại của Chủ tịch Hồ Chí Minh từ 1911-1920
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-yellow-500 hover:bg-yellow-600 text-red-800 font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Khám phá hành trình
          </button>
          <button 
            onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-white hover:bg-white hover:text-red-800 font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Xem bản đồ
          </button>
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const journeyEvents = useQuery(api.journeyData.getJourneyEvents);

  if (!journeyEvents) {
    return (
      <div className="py-16 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-800"></div>
      </div>
    );
  }

  return (
    <section id="timeline" className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4">
          Hành Trình Lịch Sử
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Theo dấu chân Bác Hồ qua các quốc gia từ 1911 đến 1920
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-red-200 h-full"></div>

        {journeyEvents.map((event, index) => (
          <div
            key={event._id}
            className="relative mb-12"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-red-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <Calendar size={16} className="text-white" />
            </div>
            {/* Content */}
            <div
              className={`ml-12 md:ml-0 ${
                index % 2 === 0
                  ? 'md:mr-8 md:pr-8'
                  : 'md:ml-auto md:mr-0 md:pl-8'
              } max-w-md`}
            >
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {event.year}
                  </span>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <MapPin size={14} />
                    {event.location}, {event.country}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                {event.action && (
                  <p className="text-sm mb-1">
                    <strong>Hành động:</strong> {event.action}
                  </p>
                )}
                {event.affect && (
                  <p className="text-sm mb-1">
                    <strong>Cảm xúc:</strong> {event.affect}
                  </p>
                )}
                {event.cognition && (
                  <p className="text-sm mb-1">
                    <strong>Nhận thức:</strong> {event.cognition}
                  </p>
                )}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded mb-3 mt-2">
                  <p className="text-sm text-gray-700">
                    <strong>Ý nghĩa:</strong> {event.significance}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InteractiveMap() {
  const journeyEvents = useQuery(api.journeyData.getJourneyEvents);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  if (!journeyEvents) {
    return (
      <div className="py-16 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-800"></div>
      </div>
    );
  }

  return (
    <section id="map" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4">
            Bản Đồ Hành Trình
          </h2>
          <p className="text-gray-600 text-lg">
            Khám phá các địa điểm Bác Hồ đã đi qua trên bản đồ thế giới
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Map placeholder */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              <Globe size={64} className="text-blue-500 opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-600 font-semibold">Bản đồ tương tác</p>
                  <p className="text-sm text-gray-500">Hiển thị hành trình của Bác Hồ</p>
                </div>
              </div>
              
              {/* Sample location markers */}
              {journeyEvents.slice(0, 4).map((event, index) => (
                <div
                  key={event._id}
                  className={`absolute w-4 h-4 bg-red-600 rounded-full cursor-pointer hover:scale-125 transition-transform ${
                    index === 0 ? 'top-1/2 left-1/4' :
                    index === 1 ? 'top-1/3 right-1/4' :
                    index === 2 ? 'top-1/4 right-1/3' :
                    'top-2/3 left-1/3'
                  }`}
                  onClick={() => setSelectedEvent(event)}
                  title={`${event.location}, ${event.year}`}
                />
              ))}
            </div>
          </div>

          {/* Location details */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Các địa điểm quan trọng</h3>
            {journeyEvents.map((event) => (
              <div
                key={event._id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedEvent?._id === event._id
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 bg-white hover:border-red-300'
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{event.location}</h4>
                  <span className="text-sm text-red-600 font-semibold">{event.year}</span>
                </div>
                <p className="text-sm text-gray-600">{event.country}</p>
                {selectedEvent?._id === event._id && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-700">{event.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuotesSection() {
  const quotes = useQuery(api.journeyData.getQuotes);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    if (quotes && quotes.length > 0) {
      const interval = setInterval(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [quotes]);

  if (!quotes || quotes.length === 0) {
    return (
      <div className="py-16 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-800"></div>
      </div>
    );
  }

  return (
    <section id="quotes" className="py-16 bg-red-800 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Danh Ngôn Bác Hồ
        </h2>

        <div className="relative min-h-[200px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <Quote size={120} className="text-red-600 opacity-20" />
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <blockquote className="text-2xl md:text-3xl font-light italic mb-6 leading-relaxed">
              "{quotes[currentQuote].text}"
            </blockquote>
            <div className="text-yellow-300">
              <p className="font-semibold">{quotes[currentQuote].context}</p>
              {quotes[currentQuote].year && (
                <p className="text-sm opacity-80">Năm {quotes[currentQuote].year}</p>
              )}
            </div>
          </div>
        </div>

        {/* Quote navigation */}
        <div className="flex justify-center space-x-2 mt-8">
          {quotes.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentQuote ? 'bg-yellow-400' : 'bg-red-600'
              }`}
              onClick={() => setCurrentQuote(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const galleryImages = useQuery(api.journeyData.getGalleryImages);
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!galleryImages) {
    return (
      <div className="py-16 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-800"></div>
      </div>
    );
  }

  const categories = ['all', ...new Set(galleryImages.map(img => img.category))];
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      'all': 'Tất cả',
      'early-life': 'Thời niên thiếu',
      'journey': 'Hành trình',
      'places': 'Địa điểm',
      'historical-events': 'Sự kiện lịch sử'
    };
    return names[category] || category;
  };

  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4">
            Thư Viện Hình Ảnh
          </h2>
          <p className="text-gray-600 text-lg">
            Những hình ảnh lịch sử quý giá về Bác Hồ và hành trình của Người
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-red-100'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {getCategoryName(category)}
            </button>
          ))}
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div key={image._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">{image.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{image.description}</p>
                {image.year && (
                  <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                    {image.year}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Hành Trình Bác Hồ</h3>
            <p className="text-gray-300">
              Trang web giáo dục về hành trình tìm đường cứu nước của Chủ tịch Hồ Chí Minh từ 1911-1920.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Thông tin</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Hành trình lịch sử</li>
              <li>Bản đồ tương tác</li>
              <li>Danh ngôn Bác Hồ</li>
              <li>Thư viện hình ảnh</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Liên hệ</h4>
            <p className="text-gray-300">
              Trang web được xây dựng nhằm mục đích giáo dục và tôn vinh di sản của Chủ tịch Hồ Chí Minh.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Hành Trình Bác Hồ. Được xây dựng với lòng kính trọng.</p>
        </div>
      </div>
    </footer>
  );
}