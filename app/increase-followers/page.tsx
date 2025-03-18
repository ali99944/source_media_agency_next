"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  MessageSquare,
  CheckCircle,
  ChevronDown,
  Send,
  Users,
  TrendingUp,
  Shield,
  Sparkles,
  Target,
  BarChart2,
  Eye,
  Heart,
} from "lucide-react"
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
  FaLinkedin,
  FaSnapchat,
  FaRegStar,
  FaStar,
} from "react-icons/fa"
import { motion } from "framer-motion"
import Footer from "@/src/components/shared/footer"
import FloatingWhatsAppIcon from "@/src/components/shared/floating-whatsapp"
import Navbar from "@/src/components/shared/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FollowersIncrease() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [selectedPlatform, setSelectedPlatform] = useState<string>("instagram")
  const [targetAudience, setTargetAudience] = useState<string[]>([])

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success")
      // Reset form after success
      if (formRef.current) {
        formRef.current.reset()
      }
    }, 1500)
  }

  const toggleTargetAudience = (audience: string) => {
    if (targetAudience.includes(audience)) {
      setTargetAudience(targetAudience.filter((item) => item !== audience))
    } else {
      setTargetAudience([...targetAudience, audience])
    }
  }

  const platforms = [
    { id: "instagram", name: "Instagram", icon: FaInstagram },
    { id: "tiktok", name: "TikTok", icon: FaTiktok },
    { id: "facebook", name: "Facebook", icon: FaFacebook },
    { id: "twitter", name: "Twitter", icon: FaFacebook },
    { id: "youtube", name: "YouTube", icon: FaYoutube },
    { id: "linkedin", name: "LinkedIn", icon: FaLinkedin },
    { id: "snapchat", name: "Snapchat", icon: FaSnapchat },
  ]

  const faqs = [
    {
      question: "هل المتابعين حقيقيين أم وهميين؟",
      answer:
        "نحن نقدم متابعين حقيقيين ونشطين من خلال استراتيجيات استهداف متقدمة. نحن لا نستخدم الحسابات الوهمية أو البوتات التي قد تضر بحسابك.",
    },
    {
      question: "كم من الوقت يستغرق ظهور النتائج؟",
      answer: "تبدأ النتائج في الظهور خلال 24-48 ساعة من بدء الحملة، وتستمر في النمو تدريجياً خلال فترة الخدمة المحددة.",
    },
    {
      question: "هل هناك خطر على حسابي؟",
      answer:
        "لا، خدماتنا آمنة تماماً وتتوافق مع سياسات منصات التواصل الاجتماعي. نحن نستخدم استراتيجيات تسويقية شرعية لزيادة متابعيك بطريقة طبيعية.",
    },
    {
      question: "هل يمكنني استهداف جمهور محدد؟",
      answer:
        "نعم، نقدم خيارات استهداف متقدمة تتيح لك تحديد الجمهور المستهدف بناءً على العمر والموقع الجغرافي والاهتمامات وعوامل أخرى.",
    },
    {
      question: "ماذا أحتاج لبدء الخدمة؟",
      answer:
        "تحتاج فقط إلى تزويدنا برابط حسابك على منصة التواصل الاجتماعي. لا نطلب كلمات المرور أو معلومات حساسة أخرى.",
    },
  ]

  const testimonials = [
    {
      name: "سارة الأحمد",
      role: "مؤثرة على انستجرام",
      content: "زاد عدد متابعيني بشكل كبير خلال شهر واحد فقط! الخدمة ممتازة والنتائج حقيقية ومستدامة.",
      platform: "instagram",
      increase: "8.5K",
    },
    {
      name: "محمد العتيبي",
      role: "صاحب متجر إلكتروني",
      content: "ساعدتني خدمة زيادة المتابعين في الوصول إلى جمهور أكبر وزيادة مبيعاتي بنسبة 40%.",
      platform: "tiktok",
      increase: "15K",
    },
    {
      name: "فاطمة الزهراني",
      role: "مدونة محتوى",
      content: "خدمة احترافية وفريق عمل متعاون. النتائج فاقت توقعاتي وأنصح بها بشدة.",
      platform: "youtube",
      increase: "12K",
    },
  ]

  // Showcase examples
  const showcaseItems = [
    {
      platform: "instagram",
      accountName: "@fashion_store",
      beforeCount: "2.5K",
      afterCount: "15K",
      duration: "2 أشهر",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      platform: "tiktok",
      accountName: "@food_recipes",
      beforeCount: "5K",
      afterCount: "50K",
      duration: "3 أشهر",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      platform: "youtube",
      accountName: "@tech_reviews",
      beforeCount: "10K",
      afterCount: "100K",
      duration: "4 أشهر",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      platform: "facebook",
      accountName: "@local_business",
      beforeCount: "1K",
      afterCount: "12K",
      duration: "2 أشهر",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <div className="absolute inset-0 bg-no-repeat bg-cover bg-center">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="h-screen bg-black relative overflow-hidden">
        {/* Creative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Social Media Icons Animation */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`icon-${i}`}
              className="absolute text-orange-500"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 30 + 20}px`,
              }}
              animate={{
                y: [0, Math.random() * 50 - 25],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              {
                [
                  <FaInstagram key="instagram" />,
                  <FaTiktok key="tiktok" />,
                  <FaFacebook key="facebook" />,
                  <FaYoutube key="youtube" />,
                  <FaLinkedin key="linkedin" />,
                  <FaSnapchat key="snapchat" />,
                ][Math.floor(Math.random() * 6)]
              }
            </motion.div>
          ))}

          {/* Follower Count Elements */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`count-${i}`}
              className="absolute text-orange-500 font-bold"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
              }}
              animate={{
                y: [0, Math.random() * 30 - 15],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 8 + 7,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              {["+100", "+500", "+1K", "+5K", "+10K", "+50K", "+100K"][Math.floor(Math.random() * 7)]}
            </motion.div>
          ))}

          {/* Metrics Animation */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`metric-${i}`}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 30 - 15],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 8 + 7,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              {
                [
                  <BarChart2 key="bar" className="text-orange-500/20" size={Math.random() * 20 + 15} />,
                  <Target key="target" className="text-orange-500/20" size={Math.random() * 20 + 15} />,
                  <Eye key="eye" className="text-orange-500/20" size={Math.random() * 20 + 15} />,
                  <Heart key="heart" className="text-orange-500/20" size={Math.random() * 20 + 15} />,
                  <Users key="users" className="text-orange-500/20" size={Math.random() * 20 + 15} />,
                ][Math.floor(Math.random() * 5)]
              }
            </motion.div>
          ))}
        </div>

        <div className="w-full h-full flex flex-col justify-center items-center text-center p-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-white mb-4"
          >
            زيادة <span className="text-orange-500">المتابعين</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white max-w-2xl mb-8"
            dir="rtl"
          >
            نساعدك في زيادة متابعينك على جميع منصات التواصل الاجتماعي بطريقة آمنة وفعالة
          </motion.p>

          {/* Social Media Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  selectedPlatform === platform.id
                    ? "bg-orange-500 text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <platform.icon size={24} />
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-row justify-center gap-4 mt-4 z-10"
          >
            <a href="#contact-form">
              <button className="bg-orange-500 text-black px-6 py-3 rounded-full hover:bg-orange-600 transition duration-300 cursor-pointer font-bold flex items-center gap-2">
                <MessageSquare size={18} />
                <span>طلب الخدمة</span>
              </button>
            </a>
            <a href="https://wa.me/+201278183718">
              <button className="bg-white/10 text-white px-6 py-3 rounded-full hover:bg-white/20 transition duration-300 cursor-pointer font-bold flex items-center gap-2">
                <FaWhatsapp size={18} />
                <span>تواصل معنا</span>
              </button>
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
          >
            <ChevronDown size={32} className="text-orange-500" />
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Followers Added */}
            <div className="bg-white/10 rounded-lg p-6">
              <div className="bg-orange-500 text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">متابعين تمت إضافتهم</h3>
              <p className="text-center text-orange-500 font-bold text-3xl">500,000+</p>
            </div>

            {/* Satisfied Clients */}
            <div className="bg-white/10 rounded-lg p-6">
              <div className="bg-orange-500 text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">عميل راضٍ</h3>
              <p className="text-center text-orange-500 font-bold text-3xl">1,200+</p>
            </div>

            {/* Growth Rate */}
            <div className="bg-white/10 rounded-lg p-6">
              <div className="bg-orange-500 text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">نسبة رضا العملاء</h3>
              <p className="text-center text-orange-500 font-bold text-3xl">98%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-right" dir="rtl">
                لماذا تحتاج إلى زيادة متابعينك؟
              </h2>

              <div className="space-y-6 text-right" dir="rtl">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <TrendingUp className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">زيادة الوصول والتأثير</h3>
                    <p className="text-gray-400">
                      كلما زاد عدد متابعيك، زاد وصول محتواك إلى جمهور أكبر، مما يعزز تأثيرك وانتشارك.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Shield className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">بناء المصداقية والثقة</h3>
                    <p className="text-gray-400">
                      الحسابات ذات المتابعين الكثيرين تحظى بثقة أكبر من الجمهور والعملاء المحتملين.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <TrendingUp className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">فرص تسويقية وتجارية أكبر</h3>
                    <p className="text-gray-400">
                      زيادة المتابعين تفتح أبواباً للتعاون مع العلامات التجارية وتحقيق عائدات من المحتوى.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="bg-white/10 rounded-2xl p-6 border">
                <h3 className="text-2xl font-bold mb-8 text-center text-orange-500">كيف تعمل خدمتنا؟</h3>

                <div className="relative" dir="rtl">
                  {/* Vertical Line */}
                  <div className="absolute right-[22px] top-0 bottom-0 w-1 bg-orange-500/20 z-0"></div>

                  <div className="space-y-12 relative z-10">
                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-black flex items-center justify-center font-bold text-xl">
                        1
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">تحليل الحساب والجمهور المستهدف</h4>
                        <p className="text-gray-400">
                          نقوم بتحليل حسابك الحالي وتحديد الجمهور المستهدف الأمثل لزيادة متابعينك بشكل فعال.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-black flex items-center justify-center font-bold text-xl">
                        2
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">تطوير استراتيجية مخصصة</h4>
                        <p className="text-gray-400">
                          نطور استراتيجية مخصصة لحسابك تتضمن تقنيات متقدمة لجذب المتابعين الحقيقيين المهتمين بمحتواك.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-black flex items-center justify-center font-bold text-xl">
                        3
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">تنفيذ الحملة وتحسينها</h4>
                        <p className="text-gray-400">
                          نبدأ في تنفيذ الحملة ومراقبة أدائها بشكل مستمر، مع إجراء التحسينات اللازمة لتحقيق أفضل
                          النتائج.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-black flex items-center justify-center font-bold text-xl">
                        4
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">تقارير وتحليلات مفصلة</h4>
                        <p className="text-gray-400">
                          نقدم لك تقارير دورية مفصلة عن أداء الحملة ونمو متابعيك، مع توصيات لتحسين أداء حسابك مستقبلاً.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-16 px-4 bg-white/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">أعمالنا السابقة</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              نماذج من حسابات حقيقية قمنا بزيادة متابعيها بشكل كبير
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {showcaseItems.map((item, index) => (
              <div key={index} className="bg-white/10 rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.accountName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {item.platform === "instagram" && <FaInstagram className="text-orange-500" />}
                      {item.platform === "tiktok" && <FaTiktok className="text-orange-500" />}
                      {item.platform === "youtube" && <FaYoutube className="text-orange-500" />}
                      {item.platform === "facebook" && <FaFacebook className="text-orange-500" />}
                      <span className="font-bold">{item.accountName}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">قبل</p>
                      <p className="text-xl font-bold text-white">{item.beforeCount}</p>
                    </div>

                    <div className="flex-1 px-4">
                      <div className="h-1 w-full bg-orange-500"></div>
                      <p className="text-center text-sm text-gray-400 mt-1">{item.duration}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-400">بعد</p>
                      <p className="text-xl font-bold text-orange-500">{item.afterCount}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="text-orange-500">
                          {i < 4 ? <FaStar size={14} /> : <FaRegStar size={14} />}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-orange-500">
                      <TrendingUp size={16} />
                      <span className="font-bold">
                        +{Number.parseInt(item.afterCount) - Number.parseInt(item.beforeCount)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">ماذا يقول عملاؤنا</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">قصص نجاح حقيقية من عملاء استفادوا من خدماتنا</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-6 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-500">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>

                <p className="mb-4 text-right" dir="rtl">
                  {testimonial.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-white/10">
                    {testimonial.platform === "instagram" && <FaInstagram size={14} />}
                    {testimonial.platform === "tiktok" && <FaTiktok size={14} />}
                    {testimonial.platform === "youtube" && <FaYoutube size={14} />}
                    <span>{testimonial.platform}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <TrendingUp size={14} className="text-orange-500" />
                    <span className="font-bold text-orange-500">+{testimonial.increase}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="contact-form" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">ابدأ الآن</h2>
              <p className="text-xl text-gray-400">املأ النموذج التالي وسنتواصل معك لبدء حملة زيادة المتابعين</p>
            </div>

            <div className="bg-white/10 rounded-lg p-8 border border-white/10">
              {formStatus === "success" ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">تم استلام طلبك بنجاح!</h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    سيقوم فريقنا بمراجعة طلبك والتواصل معك خلال 24 ساعة لبدء العمل على زيادة متابعينك.
                  </p>

                  <button
                    onClick={() => setFormStatus("idle")}
                    className="bg-orange-500 text-black px-6 py-3 rounded-full hover:bg-orange-600 transition duration-300 font-bold"
                  >
                    تقديم طلب آخر
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} ref={formRef} dir="rtl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <Input id="name" required className="bg-white/5 border-gray-700 focus:border-orange-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        type="email"
                        id="email"
                        required
                        className="bg-white/5 border-gray-700 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input
                        type="tel"
                        id="phone"
                        required
                        className="bg-white/5 border-gray-700 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="platform">المنصة</Label>
                      <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                        <SelectTrigger className="bg-white/5 border-gray-700">
                          <SelectValue placeholder="اختر المنصة" />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map((platform) => (
                            <SelectItem key={platform.id} value={platform.id}>
                              <div className="flex items-center gap-2">
                                <platform.icon size={16} />
                                <span>{platform.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="account">رابط الحساب</Label>
                    <Input
                      type="url"
                      id="account"
                      required
                      placeholder="https://www.instagram.com/yourusername"
                      className="bg-white/5 border-gray-700 focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="followers">عدد المتابعين المطلوب</Label>
                    <Select defaultValue="1000">
                      <SelectTrigger className="bg-white/5 border-gray-700">
                        <SelectValue placeholder="اختر عدد المتابعين" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000">1,000 متابع</SelectItem>
                        <SelectItem value="2000">2,000 متابع</SelectItem>
                        <SelectItem value="5000">5,000 متابع</SelectItem>
                        <SelectItem value="10000">10,000 متابع</SelectItem>
                        <SelectItem value="20000">20,000 متابع</SelectItem>
                        <SelectItem value="custom">عدد مخصص</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label>الجمهور المستهدف (اختر كل ما ينطبق)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "الشباب",
                        "النساء",
                        "الرجال",
                        "المهتمين بالموضة",
                        "المهتمين بالتقنية",
                        "المهتمين بالطعام",
                        "المهتمين بالرياضة",
                        "المهتمين بالسفر",
                      ].map((audience) => (
                        <div key={audience} className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox
                            id={`audience-${audience}`}
                            checked={targetAudience.includes(audience)}
                            onCheckedChange={() => toggleTargetAudience(audience)}
                          />
                          <Label htmlFor={`audience-${audience}`} className="text-sm">
                            {audience}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="current-followers">عدد المتابعين الحاليين</Label>
                    <Input
                      type="number"
                      id="current-followers"
                      required
                      placeholder="أدخل عدد المتابعين الحاليين"
                      className="bg-white/5 border-gray-700 focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="content-type">نوع المحتوى الذي تقدمه</Label>
                    <Select>
                      <SelectTrigger className="bg-white/5 border-gray-700">
                        <SelectValue placeholder="اختر نوع المحتوى" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fashion">أزياء وموضة</SelectItem>
                        <SelectItem value="food">طعام وطبخ</SelectItem>
                        <SelectItem value="travel">سفر وسياحة</SelectItem>
                        <SelectItem value="tech">تقنية</SelectItem>
                        <SelectItem value="fitness">لياقة وصحة</SelectItem>
                        <SelectItem value="business">أعمال وريادة</SelectItem>
                        <SelectItem value="education">تعليم</SelectItem>
                        <SelectItem value="entertainment">ترفيه</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
                    <Textarea id="notes" rows={5} className="bg-white/5 border-gray-700 focus:border-orange-500" />
                  </div>

                  <Button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="bg-orange-500 hover:bg-orange-600 text-black font-bold w-full"
                    size="lg"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                        <span>جاري الإرسال...</span>
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        <span>إرسال الطلب</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-500">الأسئلة الشائعة</h2>

          <Accordion type="single" collapsible dir="rtl">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-right">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500/20 to-orange-500/5 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">جاهز لزيادة متابعينك؟</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">ابدأ اليوم وشاهد نمو حسابك على وسائل التواصل الاجتماعي</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact-form">
              <button className="bg-orange-500 text-black px-8 py-3 rounded-full hover:bg-orange-600 transition duration-300 font-bold flex items-center gap-2">
                <Sparkles size={18} />
                <span>ابدأ الآن</span>
              </button>
            </a>
            <a href="https://wa.me/+201278183718">
              <button className="bg-white/10 text-white px-8 py-3 rounded-full hover:bg-white/20 transition duration-300 font-bold flex items-center gap-2">
                <FaWhatsapp size={18} />
                <span>تواصل عبر واتساب</span>
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <FloatingWhatsAppIcon />
    </div>
  )
}

