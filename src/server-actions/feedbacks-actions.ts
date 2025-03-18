'use server'

import prisma from "@/lib/prisma"
import moment from "moment"

export const getAllFeedback = async () => {
    const feedbacks = await prisma.client_feedbacks.findMany({
        include: {
            service: true
        }
    })

    return feedbacks
}

interface CreateFeedbackPayload {
    client_name: string
    client_message: string
    client_page_name: string

    service_id: number
}

export const createFeedback = async (payload: CreateFeedbackPayload) => {
    const feedback = await prisma.client_feedbacks.create({
        data: {
            client_name: payload.client_name,
            client_message: payload.client_message,
            client_page_name: payload.client_page_name,
            service_id: payload.service_id,
            sent_at: moment().format('YYYY-MM-DD')
        }
    })

    return feedback
}

export const updateFeedback = async (id: number, payload: CreateFeedbackPayload) => {
    const feedback = await prisma.client_feedbacks.update({
        where: {
            id
        },
        data: {
            client_name: payload.client_name,
            client_message: payload.client_message,
            client_page_name: payload.client_page_name,
            service_id: payload.service_id,
        }
    })

    return feedback
}

export const deleteFeedback = async (id: number) => {
    await prisma.client_feedbacks.delete({
        where: {
            id
        }
    })

    return true
}

