"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  BarChart2,
  DollarSign,
  ExternalLink,
  Eye,
  Globe,
  Heart,
  LineChart,
  MessageSquare,
  MousePointer,
  PieChart,
  Target,
  Zap,
} from "lucide-react"
import { FaAd, FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa"
import { Badge } from "@/components/ui/badge"
import FloatingWhatsAppIcon from "@/src/components/shared/floating-whatsapp"
import Footer from "@/src/components/shared/footer"
import Navbar from "@/src/components/shared/navbar"
import Image from "next/image"
import TestimonialCard from "@/components/custom/testimonial-card"

// Ad Platform type
type AdPlatform = {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  description: string
  metrics: {
    reach: string
    engagement: string
    conversion: string
  }
}

// Ad Campaign type
type AdCampaign = {
  id: string
  title: string
  client: string
  platform: string
  description: string
  image: string
  metrics: {
    reach: number
    engagement: number
    conversion: number
    roi: number
  }
  tags: string[]
  featured?: boolean
}

// Ad platforms data
const adPlatforms: AdPlatform[] = [
  {
    id: "instagram",
    name: "انستجرام",
    icon: <FaInstagram className="h-6 w-6" />,
    color: "from-purple-600 to-pink-500",
    description: "إعلانات مستهدفة على منصة انستجرام تصل إلى جمهورك المستهدف بدقة عالية",
    metrics: {
      reach: "+500 مليون",
      engagement: "3.5%",
      conversion: "1.85%",
    },
  },
  {
    id: "facebook",
    name: "فيسبوك",
    icon: <FaFacebook className="h-6 w-6" />,
    color: "from-blue-600 to-blue-400",
    description: "حملات إعلانية متكاملة على فيسبوك تستهدف الفئات العمرية والاهتمامات المختلفة",
    metrics: {
      reach: "+2.8 مليار",
      engagement: "2.8%",
      conversion: "1.65%",
    },
  },
  {
    id: "tiktok",
    name: "تيك توك",
    icon: <FaTiktok className="h-6 w-6" />,
    color: "from-black to-gray-800",
    description: "إعلانات إبداعية على تيك توك تجذب الجيل الشاب وتحقق انتشاراً واسعاً",
    metrics: {
      reach: "+1 مليار",
      engagement: "5.2%",
      conversion: "2.1%",
    },
  },
  {
    id: "twitter",
    name: "تويتر",
    icon: <FaTwitter className="h-6 w-6" />,
    color: "from-blue-500 to-blue-300",
    description: "حملات إعلانية مستهدفة على تويتر تصل إلى صناع القرار والمؤثرين",
    metrics: {
      reach: "+330 مليون",
      engagement: "2.5%",
      conversion: "1.4%",
    },
  },
  {
    id: "youtube",
    name: "يوتيوب",
    icon: <FaYoutube className="h-6 w-6" />,
    color: "from-red-600 to-red-400",
    description: "إعلانات فيديو احترافية على يوتيوب تحقق مشاهدات عالية ومعدلات تحويل مرتفعة",
    metrics: {
      reach: "+2.3 مليار",
      engagement: "3.2%",
      conversion: "1.9%",
    },
  },
  {
    id: "google",
    name: "جوجل",
    icon: <Globe className="h-6 w-6" />,
    color: "from-green-500 to-green-300",
    description: "إعلانات بحث وعرض على شبكة جوجل الإعلانية تستهدف العملاء المحتملين بدق��",
    metrics: {
      reach: "+4 مليار",
      engagement: "2.1%",
      conversion: "2.4%",
    },
  },
]

// Ad campaigns data
const adCampaigns: AdCampaign[] = [
  {
    id: "campaign-1",
    title: "حملة إطلاق منتج جديد",
    client: "شركة الفا للإلكترونيات",
    platform: "instagram",
    description: "حملة إعلانية متكاملة لإطلاق سماعات لاسلكية جديدة استهدفت الشباب من 18-35 سنة",
    image: "/placeholder.svg?height=600&width=800",
    metrics: {
      reach: 250000,
      engagement: 4.8,
      conversion: 2.3,
      roi: 320,
    },
    tags: ["إطلاق منتج", "إعلانات فيديو", "إعلانات صور", "استهداف"],
    featured: true,
  },
  {
    id: "campaign-2",
    title: "حملة زيادة المبيعات الموسمية",
    client: "متجر أزياء بيتا",
    platform: "facebook",
    description: "حملة إعلانية لزيادة مبيعات تشكيلة الصيف الجديدة مع عروض خاصة وخصومات",
    image: "/placeholder.svg?height=600&width=800",
    metrics: {
      reach: 180000,
      engagement: 3.5,
      conversion: 1.9,
      roi: 280,
    },
    tags: ["تخفيضات", "إعلانات كاروسيل", "استهداف", "إعادة استهداف"],
    featured: true,
  },
  {
    id: "campaign-3",
    title: "حملة توعوية صحية",
    client: "مستشفى جاما",
    platform: "twitter",
    description: "حملة توعوية عن أهمية الفحص المبكر للسرطان استهدفت الفئات العمرية فوق 40 سنة",
    image: "/placeholder.svg?height=600&width=800",
    metrics: {
      reach: 120000,
      engagement: 5.2,
      conversion: 3.1,
      roi: 210,
    },
    tags: ["توعية", "صحة", "إعلانات فيديو", "استهداف دقيق"],
  },
  {
    id: "campaign-4",
    title: "حملة إطلاق تطبيق جديد",
    client: "شركة دلتا للتقنية",
    platform: "tiktok",
    description: "حملة إعلانية لإطلاق تطبيق جديد للتواصل الاجتماعي استهدفت المراهقين والشباب",
    image: "/placeholder.svg?height=600&width=800",
    metrics: {
      reach: 350000,
      engagement: 6.7,
      conversion: 2.8,
      roi: 410,
    },
    tags: ["تطبيقات", "جيل Z", "فيديوهات قصيرة", "تحدي"],
    featured: true,
  },
  {
    id: "campaign-5",
    title: "حملة تسويق عقاري",
    client: "شركة إبسيلون العقارية",
    platform: "google",
    description: "حملة إعلانية لتسويق مشروع سكني جديد في منطقة راقية استهدفت أصحاب الدخل المرتفع",
    image: "/placeholder.svg?height=600&width=800",
    metrics: {
      reach: 90000,
      engagement: 2.9,
      conversion: 1.5,
      roi: 350,
    },
    tags: ["عقارات", "استهداف دقيق", "إعلانات بحث", "إعلانات عرض"],
  },
  {
    id: "campaign-6",
    title: "حملة تعليمية",
    client: "أكاديمية زيتا",
    platform: "youtube",
    description: "حملة إعلانية للترويج لدورات تعليمية عبر الإنترنت في مجال البرمجة والتصميم",
    image: "/placeholder.svg?height=600&width=800",
    metrics: {
      reach: 200000,
      engagement: 4.1,
      conversion: 2.5,
      roi: 290,
    },
    tags: ["تعليم", "دورات", "فيديو", "استهداف اهتمامات"],
  },
]


// Testimonials data
const testimonials = [
  {
    id: "testimonial-1",
    name: "محمد العتيبي",
    position: "مدير التسويق",
    company: "شركة الفا للإلكترونيات",
    text: "حققت حملاتنا الإعلانية مع Source Media نتائج مذهلة تجاوزت توقعاتنا. زادت المبيعات بنسبة 45% خلال فترة الحملة.",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "testimonial-2",
    name: "سارة الشمري",
    position: "مديرة العلامة التجارية",
    company: "متجر أزياء بيتا",
    text: "الفريق احترافي ومبدع في تصميم الإعلانات وإدارة الحملات. استطاعوا فهم هويتنا التجارية وعكسها في الإعلانات بشكل رائع.",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "testimonial-3",
    name: "خالد السعيد",
    position: "الرئيس التنفيذي",
    company: "شركة دلتا للتقنية",
    text: "تعاملنا مع Source Media لإطلاق تطبيقنا الجديد، وكانت النتائج مبهرة. حققنا أكثر من 100,000 تحميل خلال الأسبوع الأول.",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
]

export default function SponsoredAdsPage() {
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0)
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50, 100])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])


  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <div className="absolute inset-0 bg-no-repeat bg-cover bg-center z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="h-screen relative overflow-hidden pt-20">
        {/* Creative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Ad Frames Animation */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`frame-${i}`}
              className="absolute rounded-lg border-2 border-orange-500/30 backdrop-blur-sm"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 150 + 100}px`,
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                opacity: 0.3,
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.4, 0.2],
                rotate: [0, Math.random() * 5 - 2.5, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 0.5,
              }}
            >
              {/* Ad Content Simulation */}
              <div className="absolute inset-2">
                <div className="w-full h-2 bg-white/20 rounded-full mb-2"></div>
                <div className="w-3/4 h-2 bg-white/20 rounded-full mb-4"></div>
                <div className="w-full h-12 bg-white/10 rounded-md mb-2"></div>
                <div className="flex justify-between items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20"></div>
                  <div className="w-16 h-6 rounded-full bg-orange-500/30"></div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Metrics Animation */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`metric-${i}`}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 30 - 15],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: Math.random() * 8 + 7,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              {
                [
                  <LineChart key="line" className="text-orange-500/40" size={Math.random() * 20 + 15} />,
                  <BarChart2 key="bar" className="text-orange-500/40" size={Math.random() * 20 + 15} />,
                  <PieChart key="pie" className="text-orange-500/40" size={Math.random() * 20 + 15} />,
                  <Target key="target" className="text-orange-500/40" size={Math.random() * 20 + 15} />,
                  <Eye key="eye" className="text-orange-500/40" size={Math.random() * 20 + 15} />,
                  <Heart key="heart" className="text-orange-500/40" size={Math.random() * 20 + 15} />,
                  <MousePointer key="mouse" className="text-orange-500/40" size={Math.random() * 20 + 15} />,
                ][Math.floor(Math.random() * 7)]
              }
            </motion.div>
          ))}

          {/* Cursor Trails */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`cursor-${i}`}
              className="absolute w-4 h-4 rounded-full bg-orange-500/20 backdrop-blur-sm"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [
                  Math.random() * 500 - 250,
                  Math.random() * 500 - 250,
                  Math.random() * 500 - 250,
                  Math.random() * 500 - 250,
                ],
                y: [
                  Math.random() * 500 - 250,
                  Math.random() * 500 - 250,
                  Math.random() * 500 - 250,
                  Math.random() * 500 - 250,
                ],
                scale: [1, 1.5, 0.8, 1],
                opacity: [0.2, 0.6, 0.4, 0.2],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                times: [0, 0.33, 0.66, 1],
                delay: i * 2,
              }}
            />
          ))}

          {/* Radial Gradient */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-orange-500/10 to-transparent opacity-50" />
        </div>

        <motion.div
          className="relative w-full h-full flex flex-col justify-center items-center text-center p-4 z-10"
          style={{ opacity, scale, y }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-orange-500 rounded-full opacity-20 blur-md animate-pulse"></div>
              <FaAd className="text-orange-500 relative z-10" size={50} />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            الإعلانات <span className="text-orange-500">المدفوعة</span>
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
            نقدم خدمات إعلانية مدفوعة مبتكرة ومستهدفة على جميع منصات التواصل الاجتماعي ومحركات البحث.
            <span className="text-orange-400 font-bold"> نصمم حملات إعلانية </span>
            تحقق أهدافك التسويقية وتصل إلى جمهورك المستهدف بدقة عالية.
          </motion.p>

          {/* Animated Metrics */}
          <motion.div
            className="flex flex-wrap justify-center gap-12 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="text-center">
              <motion.div
                className="text-3xl md:text-4xl font-bold text-orange-500 flex items-center gap-2 justify-center"
              >
                <Target size={24} />
                <span>+250%</span>
              </motion.div>
              <div className="text-sm text-white/70">زيادة في معدل التحويل</div>
            </div>

            <div className="text-center">
              <motion.div
                className="text-3xl md:text-4xl font-bold text-orange-500 flex items-center gap-2 justify-center"
              >
                <Eye size={24} />
                <span>+500K</span>
              </motion.div>
              <div className="text-sm text-white/70">مشاهدات شهرية</div>
            </div>

            <div className="text-center">
              <motion.div
                className="text-3xl md:text-4xl font-bold text-orange-500 flex items-center gap-2 justify-center"
              >
                <DollarSign size={24} />
                <span>+320%</span>
              </motion.div>
              <div className="text-sm text-white/70">عائد على الاستثمار</div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <a href="#platforms">
              <button className="bg-orange-500 text-black px-8 py-2 rounded-full hover:bg-orange-600 transition duration-300 cursor-pointer font-bold flex items-center gap-2 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40">
                <span>منصات الإعلان</span>
                <ArrowRight size={18} />
              </button>
            </a>
            <a href="#campaigns">
              <button className="bg-transparent border-2 border-orange-500 text-orange-500 px-8 py-2 rounded-full hover:bg-orange-500 hover:text-black transition duration-300 cursor-pointer font-bold flex items-center gap-2">
                <span>حملاتنا الناجحة</span>
                <ExternalLink size={18} />
              </button>
            </a>
          </motion.div>


        </motion.div>
      </div>


      {/* Campaigns Showcase */}
      <section id="campaigns" className="py-20 bg-black/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              حملاتنا <span className="text-orange-500">الناجحة</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mb-6 mx-auto" />
            <p className="text-xl max-w-3xl mx-auto text-gray-300" dir="rtl">
              نماذج من الحملات الإعلانية الناجحة التي نفذناها لعملائنا وحققت نتائج استثنائية
            </p>
          </motion.div>

          {/* Campaigns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adCampaigns.map((campaign, index) => {
              // Find platform data
              const platform = adPlatforms.find((p) => p.id === campaign.platform)

              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/5 transition-all duration-300 h-full flex flex-col">
                    {/* Campaign Image */}
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        fill
                        src={'https://img.freepik.com/premium-photo/influencer-marketing-job-concept_23-2150410537.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid'}
                        alt={campaign.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                      {/* Platform Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className={`bg-gradient-to-r ${platform?.color || "from-orange-500 to-orange-600"}`}>
                          <div className="flex items-center gap-1">
                            {platform?.icon}
                            <span className="text-white">{platform?.name}</span>
                          </div>
                        </Badge>
                      </div>

                      {/* Featured Badge */}
                      {campaign.featured && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-orange-500 text-black">
                            <div className="flex items-center gap-1">
                              <Zap size={12} />
                              <span>مميز</span>
                            </div>
                          </Badge>
                        </div>
                      )}

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold mb-1">{campaign.title}</h3>
                        <p className="text-sm text-white/70">{campaign.client}</p>
                      </div>
                    </div>

                    {/* Campaign Details */}
                    <div className="p-4 flex-grow flex flex-col" dir="rtl">
                      <p className="text-white/70 mb-4">{campaign.description}</p>

                      {/* Metrics */}
                      {/* <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Eye size={16} className="text-orange-500" />
                            <span className="text-sm text-white/60">الوصول</span>
                          </div>
                          <div className="font-bold text-lg">{campaign.metrics.reach.toLocaleString()}</div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Heart size={16} className="text-orange-500" />
                            <span className="text-sm text-white/60">التفاعل</span>
                          </div>
                          <div className="font-bold text-lg">{campaign.metrics.engagement}%</div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Target size={16} className="text-orange-500" />
                            <span className="text-sm text-white/60">التحويل</span>
                          </div>
                          <div className="font-bold text-lg">{campaign.metrics.conversion}%</div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign size={16} className="text-orange-500" />
                            <span className="text-sm text-white/60">العائد</span>
                          </div>
                          <div className="font-bold text-lg">{campaign.metrics.roi}%</div>
                        </div>
                      </div> */}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {campaign.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="bg-white/5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                </motion.div>
              )
            })}
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
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
              آراء <span className="text-orange-500">عملائنا</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mb-6 mx-auto" />
            <p className="text-xl max-w-3xl mx-auto text-gray-300" dir="rtl">
              نفخر بثقة عملائنا ونسعد بمشاركة تجاربهم مع خدماتنا الإعلانية
            </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <AnimatePresence mode="wait">
                {testimonials.map(
                  (testimonial, index) =>
                    activeTestimonial === index && (
                      <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ),
                )}
              </AnimatePresence>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index ? "bg-orange-500 w-8" : "bg-gray-500"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-block bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-full mb-6">
                <MessageSquare className="text-black" size={24} />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">هل أنت جاهز لبدء حملتك الإعلانية؟</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                تواصل معنا اليوم لمناقشة احتياجاتك الإعلانية وكيف يمكننا مساعدتك في تحقيق أهدافك التسويقية وزيادة
                مبيعاتك.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-black px-8 py-1.5 rounded-full hover:from-orange-600 hover:to-orange-700 transition duration-300 font-bold flex items-center gap-2 shadow shadow-orange-500/20 hover:shadow-orange-500/40 transform">
                    <span>تواصل معنا</span>
                  </button>
                </Link>
                <a href="https://wa.me/+201278183718">
                  <button className="bg-green-500 text-white px-8 py-1.5 rounded-full hover:bg-green-600 transition duration-300 font-bold flex items-center gap-2 shadow shadow-green-500/20 hover:shadow-green-500/40 transform">
                    <span>تواصل عبر واتساب</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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

