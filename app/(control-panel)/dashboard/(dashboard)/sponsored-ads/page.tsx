"use client"

import { useCallback, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2, ImageIcon, FileCode, MessageSquare, HelpCircle } from "lucide-react"
import { toast } from "sonner"
import { createServiceFaq, createServiceFeedback, createSponsoredAdsService, createSponsoredAdsShowcase, deleteServiceFaq, deleteServiceFeedback, deleteSponsoredAdsService, deleteSponsoredAdsShowcase, getServiceFaqs, getServiceFeedbacks, getSponsoredAdsServices, getSponsoredAdsShowcases } from "@/src/server-actions/services-actions"
import useGetServerData from "@/src/hooks/use-get-server-data"
import useServerAction from "@/src/hooks/use-server-action"

export default function SponsoredAdsManagementPage() {
  const [activeTab, setActiveTab] = useState("sub-services")


  
    const getSponsoredAdsFaqsMemo = useCallback(async () => {
        const faqs = await getServiceFaqs('sponsored_ads')
        return faqs
    }, [])
  
  
    const getSponsoredFeedbacksMemo = useCallback(async () => {
        const feedbacks = await getServiceFeedbacks('sponsored_ads')
        return feedbacks
    }, [])

    const { data: sponored_ads_services, refetch: refetchServices } = useGetServerData(getSponsoredAdsServices, [])
    const { data: sponored_ads_showcases, refetch: refetchShowcases } = useGetServerData(getSponsoredAdsShowcases, [])

    const { data: faqs, refetch: refetchFaqs  } = useGetServerData(getSponsoredAdsFaqsMemo, [])
    const { data: feedbacks, refetch: refetchFeedback  } = useGetServerData(getSponsoredFeedbacksMemo, [])

  // Form states
  const [newSubService, setNewSubService] = useState<{
    name: string
    description: string
    image: File | null
    pageCode: string
  }>({ name: "", description: "", image: null, pageCode: "" })
  const [newShowcase, setNewShowcase] = useState<{
    name: string
    description: string
    brandName: string
    socialPlatform: string
    image: File | null
    service_id: number
  }>({
    name: "",
    description: "",
    brandName: "",
    socialPlatform: "",
    image: null,
    service_id: 0
  })
  const [newFeedback, setNewFeedback] = useState({ clientName: "", clientPageName: "", message: "" })
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" })

  // Dialog states
  const [subServiceDialogOpen, setSubServiceDialogOpen] = useState(false)
  const [showcaseDialogOpen, setShowcaseDialogOpen] = useState(false)
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false)
  const [faqDialogOpen, setFaqDialogOpen] = useState(false)

  // Social media platforms
  const socialPlatforms = [
    { value: "facebook", label: "فيسبوك" },
    { value: "instagram", label: "انستجرام" },
    { value: "twitter", label: "تويتر" },
    { value: "linkedin", label: "لينكد إن" },
    { value: "youtube", label: "يوتيوب" },
    { value: "tiktok", label: "تيك توك" },
    { value: "snapchat", label: "سناب شات" },
    { value: "google", label: "جوجل" },
  ]

  const createSubServiceAction = useServerAction(createSponsoredAdsService)
  const handleAddSubService = async () => {
    if (!newSubService.name || !newSubService.description || !newSubService.pageCode) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    if(!newSubService.image) {
      toast.error("يرجى تحميل صورة للخدمة")
      return
    }
    
    await createSubServiceAction.mutation({
      name: newSubService.name,
      description: newSubService.description,
      image: newSubService.image,
      page_code: newSubService.pageCode,
    }, {
      onSuccess: () => {
        setNewSubService({ name: "", description: "", image: null, pageCode: "" })
        setSubServiceDialogOpen(false)
        toast.success("تمت الإضافة بنجاح")
        refetchServices()
      },

      onFailure: () => {
        toast.error("حدث خطاء في حفظ الخدمة")
      }
    })
  }

  const createShowcaseAction = useServerAction(createSponsoredAdsShowcase)
  const handleAddShowcase = async () => {
    if (!newShowcase.name || !newShowcase.description || !newShowcase.brandName || !newShowcase.socialPlatform) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    if(!newShowcase.image) {
      toast.error("يرجى تحميل صورة للخدمة")
      return
    }

    await createShowcaseAction.mutation({
      name: newShowcase.name,
      description: newShowcase.description,
      brand_name: newShowcase.brandName,
      platform: newShowcase.socialPlatform,
      image: newShowcase.image,
      service_id: 1
    }, {
      onSuccess: () => {
        setNewShowcase({ name: "", description: "", brandName: "", socialPlatform: "", image: null, service_id: 0 })
        setShowcaseDialogOpen(false)
        toast.success("تمت الإضافة بنجاح")
        refetchShowcases()
      },

      onFailure: () => {
        toast.error("حدث خطاء في حفظ الخدمة")
      }
    })

  }

  const createFeedbackAction = useServerAction(createServiceFeedback)
  const handleAddFeedback = async () => {
    if (!newFeedback.clientName || !newFeedback.message) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    await createFeedbackAction.mutation({
      client_name: newFeedback.clientName,
      client_page_name: newFeedback.clientPageName,
      client_message: newFeedback.message,
      service_type: 'sponsored_ads'
    }, {
      onSuccess: () => {
        setNewFeedback({ clientName: "", clientPageName: "", message: "" })
        setFeedbackDialogOpen(false)
        toast.success("تمت الإضافة بنجاح")
        refetchFeedback()
      },

      onFailure: () => {
        toast.error("حدث خطاء في حفظ الأسئلة الشائعة")
      }
    })
  }

  const addFaqAction = useServerAction(createServiceFaq)
  const handleAddFaq = async () => {
    if (!newFaq.question || !newFaq.answer) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    await addFaqAction.mutation({
      question: newFaq.question,
      answer: newFaq.answer,
      service_type: 'sponsored_ads'
    }, {
      onSuccess: () => {
        setNewFaq({ question: "", answer: "" })
        setFaqDialogOpen(false)
        toast.success("تمت الإضافة بنجاح")
        refetchFaqs()
      },

      onFailure: () => {
        toast.error("حدث خطاء في حفظ الأسئلة الشائعة")
      }
    })
  }

  const deleteSubServiceAction = useServerAction(deleteSponsoredAdsService)
  const handleDeleteSubService = async (id: number) => {
    await deleteSubServiceAction.mutation(id, {
      onSuccess: () => {
        toast.success("تم الحذف بنجاح")
        refetchServices()
      },
      onFailure: () => {
        toast.error("حدث خطاء في حذف الخدمة")
      }
    })
  }

  const deleteShowcaseAction = useServerAction(deleteSponsoredAdsShowcase)
  const handleDeleteShowcase = async (id: number) => {
    await deleteShowcaseAction.mutation(id, {
      onSuccess: () => {
        toast.success("تم الحذف بنجاح")
        refetchShowcases()
      },
      onFailure: () => {
        toast.error("حدث خطاء في حذف المعرض")
      }
    })
  }

  const deleteFeedbackAction = useServerAction(deleteServiceFeedback)
  const handleDeleteFeedback = async (id: number) => {
    await deleteFeedbackAction.mutation(id, {
      onSuccess: () => {
        toast.success("تم الحذف بنجاح")
        refetchFeedback()
      },
      onFailure: () => {
        toast.error("حدث خطاء في حذف الأراء")
      }
    })
  }


  const deleteFaqAction = useServerAction(deleteServiceFaq)
  const handleDeleteFaq = async (id: number) => {
    await deleteFaqAction.mutation(id, {
      onSuccess: () => {
        toast.success("تم الحذف بنجاح")
        refetchFaqs()
      },
      onFailure: () => {
        toast.error("حدث خطاء في حذف الأسئلة الشائعة")
      }
    })
  }

  // Get platform label
  const getPlatformLabel = (value: string) => {
    const platform = socialPlatforms.find((p) => p.value === value)
    return platform ? platform.label : value
  }

  return (
    <div className="container mx-auto p-8" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">إدارة خدمات الإعلانات الممولة</h1>

      <Tabs defaultValue="sub-services" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="sub-services" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            الخدمات الفرعية
          </TabsTrigger>
          <TabsTrigger value="showcases" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            معرض الأعمال
          </TabsTrigger>
          <TabsTrigger value="feedbacks" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            التقييمات
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            الأسئلة الشائعة
          </TabsTrigger>
        </TabsList>

        {/* Sub-Services Tab */}
        <TabsContent value="sub-services">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>الخدمات الفرعية للإعلانات الممولة</CardTitle>
                  <CardDescription>إدارة الخدمات الفرعية المتاحة في قسم الإعلانات الممولة</CardDescription>
                </div>
                <Dialog open={subServiceDialogOpen} onOpenChange={setSubServiceDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      إضافة خدمة فرعية
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>إضافة خدمة فرعية جديدة</DialogTitle>
                      <DialogDescription>أدخل تفاصيل الخدمة الفرعية الجديدة</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">اسم الخدمة</Label>
                        <Input
                          id="name"
                          value={newSubService.name}
                          onChange={(e) => setNewSubService({ ...newSubService, name: e.target.value })}
                          placeholder="أدخل اسم الخدمة"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">وصف الخدمة</Label>
                        <Textarea
                          id="description"
                          value={newSubService.description}
                          onChange={(e) => setNewSubService({ ...newSubService, description: e.target.value })}
                          placeholder="أدخل وصف الخدمة"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="image">صورة</Label>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setNewSubService({ ...newSubService, image: e.target.files ? e.target.files[0] : null })}
                          placeholder="أدخل صورة"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="pageCode">كود الصفحة</Label>
                        <Input
                          id="pageCode"
                          value={newSubService.pageCode}
                          onChange={(e) => setNewSubService({ ...newSubService, pageCode: e.target.value })}
                          placeholder="أدخل كود الصفحة (مثال: facebook-ads)"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSubServiceDialogOpen(false)}>
                        إلغاء
                      </Button>
                      <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddSubService}>
                        إضافة
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الاسم</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>الصورة</TableHead>
                    <TableHead>كود الصفحة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sponored_ads_services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>{service.description}</TableCell>
                      <TableCell>
                        <img
                          src={service.image || "/placeholder.svg"}
                          alt={service.name}
                          className="h-auto w-16 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell>{service.page_code}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteSubService(service.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Showcases Tab */}
        <TabsContent value="showcases">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>معرض الأعمال</CardTitle>
                  <CardDescription>إدارة الأعمال المعروضة في قسم الإعلانات الممولة</CardDescription>
                </div>
                <Dialog open={showcaseDialogOpen} onOpenChange={setShowcaseDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      إضافة عمل جديد
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>إضافة عمل جديد</DialogTitle>
                      <DialogDescription>أدخل تفاصيل العمل الجديد</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="showcase-name">اسم الحملة</Label>
                        <Input
                          id="showcase-name"
                          value={newShowcase.name}
                          onChange={(e) => setNewShowcase({ ...newShowcase, name: e.target.value })}
                          placeholder="أدخل اسم الحملة"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="showcase-description">وصف الحملة</Label>
                        <Textarea
                          id="showcase-description"
                          value={newShowcase.description}
                          onChange={(e) => setNewShowcase({ ...newShowcase, description: e.target.value })}
                          placeholder="أدخل وصف الحملة"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="brand-name">اسم العلامة التجارية</Label>
                        <Input
                          id="brand-name"
                          value={newShowcase.brandName}
                          onChange={(e) => setNewShowcase({ ...newShowcase, brandName: e.target.value })}
                          placeholder="أدخل اسم العلامة التجارية"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="social-platform">منصة التواصل الاجتماعي</Label>
                        <Select
                          value={newShowcase.socialPlatform}
                          onValueChange={(value) => setNewShowcase({ ...newShowcase, socialPlatform: value })}
                        >
                          <SelectTrigger id="social-platform">
                            <SelectValue placeholder="اختر المنصة" />
                          </SelectTrigger>
                          <SelectContent>
                            {socialPlatforms.map((platform) => (
                              <SelectItem key={platform.value} value={platform.value}>
                                {platform.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="social-platform">الخدمة</Label>
                        <Select
                          value={newShowcase.service_id.toString()}
                          onValueChange={(value) => setNewShowcase({ ...newShowcase, service_id: +value })}
                        >
                          <SelectTrigger id="social-platform">
                            <SelectValue placeholder="اختر المنصة" />
                          </SelectTrigger>
                          <SelectContent>
                            {sponored_ads_services.map((platform) => (
                              <SelectItem key={platform.id.toString()} value={platform.id.toString()}>
                                {platform.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="showcase-image">صورة</Label>
                        <Input
                          id="showcase-image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setNewShowcase({ ...newShowcase, image: e.target.files ? e.target.files[0] : null })}
                          placeholder="أدخل صورة"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowcaseDialogOpen(false)}>
                        إلغاء
                      </Button>
                      <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddShowcase}>
                        إضافة
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم الحملة</TableHead>
                    <TableHead>العلامة التجارية</TableHead>
                    <TableHead>المنصة</TableHead>
                    <TableHead>الصورة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sponored_ads_showcases.map((showcase) => (
                    <TableRow key={showcase.id}>
                      <TableCell className="font-medium">{showcase.name}</TableCell>
                      <TableCell>{showcase.brand_name}</TableCell>
                      <TableCell>{getPlatformLabel(showcase.platform)}</TableCell>
                      <TableCell>
                        <img
                          src={showcase.image || "/placeholder.svg"}
                          alt={showcase.name}
                          className="h-auto w-16 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteShowcase(showcase.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedbacks Tab */}
        <TabsContent value="feedbacks">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>التقييمات</CardTitle>
                  <CardDescription>إدارة تقييمات العملاء لخدمات الإعلانات الممولة</CardDescription>
                </div>
                <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      إضافة تقييم جديد
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>إضافة تقييم جديد</DialogTitle>
                      <DialogDescription>أدخل تفاصيل التقييم الجديد</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="feedback-client-name">اسم العميل</Label>
                        <Input
                          id="feedback-client-name"
                          value={newFeedback.clientName}
                          onChange={(e) => setNewFeedback({ ...newFeedback, clientName: e.target.value })}
                          placeholder="أدخل اسم العميل"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="feedback-client-page">اسم صفحة العميل</Label>
                        <Input
                          id="feedback-client-page"
                          value={newFeedback.clientPageName}
                          onChange={(e) => setNewFeedback({ ...newFeedback, clientPageName: e.target.value })}
                          placeholder="أدخل اسم صفحة العميل"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="feedback-message">نص التقييم</Label>
                        <Textarea
                          id="feedback-message"
                          value={newFeedback.message}
                          onChange={(e) => setNewFeedback({ ...newFeedback, message: e.target.value })}
                          placeholder="أدخل نص التقييم"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setFeedbackDialogOpen(false)}>
                        إلغاء
                      </Button>
                      <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddFeedback}>
                        إضافة
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم العميل</TableHead>
                    <TableHead>اسم الصفحة</TableHead>
                    <TableHead>التقييم</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedbacks.map((feedback) => (
                    <TableRow key={feedback.id}>
                      <TableCell className="font-medium">{feedback.client_name}</TableCell>
                      <TableCell>{feedback.client_page_name}</TableCell>
                      <TableCell>{feedback.client_message}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteFeedback(feedback.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>الأسئلة الشائعة</CardTitle>
                  <CardDescription>إدارة الأسئلة الشائعة لخدمات الإعلانات الممولة</CardDescription>
                </div>
                <Dialog open={faqDialogOpen} onOpenChange={setFaqDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      إضافة سؤال جديد
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>إضافة سؤال جديد</DialogTitle>
                      <DialogDescription>أدخل تفاصيل السؤال والإجابة</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="faq-question">السؤال</Label>
                        <Input
                          id="faq-question"
                          value={newFaq.question}
                          onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                          placeholder="أدخل السؤال"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="faq-answer">الإجابة</Label>
                        <Textarea
                          id="faq-answer"
                          value={newFaq.answer}
                          onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                          placeholder="أدخل الإجابة"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setFaqDialogOpen(false)}>
                        إلغاء
                      </Button>
                      <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddFaq}>
                        إضافة
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>السؤال</TableHead>
                    <TableHead>الإجابة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faqs.map((faq) => (
                    <TableRow key={faq.id}>
                      <TableCell className="font-medium">{faq.question}</TableCell>
                      <TableCell>{faq.answer}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteFaq(faq.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

