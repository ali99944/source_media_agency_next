'use server'
import prisma from "@/lib/prisma"
import moment from "moment"

export const getContactMessages = async () => {
    const contact_messages = await prisma.contact_messages.findMany({})

    return contact_messages
}


interface CreateContactMessagePayload {
    client_name: string
    client_email: string
    client_phone: string
    subject: string
    message: string
}

export const createContactMessage = async (payload: CreateContactMessagePayload) => {
    const contact_message = await prisma.contact_messages.create({
        data: {
            client_name: payload.client_name,
            client_email: payload.client_email,
            client_phone: payload.client_phone,
            subject: payload.subject,
            message: payload.message,

            sent_at: moment().format('YYYY-MM-DD'),
        }
    })
    return contact_message
}

export const deleteContactMessage = async (id: number) => {
    await prisma.contact_messages.delete({
        where: {
            id
        }
    })
}