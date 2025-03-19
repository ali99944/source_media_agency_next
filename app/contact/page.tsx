"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Phone, Mail, MapPin, Send, CheckCircle, ChevronDown, ChevronUp, MessageCircle } from "lucide-react"
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa"
import Footer from "@/src/components/shared/footer"
import FloatingWhatsAppIcon from "@/src/components/shared/floating-whatsapp"
import Navbar from "@/src/components/shared/navbar"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import useGetServerData from "@/src/hooks/use-get-server-data"
import { getContactsData } from "@/src/server-actions/contacts-data-actions"
import useServerAction from "@/src/hooks/use-server-action"
import { createContactMessage } from "@/src/server-actions/contact-message-actions"

export default function ContactUs() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null)

  const createContactMessageAction = useServerAction(createContactMessage)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")
    
    const data = {
      client_email: (e.currentTarget as HTMLFormElement).email.value,
      client_name: (e.currentTarget as HTMLFormElement).client_name.value,
      client_phone: (e.currentTarget as HTMLFormElement).phone.value,
      message: (e.currentTarget as HTMLFormElement).message.value,
      subject: (e.currentTarget as HTMLFormElement).subject.value
    }

    await createContactMessageAction.mutation(data, {
      onSuccess: () => {
        setFormStatus("success")
        // Reset form after success
        const form = e.target as HTMLFormElement
        form.reset()
      },
      onFailure: () => {
        setFormStatus("error")
      }
    })
  }

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }

  const faqs = [
    {
      question: "ما هي خدمات التسويق التي تقدمونها؟",
      answer:
        "نقدم مجموعة واسعة من خدمات التسويق الرقمي بما في ذلك إدارة وسائل التواصل الاجتماعي، الإعلانات الممولة، تصميم المواقع، تصميم الهوية البصرية، إنتاج الفيديو، وخدمات التسويق الذكي.",
    },
    {
      question: "كيف يمكنني البدء في العمل معكم؟",
      answer:
        "يمكنك التواصل معنا من خلال نموذج الاتصال في هذه الصفحة، أو الاتصال بنا مباشرة عبر الهاتف أو البريد الإلكتروني. سنقوم بترتيب اجتماع لمناقشة احتياجاتك وتقديم خطة تسويقية مخصصة لك.",
    },
    {
      question: "هل تقدمون خدماتكم خارج المملكة العربية السعودية؟",
      answer:
        "نعم، نحن نقدم خدماتنا في جميع دول الخليج وبعض الدول الأجنبية. لدينا خبرة في العمل مع عملاء من مختلف البلدان والثقافات.",
    },
    {
      question: "كم تستغرق مدة تنفيذ حملة تسويقية؟",
      answer:
        "تختلف مدة تنفيذ الحملات التسويقية حسب نوعها وحجمها. عادة ما تستغرق الحملات البسيطة من أسبوع إلى أسبوعين، بينما قد تستغرق الحملات الأكبر والأكثر تعقيدًا من شهر إلى ثلاثة أشهر.",
    },
    {
      question: "هل تقدمون تقارير أداء للحملات التسويقية؟",
      answer:
        "نعم، نقدم تقارير أداء دورية مفصلة لجميع الحملات التسويقية. تتضمن هذه التقارير مؤشرات الأداء الرئيسية والنتائج المحققة والتوصيات للتحسين المستمر.",
    },
  ]
  const heroRef = useRef<HTMLDivElement>(null)


  const { data: contacts_data } = useGetServerData(getContactsData, {
    facebook_account_link: "",
    instagram_account_link: "",
    location: "",
    phone_number: "",
    tiktok_account_link: "",
    whatsapp_phone: "",
    email: "",
    id: 0
  })

  return (
    <div className="min-h-screen bg-black text-white"
      ref={heroRef}
    >
      {/* Navbar */}
        <Navbar />

      {/* Hero Section */}
      <div
        className="relative h-[60vh] overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-background">


          {/* Grid Pattern */}
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={`row-${i}`}
                className="w-full h-px bg-orange-500/50"
                style={{ top: `${(i + 1) * (100 / 24)}%`, position: "absolute", left: 0, right: 0 }}
              />
            ))}
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={`col-${i}`}
                className="h-full w-px bg-orange-500/50"
                style={{ left: `${(i + 1) * (100 / 24)}%`, position: "absolute", top: 0, bottom: 0 }}
              />
            ))}
          </div>



        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <motion.div
                className="relative"
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="absolute -inset-1 bg-orange-500 rounded-full opacity-20 blur-md"></div>
                <div className="relative bg-orange-500 text-white p-3 rounded-full">
                  <MessageCircle size={30} />
                </div>
              </motion.div>
            </div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-6xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              تواصل <span className="text-orange-500">معنا</span>
            </motion.h1>

            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mb-6 mx-auto"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "6rem", opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              dir="rtl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              نحن هنا للإجابة على استفساراتك ومساعدتك في تحقيق أهدافك التسويقية. فريقنا المتخصص جاهز للاستماع إليك
              وتقديم الحلول المناسبة لاحتياجاتك.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >

              <a href={`https://wa.me/${contacts_data?.phone_number}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600 gap-2 rounded-full px-6"
                >
                  <FaWhatsapp size={18} />
                  <span>واتساب</span>
                </Button>
              </a>
            </motion.div>
          </motion.div>


        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 relative ">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone Card */}
            <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm shadow-md">
              <div className="bg-orange-500 text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone size={28} />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">اتصل بنا</h3>
              <p className="text-center text-gray-300 mb-4">نحن متاحون للرد على استفساراتك</p>
              <p className="text-center text-orange-500 font-bold">{contacts_data?.phone_number}</p>
            </div>

            {/* Email Card */}
            <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm shadow-md">
              <div className="bg-orange-500 text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail size={28} />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">البريد الإلكتروني</h3>
              <p className="text-center text-gray-300 mb-4">راسلنا عبر البريد الإلكتروني</p>
              <p className="text-center text-orange-500 font-bold">{contacts_data?.email}</p>
            </div>

            {/* Location Card */}
            <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm shadow-md">
              <div className="bg-orange-500 text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">موقعنا</h3>
              <p className="text-center text-gray-300 mb-4">زورنا في مكتبنا</p>
              <p className="text-center text-orange-500 font-bold" dir="rtl">
                {contacts_data?.location}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section id="contact-form" className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="">
            {/* Contact Form */}
            <div className="">
              <div className="bg-white/5 rounded-lg p-4 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-orange-500 text-right" dir="rtl">
                  أرسل لنا رسالة
                </h2>

                {formStatus === "success" ? (
                  <div className="bg-green-500/20 border  rounded-lg p-6 text-center">
                    <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
                    <h3 className="text-xl font-bold mb-2">تم إرسال رسالتك بنجاح!</h3>
                    <p className="text-gray-300">سنقوم بالرد عليك في أقرب وقت ممكن.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} dir="rtl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="client_name" className="block text-sm font-medium mb-2">
                          الاسم
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="client_name"
                          placeholder="الاسم بالكامل"
                          required
                          className="w-full bg-white/5 border border-gray-700 rounded px-4 py-2 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          البريد الإلكتروني
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="2Ks8o@example.com"
                          className="w-full bg-white/5 border border-gray-700 rounded px-4 py-2 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="0501234567"
                        dir="rtl"
                        id="phone"
                        className="w-full bg-white/5 border border-gray-700 rounded px-4 py-2 focus:outline-none placeholder:text-right"
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        الموضوع
                      </label>
                      <input
                        type="text"
                        id="subject"
                        placeholder="موضوع الرسالة"
                        name="subject"
                        required
                        className="w-full bg-white/5 border border-gray-700 rounded px-4 py-2 focus:outline-none"
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        الرسالة
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        className="w-full bg-white/5 border border-gray-700 rounded px-4 py-2 focus:outline-none"
                        placeholder="اكتب رسالتك هنا..."
                        name="message"
                      ></textarea>
                    </div>

                    <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="bg-orange-500 text-black font-bold px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300 flex items-center justify-center gap-2"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                          <span>جاري الإرسال...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>إرسال الرسالة</span>
                        </>
                      )}
                    </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6 shadow-xl my-8">
                <h3 className="text-xl font-bold mb-4 text-right" dir="rtl">
                  تابعنا على وسائل التواصل الاجتماعي
                </h3>
                <div className="flex justify-center gap-6">
                  <a
                    href={contacts_data?.facebook_account_link}
                    className="bg-white/20 hover:bg-orange-500 text-white hover:text-black p-3 rounded-full transition duration-300"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href={contacts_data?.instagram_account_link}
                    className="bg-white/20 hover:bg-orange-500 text-white hover:text-black p-3 rounded-full transition duration-300"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href={contacts_data?.tiktok_account_link}
                    className="bg-white/20 hover:bg-orange-500 text-white hover:text-black p-3 rounded-full transition duration-300"
                  >
                    <FaTiktok size={24} />
                  </a>
                  <a
                    href={`https://wa.me/${contacts_data?.phone_number}`}
                    className="bg-white/20 hover:bg-green-500 text-white hover:text-white p-3 rounded-full transition duration-300"
                  >
                    <FaWhatsapp size={24} />
                  </a>
                </div>
              </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-500">الأسئلة الشائعة</h2>

          <div className="space-y-4" dir="rtl">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-lg overflow-hidden">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-400 to-orange-500 text-black">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">جاهز لبدء مشروعك التسويقي؟</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            نحن متحمسون للعمل معك وتحقيق أهدافك التسويقية. تواصل معنا اليوم لبدء رحلة النجاح.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`https://wa.me/${contacts_data?.phone_number}`}>
              <button className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition duration-300 font-bold flex items-center gap-2">
                <FaWhatsapp size={18} />
                <span>واتساب</span>
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

