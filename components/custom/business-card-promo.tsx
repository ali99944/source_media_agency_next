"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Share2, Edit, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa"

export default function BusinessCardPromo() {
  const router = useRouter()
  const [isQrAnimating, setIsQrAnimating] = useState(false)

  // QR code animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsQrAnimating(true)
      setTimeout(() => setIsQrAnimating(false), 2000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Redirect to business cards page
  const handleRedirect = () => {
    router.push("/business-cards")
  }

  // Digital card benefits
  const digitalBenefits = [
    {
      icon: <Edit className="w-5 h-5 text-orange-500" />,
      title: "تحديث فوري",
      description: "تحديث معلوماتك في أي وقت",
    },
    {
      icon: <Share2 className="w-5 h-5 text-orange-500" />,
      title: "مشاركة سهلة",
      description: "مشاركة بطاقتك عبر أي وسيلة",
    },
    {
      icon: <BarChart className="w-5 h-5 text-orange-500" />,
      title: "تتبع الأداء",
      description: "إحصائيات مفصلة عن المشاهدات",
    },
  ]

  return (
    <div className="relative overflow-hidden rounded-2xl my-8 ">


      <div className="relative rounded-xl  backdrop-blur-sm p-6 md:p-8 overflow-hidden bg-white/5">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 rtl">
          {/* Content */}
          <div className="flex-1 text-right order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                <span className="text-orange-500">بطاقات الأعمال الرقمية</span> لعلامتك التجارية
              </h3>
              <p className="text-white/80 mb-6 text-sm md:text-base">
                ارتقِ بعملك مع بطاقات أعمال رقمية مبتكرة تجمع بين التصميم الإبداعي وتقنية رمز QR للتواصل الفعال.
              </p>

              {/* Features */}
              <AnimatePresence mode="wait">
              <motion.div
                    key="digital"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 mb-6 grid grid-cols-1 md:grid-cols-2 gap-2"
                  >
                    {digitalBenefits.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm bg-white/5 backdrop-blur-sm p-4 rounded-lg"
                      >
                        <div className="bg-black/30 p-1.5 rounded-full">{feature.icon}</div>
                        <div>
                          <div className="font-bold">{feature.title}</div>
                          <div className="text-xs text-gray-300">{feature.description}</div>
                        </div>
                      </div>
                    ))}

                  </motion.div>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center gap-4"
              >
                <Button
                  onClick={handleRedirect}
                  className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-1.5 rounded-full text-lg font-bold flex items-center gap-2  transition-all duration-300"
                >
                  <span>اكتشف بطاقات الأعمال</span>
                </Button>

                <Button
                  onClick={handleRedirect}
                  className="bg-green-500 hover:bg-green-600 text-black px-6 py-1.5 rounded-full text-lg font-bold flex items-center gap-2  transition-all duration-300"
                >
                  <span>قوالبنا المتاحة</span>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Card Preview */}
          <div className="relative flex-shrink-0 w-48 h-48 md:w-64 md:h-64 order-1 md:order-2">
            <AnimatePresence mode="wait">
            <motion.div
                  key="digital-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  {/* Phone Mockup */}
                  <div className="relative mx-auto w-[220px] h-[400px] bg-gray-900 rounded-[30px] shadow-xl overflow-hidden border-[6px] border-gray-800">
                    {/* Phone Notch */}
                    <div className="absolute top-0 inset-x-0 h-3 bg-black rounded-b-xl"></div>

                    {/* Digital Card UI */}
                    <div className="h-full pt-3 bg-gradient-to-b from-orange-500 to-orange-700 flex flex-col">
                      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                        <div className="flex items-center justify-center w-20 h-20 p-4 bg-black rounded-full mb-3 overflow-hidden">
                          <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            LOGO
                          </div>
                        </div>
                        <h3 className="text-sm font-bold text-white">source media</h3>
                        <p className="text-xs text-white/80 mb-3">تخصص تلميع براندات</p>

                        <div className="grid grid-cols-2 gap-1 w-full mb-4">
                          <div className="bg-black/20 p-1 rounded-lg text-white text-[8px]">
                            <p>الهاتف</p>
                          </div>
                          <div className="bg-black/20 p-1 rounded-lg text-white text-[8px]">
                            <p>البريد</p>
                          </div>
                          <div className="bg-black/20 p-1 rounded-lg text-white text-[8px]">
                            <p>الموقع</p>
                          </div>
                          <div className="bg-black/20 p-1 rounded-lg text-white text-[8px]">
                            <p>العنوان</p>
                          </div>
                        </div>

                        <div className="flex gap-2 mb-4">
                          <div className="bg-black/20 p-1 rounded-full">
                            <FaFacebook className="w-3 h-3 text-white" />
                          </div>
                          <div className="bg-black/20 p-1 rounded-full">
                            <FaInstagram className="w-3 h-3 text-white" />
                          </div>
                          <div className="bg-black/20 p-1 rounded-full">
                            <FaTiktok className="w-3 h-3 text-white" />
                          </div>
                          <div className="bg-black/20 p-1 rounded-full">
                            <FaWhatsapp className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <motion.div
                    className="absolute -bottom-4 -right-4"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="relative">
                      <div className={`bg-white p-2 rounded-lg ${isQrAnimating ? "animate-pulse" : ""}`}>
                        <div className="w-14 h-14 grid grid-cols-5 grid-rows-5 gap-0.5 bg-white">
                          {/* Simplified QR code visual */}
                          {[...Array(25)].map((_, i) => {
                            const row = Math.floor(i / 5)
                            const col = i % 5
                            const isCorner = (row < 2 && col < 2) || (row < 2 && col > 2) || (row > 2 && col < 2)
                            const isPattern = isCorner || Math.random() > 0.6

                            return (
                              <div
                                key={i}
                                className={`${isPattern ? "bg-black" : "bg-white"} ${isCorner ? "rounded-sm" : ""}`}
                              ></div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
            </AnimatePresence>
          </div>
        </div>


        {/* Floating elements */}
        <motion.div
          className="absolute top-2 left-2 bg-orange-500 text-black font-bold px-3 py-1 rounded-full text-sm"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          جديد!
        </motion.div>
      </div>
    </div>
  )
}

