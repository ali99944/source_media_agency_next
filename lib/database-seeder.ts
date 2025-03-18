import prisma from "./prisma";

const pages_seo_content = [
  {
    title: "الصفحة الرئيسية",
    description: "سورس ميديا",
    keywords: "سورس ميديا",
    page_code: "landing",

    page_content: JSON.stringify({
      landing: {
        type: 'text',
        name: 'عنوان القسم الاول',
        value: 'سورس ميديا',
      }
    })
  }
]

async function main() {
  await prisma.pages_seo_content.deleteMany({})
  await prisma.contact_data.deleteMany({})

  await Promise.all(
    pages_seo_content.map(async (page_seo_content) => {
      await prisma.pages_seo_content.create({
        data: {
          title: page_seo_content.title,
          description: page_seo_content.description,
          keywords: page_seo_content.keywords,
          page_content: page_seo_content.page_content,
          page_code: page_seo_content.page_code
        }
      })
    })
  )

  await prisma.contact_data.create({
    data: {
      whatsapp_phone: '',
      email: '',
      location: '',
      phone_number: '',
      tiktok_account_link: '',
      instagram_account_link: '',
      facebook_account_link: '',
      id: 0
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
