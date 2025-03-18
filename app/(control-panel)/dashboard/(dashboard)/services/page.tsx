"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Plus, Search, MoreVertical, Edit, Trash } from "lucide-react"
import useGetServerData from "@/src/hooks/use-get-server-data"
import { getServiceCategories } from "@/src/server-actions/service-category-actions"
import { createService, deleteService, getAllServices } from "@/src/server-actions/service-actions"
import useServerAction from "@/src/hooks/use-server-action"
import { toast } from "sonner"

export default function ServicesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("الكل")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [isActive, setIsActive] = useState(false)
  const [image, setImage] = useState<File | null>(null)

  
  const { data: categories } = useGetServerData(getServiceCategories, [])
  const { data: services } = useGetServerData(getAllServices, [])

  const createServiceAction = useServerAction(createService) 
  const handleAddService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !description || !category) {
      toast.error('Please fill in all fields')
      return
    }
    if(!image) {
      toast.error('Please select an image')
      return
    }

    await createServiceAction.mutation({
      title: title,
      description: description,
      category_id: +category,
      isActive: isActive,
      image: image
    })
    e.currentTarget.reset()
  }

  const deleteServiceAction = useServerAction(deleteService)

  const handleDeleteService = (id: number) => {
    deleteServiceAction.mutation(id, {
      onSuccess: () => {
        toast.success('Service deleted successfully')
      },

      onFailure: (error) => {
        toast.error(error)
      }
    })
  }

  // تصفية الخدمات حسب البحث والفئة
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="container mx-auto p-6 space-y-6 rtl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">إدارة الخدمات</h1>
        <p className="text-gray-500">عرض وإدارة جميع الخدمات التي تقدمها الشركة</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-2 md:w-2/3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="البحث عن خدمة..."
              className="pl-3 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="اختر الفئة" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="ml-2" size={16} />
              إضافة خدمة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] rtl">
            <DialogHeader>
              <DialogTitle>إضافة خدمة جديدة</DialogTitle>
              <DialogDescription>أدخل تفاصيل الخدمة الجديدة التي تريد إضافتها</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddService}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">اسم الخدمة</Label>
                    <Input 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    id="title" name="title" placeholder="أدخل اسم الخدمة" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">الفئة</Label>
                    <Select
                      onValueChange={(e) => setCategory(e)}
                      value={category}
                    name="category">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories
                          .map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">وصف الخدمة</Label>
                  <Textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    id="description"
                    name="description"
                    placeholder="أدخل وصفاً تفصيلياً للخدمة"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch 
                  onCheckedChange={(e) => setIsActive(e)}
                  id="isActive" name="isActive" checked={isActive} />
                  <Label htmlFor="isActive">تفعيل الخدمة</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">صورة الخدمة</Label>
                  <Input
                    type="file"
                    onChange={(e) => setImage(e.target.files![0])}
                    accept="image/*"
                    id="image"
                    name="image"
                    placeholder="أدخل رابط الصورة"
                  />
                </div>
              </div>
              <DialogFooter className="flex justify-start">
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                  إضافة الخدمة
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">اسم الخدمة</TableHead>
                <TableHead className="text-right">الفئة</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">تاريخ الإضافة</TableHead>
                <TableHead className="text-right w-[100px]">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    لا توجد خدمات متطابقة مع معايير البحث
                  </TableCell>
                </TableRow>
              ) : (
                filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">
                      <span>{service.title}</span>

                    </TableCell>
                    <TableCell>{service.service_category.name}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          service.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {service.is_active ? "مفعلة" : "غير مفعلة"}
                      </span>
                    </TableCell>
                    <TableCell>{service.created_at}</TableCell>
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
                              
                            }}
                          >
                            <Edit className="ml-2" size={14} />
                            تعديل
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                <Trash className="ml-2" size={14} />
                                حذف
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="rtl">
                              <AlertDialogHeader>
                                <AlertDialogTitle>هل أنت متأكد من حذف هذه الخدمة؟</AlertDialogTitle>
                                <AlertDialogDescription>
                                  هذا الإجراء لا يمكن التراجع عنه. سيتم حذف الخدمة نهائياً من النظام.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="flex justify-start gap-2">
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:bg-red-600 text-white"
                                  onClick={() => handleDeleteService(service.id)}
                                >
                                  حذف
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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

    </div>
  )
}

