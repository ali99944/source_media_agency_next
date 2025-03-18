"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
} from "@/components/ui/alert-dialog"
import { Search, Plus, Trash2, AlertCircle } from "lucide-react"
import useGetServerData from "@/src/hooks/use-get-server-data"
import { createFaq, deleteFaqAc, getFaqs } from "@/src/server-actions/faqs-actions"
import useServerAction from "@/src/hooks/use-server-action"
import { toast } from "sonner"

// نموذج البيانات للأسئلة الشائعة
interface FAQ {
  id: number
  question: string
  answer: string
  is_active: boolean
  created_at: string
}

export default function FAQsPage() {
  const { data: faqs, refetch } = useGetServerData(getFaqs, [])

  // حالة البحث
  const [searchQuery, setSearchQuery] = useState("")

  // حالة إضافة/تعديل سؤال شائع
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")

  // حالة حذف سؤال شائع
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [faqToDelete, setFaqToDelete] = useState<FAQ | null>(null)

  // تصفية الأسئلة الشائعة حسب البحث
  const filteredFAQs = faqs.filter((faq) => faq.question.includes(searchQuery) || faq.answer.includes(searchQuery))

  // فتح نافذة إضافة سؤال جديد
  const openAddDialog = () => {
    setNewQuestion("")
    setNewAnswer("")
    setIsDialogOpen(true)
  }

  const createFaqAction = useServerAction(createFaq)
  const saveFAQ = async () => {
      await createFaqAction.mutation({
        question: newQuestion,
        answer: newAnswer,
      }, {
        onSuccess: () => {
          setIsDialogOpen(false)
          toast.success("تم حفظ الأسئلة الشائعة بنجاح")
          refetch()
        },

        onFailure: () => {
          toast.error("حدث خطاء في حفظ الأسئلة الشائعة")
        }
      })
  }

  // فتح نافذة تأكيد الحذف
  const openDeleteDialog = (faq: FAQ) => {
    setFaqToDelete(faq)
    setIsDeleteDialogOpen(true)
  }

  const deleteFaqAction = useServerAction(deleteFaqAc)
  const deleteFAQ = async () => {
    if (faqToDelete) {
      await deleteFaqAction.mutation(faqToDelete.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false)
          toast.success("تم حذف الأسئلة الشائعة بنجاح")
          refetch()
        },

        onFailure: () => {
          toast.error("حدث خطاء في حذف الأسئلة الشائعة")
        },
      })
    }
  }


  return (
    <div className="container mx-auto p-6 space-y-6 rtl">
      <Card className="border-none shadow-md">
        <CardHeader className=" text-white rounded-t-lg">
          <CardTitle className="text-2xl">إدارة الأسئلة الشائعة</CardTitle>
          <CardDescription className="text-gray-300">إضافة وتعديل وحذف الأسئلة الشائعة</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="بحث في الأسئلة الشائعة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 w-full"
              />
            </div>
            <Button onClick={openAddDialog} className="bg-orange-600 hover:bg-orange-700 text-white w-full md:w-auto">
              <Plus className="ml-2 h-4 w-4" /> إضافة سؤال جديد
            </Button>
          </div>

          {filteredFAQs.length === 0 ? (
            <div className="text-center py-10 border rounded-lg">
              <AlertCircle className="mx-auto h-10 w-10 text-gray-400 mb-2" />
              <p className="text-gray-500">لا توجد أسئلة شائعة مطابقة للبحث</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] text-right">الرقم</TableHead>
                    <TableHead className="text-right">السؤال</TableHead>
                    <TableHead className="text-right">الجواب</TableHead>
                    <TableHead className="text-right hidden md:table-cell">تاريخ الإنشاء</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFAQs.map((faq) => (
                    <TableRow key={faq.id}>
                      <TableCell className="font-medium">{faq.id}</TableCell>
                      <TableCell className="max-w-[300px] truncate">{faq.question}</TableCell>
                      <TableCell className="max-w-[300px] truncate">{faq.answer}</TableCell>
                      <TableCell className="hidden md:table-cell">{faq.created_at}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteDialog(faq)}
                            className=" text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* نافذة إضافة سؤال */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rtl">
          <DialogHeader>
            <DialogTitle>إضافة سؤال شائع جديد</DialogTitle>
            <DialogDescription>أدخل تفاصيل السؤال والإجابة أدناه</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="question">السؤال</Label>
              <Input
                id="question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="أدخل السؤال هنا"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="answer">الإجابة</Label>
              <Textarea
                id="answer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="أدخل الإجابة هنا"
                rows={5}
              />
            </div>
          </div>
          <DialogFooter className="flex flex-row-reverse sm:justify-start gap-2">
            <Button type="submit" onClick={saveFAQ} className="bg-orange-600 hover:bg-orange-700 text-white">
              حفظ
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نافذة تأكيد الحذف */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من حذف هذا السؤال؟</AlertDialogTitle>
            <AlertDialogDescription>
              هذا الإجراء لا يمكن التراجع عنه. سيتم حذف السؤال نهائيًا من قاعدة البيانات.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row-reverse sm:justify-start gap-2">
            <AlertDialogAction onClick={deleteFAQ} className="bg-red-600 hover:bg-red-700 text-white">
              حذف
            </AlertDialogAction>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

