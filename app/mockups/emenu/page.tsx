"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Tag, ChevronDown } from 'lucide-react'
import Link from "next/link"
import FloatingWhatsAppIcon from "@/src/components/shared/floating-whatsapp"
import Footer from "@/src/components/shared/footer"
import Navbar from "@/src/components/shared/navbar"


// Mock data for e-menu templates
const menuTemplates = [
  {
    id: 1,
    name: "الكلاسيكي الأنيق",
    description: "تصميم كلاسيكي أنيق مع ألوان هادئة وتنظيم مثالي للأطباق والفئات",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    designType: "بسيط",
    category: "مطاعم",
    demoLink: "https://example.com/demo/classic"
  },
  {
    id: 2,
    name: "العصري المميز",
    description: "تصميم عصري بألوان زاهية وتأثيرات حركية تجذب انتباه العملاء",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    designType: "متقدم",
    category: "كافيهات",
    demoLink: "https://example.com/demo/modern"
  },
  {
    id: 3,
    name: "الشرقي التقليدي",
    description: "تصميم مستوحى من الطابع الشرقي التقليدي مع زخارف وألوان دافئة",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    designType: "بسيط",
    category: "مطاعم شرقية",
    demoLink: "https://example.com/demo/oriental"
  },
  {
    id: 4,
    name: "المينيمال الأنيق",
    description: "تصميم بسيط وأنيق يركز على الصور عالية الجودة للأطباق",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    designType: "بسيط",
    category: "مطاعم فاخرة",
    demoLink: "https://example.com/demo/minimal"
  },
  {
    id: 5,
    name: "الإيطالي الحيوي",
    description: "تصميم مستوحى من المطبخ الإيطالي مع ألوان العلم الإيطالي وتنظيم مميز للأطباق",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    designType: "متقدم",
    category: "مطاعم إيطالية",
    demoLink: "https://example.com/demo/italian"
  },
  {
    id: 6,
    name: "الآسيوي المعاصر",
    description: "تصميم يعكس روح المطبخ الآسيوي مع رموز وألوان مستوحاة من الثقافة الآسيوية",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    designType: "متقدم",
    category: "مطاعم آسيوية",
    demoLink: "https://example.com/demo/asian"
  },
  {
    id: 7,
    name: "البرغر الأمريكي",
    description: "تصميم يناسب مطاعم البرغر والوجبات السريعة مع ألوان جذابة وتنظيم سهل",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    designType: "بسيط",
    category: "وجبات سريعة",
    demoLink: "https://example.com/demo/burger"
  },
  {
    id: 8,
    name: "المشروبات والعصائر",
    description: "تصميم مخصص لمحلات العصائر والمشروبات مع ألوان منعشة وتصنيف مميز",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    designType: "متقدم",
    category: "عصائر ومشروبات",
    demoLink: "https://example.com/demo/drinks"
  },
  {
    id: 9,
    name: "الحلويات الشهية",
    description: "تصميم لمحلات الحلويات والمخبوزات مع ألوان جذابة وعرض مميز للمنتجات",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    designType: "متقدم",
    category: "حلويات",
    demoLink: "https://example.com/demo/desserts"
  },
  {
    id: 10,
    name: "المقاهي المتخصصة",
    description: "تصميم يناسب المقاهي المتخصصة بالقهوة مع ألوان دافئة وتنظيم أنيق",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    designType: "بسيط",
    category: "كافيهات",
    demoLink: "https://example.com/demo/coffee"
  },
  {
    id: 11,
    name: "البحري المميز",
    description: "تصميم لمطاعم المأكولات البحرية مع ألوان زرقاء وعناصر بحرية",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    designType: "متقدم",
    category: "مأكولات بحرية",
    demoLink: "https://example.com/demo/seafood"
  },
  {
    id: 12,
    name: "النباتي الصحي",
    description: "تصميم للمطاعم النباتية والصحية مع ألوان خضراء وتركيز على المكونات الطبيعية",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    designType: "بسيط",
    category: "مطاعم صحية",
    demoLink: "https://example.com/demo/vegan"
  }
];

// Categories and design types for filtering
const categories = ["الكل", "مطاعم", "كافيهات", "مطاعم شرقية", "مطاعم فاخرة", "مطاعم إيطالية", "مطاعم آسيوية", "وجبات سريعة", "عصائر ومشروبات", "حلويات", "مأكولات بحرية", "مطاعم صحية"];
const designTypes = ["الكل", "بسيط", "متقدم"];

