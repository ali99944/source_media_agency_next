"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, Smartphone, Code, Layout, Search, ShoppingCart, Shield, Zap, ChevronRight, Settings, Layers, PenTool, Server, Users, BarChart2 } from 'lucide-react'
import { FaWordpress, FaShopify, FaWix } from "react-icons/fa"
import FloatingWhatsAppIcon from "@/src/components/shared/floating-whatsapp"
import Footer from "@/src/components/shared/footer"
import Navbar from "@/src/components/shared/navbar"

export default function WebsiteDevelopmentPage() {
  const [activeTab, setActiveTab] = useState("business")
  const [selectedTemplate, setSelectedTemplate] = useState(0)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)


  // Website templates
  const websiteTemplates = [
    {
      name: "الأعمال",
      image: "/placeholder.svg?height=300&width=400",
      description: "مواقع احترافية للشركات والمؤسسات"
    },
    {
      name: "المتاجر الإلكترونية",
      image: "/placeholder.svg?height=300&width=400",
      description: "منصات تسوق متكاملة مع نظام دفع"
    },
    {
      name: "المطاعم",
      image: "/placeholder.svg?height=300&width=400",
      description: "مواقع مخصصة للمطاعم والكافيهات"
    },
    {
      name: "العيادات",
      image: "/placeholder.svg?height=300&width=400",
      description: "مواقع للعيادات والمراكز الطبية"
    },
  ]

  // Website benefits
  const websiteBenefits = [
    {
      icon: <Globe className="w-8 h-8 text-orange-500" />,
      title: "تواجد عالمي",
      description: "وصول لعملائك في أي مكان وفي أي وقت على مدار الساعة"
    },
    {
      icon: <Search className="w-8 h-8 text-orange-500" />,
      title: "ظهور في محركات البحث",
      description: "تحسين محركات البحث (SEO) لزيادة ظهور موقعك في نتائج البحث"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-orange-500" />,
      title: "متوافق مع جميع الأجهزة",
      description: "تصميم متجاوب يعمل بشكل مثالي على الهواتف والأجهزة اللوحية وأجهزة الكمبيوتر"
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-orange-500" />,
      title: "تحويل الزوار إلى عملاء",
      description: "تصميم موجه للتحويل لزيادة نسبة التحويل وتحقيق أهداف عملك"
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      title: "أمان وحماية",
      description: "حماية موقعك وبيانات عملائك بأحدث تقنيات الأمان"
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "سرعة التحميل",
      description: "أداء عالي وسرعة تحميل فائقة لتحسين تجربة المستخدم"
    },
  ]

  // Website platforms
  const websitePlatforms = [
    {
      icon: <Code className="w-8 h-8 text-orange-500" />,
      name: "تطوير مخصص",
      description: "تطوير مواقع مخصصة بالكامل حسب احتياجاتك باستخدام أحدث التقنيات"
    },
    {
      icon: <FaWordpress className="w-8 h-8 text-orange-500" />,
      name: "ووردبريس",
      description: "مواقع مرنة وسهلة الإدارة باستخدام أشهر نظام إدارة محتوى في العالم"
    },
    {
      icon: <FaShopify className="w-8 h-8 text-orange-500" />,
      name: "شوبيفاي",
      description: "متاجر إلكترونية احترافية مع نظام دفع آمن وإدارة مخزون متكاملة"
    },
    {
      icon: <FaWix className="w-8 h-8 text-orange-500" />,
      name: "ويكس",
      description: "مواقع سريعة وجذابة مع واجهة سحب وإفلات سهلة الاستخدام"
    },
  ]

  // FAQs
  const faqs = [
    {
      question: "كم من الوقت يستغرق تطوير موقع ويب؟",
      answer: "تختلف مدة تطوير الموقع حسب حجم المشروع وتعقيده. المواقع البسيطة قد تستغرق 2-4 أسابيع، بينما المشاريع الأكثر تعقيدًا مثل المتاجر الإلكترونية الكبيرة قد تستغرق 8-12 أسبوعًا. نقدم لك جدولًا زمنيًا دقيقًا بعد مناقشة متطلبات مشروعك."
    },
    {
      question: "هل سأتمكن من تحديث موقعي بنفسي؟",
      answer: "نعم، نقوم بتطوير مواقع سهلة الإدارة مع لوحة تحكم بسيطة تمكنك من تحديث المحتوى بنفسك. نوفر أيضًا تدريبًا شاملًا لفريقك على كيفية إدارة الموقع وتحديثه، بالإضافة إلى دليل استخدام مفصل."
    },
    {
      question: "هل تقدمون خدمات استضافة المواقع؟",
      answer: "نعم، نقدم حلول استضافة موثوقة وآمنة لضمان أداء موقعك بشكل مثالي. تشمل خدمات الاستضافة لدينا النسخ الاحتياطي التلقائي، شهادات SSL، حماية من الهجمات، ودعم فني على مدار الساعة."
    },
    {
      question: "هل تقدمون خدمات تحسين محركات البحث (SEO)؟",
      answer: "نعم، نقدم خدمات SEO متكاملة لتحسين ظهور موقعك في نتائج البحث. نقوم بتحسين الموقع تقنيًا، وإنشاء محتوى صديق لمحركات البحث، وبناء روابط خلفية قوية، مع تقارير شهرية لمتابعة التقدم."
    },
    {
      question: "ما هي تكلفة تطوير موقع ويب؟",
      answer: "تختلف تكلفة تطوير الموقع حسب متطلبات المشروع. نقدم أسعارًا تنافسية تبدأ من 5000 ريال للمواقع البسيطة. بعد مناقشة احتياجاتك، سنقدم لك عرض سعر مفصل يشمل جميع الخدمات المطلوبة دون أي تكاليف خفية."
    },
    {
      question: "هل تقدمون خدمات ما بعد إطلاق الموقع؟",
      answer: "نعم، نقدم باقات صيانة وتطوير مستمر لضمان أداء موقعك بشكل مثالي. تشمل خدمات ما بعد الإطلاق التحديثات الأمنية، إصلاح الأخطاء، تحسينات الأداء، والدعم الفني المستمر."
    },
  ]



  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <div className="absolute inset-0 bg-no-repeat bg-cover bg-center z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="h-screen bg-[url('/placeholder.svg?height=1080&width=1920')] bg-no-repeat bg-cover bg-center">
        <div className="bg-black/70 w-full h-full flex flex-col justify-center items-center text-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-orange-500 rounded-full opacity-20 blur-md animate-pulse"></div>
                <Globe className="text-orange-500 relative z-10" size={60} />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">تطوير مواقع الويب الاحترافية</h1>
            <p className="text-xl text-white max-w-2xl mb-8" dir="rtl">
              نصمم ونطور مواقع ويب مخصصة تجمع بين التصميم الإبداعي والأداء العالي لتحقيق أهداف عملك
            </p>
          </motion.div>

          <div className="flex flex-row justify-center gap-4 z-50">
            <a href="#business-websites">
              <button className="bg-orange-500 text-black px-6 py-3 rounded-full hover:bg-orange-600 transition duration-300 cursor-pointer font-bold">
                مواقع الأعمال
              </button>
            </a>
            <a href="#ecommerce-websites">
              <button className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition duration-300 cursor-pointer font-bold">
                المتاجر الإلكترونية
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Why Website Section */}
      <section className="py-20 px-4 relative overflow-hidden" dir="rtl">
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">لماذا تحتاج <span className="text-orange-500">موقع ويب</span>؟</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mb-6 mx-auto" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              في العصر الرقمي، موقع الويب هو واجهة عملك الأساسية على الإنترنت وأداة قوية للنمو وجذب العملاء
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websiteBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-colors duration-300"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl text-center"
            >
              <div className="text-4xl font-bold text-orange-500 mb-2">70%</div>
              <p className="text-gray-300">من العملاء يبحثون عن الشركات عبر الإنترنت قبل التواصل</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl text-center"
            >
              <div className="text-4xl font-bold text-orange-500 mb-2">24/7</div>
              <p className="text-gray-300">تواجد مستمر لعملك على الإنترنت</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl text-center"
            >
              <div className="text-4xl font-bold text-orange-500 mb-2">40%</div>
              <p className="text-gray-300">زيادة في المبيعات مع وجود موقع احترافي</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 px-4 bg-white/5" dir="rtl">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white/10 rounded-full p-1">
              <button
                className={`px-6 py-3 rounded-full font-bold ${
                  activeTab === "business"
                    ? "bg-orange-500 text-black"
                    : "bg-transparent text-white hover:bg-white/5"
                }`}
                onClick={() => setActiveTab("business")}
              >
                <Globe className="inline-block ml-2 h-5 w-5" />
                مواقع الأعمال
              </button>
              <button
                className={`px-6 py-3 rounded-full font-bold ${
                  activeTab === "ecommerce"
                    ? "bg-orange-500 text-black"
                    : "bg-transparent text-white hover:bg-white/5"
                }`}
                onClick={() => setActiveTab("ecommerce")}
              >
                <ShoppingCart className="inline-block ml-2 h-5 w-5" />
                المتاجر الإلكترونية
              </button>
            </div>
          </div>

          {/* Business Websites Section */}
          {activeTab === "business" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              id="business-websites"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h2 className="text-3xl font-bold text-orange-500 mb-6">مواقع الأعمال الاحترافية</h2>
                  <p className="text-lg mb-6">
                    نصمم ونطور مواقع أعمال احترافية تعكس هوية علامتك التجارية وتساعدك على التواصل مع عملائك وتحقيق أهدافك التجارية.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-orange-500 p-2 rounded-full ml-4 mt-1">
                        <Layout className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">تصميم عصري وجذاب</h3>
                        <p className="text-gray-300">واجهات مستخدم عصرية تعكس هوية علامتك التجارية</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-orange-500 p-2 rounded-full ml-4 mt-1">
                        <Smartphone className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">متوافق مع جميع الأجهزة</h3>
                        <p className="text-gray-300">تصميم متجاوب يعمل بشكل مثالي على جميع الأجهزة</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-orange-500 p-2 rounded-full ml-4 mt-1">
                        <Search className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">تحسين محركات البحث</h3>
                        <p className="text-gray-300">تهيئة الموقع لمحركات البحث لزيادة الظهور في نتائج البحث</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-orange-500 p-2 rounded-full ml-4 mt-1">
                        <Settings className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">لوحة تحكم سهلة</h3>
                        <p className="text-gray-300">إدارة محتوى الموقع بسهولة من خلال لوحة تحكم بسيطة</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500 rounded-full opacity-20 blur-3xl"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500 rounded-full opacity-20 blur-3xl"></div>

                  {/* Website Mockup */}
                  <div className="relative mx-auto">
                    <div className="bg-gray-800 rounded-t-lg p-2 flex justify-between items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="bg-gray-700 rounded px-2 py-1 text-xs text-gray-300 w-64 truncate text-center">
                        www.yourcompany.com
                      </div>
                      <div className="w-6"></div>
                    </div>
                    <div className="bg-white rounded-b-lg overflow-hidden shadow-2xl">
                      <img 
                        src="/placeholder.svg?height=400&width=600" 
                        alt="Business Website Example" 
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Templates Selection */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-center mb-8">نماذج من تصاميمنا</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {websiteTemplates.map((template, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${selectedTemplate === index ? 'ring-2 ring-orange-500' : ''}`}
                      onClick={() => setSelectedTemplate(index)}
                    >
                      <img 
                        src={template.image || "/placeholder.svg"} 
                        alt={template.name} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 bg-white/5">
                        <h4 className="font-bold text-lg">{template.name}</h4>
                        <p className="text-sm text-gray-300">{template.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
                  <div className="bg-orange-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <PenTool className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">تصميم مخصص</h3>
                  <p className="text-gray-300">
                    تصميم فريد يعكس هوية علامتك التجارية ويميزك عن منافسيك، مع تركيز على تجربة المستخدم.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
                  <div className="bg-orange-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">تطوير احترافي</h3>
                  <p className="text-gray-300">
                    برمجة احترافية باستخدام أحدث التقنيات لضمان أداء عالي وسرعة تحميل فائقة.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
                  <div className="bg-orange-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">تحسين محركات البحث</h3>
                  <p className="text-gray-300">
                    تهيئة الموقع لمحركات البحث لزيادة ظهوره في نتائج البحث وجذب المزيد من الزوار.
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">جاهز لإنشاء موقع ويب احترافي لعملك؟</h3>
                <p className="text-lg mb-8 max-w-2xl mx-auto">
                  دعنا نساعدك في إنشاء موقع ويب يعكس هوية علامتك التجارية ويساعدك على تحقيق أهدافك.
                </p>
                <a href="/contact">
                  <button className="bg-orange-500 text-black px-8 py-3 rounded-full hover:bg-orange-600 transition duration-300 font-bold">
                    احصل على عرض سعر
                  </button>
                </a>
              </div>
            </motion.div>
          )}

          {/* E-commerce Websites Section */}
          {activeTab === "ecommerce" && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              id="ecommerce-websites"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <div className="order-2 md:order-1">
                  <div className="relative mx-auto">
                    <div className="bg-gray-800 rounded-t-lg p-2 flex justify-between items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="bg-gray-700 rounded px-2 py-1 text-xs text-gray-300 w-64 truncate text-center">
                        www.yourstore.com
                      </div>
                      <div className="w-6"></div>
                    </div>
                    <div className="bg-white rounded-b-lg overflow-hidden shadow-2xl">
                      <img 
                        src="/placeholder.svg?height=400&width=600" 
                        alt="E-commerce Website Example" 
                        className="w-full h-auto"
                      />
                    </div>
                    
                    {/* Shopping Cart Preview */}
                    <div className="absolute -bottom-10 -right-10 bg-white rounded-lg shadow-xl p-3 w-48 transform rotate-6">
                      <div className="text-black text-xs font-bold mb-2">سلة التسوق</div>
                      <div className="flex items-center justify-between text-black text-xs mb-1">
                        <span>منتج 1</span>
                        <span>199 ريال</span>
                      </div>
                      <div className="flex items-center justify-between text-black text-xs mb-1">
                        <span>منتج 2</span>
                        <span>299 ريال</span>
                      </div>
                      <div className="h-px bg-gray-200 my-1"></div>
                      <div className="flex items-center justify-between text-black text-xs font-bold">
                        <span>المجموع</span>
                        <span>498 ريال</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-1 md:order-2">
                  <h2 className="text-3xl font-bold text-orange-500 mb-6">المتاجر الإلكترونية المتكاملة</h2>
                  <p className="text-lg mb-6">
                    نطور متاجر إلكترونية احترافية تمكنك من بيع منتجاتك عبر الإنترنت بسهولة وأمان، مع نظام دفع آمن وإدارة مخزون متكاملة.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-orange-500 p-2 rounded-full ml-4 mt-1">
                        <ShoppingCart className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">نظام تسوق متكامل</h3>
                        <p className="text-gray-300">سلة تسوق، نظام دفع آمن، وإدارة طلبات سهلة</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-orange-500 p-2 rounded-full ml-4 mt-1">
                        <Layers className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">إدارة المنتجات والمخزون</h3>
                        <p className="text-gray-300">إضافة وتعديل المنتجات وإدارة المخزون بسهولة</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-orange-500 p-2 rounded-full ml-4 mt-1">
                        <Shield className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">أمان وحماية</h3>
                        <p className="text-gray-300">حماية بيانات العملاء وتشفير المعاملات المالية</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-orange-500 p-2 rounded-full ml-4 mt-1">
                        <Users className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">إدارة العملاء</h3>
                        <p className="text-gray-300">حسابات العملاء، سجل الطلبات، والمفضلة</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* E-commerce Features */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-center mb-8">مميزات متاجرنا الإلكترونية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
                    <div className="bg-orange-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <ShoppingCart className="h-6 w-6 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">تجربة تسوق سلسة</h3>
                    <p className="text-gray-300">
                      واجهة سهلة الاستخدام تمكن العملاء من تصفح المنتجات والشراء بسهولة.
                    </p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
                    <div className="bg-orange-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">دفع آمن</h3>
                    <p className="text-gray-300">
                      دعم لطرق دفع متعددة مع تشفير كامل لبيانات العملاء والمعاملات.
                    </p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
                    <div className="bg-orange-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <Server className="h-6 w-6 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">إدارة المخزون</h3>
                    <p className="text-gray-300">
                      نظام متكامل لإدارة المخزون مع تنبيهات للمنتجات منخفضة المخزون.
                    </p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
                    <div className="bg-orange-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <BarChart2 className="h-6 w-6 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">تقارير وإحصائيات</h3>
                    <p className="text-gray-300">
                      تقارير مفصلة عن المبيعات والعملاء والمنتجات الأكثر مبيعًا.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">جاهز لإطلاق متجرك الإلكتروني؟</h3>
                <p className="text-lg mb-8 max-w-2xl mx-auto">
                  دعنا نساعدك في إنشاء متجر إلكتروني احترافي يمكنك من بيع منتجاتك عبر الإنترنت بسهولة وأمان.
                </p>
                <a href="/contact">
                  <button className="bg-orange-500 text-black px-8 py-3 rounded-full hover:bg-orange-600 transition duration-300 font-bold">
                    احصل على عرض سعر
                  </button>
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </section>


      {/* Platforms Section */}
      <section className="py-16 px-4 bg-white/5" dir="rtl">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">منصات <span className="text-orange-500">التطوير</span></h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mb-6 mx-auto" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              نستخدم أفضل المنصات والتقنيات لتطوير موقعك حسب احتياجاتك
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {websitePlatforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex justify-center mb-4">
                  {platform.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">{platform.name}</h3>
                <p className="text-gray-300 text-center">{platform.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4" dir="rtl">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              الأسئلة <span className="text-orange-500">الشائعة</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mb-6 mx-auto" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              إجابات على الأسئلة الأكثر شيوعاً حول تطوير مواقع الويب
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden"
              >
                <button
                  className="w-full p-6 text-right flex justify-between items-center"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <h3 className="text-xl font-bold">{faq.question}</h3>
                  <ChevronRight
                    className={`h-5 w-5 transition-transform duration-300 ${activeFaq === index ? "rotate-90" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-300">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-orange-500 text-black">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">جاهز لإطلاق موقعك على الإنترنت؟</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            سواء كنت تحتاج إلى موقع أعمال احترافي أو متجر إلكتروني متكامل، نحن هنا لمساعدتك في تحقيق رؤيتك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition duration-300 font-bold w-full sm:w-auto">
                تواصل معنا الآن
              </button>
            </a>
            <a href="#samples">
              <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300 font-bold w-full sm:w-auto">
                مشاهدة نماذج أعمالنا
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsAppIcon />
    </div>
  )
}
