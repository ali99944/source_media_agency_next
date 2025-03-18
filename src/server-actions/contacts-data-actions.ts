'use server'

import prisma from "@/lib/prisma"

export const getContactsData = async () => {
    const contacts_data = await prisma.contact_data.findFirst({})

    return contacts_data
}


interface UpdateContactsDataPayload {
    whatsapp_phone: string
    email: string
    location: string
    phone_number: string
    tiktok_account_link: string
    instagram_account_link: string
    facebook_account_link: string
}

export const updateContactsData = async (payload: UpdateContactsDataPayload) => {
    const contacts_data = await prisma.contact_data.update({
        where: {
            id: 0
        },
        data: {
            whatsapp_phone: payload.whatsapp_phone,
            email: payload.email,
            location: payload.location,
            phone_number: payload.phone_number,
            tiktok_account_link: payload.tiktok_account_link,
            instagram_account_link: payload.instagram_account_link,
            facebook_account_link: payload.facebook_account_link,
        }
    })

    return contacts_data
}