'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, Plus, QrCode, Star, Loader2 } from "lucide-react"
import Image from "next/image"
import useGetServerData from "@/src/hooks/use-get-server-data"
import { createMenuDesignType, createMenuFaq, createMenuFeedback, createMenuShowcase, deleteMenuDesignType, deleteMenuFaq, deleteMenuFeedback, deleteMenuShowcase, getMenuDesignTypes, getMenuFaqs, getMenuFeedbacks, getMenuShowcases } from "@/src/server-actions/emenu-actions"
import useServerAction from "@/src/hooks/use-server-action"
import { toast } from "sonner"
import Link from "next/link"

export default function EMenuAdminPage() {
    const { data: faqs, refetch: faqsRefetch } = useGetServerData(getMenuFaqs, [])
    const { data: feedbacks, refetch: feedbacksRefetch } = useGetServerData(getMenuFeedbacks, [])
    const { data: design_types, refetch: design_typesRefetch} = useGetServerData(getMenuDesignTypes, [])
    const { data: showcases, refetch: showcasesRefetch, isLoading: showcasesLoading } = useGetServerData(getMenuShowcases, [])

    const createFaqAction = useServerAction(createMenuFaq)
    const deleteFaqAction = useServerAction(deleteMenuFaq)
    const createFeedbackAction = useServerAction(createMenuFeedback)
    const deleteFeedbackAction = useServerAction(deleteMenuFeedback)
    const createDesignTypeAction = useServerAction(createMenuDesignType)
    const deleteDesignTypeAction = useServerAction(deleteMenuDesignType)
    const createShowcaseAction = useServerAction(createMenuShowcase)
    const deleteShowcaseAction = useServerAction(deleteMenuShowcase)

    const handleDeleteFaq = async (id: number) => {
        await deleteFaqAction.mutation(id, {
            onSuccess: () => {
                toast.success("تم حذف الأسئلة الشائعة بنجاح")
                faqsRefetch()
            },
    
            onFailure: () => {
                toast.error("حدث خطاء في حذف الأسئلة الشائعة")
            }
        })
    }

    const handleDeleteFeedback = async (id: number) => {
        await deleteFeedbackAction.mutation(id, {
            onSuccess: () => {
                toast.success("تم حذف الأراء بنجاح")
                feedbacksRefetch()
            },
    
            onFailure: () => {
                toast.error("حدث خطاء في حذف الأراء")
            }
        })
    }

    const handleDeleteDesignType = async (id: number) => {
        await deleteDesignTypeAction.mutation(id, {
            onSuccess: () => {
                toast.success("تم حذف نوع التصميم بنجاح")
                design_typesRefetch()
            },
    
            onFailure: () => {
                toast.error("حدث خطاء في حذف نوع التصميم")
            }
        })
    }

    const handleDeleteShowcase = async (id: number) => {
        await deleteShowcaseAction.mutation(id, {
            onSuccess: () => {
                toast.success("تم حذف المعرض بنجاح")
                showcasesRefetch()
            },
    
            onFailure: () => {
                toast.error("حدث خطاء في حذف المعرض")
            }
        })
    }

    const handleCreateFaq = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await createFaqAction.mutation({
            question: e.currentTarget.question.value,
            answer: e.currentTarget.answer.value,
        }, {
            onSuccess: () => {
                toast.success("تم حفظ الأسئلة الشائعة بنجاح")
                faqsRefetch()
            },

            onFailure: () => {
                toast.error("حدث خطاء في حفظ الأسئلة الشائعة")
            }
        })
    }

    const handleCreateFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await createFeedbackAction.mutation({
            client_name: e.currentTarget.client_name.value,
            feedback_message: e.currentTarget.client_message.value,
            position: e.currentTarget.position.value
        }, {
            onSuccess: () => {
                toast.success("تم حفظ الأراء بنجاح")
                feedbacksRefetch()
            },

            onFailure: () => {
                toast.error("حدث خطاء في حفظ الأراء")
            }
        })
    }

    const handleCreateDesignType = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const image = document.getElementById("designImage") as HTMLInputElement

        if(!image.files) {
            toast.error("برجاء ادخال الصورة")
        }
        
        await createDesignTypeAction.mutation({
            name: e.currentTarget.designName.value,
            description: e.currentTarget.designDescription.value,
            image: image.files![0] as File
        }, {
            onSuccess: () => {
                toast.success("تم حفظ نوع التصميم بنجاح")
                design_typesRefetch()
            },

            onFailure: () => {
                toast.error("حدث خطاء في حفظ نوع التصميم")
            }
        })
    }

    const handleCreateShowcase = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const pageImage = document.getElementById("pageImage") as HTMLInputElement
        const pageLogo = document.getElementById("pageLogo") as HTMLInputElement
        const qrcodeImage = document.getElementById("pageQrcode") as HTMLInputElement

        if(!pageImage.files || !pageLogo.files || !qrcodeImage.files) {
            toast.error("برجاء ادخال الصور")
        }

        

        await createShowcaseAction.mutation({
            page_description: e.currentTarget.pageDescription.value,
            page_name: e.currentTarget.pageName.value,
            page_image: pageImage.files![0] as File,
            page_logo: pageLogo.files![0] as File,
            qrcode_image: qrcodeImage.files![0] as File,
            emenu_link: e.currentTarget.menuUrl.value,
            emenu_design_type_id: +e.currentTarget.designType.value
        }, {
            onSuccess: () => {
                toast.success("تم حفظ عرض القوائم بنجاح")
                showcasesRefetch()
            },

            onFailure: () => {
                toast.error("حدث خطاء في حفظ عرض القوائم")
            }
        })
    }
    

  return (
    <div className="container p-6 mx-auto" dir="rtl">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">إدارة القائمة الإلكترونية</h1>
        </div>

        <Tabs defaultValue="feedbacks" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="feedbacks">آراء العملاء</TabsTrigger>
            <TabsTrigger value="faqs">الأسئلة الشائعة</TabsTrigger>
            <TabsTrigger value="designs">التصاميم المتاحة</TabsTrigger>
            <TabsTrigger value="showcase">عرض القوائم</TabsTrigger>
          </TabsList>

          {/* آراء العملاء */}
          <TabsContent value="feedbacks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إضافة رأي جديد</CardTitle>
                <CardDescription>أضف رأي عميل جديد ليظهر في صفحة القائمة الإلكترونية</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleCreateFeedback}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client_name">اسم العميل</Label>
                      <Input id="client_name" placeholder="أحمد محمد" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">المنصب</Label>
                      <Input id="position" placeholder="مدير مطعم الذواقة" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client_message">الرأي</Label>
                    <Textarea id="client_message" placeholder="اكتب رأي العميل هنا..." className="h-24" />
                  </div>

                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                    إضافة الرأي
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>آراء العملاء الحالية</CardTitle>
                <CardDescription>جميع آراء العملاء المعروضة في الموقع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* تكرار لكل رأي */}
                  {feedbacks.map((feedback) => (
                    <Card key={feedback.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-x-2">
                          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-black">
                            ع
                          </div>
                          <div>
                            <h3 className="font-bold">
                              {feedback.client_name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {feedback.position}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm">
                          {feedback.feedback_message}
                        </p>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 fill-orange-500 text-orange-500" />
                          ))}
                        </div>
                      </CardContent>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent dir="rtl">
                          <AlertDialogHeader>
                            <AlertDialogTitle>هل أنت متأكد من حذف هذا الرأي؟</AlertDialogTitle>
                            <AlertDialogDescription>
                              هذا الإجراء لا يمكن التراجع عنه. سيتم حذف رأي العميل نهائياً من قاعدة البيانات.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction 
                                                        onClick={() => handleDeleteFeedback(feedback.id)}
                            className="bg-red-500 hover:bg-red-600">حذف</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* الأسئلة الشائعة */}
          <TabsContent value="faqs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إضافة سؤال جديد</CardTitle>
                <CardDescription>أضف سؤال وجواب جديد للأسئلة الشائعة</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleCreateFaq}>
                  <div className="space-y-2">
                    <Label htmlFor="question">السؤال</Label>
                    <Input id="question" placeholder="كيف يعمل نظام القائمة الإلكترونية؟" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="answer">الإجابة</Label>
                    <Textarea id="answer" placeholder="اكتب الإجابة هنا..." className="h-24" />
                  </div>
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                    إضافة السؤال
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الأسئلة الشائعة الحالية</CardTitle>
                <CardDescription>جميع الأسئلة المعروضة في صفحة الأسئلة الشائعة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* تكرار لكل سؤال */}
                  {faqs.map((faq, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-bold">{faq.question}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {faq.answer}
                        </p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            type="button"
                            
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent dir="rtl">
                          <AlertDialogHeader>
                            <AlertDialogTitle>هل أنت متأكد من حذف هذا السؤال؟</AlertDialogTitle>
                            <AlertDialogDescription>
                              هذا الإجراء لا يمكن التراجع عنه. سيتم حذف السؤال والإجابة نهائياً من قاعدة البيانات.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteFaq(faq.id)} className="bg-red-500 hover:bg-red-600">حذف</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* التصاميم المتاحة */}
          <TabsContent value="designs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إضافة تصميم جديد</CardTitle>
                <CardDescription>أضف تصميم جديد للقائمة الإلكترونية</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleCreateDesignType}>
                  <div className="">
                    <div className="space-y-2">
                      <Label htmlFor="designName">اسم التصميم</Label>
                      <Input id="designName" placeholder="الكلاسيكي" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designImage">صورة التصميم</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="flex flex-col items-center">
                        <Plus className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">اضغط لاختيار صورة أو اسحب الصورة هنا</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF حتى 2MB</p>
                      </div>
                      <input id="designImage" type="file" className="hidden" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designDescription">وصف التصميم</Label>
                    <Textarea id="designDescription" placeholder="وصف مختصر للتصميم..." />
                  </div>
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                    إضافة التصميم
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>التصاميم المتاحة</CardTitle>
                <CardDescription>جميع تصاميم القائمة الإلكترونية المتاحة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* تكرار لكل تصميم */}
                  {design_types.map((design, index) => (
                    <div key={index} className="relative group">
                      <div className={`aspect-square rounded-lg flex items-center justify-center relative`}>
                        <Image
                          src={design.image}
                          alt={design.name}
                          width={200}
                          height={200}
                          className="object-cover rounded-lg"
                        />
                        <span className="text-xl font-bold">{design.name}</span>
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button  variant="destructive" size="sm" className="bg-red-500 hover:bg-red-600">
                              <Trash2 className="h-4 w-4 mr-1" />
                              حذف
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent dir="rtl">
                            <AlertDialogHeader>
                              <AlertDialogTitle>هل أنت متأكد من حذف هذا التصميم؟</AlertDialogTitle>
                              <AlertDialogDescription>
                                هذا الإجراء لا يمكن التراجع عنه. سيتم حذف التصميم نهائياً من قاعدة البيانات.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteDesignType(design.id)} className="bg-red-500 hover:bg-red-600">حذف</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* عرض القوائم */}
          <TabsContent value="showcase" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إضافة قائمة للعرض</CardTitle>
                <CardDescription>أضف قائمة إلكترونية لعرضها في صفحة العملاء</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleCreateShowcase}>
                  <div className="grid grid-cols-2 gap-4">

                    <div className="space-y-2">
                      <Label htmlFor="pageName">اسم الصفحة</Label>
                      <Input id="pageName" placeholder="قائمة مطعم الذواقة" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pageDescription">وصف الصفحة</Label>
                      <Input id="pageDescription" placeholder="وصف قائمة مطعم الذواقة" />
                    </div>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="pageImage">صورة الصفحة</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <div className="flex flex-col items-center">
                          <Plus className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">اضغط لاختيار صورة أو اسحب الصورة هنا</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF حتى 2MB</p>
                        </div>
                        <input id="pageImage" type="file" className="hidden" />
                      </div>
                    </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pageLogo">شعار المطعم</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <div className="flex flex-col items-center">
                          <Plus className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">اضغط لاختيار صورة أو اسحب الصورة هنا</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF حتى 2MB</p>
                        </div>
                        <input id="pageLogo" type="file" className="hidden" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pageQrcode">رمز QR</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <div className="flex flex-col items-center">
                          <QrCode className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">سيتم إنشاء رمز QR تلقائياً</p>
                          <p className="text-xs text-gray-400 mt-1">أو قم بتحميل رمز QR خاص</p>
                        </div>
                        <input id="pageQrcode" type="file" className="hidden" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="menuUrl">رابط القائمة</Label>
                    <Input id="menuUrl" placeholder="https://menu.example.com/restaurant-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designType">نوع التصميم</Label>
                    <select id="designType" className="w-full p-2 border rounded-md">
                      {
                        design_types.map((type) => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <Button disabled={showcasesLoading} type="submit" className="bg-orange-500 hover:bg-orange-600">
                    إضافة للعرض
                    {showcasesLoading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>القوائم المعروضة</CardTitle>
                <CardDescription>جميع القوائم المعروضة في صفحة العملاء</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* تكرار لكل قائمة */}
                  {showcases.map((menu) => (
                    <div key={menu.id} className="border rounded-lg overflow-hidden group relative">
                      <div className="aspect-video bg-gray-100 relative">
                        <Image
                          src={menu.page_image}
                          alt={`قائمة ${menu}`}
                          width={400}
                          height={200}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                          <Link href={menu.emenu_link}>
                          <Image
                            src={menu.page_logo}
                            alt="شعار المطعم"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          </Link>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg">
                          {menu.page_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {menu.page_description}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                          <div className="bg-gray-100 p-2 rounded-md">
                            <Image 
                              src={menu.qrcode_image}
                              alt="رمز QR"
                              width={60}
                              height={60}
                            />
                          </div>
                          <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">
                            {menu.emenu_design_type.name}
                          </span>
                        </div>
                      </div>
                      <div className=" group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button  variant="destructive" size="sm" className="bg-red-500 hover:bg-red-600">
                              <Trash2 className="h-4 w-4 mr-1" />
                              حذف
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent dir="rtl">
                            <AlertDialogHeader>
                              <AlertDialogTitle>هل أنت متأكد من حذف هذه القائمة من العرض؟</AlertDialogTitle>
                              <AlertDialogDescription>
                                هذا الإجراء لا يمكن التراجع عنه. سيتم حذف القائمة نهائياً من العرض.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteShowcase(menu.id)} className="bg-red-500 hover:bg-red-600">حذف</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

