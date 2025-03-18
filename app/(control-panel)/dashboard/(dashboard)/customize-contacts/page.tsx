"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Phone, Mail, MapPin, Save, RefreshCw, Smartphone, Instagram, Facebook, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import { getContactsData, updateContactsData } from "@/src/server-actions/contacts-data-actions"
import { contact_data } from "@prisma/client"
import useServerAction from "@/src/hooks/use-server-action"


export default function ContactSettingsPage() {
  // استخدام البيانات المقدمة كحالة أولية
  const [contactData, setContactData] = useState<contact_data>({
    whatsapp_phone: "",
    email: "",
    location: "",
    phone_number: "",
    tiktok_account_link: "",
    instagram_account_link: "",
    facebook_account_link: "",
    id: 0,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof contact_data, string>>>({})
 
  const fetchContactsData = async () => {
    try {
      const response = await getContactsData()
      setContactData(response as contact_data)
    } catch (error) {
      console.error("Error fetching contacts data:", error)
    }
  }

  const saveContactsDataAction = useServerAction(updateContactsData)

  useEffect(() => {
    fetchContactsData()
  }, [])

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // إزالة الخطأ عند تغيير القيمة
    if (errors[name as keyof contact_data]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }

    // إزالة رسالة النجاح عند تغيير أي قيمة
    if (isSaved) {
      setIsSaved(false)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof contact_data, string>> = {}

    // التحقق من البريد الإلكتروني
    if (!contactData.email) {
      newErrors.email = "البريد الإلكتروني مطلوب"
    } else if (!/\S+@\S+\.\S+/.test(contactData.email)) {
      newErrors.email = "البريد الإلكتروني غير صالح"
    }

    // التحقق من رقم الهاتف
    if (!contactData.phone_number) {
      newErrors.phone_number = "رقم الهاتف مطلوب"
    }

    // التحقق من العنوان
    if (!contactData.location) {
      newErrors.location = "العنوان مطلوب"
    }

    // التحقق من روابط وسائل التواصل الاجتماعي
    if (contactData.facebook_account_link && !contactData.facebook_account_link.includes("facebook.com")) {
      newErrors.facebook_account_link = "رابط فيسبوك غير صالح"
    }

    if (contactData.instagram_account_link && !contactData.instagram_account_link.includes("instagram.com")) {
      newErrors.instagram_account_link = "رابط انستغرام غير صالح"
    }

    if (contactData.tiktok_account_link && !contactData.tiktok_account_link.includes("tiktok.com")) {
      newErrors.tiktok_account_link = "رابط تيك توك غير صالح"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("يرجى التحقق من البيانات المدخلة")
      return
    }

    setIsLoading(true)

    await saveContactsDataAction.mutation(contactData, {
      onSuccess: () => {
        setIsLoading(false)
        setIsSaved(true)
        toast.success("تم حفظ البيانات بنجاح")
      },
      onFailure: () => {
        setIsLoading(false)
        toast.error("حدث خطاء في حفظ البيانات")
      },
    })
  }

  return (
    <div className="container p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">إعدادات الاتصال</h1>
          <p className="text-gray-400 mt-1">تعديل بيانات الاتصال وروابط التواصل الاجتماعي</p>
        </div>
        <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-black" disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
              جاري الحفظ...
            </>
          ) : (
            <>
              <Save className="ml-2 h-4 w-4" />
              حفظ البيانات
            </>
          )}
        </Button>
      </div>

      {isSaved && (
        <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
          <Check className="h-4 w-4" />
          <AlertTitle>تم الحفظ بنجاح</AlertTitle>
          <AlertDescription>تم تحديث بيانات الاتصال بنجاح</AlertDescription>
        </Alert>
      )}

      <Card className="">
        <CardHeader>
          <CardTitle className="text-white">معلومات الاتصال الأساسية</CardTitle>
          <CardDescription>معلومات الاتصال التي ستظهر في الموقع</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                البريد الإلكتروني <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  value={contactData.email}
                  onChange={handleInputChange}
                  className="  pr-10"
                  placeholder="أدخل البريد الإلكتروني"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone_number">
                رقم الهاتف <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="phone_number"
                  name="phone_number"
                  value={contactData.phone_number}
                  onChange={handleInputChange}
                  className="  pr-10"
                  placeholder="أدخل رقم الهاتف"
                  dir="ltr"
                />
              </div>
              {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp_phone">رقم الواتساب</Label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Smartphone className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="whatsapp_phone"
                  name="whatsapp_phone"
                  value={contactData.whatsapp_phone}
                  onChange={handleInputChange}
                  className="  pr-10"
                  placeholder="أدخل رقم الواتساب"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">
                العنوان <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="location"
                  name="location"
                  value={contactData.location}
                  onChange={handleInputChange}
                  className="  pr-10"
                  placeholder="أدخل العنوان"
                />
              </div>
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="">
        <CardHeader>
          <CardTitle className="text-white">روابط وسائل التواصل الاجتماعي</CardTitle>
          <CardDescription>روابط حسابات وسائل التواصل الاجتماعي</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facebook_account_link">رابط فيسبوك</Label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Facebook className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="facebook_account_link"
                  name="facebook_account_link"
                  value={contactData.facebook_account_link}
                  onChange={handleInputChange}
                  className="  pr-10"
                  placeholder="أدخل رابط فيسبوك"
                  dir="ltr"
                />
              </div>
              {errors.facebook_account_link && <p className="text-red-500 text-sm">{errors.facebook_account_link}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram_account_link">رابط انستغرام</Label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Instagram className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="instagram_account_link"
                  name="instagram_account_link"
                  value={contactData.instagram_account_link}
                  onChange={handleInputChange}
                  className="  pr-10"
                  placeholder="أدخل رابط انستغرام"
                  dir="ltr"
                />
              </div>
              {errors.instagram_account_link && <p className="text-red-500 text-sm">{errors.instagram_account_link}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tiktok_account_link">رابط تيك توك</Label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <Input
                  id="tiktok_account_link"
                  name="tiktok_account_link"
                  value={contactData.tiktok_account_link}
                  onChange={handleInputChange}
                  className="  pr-10"
                  placeholder="أدخل رابط تيك توك"
                  dir="ltr"
                />
              </div>
              {errors.tiktok_account_link && <p className="text-red-500 text-sm">{errors.tiktok_account_link}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t  px-6 py-4">
          <p className="text-sm text-gray-400">ملاحظة: تأكد من إدخال الروابط كاملة بما في ذلك https://</p>
        </CardFooter>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-black" disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
              جاري الحفظ...
            </>
          ) : (
            <>
              <Save className="ml-2 h-4 w-4" />
              حفظ البيانات
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

