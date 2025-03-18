"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, QrCode, ChevronDown, Smartphone } from "lucide-react"
import Link from "next/link"
import Navbar from "@/src/components/shared/navbar"
import Footer from "@/src/components/shared/footer"
import FloatingWhatsAppIcon from "@/src/components/shared/floating-whatsapp"


// Mock data for digital business card templates
const cardTemplates = [
  {
    id: 1,
    name: "الكلاسيكي الأنيق",
    description: "تصميم كلاسيكي أنيق مع ألوان هادئة وتنظيم مثالي لمعلومات الاتصال",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    category: "أعمال",
    demoLink: "https://example.com/demo/business-classic",
  },
  {
    id: 2,
    name: "العصري المميز",
    description: "تصميم عصري بألوان زاهية وتأثيرات حركية تجذب الانتباه",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    category: "إبداعي",
    demoLink: "https://example.com/demo/creative-modern",
  },
  {
    id: 3,
    name: "المينيمال الأنيق",
    description: "تصميم بسيط وأنيق يركز على المعلومات الأساسية بدون تشتيت",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    category: "أعمال",
    demoLink: "https://example.com/demo/minimal-business",
  },
  {
    id: 4,
    name: "الإبداعي الملون",
    description: "تصميم إبداعي ملون يناسب المصممين والفنانين والمبدعين",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    category: "إبداعي",
    demoLink: "https://example.com/demo/colorful-creative",
  },
  {
    id: 5,
    name: "التقني المتطور",
    description: "تصميم عصري يناسب شركات التكنولوجيا والمطورين والمبرمجين",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    category: "تقني",
    demoLink: "https://example.com/demo/tech-advanced",
  },
  {
    id: 6,
    name: "الطبي المتخصص",
    description: "تصميم مخصص للأطباء والمتخصصين في المجال الطبي",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    category: "طبي",
    demoLink: "https://example.com/demo/medical",
  },
  {
    id: 7,
    name: "القانوني الرسمي",
    description: "��صميم رسمي يناسب المحامين والمستشارين القانونيين",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    category: "قانوني",
    demoLink: "https://example.com/demo/legal",
  },
  {
    id: 8,
    name: "العقاري المميز",
    description: "تصميم مخصص للوسطاء العقاريين ومطوري العقارات",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    category: "عقاري",
    demoLink: "https://example.com/demo/real-estate",
  },
  {
    id: 9,
    name: "التعليمي المتخصص",
    description: "تصميم يناسب المعلمين والأكاديميين والمؤسسات التعليمية",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    category: "تعليمي",
    demoLink: "https://example.com/demo/education",
  },
  {
    id: 10,
    name: "الرياضي الديناميكي",
    description: "تصميم ديناميكي للمدربين الرياضيين واللاعبين والأندية",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    category: "رياضي",
    demoLink: "https://example.com/demo/sports",
  },
  {
    id: 11,
    name: "الفني الإبداعي",
    description: "تصميم إبداعي للفنانين والمصورين والمصممين",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    category: "فني",
    demoLink: "https://example.com/demo/artistic",
  },
  {
    id: 12,
    name: "التسويقي الاحترافي",
    description: "تصميم احترافي لخبراء التسويق ومديري العلاقات العامة",
    image: "https://img.freepik.com/premium-vector/messenger-work-mobile-interface-teamwork-messenger-template_1115399-220.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid",
    qrcode: "/qrcode-example.jpg",
    category: "تسويقي",
    demoLink: "https://example.com/demo/marketing",
  },
]

// Categories for filtering
const categories = ["الكل", "أعمال", "إبداعي", "تقني", "طبي", "قانوني", "عقاري", "تعليمي", "رياضي", "فني", "تسويقي"]

export default function BusinessCardTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [filteredTemplates, setFilteredTemplates] = useState(cardTemplates)
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)

  // Filter templates based on search term and category
  useEffect(() => {
    const filtered = cardTemplates.filter((template) => {
      const matchesSearch = template.name.includes(searchTerm) || template.description.includes(searchTerm)
      const matchesCategory = selectedCategory === "الكل" || template.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    setFilteredTemplates(filtered)
  }, [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
        <Navbar />

      {/* Hero Section */}
      <div className="h-[40vh] bg-[url('/placeholder.svg?height=1080&width=1920')] bg-no-repeat bg-cover bg-center">
        <div className="bg-black/70 w-full h-full flex flex-col justify-end items-center text-center p-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl font-bold text-orange-500 mb-4">قوالب بطاقات الأعمال الرقمية</h1>
            <p className="text-xl text-white max-w-2xl mb-8" dir="rtl">
              استعرض مجموعتنا المتنوعة من قوالب بطاقات الأعمال الرقمية واختر التصميم المناسب لعملك
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters Section */}
      <section className="py-4 px-4" dir="rtl">
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
                        className={`block w-full text-right px-4 py-2 hover:bg-white/10 ${selectedCategory === category ? "bg-orange-500 text-black" : "text-white"}`}
                        onClick={() => {
                          setSelectedCategory(category)
                          setIsCategoryDropdownOpen(false)
                        }}
                      >
                        {category}
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

<div className="absolute inset-0 bg-black/70 flex items-end justify-end p-2">
<div className="bg-white p-1 rounded">
                      <img
                        src={template.qrcode || "/placeholder.svg"}
                        alt={`QR code for ${template.name}`}
                        className="w-14 h-14"
                      />
                    </div>
</div>


                  {/* Category badge */}
                  <div className="absolute top-4 right-4 bg-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                    {template.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2 flex-col">
                    <h3 className="text-xl font-bold">{template.name}</h3>
                    <p className="text-gray-300 mb-4">{template.description}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Smartphone className="h-4 w-4 ml-1" />
                    <span>بطاقة رقمية</span>
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

      {/* Features Section */}
      <section className="py-16 px-4" dir="rtl">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-12">مميزات بطاقات الأعمال الرقمية</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-6 rounded-xl">
              <div className="bg-orange-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <QrCode className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">سهولة المشاركة</h3>
              <p className="text-gray-300">
                شارك بطاقتك الرقمية عبر رمز QR أو رابط مباشر أو عبر وسائل التواصل الاجتماعي بنقرة واحدة.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl">
              <div className="bg-orange-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Filter className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">محتوى غني</h3>
              <p className="text-gray-300">
                أضف معلومات الاتصال، روابط مواقع التواصل، معرض أعمال، فيديوهات، وأكثر بدون قيود.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl">
              <div className="bg-orange-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">تجربة تفاعلية</h3>
              <p className="text-gray-300">
                تمنح زوار بطاقتك تجربة تفاعلية غنية مع إمكانية حفظ معلوماتك مباشرة في جهات الاتصال.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-orange-500 text-black">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">جاهز لتطوير طريقة تواصلك المهني؟</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            احصل على بطاقة أعمال رقمية مخصصة تعكس هويتك المهنية وتساعدك على التواصل بفعالية.
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

