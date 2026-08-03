import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  UserCheck, 
  Bot, 
  FileText, 
  Star, 
  PlusCircle, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  RefreshCw,
  Zap,
  Lock,
  ChevronRight
} from 'lucide-react';
import { categories, sampleItems } from '../data/items';
import { CategoryCard } from '../components/CategoryCard';
import { ItemCard } from '../components/ItemCard';

export const LandingPage = ({ onOpenAI }) => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MapPin,
      color: 'from-blue-500 to-indigo-600',
      title: 'Nearby Search',
      description: 'Discover cameras, laptops, tools, and gear available within walking distance or a short drive in your neighborhood.'
    },
    {
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600',
      title: 'Secure Payments',
      description: 'Funds and refundable security deposits are protected in escrow until your rental is safely returned.'
    },
    {
      icon: UserCheck,
      color: 'from-purple-500 to-indigo-600',
      title: 'Verified Users',
      description: 'Government ID verification, phone checks, and community ratings ensure 100% trust for lenders and renters.'
    },
    {
      icon: Bot,
      color: 'from-amber-500 to-orange-600',
      title: 'AI Assistant',
      description: 'Need specific gear for a shoot or trip? BorrowBot matches you with the ideal equipment setup instantly.'
    },
    {
      icon: FileText,
      color: 'from-cyan-500 to-blue-600',
      title: 'Digital Agreement',
      description: 'Automated legal rental contracts with photo inspection timestamps protect both parties on every transaction.'
    },
    {
      icon: Star,
      color: 'from-rose-500 to-pink-600',
      title: 'Ratings & Reviews',
      description: 'Transparent peer feedback keeps the community accountable, high quality, and friendly.'
    }
  ];

  const timelineSteps = [
    { number: '01', title: 'Search', desc: 'Find high-end items listed by trusted neighbors around you.' },
    { number: '02', title: 'Book', desc: 'Select dates and authorize a security deposit via instant checkout.' },
    { number: '03', title: 'Pickup', desc: 'Meet up locally or choose doorstep delivery for ultimate convenience.' },
    { number: '04', title: 'Return', desc: 'Bring back the item when your rental period completes.' },
    { number: '05', title: 'Get Deposit Back', desc: 'Deposit is instantly released back to your bank account.' }
  ];

  const testimonials = [
    {
      quote: "I saved over ₹25,000 renting a Canon EOS R5 for my client's weekend wedding shoot instead of buying it outright. The pickup was 3 blocks from my house!",
      author: "David Chen",
      role: "Freelance Videographer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      rating: 5
    },
    {
      quote: "I list my camping tent, pressure washer, and drone on BorrowBridge. It generates ₹35,000/month in passive income from gear sitting in my garage!",
      author: "Elena Rostova",
      role: "Verified Gear Lender",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80",
      rating: 5
    },
    {
      quote: "Needed a high-end projector for a backyard movie night. Found an Anker 4K projector within 10 minutes. The AI recommendation was spot on!",
      author: "Marcus Vance",
      role: "Product Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
      rating: 5
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/20 via-teal-500/20 to-indigo-500/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-extrabold tracking-wide uppercase shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-500 fill-current animate-pulse" />
                Hyperlocal Peer-to-Peer Rental Marketplace
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Rent Anything <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-600 dark:from-blue-400 dark:via-teal-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Nearby.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Borrow expensive cameras, laptops, tools, camping gear, instruments, and electronics from trusted people around you instead of buying them.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/explore"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Explore Items Nearby
                </Link>

                <Link
                  to="/list-item"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card text-slate-800 dark:text-slate-200 font-extrabold text-base border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-5 h-5 text-emerald-500" />
                  List Your Item
                </Link>
              </div>



            </div>

            {/* Right Hero Showcase Cards */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 space-y-4"
              >
                {/* Featured Floating Rental Card */}
                <div className="glass-card p-5 rounded-3xl shadow-2xl border border-white/40 dark:border-slate-700 space-y-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="relative aspect-video rounded-2xl overflow-hidden">
                    <img
                      src={sampleItems[0].images[0]}
                      alt="Hero Canon DSLR"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 text-white font-bold text-xs backdrop-blur-md">
                      Featured Today
                    </span>
                    <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-blue-600 text-white font-extrabold text-sm backdrop-blur-md shadow">
                      ₹450 / day
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        Canon EOS R5 Mirrorless Kit
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-500" />
                        0.8 miles away • Downtown SF
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500 font-bold text-sm bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-xl">
                      <Star className="w-4 h-4 fill-current" />
                      4.95
                    </div>
                  </div>
                </div>

                {/* Floating AI Recommendation Mini-Card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={onOpenAI}
                  className="glass-card p-4 rounded-2xl shadow-xl border border-amber-500/30 flex items-center gap-3 cursor-pointer hover:bg-amber-50/50 dark:hover:bg-slate-800 transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
                    <Bot className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      Ask BorrowBot AI
                      <Sparkles className="w-3 h-3 text-amber-500 fill-current" />
                    </p>
                    <p className="text-[11px] text-slate-500">"Find a projector for a backyard movie night"</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </motion.div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Popular Rental Categories
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base max-w-xl mx-auto">
            From high-end filmmaking gear to power tools and camping kits, borrow what you need when you need it.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.filter(c => c.id !== 'all').map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* FEATURED ITEMS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Trending Near You
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Top-rated items available for instant pickup within 5 miles
            </p>
          </div>

          <Link
            to="/explore"
            className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1.5"
          >
            View All 20 Items
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleItems.slice(0, 4).map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-slate-100/60 dark:bg-slate-900/60 py-20 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Built for Safety, Trust & Simplicity
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              BorrowBridge eliminates the hassle and high cost of buying items you only use occasionally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 dark:border-slate-800 shadow-sm"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {feat.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS TIMELINE */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How BorrowBridge Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Rent or lend almost anything in 5 simple, protected steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {timelineSteps.map((step, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-3xl space-y-3 relative group hover:border-blue-500/50 transition duration-300"
            >
              <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                {step.number}
              </span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {step.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Loved by Lenders & Renters
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            See how BorrowBridge is empowering neighbors to save money and monetize unused items.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="glass-card p-7 rounded-3xl space-y-6 flex flex-col justify-between border border-slate-200/80 dark:border-slate-800 shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic">
                  "{test.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img
                  src={test.avatar}
                  alt={test.author}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/30"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {test.author}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 p-10 sm:p-16 text-white text-center space-y-6 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" />
          
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to Own Less and Access More?
          </h2>

          <p className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto">
            Join thousands of neighbors sharing equipment, saving money, and building a sustainable sharing economy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-blue-600 font-extrabold text-base hover:bg-blue-50 transition shadow-lg hover:scale-105 active:scale-95"
            >
              Get Started Free
            </Link>
            <Link
              to="/explore"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-base border border-white/30 backdrop-blur-md transition hover:scale-105 active:scale-95"
            >
              Browse Nearby Items
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
