'use server'

import prisma from "@/lib/prisma"
import moment from "moment"


export const getFaqs = async () => {

    const faqs = await prisma.faqs.findMany({})

    return faqs
}

interface CreateFaqPayload {
    question: string
    answer: string
}

export const createFaq = async (payload: CreateFaqPayload) => {

    const faq = await prisma.faqs.create({
        data: {
            question: payload.question,
            answer: payload.answer,

            created_at: moment().format('YYYY-MM-DD'),
        }
    })

    return faq
}

export const deleteFaqAc = async (id: number) => {

    await prisma.faqs.delete({
        where: {
            id
        }
    })
}