"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EMenuPromo() {
  const router = useRouter()


  const handleRedirect = () => {
    router.push("/emenu")
  }

  return (
    <div className="relative overflow-hidden p-1 my-12">

      
      <div className="relative rounded-xl backdrop-blur-sm p-6 md:p-8 overflow-hidden bg-white/5">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 rtl">
          <div></div>
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
          className="absolute top-2 left-2 bg-orange-500 text-black font-bold px-3 py-1 rounded-full text-sm"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          جديد!
        </motion.div>
      </div>
    </div>
  )
}
