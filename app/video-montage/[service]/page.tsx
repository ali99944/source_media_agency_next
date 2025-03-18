"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"

import { CheckCircle, Film, Video, Camera, Edit, Play, Tv, Scissors } from 'lucide-react'
import Footer from "@/src/components/shared/footer"
import FloatingWhatsAppIcon from "@/src/components/shared/floating-whatsapp"
import Navbar from "@/src/components/shared/navbar"
import FaqItem from "@/components/custom/faq-item"
import Image from "next/image"

// Service type definition
type VideoService = {
  id: string
  title: string
  description: string
  longDescription: string
  icon: React.ReactNode
  benefits: string[]
  faqs: {
    question: string
    answer: string
  }[]

  portfolio: {
    title: string
    category: string
    thumbnail: string
    videoUrl?: string
  }[]
}

export default function ServiceDetails() {
  const params = useParams()
  const router = useRouter()
  const [service, setService] = useState<VideoService | null>(null)
  const [, setActiveVideo] = useState<string | null>(null)

  // Toggle accordion
  

  // Open video modal
  const openVideo = (videoUrl: string) => {
    setActiveVideo(videoUrl)
    document.body.style.overflow = 'hidden'
  }


  // Video services data
  const services: Record<string, VideoService> = {
    "corporate-videos": {
      id: "corporate-videos",
      title: "فيديوهات الشركات",
      description: "فيديوهات احترافية تعرض هوية شركتك وخدماتها ومنتجاتها بطريقة جذابة ومؤثرة",
      longDescription: "نقدم خدمات إنتاج فيديوهات الشركات الاحترافية التي تساعد في عرض هوية شركتك وخدماتها ومنتجاتها بطريقة جذابة ومؤثرة. نستخدم أحدث التقنيات والمعدات لإنتاج فيديوهات عالية الجودة تعكس احترافية علامتك التجارية وتساعد في بناء الثقة مع عملائك وشركائك.",
      icon: <Tv className="h-10 w-10 text-white" />,
      benefits: [
        "عرض هوية الشركة وقيمها بطريقة مرئية جذابة",
        "تعزيز الثقة والمصداقية مع العملاء والشركاء",
        "شرح المنتجات والخدمات بطريقة واضحة ومؤثرة",
        "زيادة التفاعل والمشاركة على المنصات الرقمية",
        "تحسين معدلات التحويل وزيادة المبيعات",
        "تمييز علامتك التجارية عن المنافسين"
      ],
      faqs: [
        {
          question: "كم من الوقت يستغرق إنتاج فيديو شركة؟",
          answer: "تختلف مدة الإنتاج حسب تعقيد المشروع وطول الفيديو. بشكل عام، يستغرق إنتاج فيديو شركة احترافي من 2-4 أسابيع، بدءًا من الاجتماع الأولي وحتى تسليم النسخة النهائية. المشاريع البسيطة قد تستغرق أسبوعًا واحدًا، بينما المشاريع المعقدة قد تستغرق 6-8 أسابيع."
        },
        {
          question: "ما هو الطول المثالي لفيديو الشركة؟",
          answer: "يعتمد الطول المثالي على الغرض من الفيديو وقناة التوزيع. بشكل عام، نوصي بأن تكون فيديوهات الشركة التعريفية بين 1-3 دقائق للحفاظ على اهتمام المشاهد. يمكن أن تكون فيديوهات المنتجات أقصر (30-60 ثانية)، بينما يمكن أن تكون الفيديوهات التدريبية أو التعليمية أطول (5-10 دقائق)."
        },
        {
          question: "هل نحتاج إلى توفير معدات أو مواقع تصوير؟",
          answer: "لا، نحن نوفر جميع المعدات اللازمة للتصوير. بالنسبة لمواقع التصوير، يمكننا التصوير في مقر شركتك أو في استوديو خاص بنا أو في مواقع خارجية حسب متطلبات المشروع. نقوم بالتنسيق الكامل لجميع جوانب الإنتاج."
        },
        {
          question: "هل يمكنني إجراء تعديلات على الفيديو بعد الانتهاء منه؟",
          answer: "نعم، نقدم جولتين من التعديلات مجانًا ضمن السعر الأساسي. نحن نعمل بشكل وثيق معك خلال مرحلة المونتاج لضمان أن الفيديو النهائي يلبي توقعاتك تمامًا. التعديلات الإضافية بعد الجولتين الأوليتين قد تكون بتكلفة إضافية."
        }
      ],
      portfolio: [
        {
          title: "فيديو تعريفي لشركة تقنية",
          category: "فيديوهات الشركات",
          thumbnail: "/placeholder.svg?height=400&width=600",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          title: "عرض منتج جديد لشركة أجهزة إلكترونية",
          category: "فيديوهات المنتجات",
          thumbnail: "/placeholder.svg?height=400&width=600",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          title: "فيديو تدريبي للموظفين الجدد",
          category: "فيديوهات تدريبية",
          thumbnail: "/placeholder.svg?height=400&width=600",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
      ]
    },
    "motion-graphics": {
      id: "motion-graphics",
      title: "موشن جرافيك",
      description: "تصميمات موشن جرافيك مبتكرة لتوضيح الأفكار المعقدة بطريقة بسيطة وجذابة",
      longDescription: "نقدم خدمات تصميم موشن جرافيك احترافية تساعد في توضيح الأفكار المعقدة وعرض المفاهيم بطريقة بسيطة وجذابة. نستخدم أحدث التقنيات والبرامج لإنشاء رسومات متحركة عالية الجودة تجذب انتباه الجمهور وتوصل رسالتك بفعالية.",
      icon: <Film className="h-10 w-10 text-white" />,
      benefits: [
        "توضيح المفاهيم والأفكار المعقدة بطريقة بسيطة",
        "جذب انتباه الجمهور وزيادة معدلات المشاهدة",
        "تحسين فهم المنتجات والخدمات",
        "تعزيز التذكر والاحتفاظ بالمعلومات",
        "تمييز العلامة التجارية بأسلوب إبداعي",
        "سهولة المشاركة على منصات التواصل الاجتماعي"
      ],
      faqs: [
        {
          question: "كم من الوقت يستغرق إنتاج فيديو موشن جرافيك؟",
          answer: "تختلف مدة الإنتاج حسب تعقيد المشروع وطول الفيديو. بشكل عام، يستغرق إنتاج فيديو موشن جرافيك بسيط (30-60 ثانية) حوالي 2-3 أسابيع. الفيديوهات الأطول أو الأكثر تعقيدًا قد تستغرق 4-6 أسابيع."
        },
        {
          question: "ما هو الطول المثالي لفيديو موشن جرافيك؟",
          answer: "يعتمد الطول المثالي على الغرض من الفيديو وتعقيد الموضوع. بشكل عام، نوصي بأن تكون فيديوهات الموشن جرافيك بين 60-90 ثانية للحفاظ على اهتمام المشاهد. الفيديوهات التعليمية أو التوضيحية المفصلة يمكن أن تكون أطول (2-3 دقائق)."
        },
        {
          question: "هل أحتاج إلى تقديم محتوى أو تصاميم؟",
          answer: "لا، نحن نقدم خدمة شاملة تتضمن كتابة النص وتصميم العناصر والتحريك. نحتاج فقط إلى فهم واضح لأهدافك والرسالة التي تريد إيصالها، ونحن نتولى الباقي. بالطبع، إذا كان لديك محتوى أو تصاميم محددة ترغب في استخدامها، فيمكننا دمجها في المشروع."
        },
        {
          question: "هل يمكنني الحصول على ملفات المصدر بعد الانتهاء من المشروع؟",
          answer: "نعم، يمكنك الحصول على ملفات المصدر كجزء من الباقة الاحترافية. في الباقات الأخرى، يمكن إضافة هذه الخدمة برسوم إضافية. ملفات المصدر تتيح لك إجراء تعديلات مستقبلية على الفيديو إذا كان لديك الخبرة والبرامج اللازمة."
        }
      ],

      portfolio: [
        {
          title: "شرح خدمة مالية جديدة",
          category: "موشن جرافيك توضيحي",
          thumbnail: "/placeholder.svg?height=400&width=600",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          title: "فيديو تسويقي لتطبيق جوال",
          category: "موشن جرافيك إعلاني",
          thumbnail: "/placeholder.svg?height=400&width=600",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          title: "شرح عملية طبية معقدة",
          category: "موشن جرافيك تعليمي",
          thumbnail: "/placeholder.svg?height=400&width=600",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
      ]
    },
    "video-editing": {
      id: "video-editing",
      title: "مونتاج الفيديو",
      description: "خدمات مونتاج احترافية لتحويل اللقطات الخام إلى قصة مترابطة وجذابة",
      longDescription: "نقدم خدمات مونتاج فيديو احترافية لتحويل اللقطات الخام إلى قصة مترابطة وجذابة تحقق أهدافك. يقوم فريقنا من المحررين المحترفين باستخدام أحدث البرامج والتقنيات لإنشاء فيديوهات عالية الجودة تجذب انتباه الجمهور وتوصل رسالتك بفعالية.",
      icon: <Scissors className="h-10 w-10 text-white" />,
      benefits: [
        "تحويل اللقطات الخام إلى قصة مترابطة ومؤثرة",
        "تحسين جودة الصورة والصوت",
        "إضافة تأثيرات بصرية وصوتية احترافية",
        "تصحيح الألوان لإعطاء مظهر احترافي",
        "تحسين إيقاع الفيديو للحفاظ على اهتمام المشاهد",
        "توفير الوقت والجهد مقارنة بالمونتاج الذاتي"
      ],
      faqs: [
        {
          question: "كم من الوقت يستغرق مونتاج فيديو؟",
          answer: "تختلف مدة المونتاج حسب طول الفيديو وتعقيده وكمية المواد الخام. بشكل عام، يستغرق مونتاج فيديو بسيط (3-5 دقائق) حوالي 2-3 أيام عمل. الفيديوهات الأطول أو الأكثر تعقيدًا قد تستغرق أسبوعًا أو أكثر."
        },
        {
          question: "ما هي صيغ الملفات التي تقبلونها؟",
          answer: "نقبل معظم صيغ الفيديو الشائعة مثل MP4 و MOV و AVI و MXF وغيرها. نفضل استلام اللقطات بأعلى جودة ممكنة (4K أو HD) للحصول على أفضل النتائج. يمكننا أيضًا التعامل مع ملفات RAW من معظم الكاميرات الاحترافية."
        },
        {
          question: "كيف يمكنني إرسال اللقطات الخام؟",
          answer: "يمكنك إرسال اللقطات الخام عبر خدمات مشاركة الملفات مثل Google Drive أو Dropbox أو WeTransfer. للملفات الكبيرة جدًا، يمكننا توفير FTP خاص أو استلام هارد ديسك خارجي."
        },
        {
          question: "هل يمكنكم إضافة تأثيرات خاصة معقدة؟",
          answer: "نعم، يمكننا إضافة مجموعة واسعة من التأثيرات البصرية والرسومات المتحركة حسب احتياجات المشروع. التأثيرات البسيطة مشمولة في جميع الباقات، بينما التأثيرات المعقدة أو ثلاثية الأبعاد قد تتطلب تكلفة إضافية أو تكون متاحة في الباقات المتقدمة."
        }
      ],
      portfolio: [
        {
          title: "فيلم وثائقي قصير",
          category: "مونتاج فيديو",
          thumbnail: "/placeholder.svg?height=400&width=600",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          title: "فيديو حفل زفاف",
          category: "مونتاج فيديو",
          thumbnail: "/placeholder.svg?height=400&width=600",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          title: "إعلان تجاري",
          category: "مونتاج فيديو",
          thumbnail: "/placeholder.svg?height=400&width=600",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
      ]
    }
  }

  useEffect(() => {
    // Get service ID from URL params
    const serviceId = params.service as string

    // Check if service exists
    if (services[serviceId]) {
      setService(services[serviceId])
    } else {
      // Redirect to main services page if service not found
      router.push("/video-montage")
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
          {/* Film Strip Elements */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-20 w-full bg-white/5 flex items-center justify-around"
              style={{
                top: `${i * 10}%`,
                left: 0,
                transform: 'rotate(-5deg) translateX(-10%)',
                opacity: 0.3,
              }}
            >
              {[...Array(12)].map((_, j) => (
                <div key={j} className="h-12 w-16 bg-black/50 rounded-sm border border-white/10" />
              ))}
            </motion.div>
          ))}
          
          {/* Floating Camera Elements */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`camera-${i}`}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 30 - 15],
                rotate: [0, Math.random() * 20 - 10],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <div className="bg-orange-500/10 p-3 rounded-full backdrop-blur-sm border border-orange-500/20">
                {[<Camera key="cam" />, <Film key="film" />, <Video key="video" />, <Edit key="edit" />][Math.floor(Math.random() * 4)]}
              </div>
            </motion.div>
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
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-12" dir="rtl">
              <p className="text-lg text-gray-300 leading-relaxed">
                {service.longDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-orange-500">فوائد</span> {service.title}
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



      {/* Portfolio Section */}
      <section className="py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-orange-500">معرض</span> أعمالنا
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {service.portfolio.map((item, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => openVideo(item.videoUrl || "")}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <Image 
                    src={item.thumbnail || "/placeholder.svg"} 
                    alt={item.title} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-orange-500 rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-black" />
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      {item.category}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-orange-500">الأسئلة</span> الشائعة
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4" dir="rtl">
            {service.faqs.map((faq, index) => (
              <FaqItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsAppIcon />
      </div>
  )
}
                        
