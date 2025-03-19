"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Trash2, Video, Play, MessageSquare, HelpCircle, LinkIcon } from 'lucide-react'
import { toast } from "sonner"

export default function VideoMontageManagementPage() {
  const [activeTab, setActiveTab] = useState("sub-services")
  
  // State for sub-services
  const [subServices, setSubServices] = useState([
    { id: 1, name: "مونتاج فيديو احترافي", description: "خدمة مونتاج فيديو احترافية لمختلف الأغراض", image: "/placeholder.svg?height=200&width=300", pageCode: "professional-montage" },
    { id: 2, name: "موشن جرافيك", description: "تصميم فيديوهات موشن جرافيك إبداعية", image: "/placeholder.svg?height=200&width=300", pageCode: "motion-graphics" },
    { id: 3, name: "إنتاج فيديو إعلاني", description: "إنتاج فيديوهات إعلانية مميزة لعلامتك التجارية", image: "/placeholder.svg?height=200&width=300", pageCode: "advertising-video" },
  ])
  
  // State for showcases
  const [showcases, setShowcases] = useState([
    { id: 1, name: "فيديو إعلاني لشركة تقنية", description: "فيديو إعلاني لمنتج تقني جديد", videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", clientName: "شركة تك سوليوشنز", clientPageName: "Tech Solutions" },
    { id: 2, name: "موشن جرافيك لخدمة جديدة", description: "فيديو موشن جرافيك يشرح خدمة جديدة", videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", clientName: "شركة الفا", clientPageName: "Alpha Company" },
  ])
  
  // State for feedbacks
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, clientName: "محمد أحمد", clientPageName: "شركة ديجيتال", message: "فيديو احترافي ومميز، شكراً لفريق العمل على الجهد الرائع." },
    { id: 2, clientName: "خالد علي", clientPageName: "متجر إلكتروني", message: "ساهم الفيديو الإعلاني في زيادة مبيعاتنا بشكل ملحوظ. عمل رائع!" },
  ])
  
  // State for FAQs
  const [faqs, setFaqs] = useState([
    { id: 1, question: "ما هي مدة إنتاج فيديو موشن جرافيك؟", answer: "تعتمد مدة الإنتاج على تعقيد المشروع، لكن عادة ما تستغرق من 7 إلى 14 يوم عمل." },
    { id: 2, question: "هل يمكنني طلب تعديلات على الفيديو بعد الانتهاء منه؟", answer: "نعم، نقدم جولتين من التعديلات مجانًا ضمن الباقة الأساسية. يمكن طلب تعديلات إضافية برسوم إضافية." },
  ])
  
  // Form states
  const [newSubService, setNewSubService] = useState({ name: "", description: "", image: "", pageCode: "" })
  const [newShowcase, setNewShowcase] = useState({ name: "", description: "", videoLink: "", clientName: "", clientPageName: "" })
  const [newFeedback, setNewFeedback] = useState({ clientName: "", clientPageName: "", message: "" })
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" })
  
  // Dialog states
  const [subServiceDialogOpen, setSubServiceDialogOpen] = useState(false)
  const [showcaseDialogOpen, setShowcaseDialogOpen] = useState(false)
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false)
  const [faqDialogOpen, setFaqDialogOpen] = useState(false)
  
  // Handle form submissions
  const handleAddSubService = () => {
    if (!newSubService.name || !newSubService.description || !newSubService.pageCode) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }
    
    setSubServices([...subServices, { id: Date.now(), ...newSubService }])
    setNewSubService({ name: "", description: "", image: "", pageCode: "" })
    setSubServiceDialogOpen(false)
    toast.success("تمت الإضافة بنجاح")
  }
  
  const handleAddShowcase = () => {
    if (!newShowcase.name || !newShowcase.description || !newShowcase.videoLink || !newShowcase.clientName) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }
    
    setShowcases([...showcases, { id: Date.now(), ...newShowcase }])
    setNewShowcase({ name: "", description: "", videoLink: "", clientName: "", clientPageName: "" })
    setShowcaseDialogOpen(false)
    toast.success("تمت الإضافة بنجاح")
  }
  
  const handleAddFeedback = () => {
    if (!newFeedback.clientName || !newFeedback.message) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }
    
    setFeedbacks([...feedbacks, { id: Date.now(), ...newFeedback }])
    setNewFeedback({ clientName: "", clientPageName: "", message: "" })
    setFeedbackDialogOpen(false)
    toast.success("تمت الإضافة بنجاح")
  }
  
  const handleAddFaq = () => {
    if (!newFaq.question || !newFaq.answer) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }
    
    setFaqs([...faqs, { id: Date.now(), ...newFaq }])
    setNewFaq({ question: "", answer: "" })
    setFaqDialogOpen(false)
    toast.success("تمت الإضافة بنجاح")
  }
  
  // Handle delete
  const handleDeleteSubService = (id: number) => {
    setSubServices(subServices.filter(service => service.id !== id))
    toast.success("تم الحذف بنجاح")
  }
  
  const handleDeleteShowcase = (id: number) => {
    setShowcases(showcases.filter(showcase => showcase.id !== id))
    toast.success("تم الحذف بنجاح")
  }
  
  const handleDeleteFeedback = (id: number) => {
    setFeedbacks(feedbacks.filter(feedback => feedback.id !== id))
    toast.success("تم الحذف بنجاح")
  }
  
  const handleDeleteFaq = (id: number) => {
    setFaqs(faqs.filter(faq => faq.id !== id))
    toast.success("تم الحذف بنجاح")
  }
  
  return (
    <div className="container mx-auto py-10" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">إدارة خدمات مونتاج الفيديو</h1>
      
      <Tabs defaultValue="sub-services" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="sub-services" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            الخدمات الفرعية
          </TabsTrigger>
          <TabsTrigger value="showcases" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
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
                  <CardTitle>الخدمات الفرعية لمونتاج الفيديو</CardTitle>
                  <CardDescription>إدارة الخدمات الفرعية المتاحة في قسم مونتاج الفيديو</CardDescription>
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
                          onChange={(e) => setNewSubService({...newSubService, name: e.target.value})}
                          placeholder="أدخل اسم الخدمة"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">وصف الخدمة</Label>
                        <Textarea
                          id="description"
                          value={newSubService.description}
                          onChange={(e) => setNewSubService({...newSubService, description: e.target.value})}
                          placeholder="أدخل وصف الخدمة"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="image">رابط الصورة</Label>
                        <Input
                          id="image"
                          value={newSubService.image}
                          onChange={(e) => setNewSubService({...newSubService, image: e.target.value})}
                          placeholder="أدخل رابط الصورة"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="pageCode">كود الصفحة</Label>
                        <Input
                          id="pageCode"
                          value={newSubService.pageCode}
                          onChange={(e) => setNewSubService({...newSubService, pageCode: e.target.value})}
                          placeholder="أدخل كود الصفحة (مثال: motion-graphics)"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSubServiceDialogOpen(false)}>إلغاء</Button>
                      <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddSubService}>إضافة</Button>
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
                  {subServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>{service.description}</TableCell>
                      <TableCell>
                        <img src={service.image || "/placeholder.svg"} alt={service.name} className="h-10 w-16 object-cover rounded" />
                      </TableCell>
                      <TableCell>{service.pageCode}</TableCell>
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
                  <CardDescription>إدارة الأعمال المعروضة في قسم مونتاج الفيديو</CardDescription>
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
                        <Label htmlFor="showcase-name">اسم العمل</Label>
                        <Input
                          id="showcase-name"
                          value={newShowcase.name}
                          onChange={(e) => setNewShowcase({...newShowcase, name: e.target.value})}
                          placeholder="أدخل اسم العمل"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="showcase-description">وصف العمل</Label>
                        <Textarea
                          id="showcase-description"
                          value={newShowcase.description}
                          onChange={(e) => setNewShowcase({...newShowcase, description: e.target.value})}
                          placeholder="أدخل وصف العمل"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="video-link">رابط الفيديو</Label>
                        <Input
                          id="video-link"
                          value={newShowcase.videoLink}
                          onChange={(e) => setNewShowcase({...newShowcase, videoLink: e.target.value})}
                          placeholder="أدخل رابط الفيديو (YouTube, Vimeo, إلخ)"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="client-name">اسم العميل</Label>
                        <Input
                          id="client-name"
                          value={newShowcase.clientName}
                          onChange={(e) => setNewShowcase({...newShowcase, clientName: e.target.value})}
                          placeholder="أدخل اسم العميل"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="client-page">اسم صفحة العميل</Label>
                        <Input
                          id="client-page"
                          value={newShowcase.clientPageName}
                          onChange={(e) => setNewShowcase({...newShowcase, clientPageName: e.target.value})}
                          placeholder="أدخل اسم صفحة العميل"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowcaseDialogOpen(false)}>إلغاء</Button>
                      <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddShowcase}>إضافة</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم العمل</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>رابط الفيديو</TableHead>
                    <TableHead>اسم العميل</TableHead>
                    <TableHead>اسم الصفحة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {showcases.map((showcase) => (
                    <TableRow key={showcase.id}>
                      <TableCell className="font-medium">{showcase.name}</TableCell>
                      <TableCell>{showcase.description}</TableCell>
                      <TableCell>
                        <a href={showcase.videoLink} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline flex items-center gap-1">
                          <LinkIcon className="h-4 w-4" />
                          مشاهدة
                        </a>
                      </TableCell>
                      <TableCell>{showcase.clientName}</TableCell>
                      <TableCell>{showcase.clientPageName}</TableCell>
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
                  <CardDescription>إدارة تقييمات العملاء لخدمات مونتاج الفيديو</CardDescription>
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
                          onChange={(e) => setNewFeedback({...newFeedback, clientName: e.target.value})}
                          placeholder="أدخل اسم العميل"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="feedback-client-page">اسم صفحة العميل</Label>
                        <Input
                          id="feedback-client-page"
                          value={newFeedback.clientPageName}
                          onChange={(e) => setNewFeedback({...newFeedback, clientPageName: e.target.value})}
                          placeholder="أدخل اسم صفحة العميل"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="feedback-message">نص التقييم</Label>
                        <Textarea
                          id="feedback-message"
                          value={newFeedback.message}
                          onChange={(e) => setNewFeedback({...newFeedback, message: e.target.value})}
                          placeholder="أدخل نص التقييم"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setFeedbackDialogOpen(false)}>إلغاء</Button>
                      <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddFeedback}>إضافة</Button>
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
                      <TableCell className="font-medium">{feedback.clientName}</TableCell>
                      <TableCell>{feedback.clientPageName}</TableCell>
                      <TableCell>{feedback.message}</TableCell>
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
                  <CardDescription>إدارة الأسئلة الشائعة لخدمات مونتاج الفيديو</CardDescription>
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
                          onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                          placeholder="أدخل السؤال"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="faq-answer">الإجابة</Label>
                        <Textarea
                          id="faq-answer"
                          value={newFaq.answer}
                          onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                          placeholder="أدخل الإجابة"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setFaqDialogOpen(false)}>إلغاء</Button>
                      <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddFaq}>إضافة</Button>
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
