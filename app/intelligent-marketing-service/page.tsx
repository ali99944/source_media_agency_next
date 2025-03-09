"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {  Users, Search, Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { FaRocket, FaBrain, FaSearchDollar, FaRegLightbulb } from "react-icons/fa"
import FloatingWhatsAppIcon from "@/src/components/shared/floating-whatsapp"
import Footer from "@/src/components/shared/footer"
import Navbar from "@/src/components/shared/navbar"

// Service type definition
type MarketingService = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

// Case Study type
type CaseStudy = {
  id: string
  title: string
  client: string
  challenge: string
  solution: string
  results: string[]
  image: string
}

export default function IntelligentMarketing() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<number>(0)


  // Auto-rotate case studies
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCaseStudy((prev) => (prev + 1) % caseStudies.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Marketing services data
  const services: MarketingService[] = [
    {
      id: "whatsapp-sender",
      title: "واتساب سيندر",
      description: "دلوقتي تقدر ترسل رسالة لكل عملائك عن طريق الواتساب بضغطة زر واحدة مع واتساب سيندر برو قم باعادة استهداف عملائك من جديد لزيادة نسبة المبيعات",
      icon: <FaRocket className="h-6 w-6 text-white" />
    },
    {
      id: "seo",
      title: "تحسين محركات البحث (SEO)",
      description: "استراتيجيات ذكية لتحسين ظهور موقعك في نتائج البحث وزيادة الزيارات العضوية",
      icon: <Search className="h-6 w-6 text-white" />,
    },
    {
      id: "canva-pro",
      title: "اشتراك كانفا برو",
      description: "اشتراك كانفا برو مدى الحياة باستخدام الذكاء الاصطناعي للتطوير من تصميماتك و انشاء التصميم ابتدائيا",
      icon: <FaSearchDollar className="h-6 w-6 text-white" />
    },
    {
      id: "sms-marketing",
      title: "تسويق عبر sms",
      description: "دلوقتي تقدر ترسل رسالة جماعية لعملائك عن طريق ال sms باستخدام رقم الهاتف فقط",
      icon: <Mail className="h-6 w-6 text-white" />
    },
    {
      id: "content-marketing",
      title: "بوت الرد علي التعليقات",
      description: "دلوقتي تقدر ترسل رسالة رد علي كل تعليق علي الفيسبوك باستخدام بوت الرد علي التعليقات",
      icon: <FaRegLightbulb className="h-6 w-6 text-white" />
    },
    {
      id: "influencer-marketing",
      title: "ارسال رسالة جماعية",
      description: "دلوقتي تقدر تبعت رسالة لكل عملائك اللي اتواصلو معاك علي ماسنجر من اول بداية انشاء الصفحة لاخر عميل تم التواصل معه",
      icon: <Users className="h-6 w-6 text-white" />
    }
  ]

  // Case studies data
  const caseStudies: CaseStudy[] = [
    {
      id: "case-1",
      title: "زيادة المبيعات عبر الإنترنت بنسبة 150%",
      client: "متجر إلكتروني للأزياء",
      challenge: "كان العميل يواجه صعوبة في جذب الزوار وتحويلهم إلى مشترين، مع معدل تحويل منخفض يبلغ 1.2% فقط.",
      solution: "قمنا بتطوير استراتيجية تسويق ذكية متكاملة تشمل تحسين محركات البحث، وحملات إعلانية مستهدفة، وتحسين تجربة المستخدم على الموقع، بالإضافة إلى حملات تسويق عبر البريد الإلكتروني والتواصل الاجتماعي.",
      results: [
        "زيادة المبيعات بنسبة 150% خلال 6 أشهر",
        "تحسين معدل التحويل من 1.2% إلى 3.8%",
        "زيادة متوسط قيمة الطلب بنسبة 35%",
        "زيادة حركة المرور العضوية بنسبة 200%"
      ],
      image: "/images/marketing-work/1.jpg"
    },
    {
      id: "case-2",
      title: "بناء قاعدة متابعين تتجاوز 100,000 متابع",
      client: "علامة تجارية ناشئة في مجال الأغذية الصحية",
      challenge: "كانت العلامة التجارية جديدة تمامًا في السوق وتحتاج إلى بناء وعي بالعلامة التجارية وقاعدة متابعين مخلصين.",
      solution: "طورنا استراتيجية محتوى متكاملة تركز على التثقيف والترفيه، مع حملات تسويق عبر المؤثرين واستراتيجية تفاعل نشطة على وسائل التواصل الاجتماعي.",
      results: [
        "بناء قاعدة متابعين تتجاوز 100,000 متابع خلال عام واحد",
        "تحقيق معدل تفاعل يتجاوز 5% على منصات التواصل الاجتماعي",
        "زيادة الوعي بالعلامة التجارية بنسبة 300%",
        "تحقيق مبيعات تتجاوز التوقعات بنسبة 80%"
      ],
      image: "/images/marketing-work/2.jpg"
    },
    {
      id: "case-3",
      title: "تحسين معدل التحويل بنسبة 220%",
      client: "شركة خدمات استشارية",
      challenge: "كانت الشركة تحصل على زيارات جيدة لموقعها ولكن معدل التحويل كان منخفضًا جدًا عند 0.8%.",
      solution: "قمنا بإجراء تحليل شامل لرحلة المستخدم وتحسين نقاط الاتصال الرئيسية، مع تطوير استراتيجية محتوى تركز على حل مشكلات العملاء المحتملين وبناء الثقة.",
      results: [
        "زيادة معدل التحويل من 0.8% إلى 2.6%",
        "زيادة عدد العملاء المحتملين بنسبة 180%",
        "تحسين معدل الاحتفاظ بالعملاء بنسبة 45%",
        "زيادة قيمة العميل مدى الحياة بنسبة 60%"
      ],
      image: "/images/marketing-work/3.jpg"
    },
    {
      id: "case-4",
      title: "زيادة عدد العملاء الجدد بنسبة 50%",
      client: "شركة خدمات طبية",
      challenge: "كانت الشركة تواجه صعوبة في جذب عملاء جدد، مع معدل تحويل منخفض يبلغ 2.5%.",
      solution: "طورنا استراتيجية تسويق مستهدفة تركز على تحسين محركات البحث، وحملات إعلانية مستهدفة، وتحسين تجربة المستخدم على الموقع، بالإضافة إلى حملات تسويق عبر البريد الإلكتروني والتواصل الاجتماعي.",
      results: [
        "زيادة عدد العملاء الجدد بنسبة 50% خلال 3 أشهر",
        "تحسين معدل التحويل من 2.5% إلى 4.2%",
        "زيادة متوسط قيمة الطلب بنسبة 25%",
        "زيادة حركة المرور العضوية بنسبة 150%"
      ],
      image: "/images/marketing-work/4.jpg"
    },
    {
      id: "case-5",
      title: "زيادة معدل التحويل بنسبة 300%",
      client: "شركة خدمات محاسبة",
      challenge: "كانت الشركة تحصل على زيارات جيدة لموقعها ولكن معدل التحويل كان منخفضًا جدًا عند 1.5%.",
      solution: "قمنا بإجراء تحليل شامل لرحلة المستخدم وتحسين نقاط الاتصال الرئيسية، مع تطوير استراتيجية محتوى تركز على حل مشكلات العملاء المحتملين وبناء الثقة.",
      results: [
        "زيادة معدل التحويل من 1.5% إلى 4.5%",
        "زيادة عدد العملاء المحتملين بنسبة 200%",
        "تحسين معدل الاحتفاظ بالعملاء بنسبة 50%",
        "زيادة قيمة العميل مدى الحياة بنسبة 70%"
      ],
      image: "/images/marketing-work/5.jpg"
    },
    {
      id: "case-6",
      title: "زيادة المبيعات بنسبة 200%",
      client: "متجر إلكتروني لبيع الملابس",
      challenge: "كان العميل يواجه صعوبة في جذب الزوار وتحويلهم إلى مشترين، مع معدل تحويل منخفض يبلغ 1.8%.",
      solution: "طورنا استراتيجية تسويق مستهدفة تركز على تحسين محركات البحث، وحملات إعلانية مستهدفة، وتحسين تجربة المستخدم على الموقع، بالإضافة إلى حملات تسويق عبر البريد الإلكتروني والتواصل الاجتماعي.",
      results: [
        "زيادة المبيعات بنسبة 200% خلال 6 أشهر",
        "تحسين معدل التحويل من 1.8% إلى 3.5%",
        "زيادة متوسط قيمة الطلب بنسبة 30%",
        "زيادة حركة المرور العضوية بنسبة 220%"
      ],
      image: "/images/marketing-work/6.jpg"
    },

  ]


  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <div className="absolute inset-0 bg-no-repeat bg-cover bg-center z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="h-screen bg-black relative overflow-hidden">
        {/* Creative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Data Visualization Elements */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 80 + 20}px`,
                background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`,
                borderRadius: '2px',
              }}
              animate={{
                height: [
                  `${Math.random() * 80 + 20}px`,
                  `${Math.random() * 120 + 40}px`,
                  `${Math.random() * 80 + 20}px`,
                ],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}

          {/* Connection Lines */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
              style={{
                height: '1px',
                width: `${Math.random() * 200 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                width: [
                  `${Math.random() * 200 + 100}px`,
                  `${Math.random() * 300 + 150}px`,
                  `${Math.random() * 200 + 100}px`,
                ],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}

          {/* Glowing orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full bg-orange-500/10 blur-3xl"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="relative w-full h-full flex flex-col justify-center items-center text-center p-4 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-orange-500 rounded-full opacity-20 blur-md animate-pulse"></div>
              <FaBrain className="text-orange-500 relative z-10" size={50} />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            التسويق <span className="text-orange-500">الذكي</span>
          </motion.h1>

          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mb-6 mx-auto"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "6rem", opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          <motion.p
            className="text-lg md:text-xl text-white/80 max-w-2xl mb-8"
            dir="rtl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            نقدم استراتيجيات تسويقية ذكية مدعومة بالبيانات والتحليلات لمساعدة عملك على النمو وتحقيق أهدافك التسويقية بكفاءة وفعالية.
          </motion.p>

          {/* Animated Data Visualization */}
          <motion.div
            className="absolute bottom-20 left-0 right-0 h-32 flex items-end justify-center gap-1 px-4 opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`bar-${i}`}
                className="w-1 bg-orange-500 rounded-t-sm"
                style={{ height: '10%' }}
                animate={{
                  height: `${Math.random() * 90 + 10}%`,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.05,
                }}
              />
            ))}
          </motion.div>

        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Diagonal lines */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-orange-500/5"
              style={{
                height: '1px',
                width: '100%',
                top: `${i * 10}%`,
                left: 0,
                transform: 'rotate(-5deg)',
              }}
            />
          ))}

          {/* Radial gradient */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-orange-500/5 to-transparent opacity-50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              خدمات التسويق <span className="text-orange-500">الذكي</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mb-6 mx-auto" />
            <p className="text-xl max-w-3xl mx-auto text-gray-300" dir="rtl">
              نقدم مجموعة متكاملة من خدمات التسويق الذكي المصممة خصيصًا لتلبية احتياجات عملك وتحقيق أهدافك
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Gradient Border */}

                <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl border border-white/10 group-hover:border-white/30 transition-all duration-300 relative z-10">
                  {/* Service Header */}
                  <div className={`bg-gradient-to-r p-6 flex items-center justify-between`}>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    <div className="bg-white/20 p-2 rounded-full">
                      {service.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative">
                    <p className="text-gray-300 mb-4 text-right" dir="rtl">{service.description}</p>

                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Case Studies Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              قصص <span className="text-orange-500">نجاح</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mb-6 mx-auto" />
            <p className="text-xl max-w-3xl mx-auto text-gray-300" dir="rtl">
              تعرف على بعض قصص نجاح عملائنا وكيف ساعدناهم في تحقيق أهدافهم التسويقية
            </p>
          </motion.div>

          {/* Case Studies Carousel */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <AnimatePresence mode="wait">
                {caseStudies.map((study, index) => (
                  activeCaseStudy === index && (
                    <motion.div
                      key={study.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="relative h-64 md:h-auto">
                          <img
                            src={study.image || "/placeholder.svg"}
                            alt={study.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent md:bg-gradient-to-t md:from-black/70 md:to-transparent" />

                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="bg-orange-500 text-black text-sm font-bold px-3 py-1 rounded-full inline-block mb-2">
                              {study.client}
                            </div>
                            <h3 className="text-2xl font-bold text-white">{study.title}</h3>
                          </div>
                        </div>

                        <div className="p-6 text-right" dir="rtl">
                          <div className="mb-4">
                            <h4 className="text-lg font-semibold text-orange-500 mb-2">التحدي:</h4>
                            <p className="text-gray-300">{study.challenge}</p>
                          </div>

                          <div className="mb-4">
                            <h4 className="text-lg font-semibold text-orange-500 mb-2">الحل:</h4>
                            <p className="text-gray-300">{study.solution}</p>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-orange-500 mb-2">النتائج:</h4>
                            <ul className="space-y-2">
                              {study.results.map((result, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                                  <span className="text-gray-300">{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-6 gap-2">
                {caseStudies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCaseStudy(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeCaseStudy === index ? "bg-orange-500 w-8" : "bg-white/30"
                    }`}
                    aria-label={`View case study ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-orange-500/20" />

          {/* Animated Particles */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute h-1 w-1 rounded-full bg-orange-500"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-black/50 backdrop-blur-md rounded-2xl p-10 border border-orange-500/20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-block bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-full mb-6">
                <FaRocket className="text-black" size={24} />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">هل أنت جاهز لتعزيز استراتيجيتك التسويقية؟</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                تواصل معنا اليوم لمناقشة كيف يمكننا مساعدتك في تحقيق أهدافك التسويقية من خلال استراتيجيات التسويق الذكي المخصصة لعملك.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a href="/contact-us">
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-black px-8 py-4 rounded-full hover:from-orange-600 hover:to-orange-700 transition duration-300 font-bold flex items-center gap-2 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transform hover:-translate-y-1">
                    <span>تواصل معنا الآن</span>
                    <ArrowRight size={18} />
                  </button>
                </a>
                <a href="https://wa.me/+201278183718">
                  <button className="bg-green-500 text-white px-8 py-4 rounded-full hover:bg-green-600 transition duration-300 font-bold flex items-center gap-2 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transform hover:-translate-y-1">
                    <span>واتساب</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <FloatingWhatsAppIcon />
    </div>
  )
}
