import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa'

interface TestimonialProps {
  id: string
  name: string
  position: string
  company: string
  rating: number
  text: string
  image: string
}

const TestimonialCard = ({testimonial}: {testimonial: TestimonialProps}) => {
  return (
    <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/10 relative"
                        dir="rtl"
                      >
                        <div className="absolute -top-6 right-8 text-orange-500 opacity-30">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>

                        <div className="flex mt-2 absolute top-0 left-0 p-2">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <div key={i} className="text-orange-500">
                                  <FaStar size={14} />
                                </div>
                              ))}
                            </div>

                        <div className="flex flex-col items-center md:items-start gap-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="absolute -inset-1 bg-orange-500 rounded-full opacity-20 blur-sm"></div>
                              <Image
                                width={60}
                                height={60}
                                src={'https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid'}
                                alt={testimonial.name}
                                className="w-16 h-16 rounded-full object-cover relative z-10"
                              />
                            </div>
                            <div>
                            <h3 className="text-xl font-bold mt-4">{testimonial.name}</h3>
                            <p className="text-sm text-gray-400">{testimonial.position} - {testimonial.company}</p>
                            
                            </div>
                            
                          </div>

                          <div>
                            <p className="text-xl text-gray-300 leading-relaxed">&quot;{testimonial.text}&quot;</p>
                          </div>
                        </div>
                      </motion.div>
  )
}

export default TestimonialCard
