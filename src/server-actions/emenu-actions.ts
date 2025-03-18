'use server'

import { uploadToCloudinary } from "@/lib/cloudinary-upload"
import prisma from "@/lib/prisma"

interface CreateFeedbackPayload {
    client_name: string
    position: string
    feedback_message: string
}

export const createMenuFeedback = async (payload: CreateFeedbackPayload) => {
    console.log(payload);
    
    const feedback = await prisma.emenu_feedbacks.create({
        data: {
            client_name: payload.client_name,
            position: payload.position,
            feedback_message: payload.feedback_message,
        }
   })

    return feedback
}

export const getMenuFeedbacks = async () => {

    const feedbacks = await prisma.emenu_feedbacks.findMany({})

    return feedbacks
}

export const deleteMenuFeedback = async (id: number) => {

    await prisma.emenu_feedbacks.delete({
        where: {
            id
        }
    })
}

interface CreateFaqPayload {
    question: string
    answer: string
}

export const createMenuFaq = async (payload: CreateFaqPayload) => {

    await prisma.emenu_faqs.create({
        data: {
            question: payload.question,
            answer: payload.answer,
        }
    })
}

export const getMenuFaqs = async () => {

    const faqs = await prisma.emenu_faqs.findMany({})

    return faqs
}

export const deleteMenuFaq = async (id: number) => {

    await prisma.emenu_faqs.delete({
        where: {
            id
        }
    })
}

interface CreateDesignTypePayload {
    name: string
    description: string
    image: File
}

export const createMenuDesignType = async (payload: CreateDesignTypePayload) => {
    
    const image_src = await uploadToCloudinary(payload.image)

    await prisma.emenu_design_types.create({
        data: {
            name: payload.name,
            description: payload.description,
            image: image_src,
        }
    })
}

export const getMenuDesignTypes = async () => {

    const design_types = await prisma.emenu_design_types.findMany({})

    return design_types
}

export const deleteMenuDesignType = async (id: number) => {

    await prisma.emenu_design_types.delete({
        where: {
            id
        }
    })
}

interface CreateShowcasePayload {
    page_name: string
    page_description: string
    page_logo: File,
    page_image: File,
qrcode_image: File
    emenu_link: string
    emenu_design_type_id: number,
}

export const createMenuShowcase = async (payload: CreateShowcasePayload) => {
    const page_image_src = await uploadToCloudinary(payload.page_image)
    const page_logo_src = await uploadToCloudinary(payload.page_logo)
    const qrcode_image_src = await uploadToCloudinary(payload.qrcode_image)

    await prisma.emenu_showcase.create({
        data: {
            page_name: payload.page_name,
            page_logo: page_logo_src,
            page_image: page_image_src,
            page_description: payload.page_description,
            qrcode_image: qrcode_image_src,
            emenu_link: payload.emenu_link,
            emenu_design_type_id: payload.emenu_design_type_id,
        }
    })
}

export const getMenuShowcases = async () => {

    const showcases = await prisma.emenu_showcase.findMany({
        include: {
            emenu_design_type: true
        }
    })

    return showcases
}

export const deleteMenuShowcase = async (id: number) => {

    await prisma.emenu_showcase.delete({
        where: {
            id
        }
    })
}