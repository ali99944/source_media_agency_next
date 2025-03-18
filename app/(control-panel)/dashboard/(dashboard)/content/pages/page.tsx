"use client"

import { useState, useEffect } from "react"
import { FileText, Edit, Trash2, Eye, Save, RefreshCw, ArrowUpDown, MoreHorizontal, Globe, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "sonner"

// Define page type based on new schema
interface PageContent {
  type: string
  name: string
  value: string
}

interface PageContentMap {
  [key: string]: PageContent
}

interface Page {
  title: string
  description: string
  keywords: string
  page_code: string
  page_content: string // JSON string
}

// Sample pages data with new schema
const pages_seo_content: Page[] = [
  {
    title: "الصفحة الرئيسية",
    description: "سورس ميديا",
    keywords: "سورس ميديا",
    page_code: "landing",
    page_content: JSON.stringify({
      landing: {
        type: "text",
        name: "عنوان القسم الاول",
        value: "سورس ميديا",
      },
    }),
  },
  {
    title: "من نحن",
    description: "تعرف على سورس ميديا وخدماتنا المتميزة",
    keywords: "سورس ميديا، من نحن، خدمات، تسويق رقمي",
    page_code: "about-us",
    page_content: JSON.stringify({
      header: {
        type: "text",
        name: "عنوان الصفحة",
        value: "من نحن",
      },
      subheader: {
        type: "text",
        name: "العنوان الفرعي",
        value: "تعرف على سورس ميديا",
      },
      description: {
        type: "textarea",
        name: "وصف الشركة",
        value: "سورس ميديا هي شركة رائدة في مجال التسويق الرقمي وتطوير المواقع الإلكترونية وتصميم الهوية البصرية.",
      },
    }),
  },
  {
    title: "خدماتنا",
    description: "استكشف خدماتنا المتنوعة في مجال التسويق الرقمي",
    keywords: "خدمات، تسويق رقمي، تصميم مواقع، هوية بصرية",
    page_code: "services",
    page_content: JSON.stringify({
      header: {
        type: "text",
        name: "عنوان الصفحة",
        value: "خدماتنا",
      },
      intro: {
        type: "textarea",
        name: "مقدمة الخدمات",
        value: "نقدم مجموعة متنوعة من الخدمات المتميزة لتلبية احتياجات عملائنا.",
      },
    }),
  },
  {
    title: "التسويق الذكي",
    description: "خدمات التسويق الذكي من سورس ميديا",
    keywords: "تسويق ذكي، تسويق رقمي، سوشيال ميديا",
    page_code: "intelligent-marketing",
    page_content: JSON.stringify({
      header: {
        type: "text",
        name: "عنوان الصفحة",
        value: "التسويق الذكي",
      },
      features: {
        type: "list",
        name: "مميزات الخدمة",
        value: "تسويق عبر وسائل التواصل الاجتماعي\nإعلانات مدفوعة\nتحليل البيانات\nاستهداف دقيق",
      },
    }),
  },
  {
    title: "اتصل بنا",
    description: "تواصل مع فريق سورس ميديا",
    keywords: "اتصل بنا، تواصل، سورس ميديا",
    page_code: "contact-us",
    page_content: JSON.stringify({
      header: {
        type: "text",
        name: "عنوان الصفحة",
        value: "اتصل بنا",
      },
      address: {
        type: "text",
        name: "العنوان",
        value: "الرياض، المملكة العربية السعودية",
      },
      email: {
        type: "text",
        name: "البريد الإلكتروني",
        value: "info@sourcemedia.com",
      },
      phone: {
        type: "text",
        name: "رقم الهاتف",
        value: "+966 12 345 6789",
      },
    }),
  },
]

export default function ContentPagesPage() {
  const [pages, setPages] = useState<Page[]>(pages_seo_content)
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)
  const [parsedContent, setParsedContent] = useState<PageContentMap>({})
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [pageToDelete, setPageToDelete] = useState<Page | null>(null)
  const [isAddingField, setIsAddingField] = useState(false)
  const [newFieldKey, setNewFieldKey] = useState("")
  const [newFieldName, setNewFieldName] = useState("")
  const [newFieldType, setNewFieldType] = useState("text")
  const [newFieldValue, setNewFieldValue] = useState("")

  // Parse page content when selected page changes
  useEffect(() => {
    if (selectedPage) {
      try {
        const content = JSON.parse(selectedPage.page_content)
        setParsedContent(content)
      } catch (error) {
        console.error("Error parsing page content:", error)
        setParsedContent({})
        toast.error("حدث خطاء في تحليل محتوى الصفحة")
      }
    } else {
      setParsedContent({})
    }
  }, [selectedPage])

  const handleEditPage = (page: Page) => {
    setSelectedPage(page)
    setIsEditing(true)
  }

  const handleViewPage = (page: Page) => {
    setSelectedPage(page)
    setIsEditing(false)
  }

  const handleDeletePage = (page: Page) => {
    setPageToDelete(page)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeletePage = () => {
    if (pageToDelete) {
      setPages(pages.filter((p) => p.page_code !== pageToDelete.page_code))
      toast.success("تم حذف الصفحة بنجاح")
      setIsDeleteDialogOpen(false)
      setPageToDelete(null)
      if (selectedPage && selectedPage.page_code === pageToDelete.page_code) {
        setSelectedPage(null)
      }
    }
  }

  const handleSavePage = () => {
    if (!selectedPage) return

    setIsLoading(true)

    // Update the page content with the parsed content
    const updatedPage = {
      ...selectedPage,
      page_content: JSON.stringify(parsedContent),
    }

    // Update the pages array
    setPages(pages.map((p) => (p.page_code === updatedPage.page_code ? updatedPage : p)))

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast.success("تم حفظ الصفحة بنجاح")
      setIsEditing(false)
    }, 1000)
  }

  const handleContentChange = (key: string, value: string) => {
    if (!parsedContent[key]) return

    setParsedContent({
      ...parsedContent,
      [key]: {
        ...parsedContent[key],
        value,
      },
    })
  }

  const handleAddField = () => {
    if (!newFieldKey || !newFieldName) {
      toast.error("يرجى تعبئة جميع الحقول")
      return
    }

    if (parsedContent[newFieldKey]) {
      toast.error("لا يمكن اضافة حقل مكرر")
      return
    }

    setParsedContent({
      ...parsedContent,
      [newFieldKey]: {
        type: newFieldType,
        name: newFieldName,
        value: newFieldValue,
      },
    })

    // Reset form
    setNewFieldKey("")
    setNewFieldName("")
    setNewFieldType("text")
    setNewFieldValue("")
    setIsAddingField(false)
  }

  const handleDeleteField = (key: string) => {
    const updatedContent = { ...parsedContent }
    delete updatedContent[key]
    setParsedContent(updatedContent)
  }

  const renderContentEditor = (key: string, content: PageContent) => {
    switch (content.type) {
      case "textarea":
        return (
          <Textarea
            value={content.value}
            onChange={(e) => handleContentChange(key, e.target.value)}
            className="min-h-[150px] bg-black"
            disabled={!isEditing}
          />
        )
      case "list":
        return (
          <Textarea
            value={content.value}
            onChange={(e) => handleContentChange(key, e.target.value)}
            className="min-h-[150px] bg-black"
            placeholder="أدخل عناصر القائمة مفصولة بسطر جديد"
            disabled={!isEditing}
          />
        )
      case "text":
      default:
        return (
          <Input
            value={content.value}
            onChange={(e) => handleContentChange(key, e.target.value)}
            className="bg-black"
            disabled={!isEditing}
          />
        )
    }
  }

  return (
    <div className="container p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">إدارة الصفحات</h1>
          <p className="text-gray-400 mt-1">إدارة محتوى الصفحات وإعداداتها</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pages List */}
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader className="px-4 py-3">
              <CardTitle className="text-white text-lg">قائمة الصفحات</CardTitle>
            </CardHeader>
            <CardContent className="px-0 py-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-orange-500/5">
                    <TableHead className="text-right">
                      <div className="flex items-center">
                        العنوان
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((page) => (
                    <TableRow
                      key={page.page_code}
                      className={`hover:bg-orange-500/5 cursor-pointer ${
                        selectedPage?.page_code === page.page_code ? "bg-orange-500/10" : ""
                      }`}
                      onClick={() => handleViewPage(page)}
                    >
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewPage(page)
                              }}
                            >
                              <Eye className="ml-2 h-4 w-4" />
                              <span>عرض</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditPage(page)
                              }}
                            >
                              <Edit className="ml-2 h-4 w-4" />
                              <span>تعديل</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/20" />
                            <DropdownMenuItem
                              className="text-red-500 focus:text-red-500"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeletePage(page)
                              }}
                            >
                              <Trash2 className="ml-2 h-4 w-4" />
                              <span>حذف</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Page Editor */}
        <div className="md:col-span-2">
          {selectedPage ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">{isEditing ? "تعديل الصفحة" : "تفاصيل الصفحة"}</CardTitle>
                  <CardDescription>{selectedPage.title}</CardDescription>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <Button
                      onClick={handleSavePage}
                      className="bg-orange-500 hover:bg-orange-600 text-black"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
                          جاري الحفظ...
                        </>
                      ) : (
                        <>
                          <Save className="ml-2 h-4 w-4" />
                          حفظ التغييرات
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="hover:bg-orange-500/10 hover:text-orange-500"
                    >
                      <Edit className="ml-2 h-4 w-4" />
                      تعديل
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content">
                  <TabsList className="bg-black border">
                    <TabsTrigger
                      value="content"
                      className="data-[state=active]:bg-orange-500 data-[state=active]:text-black"
                    >
                      <FileText className="ml-2 h-4 w-4" />
                      المحتوى
                    </TabsTrigger>
                    <TabsTrigger
                      value="seo"
                      className="data-[state=active]:bg-orange-500 data-[state=active]:text-black"
                    >
                      <Globe className="ml-2 h-4 w-4" />
                      تحسين محركات البحث
                    </TabsTrigger>
                  </TabsList>

                  {/* Content Tab */}
                  <TabsContent value="content" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>محتوى الصفحة</Label>
                        {isEditing && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsAddingField(true)}
                            className="hover:bg-orange-500/10 hover:text-orange-500"
                          >
                            <Plus className="ml-2 h-4 w-4" />
                            إضافة حقل جديد
                          </Button>
                        )}
                      </div>

                      {/* Add new field form */}
                      {isEditing && isAddingField && (
                        <Card className="p-4 border-dashed border-orange-500/30 bg-orange-500/5 mb-4">
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor="field-key">مفتاح الحقل</Label>
                              <Input
                                id="field-key"
                                value={newFieldKey}
                                onChange={(e) => setNewFieldKey(e.target.value)}
                                placeholder="مثال: header, intro, etc."
                                className="bg-black"
                              />
                              <p className="text-xs text-gray-400">يجب أن يكون المفتاح فريدًا وبدون مسافات</p>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="field-name">اسم الحقل</Label>
                              <Input
                                id="field-name"
                                value={newFieldName}
                                onChange={(e) => setNewFieldName(e.target.value)}
                                placeholder="مثال: عنوان الصفحة"
                                className="bg-black"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor="field-type">نوع الحقل</Label>
                              <Select value={newFieldType} onValueChange={setNewFieldType}>
                                <SelectTrigger className="bg-black">
                                  <SelectValue placeholder="اختر نوع الحقل" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text">نص قصير</SelectItem>
                                  <SelectItem value="textarea">نص طويل</SelectItem>
                                  <SelectItem value="list">قائمة</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="field-value">القيمة الافتراضية</Label>
                              <Input
                                id="field-value"
                                value={newFieldValue}
                                onChange={(e) => setNewFieldValue(e.target.value)}
                                placeholder="القيمة الافتراضية للحقل"
                                className="bg-black"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => setIsAddingField(false)}>
                              إلغاء
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleAddField}
                              className="bg-orange-500 hover:bg-orange-600 text-black"
                            >
                              إضافة الحقل
                            </Button>
                          </div>
                        </Card>
                      )}

                      {/* Content fields */}
                      <Accordion type="multiple" className="w-full">
                        {Object.entries(parsedContent).map(([key, content]) => (
                          <AccordionItem value={key} key={key} className="border-orange-500/20">
                            <AccordionTrigger className="hover:bg-orange-500/5 px-4">
                              <div className="flex justify-between items-center w-full">
                                <span>{content.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-400 bg-orange-500/10 px-2 py-1 rounded">
                                    {content.type === "text"
                                      ? "نص قصير"
                                      : content.type === "textarea"
                                        ? "نص طويل"
                                        : content.type === "list"
                                          ? "قائمة"
                                          : content.type}
                                  </span>
                                  {isEditing && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleDeleteField(key)
                                      }}
                                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4">
                              <div className="space-y-2">
                                {renderContentEditor(key, content)}
                                <p className="text-xs text-gray-400">المفتاح: {key}</p>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>

                      {Object.keys(parsedContent).length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                          لا يوجد محتوى لهذه الصفحة. قم بإضافة حقول جديدة.
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* SEO Tab */}
                  <TabsContent value="seo" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="page-title">عنوان الصفحة</Label>
                      <Input
                        id="page-title"
                        value={selectedPage.title}
                        onChange={(e) => setSelectedPage({ ...selectedPage, title: e.target.value })}
                        className="bg-black"
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="page-code">كود الصفحة</Label>
                      <Input
                        id="page-code"
                        value={selectedPage.page_code}
                        className="bg-black"
                        disabled={true} // Always disabled to prevent changing the page code
                      />
                      <p className="text-xs text-gray-400">كود الصفحة هو معرف فريد للصفحة ولا يمكن تغييره</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meta-description">وصف الميتا (Meta Description)</Label>
                      <Textarea
                        id="meta-description"
                        value={selectedPage.description}
                        onChange={(e) => setSelectedPage({ ...selectedPage, description: e.target.value })}
                        className="min-h-[100px] bg-black"
                        disabled={!isEditing}
                      />
                      <p className="text-xs text-gray-400">يظهر في نتائج البحث (160 حرف كحد أقصى)</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meta-keywords">الكلمات المفتاحية (Meta Keywords)</Label>
                      <Input
                        id="meta-keywords"
                        value={selectedPage.keywords}
                        onChange={(e) => setSelectedPage({ ...selectedPage, keywords: e.target.value })}
                        className="bg-black"
                        disabled={!isEditing}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-black h-full flex items-center justify-center">
              <CardContent className="py-12 text-center">
                <FileText className="h-16 w-16 text-orange-500/50 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">اختر صفحة للعرض</h3>
                <p className="text-gray-400">اختر صفحة من القائمة على اليمين لعرض تفاصيلها وتعديلها</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-white">تأكيد حذف الصفحة</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف صفحة &quot;{pageToDelete?.title}&quot;؟ هذا الإجراء لا يمكن التراجع عنه.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="hover:bg-orange-500/10 hover:text-orange-500"
            >
              إلغاء
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeletePage}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              حذف الصفحة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

