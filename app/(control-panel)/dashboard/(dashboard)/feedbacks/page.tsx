"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreVertical, Trash2, Filter } from "lucide-react"
import useServerAction from "@/src/hooks/use-server-action"
import useGetServerData from "@/src/hooks/use-get-server-data"
import { createFeedback, deleteFeedback, getAllFeedback } from "@/src/server-actions/feedbacks-actions"
import { toast } from "sonner"
import { getServiceCategories } from "@/src/server-actions/service-category-actions"

// نموذج لفئة الخدمة
interface FeedbackCategory {
  id: number
  client_name: string
  client_message: string
  client_page_name: string
  service_id: number
}


export default function FeedbacksPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedFeedback, setSelectedFeedback] = useState<Omit<FeedbackCategory, 'service'> | null>(null)

  // نموذج فارغ لفئة خدمة جديدة
  const emptyFeedback: Omit<FeedbackCategory, "id"> = {
    client_name: '',
    client_message: '',
    client_page_name: '',
    service_id: 0
  }

  const [newFeedback, setNewFeedback] = useState(emptyFeedback)

  const { data: feedbacks, refetch } = useGetServerData(getAllFeedback, [])
  const { data: categories } = useGetServerData(getServiceCategories, [])

  const createFeedbackAction = useServerAction(createFeedback)
  const deleteFeedbackAction = useServerAction(deleteFeedback)

  const handleAddCategory = async () => {
    await createFeedbackAction.mutation({
      client_name: newFeedback.client_name,
      client_message: newFeedback.client_message,
      client_page_name: newFeedback.client_page_name,
      service_id: 1
    }, {
      onSuccess() {
          toast.success('تم اضافة الرأي بنجاح')
          setIsAddModalOpen(false)
          refetch()
      },

      onFailure(error) {
          toast.error(error)
      },
    })
  }

  const handleDeleteCategory = () => {
    if (!selectedFeedback) return

    deleteFeedbackAction.mutation(selectedFeedback.id, {
      onSuccess() {
        toast.success('تم حذف الراء بنجاح')
        setIsDeleteModalOpen(false)
        refetch()
      },

      onFailure(error) {
        toast.error(error)
      },
    })
  }

  return (
    <div className="p-6 space-y-6 rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">اراء العملاء</h1>
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-orange-500 hover:bg-orange-600">
          <Plus className="ml-2 h-4 w-4" /> إضافة رأي جديد
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>فئات الخدمات</CardTitle>
          <CardDescription>عرض وإدارة جميع فئات الخدمات المتاحة في النظام</CardDescription>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="بحث عن فئة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="تصفية حسب الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفئات</SelectItem>
                  <SelectItem value="active">الفئات النشطة</SelectItem>
                  <SelectItem value="inactive">الفئات غير النشطة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم العميل</TableHead>
                <TableHead>صفحة العميل</TableHead>
                <TableHead>تعليق العميل</TableHead>
                <TableHead>الخدمة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                                feedbacks.map((feedback) => (
                                  <TableRow key={feedback.id}>
                                    <TableCell className="font-medium">{feedback.client_name}</TableCell>
                                    <TableCell>{feedback.client_page_name}</TableCell>
                                    <TableCell>{feedback.client_message}</TableCell>
                                    <TableCell>{feedback.service.title}</TableCell>
                                    <TableCell>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreVertical className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem
                                            onClick={() => {
                                              setSelectedFeedback(feedback)
                                              setIsDeleteModalOpen(true)
                                            }}
                                            className="text-red-600"
                                          >
                                            <Trash2 className="ml-2 h-4 w-4" />
                                            حذف
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </TableCell>
                                  </TableRow>
                                ))
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* نافذة إضافة فئة جديدة */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[500px] rtl">
          <DialogHeader>
            <DialogTitle>اضافة رأي جديد</DialogTitle>
            <DialogDescription>أدخل تفاصيل رأي جديد.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="client_name">اسم العميل</Label>
              <Input
                id="client_name"
                value={newFeedback.client_name}
                onChange={(e) => setNewFeedback({ ...newFeedback, client_name: e.target.value })}
                placeholder="أدخل اسم العميل"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="client_feedback">تعليق العميل</Label>
              <Input
                id="client_feedback"
                value={newFeedback.client_message}
                onChange={(e) => setNewFeedback({ ...newFeedback, client_message: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="client_page_name">اسم صفحة العميل</Label>
              <Input
                id="client_page_name"
                value={newFeedback.client_page_name}
                onChange={(e) => setNewFeedback({ ...newFeedback, client_page_name: e.target.value })}
                placeholder="أدخل اسم صفحة العميل"
              />
            </div>

            <Select value={newFeedback.service_id.toString()} onValueChange={e => setNewFeedback({ ...newFeedback, service_id: +e })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="تصفية حسب الحالة" />
                </SelectTrigger>
                <SelectContent>
                  {
                    categories.map(e => (
                      <SelectItem key={e.id} value={e.id.toString()}>{e.name}</SelectItem>
                    ))
                  }
                  
                </SelectContent>
              </Select>
          </div>

          <DialogFooter className="flex flex-row-reverse sm:justify-start gap-2">
            <Button type="submit" onClick={handleAddCategory} className="bg-orange-500 hover:bg-orange-600 text-white">
              حفظ
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* نافذة تأكيد الحذف */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px] rtl">
          <DialogHeader>
            <DialogTitle>تأكيد حذف الفئة</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف هذه الفئة؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>

          {selectedFeedback && (
            <div className="py-4">
              <p className="text-black font-medium">{selectedFeedback.client_name}</p>
              <p className="text-gray-500 text-sm mt-1">{selectedFeedback.client_page_name}</p>
            </div>
          )}

          <DialogFooter className="flex flex-row-reverse sm:justify-start gap-2">
            <Button type="submit" onClick={handleDeleteCategory} variant="destructive">
              نعم، حذف الفئة
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

