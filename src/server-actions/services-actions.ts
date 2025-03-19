'use server'
import { uploadFileToHstinger } from "@/lib/hostinger-storage"
import prisma from "@/lib/prisma"
import moment from "moment"

type AvailableServices = 'designs' | 'intelligent_marketing' | 'video_montage' | 'sponsored_ads'

export const getServiceFeedbacks = async (service: AvailableServices) => {
    const feedbacks = await prisma.services_feedback.findMany({
        where: {
            service_type: service
        }
    })

    return feedbacks
}

interface CreateFeedbackPayload {
    client_name: string
    client_message: string
    client_page_name: string
    service_type: AvailableServices
}

export const createServiceFeedback = async (payload: CreateFeedbackPayload) => {
    const feedback = await prisma.services_feedback.create({
        data: {
            client_name: payload.client_name,
            client_message: payload.client_message,
            client_page_name: payload.client_page_name,
            service_type: payload.service_type,
        }
    })

    return feedback
}

export const deleteServiceFeedback = async (id: number) => {

    await prisma.services_feedback.delete({
        where: {
            id
        }
    })
}


export const getServiceFaqs = async (service: AvailableServices) => {
    const faqs = await prisma.services_faqs.findMany({
        where: {
            service_type: service
        }
    })

    return faqs
}

interface CreateFaqPayload {
    question: string
    answer: string
    service_type: AvailableServices
}

export const createServiceFaq = async (payload: CreateFaqPayload) => {
    const faq = await prisma.services_faqs.create({
        data: {
            question: payload.question,
            answer: payload.answer,
            service_type: payload.service_type,
        }
    })

    return faq
}

export const deleteServiceFaq = async (id: number) => {

    await prisma.services_faqs.delete({
        where: {
            id
        }
    })
}


interface CreateDesignService {
    name: string
    description: string
    image: File
    page_code: string
    is_published?: boolean
}

export const createDesignService = async (payload: CreateDesignService) => {

    const image_src = await uploadFileToHstinger(payload.image)

    const design_service = await prisma.designs_services.create({
        data: {
            name: payload.name,
            description: payload.description,
            image: image_src,
            page_code: payload.page_code,
            is_published: payload.is_published ?? true,
            created_at: moment().format('YYYY-MM-DD'),
        }
    })

    return design_service

}

export const deleteDesignService = async (id: number) => {

    await prisma.designs_services.delete({
        where: {
            id
        }
    })
}

export const getSingleDesignServiceByCode = async (page_code: string) => {
    const service = await prisma.designs_services.findFirst({
        where: {
            page_code
        },
        include: {
            showcases: true
        }
    })

    return service
}


export const getDesignServices = async () => {

    const design_services = await prisma.designs_services.findMany({})

    return design_services
}

export const getDesignShowcases = async () => {

    const design_showcases = await prisma.designs_showcase.findMany({
        include: {
            design_service: true
        }
    })

    return design_showcases
}

interface CreateDesignShowcase {
    name: string
    description: string
    image: File
    client_name: string
    client_page_name: string
    service_id: number
}

export const createDesignShowcase = async (payload: CreateDesignShowcase) => {
    const image_src = await uploadFileToHstinger(payload.image)
    const design_showcase = await prisma.designs_showcase.create({
        data: {
            name: payload.name,
            description: payload.description,
            image: image_src,
            client_name: payload.client_name,
            client_page_name: payload.client_page_name,
            design_service_id: payload.service_id
        }
    })

    return design_showcase
}

export const deleteDesignShowcase = async (id: number) => {

    await prisma.designs_showcase.delete({
        where: {
            id
        }
    })
}

export const getSponsoredAdsServices = async () => {

    const sponored_ads_services = await prisma.sponsored_ads_services.findMany({
        include: {
            showcases: true
        }
    })

    return sponored_ads_services
}

export const getSingleSponsoredAdsServiceByCode = async (page_code: string) => {
    const service = await prisma.sponsored_ads_services.findFirst({
        where: {
            page_code
        },
        include: {
            showcases: true
        }
    })

    return service
}

interface CreateSponsoredAdsShowcase {
    name: string
    description: string
    image: File
    brand_name: string
    service_id: number
    platform: string
}

export const createSponsoredAdsShowcase = async (payload: CreateSponsoredAdsShowcase) => {
    const image_src = await uploadFileToHstinger(payload.image)
    const sponored_ads_showcase = await prisma.sponsored_ads_showcases.create({
        data: {
            name: payload.name,
            description: payload.description,
            image: image_src,
            brand_name: payload.brand_name,
            sponsored_ads_service_id: payload.service_id,
            platform: payload.platform
        }
    })

    return sponored_ads_showcase
}

export const deleteSponsoredAdsService = async (id: number) => {

    await prisma.sponsored_ads_services.delete({
        where: {
            id
        }
    })
}

export const deleteSponsoredAdsShowcase = async (id: number) => {

    await prisma.sponsored_ads_showcases.delete({
        where: {
            id
        }
    })
}

export const getSponsoredAdsShowcases = async () => {

    const sponored_ads_showcases = await prisma.sponsored_ads_showcases.findMany({
        include: {
            sponsored_ads_service: true
        }
    })

    return sponored_ads_showcases
}


interface CreateSponsoredAdsService {
    name: string
    description: string
    image: File
    page_code: string
}

export const createSponsoredAdsService = async (payload: CreateSponsoredAdsService) => {
    const image_src = await uploadFileToHstinger(payload.image)

    const sponored_ads_service = await prisma.sponsored_ads_services.create({
        data: {
            name: payload.name,
            description: payload.description,
            image: image_src,
            page_code: payload.page_code,
        }
    })

    return sponored_ads_service

}