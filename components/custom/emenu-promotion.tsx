"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EMenuPromo() {
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

  // Redirect to e-menu page
  const handleRedirect = () => {
    router.push("/emenu")
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-black to-black/80 p-1 my-12">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(249,115,22,0.15)_0%,rgba(0,0,0,0)_50%)]"></div>
        
        {/* Animated elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`qr-${i}`}
            className="absolute bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-1"
            style={{
              width: `${Math.random() * 30 + 20}px`,
              height: `${Math.random() * 30 + 20}px`,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              y: [0, Math.random() * 20 - 10],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, Math.random() * 10 - 5],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.5,
            }}
          >
            <div className="w-full h-full bg-white/20 rounded grid grid-cols-3 grid-rows-3 gap-0.5">
              {[...Array(9)].map((_, j) => (
                <div 
                  key={j} 
                  className={`${Math.random() > 0.5 ? 'bg-white/80' : 'bg-transparent'} rounded-sm`}
                ></div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="relative rounded-xl bg-black/60 backdrop-blur-sm p-6 md:p-8 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 rtl">
          {/* QR Code and Phone Mockup */}
          <div className="relative flex-shrink-0 w-48 h-48 md:w-64 md:h-64">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Phone Mockup */}
              <div className="relative w-32 h-56 md:w-40 md:h-64 bg-gray-900 rounded-[24px] shadow-xl overflow-hidden border-[4px] border-gray-800">
                {/* Phone Notch */}
                <div className="absolute top-0 inset-x-0 h-3 bg-black rounded-b-xl"></div>
                
                {/* Menu UI */}
                <div className="h-full pt-3 bg-white flex flex-col">
                  {/* Restaurant Header */}
                  <div className="bg-orange-500 text-black p-2">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold">مطعم الشرق</h3>
                      <div className="bg-black/20 p-0.5 rounded-full">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 7V4C6 2.89543 6.89543 2 8 2H16C17.1046 2 18 2.89543 18 4V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6 7H18C19.1046 7 20 7.89543 20 9V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V9C4 7.89543 4.89543 7 6 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M15 12L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M15 16L9 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <p className="text-[8px]">المأكولات الشرقية الأصيلة</p>
                  </div>
                  
                  {/* Categories */}
                  <div className="p-1 flex gap-1 overflow-x-auto bg-orange-50 text-[6px]">
                    <div className="bg-orange-500 text-black px-1 py-0.5 rounded-full whitespace-nowrap">
                      الكل
                    </div>
                    <div className="bg-white text-gray-700 px-1 py-0.5 rounded-full whitespace-nowrap">
                      المقبلات
                    </div>
                    <div className="bg-white text-gray-700 px-1 py-0.5 rounded-full whitespace-nowrap">
                      الرئيسية
                    </div>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="flex-1 overflow-y-auto p-1 space-y-2">
                    {/* Menu Item 1 */}
                    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
                      <div className="h-10 bg-gray-200 relative">
                        <div className="absolute top-1 right-1 bg-orange-500 text-white text-[5px] px-1 rounded-full">
                          الأكثر طلباً
                        </div>
                      </div>
                      <div className="p-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-gray-800 text-[8px]">كبسة لحم</h4>
                          <span className="text-orange-500 font-bold text-[8px]">65 ريال</span>
                        </div>
                        <p className="text-[6px] text-gray-500">أرز بسمتي مع لحم ضأن</p>
                        <button className="mt-1 bg-orange-500 text-white text-[6px] px-1 rounded-full">
                          إضافة للسلة
                        </button>
                      </div>
                    </div>
                    
                    {/* Menu Item 2 */}
                    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
                      <div className="h-10 bg-gray-200"></div>
                      <div className="p-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-gray-800 text-[8px]">شاورما دجاج</h4>
                          <span className="text-orange-500 font-bold text-[8px]">35 ريال</span>
                        </div>
                        <p className="text-[6px] text-gray-500">شاورما دجاج مع صلصة الثوم</p>
                        <button className="mt-1 bg-orange-500 text-white text-[6px] px-1 rounded-full">
                          إضافة للسلة
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* QR Code */}
              <motion.div
                className="absolute -bottom-4 -right-4"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="relative">
                  <div className={`bg-white p-2 rounded-lg ${isQrAnimating ? 'animate-pulse' : ''}`}>
                    <div className="w-14 h-14 grid grid-cols-5 grid-rows-5 gap-0.5 bg-white">
                      {/* Simplified QR code visual */}
                      {[...Array(25)].map((_, i) => {
                        const row = Math.floor(i / 5);
                        const col = i % 5;
                        const isCorner = (row < 2 && col < 2) || (row < 2 && col > 2) || (row > 2 && col < 2);
                        const isPattern = isCorner || Math.random() > 0.6;
                        
                        return (
                          <div 
                            key={i} 
                            className={`${isPattern ? 'bg-black' : 'bg-white'} ${isCorner ? 'rounded-sm' : ''}`}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="flex-1 text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                <span className="text-orange-500">قائمة طعام إلكترونية</span> لمطعمك
              </h3>
              <div className="h-1 w-24 bg-gradient-to-l from-orange-600 to-orange-400 rounded-full mb-4 mr-auto ml-0" />
              <p className="text-white/80 mb-6 text-sm md:text-base">
                ارتقِ بتجربة عملائك مع قائمة طعام رقمية تفاعلية تعمل برمز QR. حلول عصرية لمطعمك تجمع بين السهولة والابتكار.
              </p>
              
              <div className="space-y-3 mb-6">
                {[
                  "توفير تكاليف الطباعة المتكررة",
                  "تحديث القائمة في أي وقت بسهولة",
                  "عرض صور جذابة وأوصاف تفصيلية للأطباق",
                  "زيادة متوسط قيمة الطلب بنسبة 25%"
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Check className="h-5 w-5 text-orange-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
              
              <Link href="/emenu">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Button 
                  onClick={handleRedirect}
                  className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-6 rounded-full text-lg font-bold flex items-center gap-2 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-300"
                >
                  <span>اكتشف القوائم الإلكترونية</span>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Floating elements */}
        <motion.div
          className="absolute -top-2 -left-2 bg-orange-500 text-black font-bold px-3 py-1 rounded-full text-sm"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          جديد!
        </motion.div>
      </div>
    </div>
  )
}