export default function EMenuTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedDesignType, setSelectedDesignType] = useState("الكل");
  const [filteredTemplates, setFilteredTemplates] = useState(menuTemplates);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isDesignTypeDropdownOpen, setIsDesignTypeDropdownOpen] = useState(false);

  // Filter templates based on search term, category, and design type
  useEffect(() => {
    const filtered = menuTemplates.filter(template => {
      const matchesSearch = template.name.includes(searchTerm) || 
                           template.description.includes(searchTerm);
      const matchesCategory = selectedCategory === "الكل" || template.category === selectedCategory;
      const matchesDesignType = selectedDesignType === "الكل" || template.designType === selectedDesignType;
      
      return matchesSearch && matchesCategory && matchesDesignType;
    });
    
    setFilteredTemplates(filtered);
  }, [searchTerm, selectedCategory, selectedDesignType]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
        <Navbar />
    

      {/* Hero Section */}
      <div className="h-[40h] bg-[url('/placeholder.svg?height=1080&width=1920')] bg-no-repeat bg-cover bg-center z-50">
        <div className="bg-black/70 w-full h-full flex flex-col justify-end items-center text-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-orange-500 mb-4">قوالب القائمة الإلكترونية</h1>
            <p className="text-xl text-white max-w-2xl mb-8" dir="rtl">
              استعرض مجموعتنا المتنوعة من قوالب القائمة الإلكترونية واختر التصميم المناسب لمطعمك
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters Section */}
      <section className="py-8 px-4" dir="rtl">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white/5 rounded-xl p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="bg-white/10 border border-white/20 text-white rounded-lg block w-full pr-10 p-2.5 placeholder-gray-400"
                  placeholder="ابحث عن قالب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <button
                  className="bg-white/10 border border-white/20 text-white rounded-lg w-full md:w-48 p-2.5 text-right flex justify-between items-center"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                >
                  <span>{selectedCategory}</span>
                  <ChevronDown className="h-5 w-5" />
                </button>
                {isCategoryDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-white/20 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className={`block w-full text-right px-4 py-2 hover:bg-white/10 ${selectedCategory === category ? 'bg-orange-500 text-black' : 'text-white'}`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsCategoryDropdownOpen(false);
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Design Type Filter */}
              <div className="relative">
                <button
                  className="bg-white/10 border border-white/20 text-white rounded-lg w-full md:w-48 p-2.5 text-right flex justify-between items-center"
                  onClick={() => setIsDesignTypeDropdownOpen(!isDesignTypeDropdownOpen)}
                >
                  <span>{selectedDesignType}</span>
                  <ChevronDown className="h-5 w-5" />
                </button>
                {isDesignTypeDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-white/20 rounded-lg shadow-lg">
                    {designTypes.map((type, index) => (
                      <button
                        key={index}
                        className={`block w-full text-right px-4 py-2 hover:bg-white/10 ${selectedDesignType === type ? 'bg-orange-500 text-black' : 'text-white'}`}
                        onClick={() => {
                          setSelectedDesignType(type);
                          setIsDesignTypeDropdownOpen(false);
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors duration-300"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={template.image || "/placeholder.svg"} 
                    alt={template.name} 
                    className="w-full h-full object-cover"
                  />
      

<div className="bg-black/70 absolute inset-0 flex items-end justify-end p-2">
                      <img 
                        src={template.qrcode || "/placeholder.svg"} 
                        alt={`QR code for ${template.name}`} 
                        className="w-16 h-16"
                      />
                    </div>
                  
                  {/* Design type badge */}
                  <div className="absolute top-4 right-4 bg-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                    {template.designType}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{template.name}</h3>

                  </div>
                  <p className="text-gray-300 mb-4">{template.description}</p>
                  <div className="flex items-center text-sm text-gray-400">
                    <Tag className="h-4 w-4 ml-1" />
                    <span>{template.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No results message */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-400 mb-2">لا توجد نتائج</h3>
              <p className="text-gray-500">
                لم نتمكن من العثور على قوالب تطابق معايير البحث الخاصة بك. يرجى تجربة معايير مختلفة.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-orange-500 text-black">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">لم تجد ما تبحث عنه؟</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            يمكننا تصميم قالب مخصص يناسب احتياجات مطعمك تمامًا ويعكس هوية علامتك التجارية.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition duration-300 font-bold w-full sm:w-auto">
                تواصل معنا للحصول على تصميم مخصص
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <FloatingWhatsAppIcon />
    </div>
  )
}
