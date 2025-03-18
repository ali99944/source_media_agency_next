'use server'

import prisma from "@/lib/prisma"
import moment from 'moment'

export const getServiceCategories = async () => {
    const service_categories = await prisma.service_categories.findMany({})

    return service_categories
}


interface CreateServicePayload {
    name: string
    description: string
    page: string
    is_active: boolean
    icon: string
}

export const createServiceCategory = async (payload: CreateServicePayload) => {
    const service_category = await prisma.service_categories.create({
        data: {
            name: payload.name,
            description: payload.description,
            page: payload.page,
            icon: payload.icon,
            is_active: payload.is_active,

            created_at: moment().format('YYYY-MM-DD'),
        }
    })

    return service_category
}


export const deleteServiceCategory = async (id: number) => {
    await prisma.service_categories.delete({
        where: {
            id: id
        }
    })
}