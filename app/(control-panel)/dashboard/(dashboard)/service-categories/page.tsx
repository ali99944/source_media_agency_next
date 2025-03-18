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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreVertical, Trash2, ImageIcon, Filter } from "lucide-react"
import { createServiceCategory, deleteServiceCategory, getServiceCategories } from "@/src/server-actions/service-category-actions"
import useServerAction from "@/src/hooks/use-server-action"
import useGetServerData from "@/src/hooks/use-get-server-data"
import { toast } from "sonner"
import { service_categories as ServiceCategory } from "@prisma/client"


export default function ServiceCategoriesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null)

  // نموذج فارغ لفئة خدمة جديدة
  const emptyCategory: Omit<ServiceCategory, "id" | "created_at"> = {
    name: "",
    description: "",
    is_active: true,
    icon: "",
    page: "",
  }

  const [newCategory, setNewCategory] = useState(emptyCategory)

  const { data: service_categories, refetch } = useGetServerData(getServiceCategories, [])

  // تصفية الفئات حسب البحث والحالة
  const filteredCategories = service_categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.page.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && category.is_active) ||
      (statusFilter === "inactive" && !category.is_active)

    return matchesSearch && matchesStatus
  })

  const createServiceCategoryAction = useServerAction(createServiceCategory)
  const deleteServiceCategoryAction = useServerAction(deleteServiceCategory)

  const handleAddCategory = async () => {
    await createServiceCategoryAction.mutation({
      name: newCategory.name,
      description: newCategory.description,
      page: newCategory.page,
      is_active: newCategory.is_active,
      icon: newCategory.icon
    })
  }

  // حذف فئة
  const handleDeleteCategory = () => {
    if (!selectedCategory) return
    
    deleteServiceCategoryAction.mutation(+selectedCategory.id, {
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
        <h1 className="text-xl font-bold text-white">إدارة فئات الخدمات</h1>
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-orange-500 hover:bg-orange-600">
          <Plus className="ml-2 h-4 w-4" /> إضافة فئة جديدة
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
                <TableHead>الايقونة</TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead>الصفحة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    لا توجد فئات خدمات مطابقة لمعايير البحث
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="h-12 w-12" dangerouslySetInnerHTML={{ __html: category.icon }}/>
                    </TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.page}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          category.is_active
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {category.is_active ? 'مفعلة' : 'غير نشطة'}
                      </Badge>
                    </TableCell>
                    <TableCell>{category.created_at}</TableCell>
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
                              setSelectedCategory(category)
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
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* نافذة إضافة فئة جديدة */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[500px] rtl">
          <DialogHeader>
            <DialogTitle>إضافة فئة خدمة جديدة</DialogTitle>
            <DialogDescription>أدخل تفاصيل فئة الخدمة الجديدة. اضغط على حفظ عند الانتهاء.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">اسم الفئة</Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="أدخل اسم الفئة"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="page">الصفحة</Label>
              <Input
                id="page"
                value={newCategory.page}
                onChange={(e) => setNewCategory({ ...newCategory, page: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">وصف الفئة</Label>
              <Textarea
                id="description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                placeholder="أدخل وصفاً مختصراً للفئة"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="icon">صورة الفئة</Label>
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="h-20 w-20 rounded-md border border-gray-200 flex items-center justify-center bg-gray-50">
                  {newCategory.icon ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: newCategory.icon
                      }}
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <Textarea
                  id="icon"
                //   maxLength={3}
                  rows={3}
                  value={newCategory.icon}
                  onChange={(e) => {
                    setNewCategory({ ...newCategory, icon: e.target.value})
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="isActive" className="ml-2">
                الحالة
              </Label>
              <Switch
                id="isActive"
                checked={newCategory.is_active}
                onCheckedChange={(checked) => setNewCategory({ ...newCategory, is_active: checked })}
              />
              <span className="text-sm text-gray-500">{newCategory.is_active ? "نشط" : "غير نشط"}</span>
            </div>
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

          {selectedCategory && (
            <div className="py-4">
              <p className="text-black font-medium">{selectedCategory.name}</p>
              <p className="text-gray-500 text-sm mt-1">{selectedCategory.description}</p>
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

