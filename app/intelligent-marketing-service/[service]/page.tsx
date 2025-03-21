"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { FaRocket, FaSearchDollar, FaUsers } from "react-icons/fa"
import Footer from "@/src/components/shared/footer"
import FloatingWhatsAppIcon from "@/src/components/shared/floating-whatsapp"
import Navbar from "@/src/components/shared/navbar"
import Link from "next/link"

// Service type definition
type MarketingService = {
  id: string
  title: string
  description: string
  longDescription: string
  icon: React.ReactNode
  benefits: string[]
  process: {
    title: string
    description: string
  }[]
  tools: string[]
  faqs: {
    question: string
    answer: string
  }[]
  pricing: {
    title: string
    price: string
    features: string[]
    recommended?: boolean
  }[]
}

export default function ServiceDetails() {
  const params = useParams()
  const router = useRouter()
  const [service, setService] = useState<MarketingService | null>(null)
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null)

  // Toggle accordion
  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }

  // Marketing services data
  const services: Record<string, MarketingService> = {
    "social-media": {
      id: "social-media",
      title: "إدارة وسائل التواصل الاجتماعي",
      description: "استراتيجيات ذكية لإدارة منصات التواصل الاجتماعي وزيادة التفاعل وبناء جمهور مستهدف",
      longDescription: "نقدم خدمات إدارة وسائل التواصل الاجتماعي المتكاملة التي تساعد علامتك التجارية على النمو وزيادة التفاعل وبناء جمهور مستهدف. نستخدم استراتيجيات مدعومة بالبيانات لتحقيق أقصى استفادة من وجودك على منصات التواصل الاجتماعي المختلفة مثل فيسبوك وانستجرام وتويتر ولينكد إن وتيك توك.",
      icon: <FaUsers className="h-10 w-10 text-white" />,
      benefits: [
        "زيادة الوعي بالعلامة التجارية وبناء جمهور مستهدف",
        "تحسين التفاعل مع المنشورات وزيادة المتابعين",
        "إنشاء محتوى إبداعي يعكس هوية علامتك التجارية",
        "تحليل أداء المنصات وتحسين الاستراتيجيات",
        "إدارة الإعلانات المدفوعة بكفاءة لتحقيق أفضل النتائج",
        "بناء علاقات قوية مع العملاء والمتابعين"
      ],
      process: [
        {
          title: "تحليل الوضع الحالي",
          description: "نقوم بتحليل شامل لحسابات التواصل الاجتماعي الخاصة بك والمنافسين وتحديد نقاط القوة والضعف والفرص"
        },
        {
          title: "تطوير الاستراتيجية",
          description: "نضع استراتيجية متكاملة تتضمن أهداف واضحة وخطة محتوى وجدول نشر وميزانية إعلانية"
        },
        {
          title: "إنشاء المحتوى",
          description: "نقوم بإنشاء محتوى إبداعي جذاب يتناسب مع جمهورك المستهدف ويعكس هوية علامتك التجارية"
        },
        {
          title: "النشر والتفاعل",
          description: "ننشر المحتوى حسب الجدول المحدد ونتفاعل مع الجمهور ونرد على التعليقات والرسائل"
        },
        {
          title: "إدارة الإعلانات",
          description: "نصمم ونطلق حملات إعلانية مستهدفة لتحقيق أهدافك التسويقية بأقل تكلفة ممكنة"
        },
        {
          title: "التحليل والتحسين",
          description: "نراقب أداء المنصات ونحلل البيانات ونقدم تقارير دورية ونحسن الاستراتيجية باستمرار"
        }
      ],
      tools: [
        "Buffer", "Hootsuite", "Sprout Social", "Canva", "Adobe Creative Suite", "Facebook Ads Manager", "Google Analytics", "Brandwatch"
      ],
      faqs: [
        {
          question: "كم مرة يجب أن أنشر على وسائل التواصل الاجتماعي؟",
          answer: "يختلف معدل النشر المثالي حسب المنصة وجمهورك المستهدف. بشكل عام، نوصي بالنشر 3-5 مرات أسبوعياً على فيسبوك، 1-2 مرة يومياً على انستجرام، و3-5 مرات يومياً على تويتر. سنقوم بتحديد الجدول الأمثل لعلامتك التجارية بناءً على تحليل البيانات."
        },
        {
          question: "هل تقومون بإنشاء المحتوى أم يجب علينا توفيره؟",
          answer: "نقدم خدمة إنشاء المحتوى الكاملة بما في ذلك التصوير والتصميم وكتابة النصوص. يمكننا أيضاً العمل مع المحتوى الذي توفره إذا كنت تفضل ذلك."
        },
        {
          question: "كيف تقيسون نجاح استراتيجية التواصل الاجتماعي؟",
          answer: "نقيس النجاح من خلال مجموعة من مؤشرات الأداء الرئيسية (KPIs) مثل نمو المتابعين، معدل التفاعل، الوصول، النقرات، التحويلات، والعائد على الاستثمار (ROI). نقدم تقارير شهرية مفصلة تظهر التقدم نحو تحقيق أهدافك."
        },
        {
          question: "هل تقدمون خدمات إدارة الإعلانات المدفوعة؟",
          answer: "نعم، نقدم خدمات إدارة الإعلانات المدفوعة على جميع منصات التواصل الاجتماعي. نقوم بتصميم وإطلاق وإدارة وتحسين الحملات الإعلانية لتحقيق أفضل النتائج بأقل تكلفة ممكنة."
        }
      ],
      pricing: [
        {
          title: "الباقة الأساسية",
          price: "1,500 ريال / شهرياً",
          features: [
            "إدارة منصتين اجتماعيتين",
            "8 منشورات شهرياً لكل منصة",
            "تصميم المحتوى الأساسي",
            "التفاعل مع الجمهور",
            "تقرير أداء شهري"
          ]
        },
        {
          title: "الباقة المتقدمة",
          price: "3,000 ريال / شهرياً",
          recommended: true,
          features: [
            "إدارة 4 منصات اجتماعية",
            "15 منشوراً شهرياً لكل منصة",
            "تصميم محتوى احترافي",
            "جلسة تصوير شهرية",
            "إدارة الإعلانات المدفوعة",
            "التفاعل اليومي مع الجمهور",
            "تقارير أداء أسبوعية وشهرية"
          ]
        },
        {
          title: "الباقة الاحترافية",
          price: "5,000 ريال / شهرياً",
          features: [
            "إدارة جميع المنصات الاجتماعية",
            "محتوى يومي لكل منصة",
            "تصميم محتوى احترافي متميز",
            "جلستي تصوير شهرياً",
            "إدارة الإعلانات المدفوعة المتقدمة",
            "استراتيجية محتوى متكاملة",
            "التفاعل الفوري مع الجمهور",
            "تقارير أداء مفصلة أسبوعية وشهرية"
          ]
        }
      ]
    },
    "seo": {
      id: "seo",
      title: "تحسين محركات البحث (SEO)",
      description: "استراتيجيات ذكية لتحسين ظهور موقعك في نتائج البحث وزيادة الزيارات العضوية",
      longDescription: "نقدم خدمات تحسين محركات البحث (SEO) الشاملة التي تساعد موقعك على تحقيق مراتب متقدمة في نتائج البحث وزيادة الزيارات العضوية. نستخدم أحدث التقنيات والاستراتيجيات المتوافقة مع خوارزميات محركات البحث لتحسين ظهور موقعك وجذب الزوار المهتمين بمنتجاتك أو خدماتك.",
      icon: <FaSearchDollar className="h-10 w-10 text-white" />,
      benefits: [
        "زيادة الظهور في نتائج البحث وتحسين الترتيب",
        "زيادة حركة المرور العضوية إلى موقعك",
        "تحسين معدل التحويل وزيادة المبيعات",
        "بناء سمعة قوية على الإنترنت",
        "تحسين تجربة المستخدم وسهولة الاستخدام",
        "تحليل المنافسين واستغلال الفرص"
      ],
      process: [
        {
          title: "تدقيق SEO الشامل",
          description: "نقوم بتحليل شامل لموقعك الحالي وتحديد نقاط القوة والضعف والفرص للتحسين"
        },
        {
          title: "بحث الكلمات المفتاحية",
          description: "نحدد الكلمات المفتاحية الأكثر فعالية والأقل تنافسية في مجال عملك"
        },
        {
          title: "تحسين الموقع الداخلي",
          description: "نحسن هيكلة الموقع والعناوين والمحتوى والصور والروابط الداخلية وسرعة التحميل"
        },
        {
          title: "تحسين الموقع الخارجي",
          description: "نبني روابط خلفية عالية الجودة من مواقع موثوقة ونحسن حضورك على الإنترنت"
        },
        {
          title: "تحسين المحتوى",
          description: "ننشئ محتوى عالي الجودة مُحسّن لمحركات البحث ويلبي احتياجات المستخدمين"
        },
        {
          title: "المراقبة والتحسين",
          description: "نراقب أداء موقعك باستمرار ونجري التعديلات اللازمة لتحسين النتائج"
        }
      ],
      tools: [
        "SEMrush", "Ahrefs", "Google Analytics", "Google Search Console", "Moz", "Screaming Frog", "Yoast SEO", "PageSpeed Insights"
      ],
      faqs: [
        {
          question: "كم من الوقت يستغرق تحسين محركات البحث لرؤية النتائج؟",
          answer: "تحسين محركات البحث هو استراتيجية طويلة المدى. عادة ما تبدأ في رؤية بعض التحسينات خلال 3-6 أشهر، ولكن النتائج الكبيرة قد تستغرق 6-12 شهراً. تعتمد السرعة على عوامل مثل المنافسة في مجالك وعمر موقعك وحالته الحالية."
        },
        {
          question: "هل تضمنون الوصول إلى المرتبة الأولى في جوجل؟",
          answer: "لا يمكن لأي شركة SEO أن تضمن المرتبة الأولى في جوجل، لأن خوارزميات البحث تتغير باستمرار وهناك العديد من العوامل خارج سيطرتنا. ومع ذلك، نضمن استخدام أفضل الممارسات والاستراتيجيات لتحسين ترتيبك بشكل كبير."
        },
        {
          question: "هل تقدمون خدمات SEO المحلية؟",
          answer: "نعم، نقدم خدمات SEO محلية مخصصة للشركات التي تستهدف عملاء في مناطق جغرافية محددة. نساعدك على الظهور في نتائج البحث المحلية وخرائط جوجل وتحسين ملف نشاطك التجاري على جوجل."
        },
        {
          question: "كيف تقيسون نجاح استراتيجية SEO؟",
          answer: "نقيس النجاح من خلال مجموعة من مؤشرات الأداء الرئيسية مثل ترتيب الكلمات المفتاحية، وحركة المرور العضوية، ومعدل النقر، ومعدل الارتداد، ووقت البقاء على الصفحة، ومعدل التحويل. نقدم تقارير شهرية مفصلة تظهر التقدم في تحقيق أهدافك."
        }
      ],
      pricing: [
        {
          title: "الباقة الأساسية",
          price: "2,500 ريال / شهرياً",
          features: [
            "تدقيق SEO أساسي",
            "بحث 20 كلمة مفتاحية",
            "تحسين 5 صفحات",
            "تحسين العناوين والوصف",
            "تقرير أداء شهري"
          ]
        },
        {
          title: "الباقة المتقدمة",
          price: "5,000 ريال / شهرياً",
          recommended: true,
          features: [
            "تدقيق SEO شامل",
            "بحث 50 كلمة مفتاحية",
            "تحسين 15 صفحة",
            "تحسين المحتوى والصور",
            "بناء 10 روابط خلفية شهرياً",
            "تحسين السرعة والأداء",
            "تقارير أداء أسبوعية"
          ]
        },
        {
          title: "الباقة الاحترافية",
          price: "8,000 ريال / شهرياً",
          features: [
            "تدقيق SEO متقدم",
            "بحث 100+ كلمة مفتاحية",
            "تحسين جميع صفحات الموقع",
            "إنشاء محتوى SEO شهري",
            "بناء 20+ رابط خلفي شهرياً",
            "تحسين تقني شامل",
            "تحليل المنافسين المستمر",
            "تقارير أداء مفصلة أسبوعية"
          ]
        }
      ]
    },

  }

  useEffect(() => {
    // Get service ID from URL params
    const serviceId = params.service as string

    // Check if service exists
    if (services[serviceId]) {
      setService(services[serviceId])
    } else {
      // Redirect to main services page if service not found
      router.push("/intelligent-marketing")
    }
  }, [params.service, router])

  if (!service) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <div className="absolute inset-0 bg-no-repeat bg-cover bg-center z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Elements */}
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
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-orange-500 rounded-full opacity-20 blur-md animate-pulse"></div>
                {service.icon}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">{service.title}</h1>
            
            <div className="h-1 w-24 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mb-8 mx-auto" />
            
            <p className="text-xl text-center text-gray-300 mb-12" dir="rtl">
              {service.description}
            </p>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 mb-12" dir="rtl">
              <p className="text-lg text-gray-300 leading-relaxed">
                {service.longDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-orange-500">اهمية</span> {service.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4 text-right" dir="rtl">
                  <div className="mt-1">
                    <CheckCircle className="h-6 w-6 text-orange-500 flex-shrink-0" />
                  </div>
                  <p className="text-gray-300">{benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-orange-500">الأسئلة</span> الشائعة
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4" dir="rtl">
            {service.faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full px-6 py-4 text-right flex items-center justify-between focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  {activeAccordion === index ? (
                    <ChevronUp className="text-orange-500" size={20} />
                  ) : (
                    <ChevronDown className="text-orange-500" size={20} />
                  )}
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    activeAccordion === index ? "max-h-96 pb-4" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-10">
            <div className="text-center">
              <div className="inline-block bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-full mb-6">
                <FaRocket className="text-black" size={24} />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">هل أنت جاهز لتعزيز استراتيجيتك التسويقية؟</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                تواصل معنا اليوم لمناقشة كيف يمكننا مساعدتك في تحقيق أهدافك التسويقية من خلال {service.title}.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-black px-8 py-1.5 rounded-full hover:from-orange-600 hover:to-orange-700 transition duration-300 font-bold flex items-center gap-2 shadow shadow-orange-500/20 hover:shadow-orange-500/40 transform">
                    <span>تواصل معنا الآن</span>
                  </button>
                </Link>
                <a href="https://wa.me/+201278183718">
                  <button className="bg-green-500 text-white px-8 py-1.5 rounded-full hover:bg-green-600 transition duration-300 font-bold flex items-center gap-2 shadow shadow-green-500/20 hover:shadow-green-500/40 transform">
                    <span>واتساب</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <FloatingWhatsAppIcon />
    </div>
  )
}
