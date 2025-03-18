'use server'

import { uploadToCloudinary } from "@/lib/cloudinary-upload"
import prisma from "@/lib/prisma"
import moment from "moment"

export const getAllServices = async () => {
    const services = await prisma.services.findMany({
        include: {
            service_category: true
        }
    })

    return services
}

interface CreateServicePayload {
    title: string
    description: string
    category_id: number
    isActive: boolean
    image: File
}

export const createService = async (payload: CreateServicePayload) => {
    const image_src = await uploadToCloudinary(payload.image)

    const service = await prisma.services.create({
        data: {
            title: payload.title,
            description: payload.description,
            service_category_id: +payload.category_id,
            is_active: payload.isActive,
            image: image_src,

            created_at: moment().format('YYYY-MM-DD'),
        }
    })

    return service
}

export const getServicesByPage = async (page: string) => {
    const services = await prisma.services.findMany({
        where: {
            service_category: {
                page: page
            }
        },
        include: {
            service_category: true
        }
    })

    return services
}

export const deleteService = async (id: number) => {
    await prisma.services.delete({
        where: {
            id: id
        }
    })
}