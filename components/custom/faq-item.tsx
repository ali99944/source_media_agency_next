'use client'

import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

interface FaqItemProps {
  faq: {
    question: string
    answer: string
  }
}

const FaqItem = ({ faq }: FaqItemProps) => {
    const [activeAccordion, setActiveAccordion] = useState<boolean>(false)
    
    const toggleAccordion = () => {
        setActiveAccordion(prev => !prev)
      }
  return (
    <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full px-6 py-4 text-right flex items-center justify-between focus:outline-none"
                  onClick={toggleAccordion}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  {activeAccordion ? (
                    <ChevronUp className="text-orange-500" size={20} />
                  ) : (
                    <ChevronDown className="text-orange-500" size={20} />
                  )}
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    activeAccordion ? "max-h-96 pb-4" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </motion.div>
  )
}

export default FaqItem
