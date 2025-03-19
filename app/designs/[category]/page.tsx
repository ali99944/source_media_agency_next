"use client"

import React, { useCallback } from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Brush,
  ChevronRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import FloatingWhatsAppIcon from "@/src/components/shared/floating-whatsapp"
import Footer from "@/src/components/shared/footer"
import { CardLoader, PageLoader } from "@/src/components/shared/loaders"
import Navbar from "@/src/components/shared/navbar"
import Image from "next/image"
import { getSingleDesignServiceByCode } from "@/src/server-actions/services-actions"
import useGetServerData from "@/src/hooks/use-get-server-data"




export default function DesignShowcasePage() {
  const params = useParams()
  const categoryId = params.category as string

  // Refs
  const headerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50, 100])

  const getDesignServiceCallback = useCallback(async () => {
    const service = await getSingleDesignServiceByCode(categoryId)

    return service
  }, [categoryId])

  const { data: service, isLoading } = useGetServerData(getDesignServiceCallback, null)

  if(isLoading || !service){
    return <PageLoader />
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
        <Navbar />

      {/* Header Section */}
      <div ref={headerRef} className="relative overflow-hidden pt-20 pb-10">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-10`}></div>

          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute h-full w-full">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`grid-h-${i}`}
                  className="absolute h-px bg-white/80 w-full"
                  style={{ top: `${i * 10}%` }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              ))}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`grid-v-${i}`}
                  className="absolute w-px bg-white/80 h-full"
                  style={{ left: `${i * 10}%` }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-8 py-10"
            style={{ opacity, scale, y }}
          >
            <div className="md:w-2/3">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/designs" className="text-white/70 hover:text-white transition-colors">
                  التصاميم
                </Link>
                <ChevronRight className="h-4 w-4 text-white/50" />
                <span className="text-orange-500">{service.name}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.name}</h1>
              <div className={`h-1 w-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6`} />
              <p className="text-lg text-white/80 max-w-2xl mb-6">{service.description}</p>

              <div className="flex flex-wrap gap-2">
                {service.showcases.map((subcategory, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-white/10 transition-colors"
                  >
                    {subcategory.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="md:w-1/3 flex justify-center">
              <div className="relative">
                <div
                  className={`absolute -inset-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full opacity-20 blur-md animate-pulse`}
                ></div>
                <div className={`bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-full relative z-10`}>
                  <Brush className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20 mt-8">


        {/* Projects Grid */}
        {isLoading ? (
          <CardLoader count={6} />
        ) : service.showcases.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">لا توجد نتائج</h3>
            <p className="text-white/70 mb-6">لم نتمكن من العثور على أي مشاريع تطابق معايير البحث الخاصة بك</p>
          </div>
        ) : (
          <>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
              {service.showcases.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative group"
                >                    <div
                className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 "
              >
                <div className={`relative h-72 overflow-hidden`}>
                  <Image
                    fill
                    
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />



                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold mb-1 line-clamp-1">{project.name}</h3>


                  </div>
                </div>
              </div>

                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>


      {/* Footer */}
      <Footer />
      <FloatingWhatsAppIcon />
    </div>
  )
}

