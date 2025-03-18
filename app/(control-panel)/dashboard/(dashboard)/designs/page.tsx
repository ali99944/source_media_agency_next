"use client"

import { Plus, Edit, Trash2, Eye, Filter, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

// Mock data for designs
const designs = [
  {
    id: 1,
    name: "تصميم بطاقة عمل",
    category: "مطبوعات",
    status: "نشط",
    price: "$50",
    createdAt: "15-05-2023",
    views: 245,
  },
  {
    id: 2,
    name: "بانر وسائل التواصل",
    category: "رقمي",
    status: "نشط",
    price: "$75",
    createdAt: "20-05-2023",
    views: 189,
  },
  {
    id: 3,
    name: "تصميم شعار",
    category: "هوية بصرية",
    status: "نشط",
    price: "$150",
    createdAt: "22-05-2023",
    views: 320,
  },
  {
    id: 4,
    name: "تصميم واجهة موقع",
    category: "ويب",
    status: "مسودة",
    price: "$200",
    createdAt: "25-05-2023",
    views: 0,
  },
  { id: 5, name: "تصميم منشور", category: "مطبوعات", status: "نشط", price: "$45", createdAt: "28-05-2023", views: 156 },
  {
    id: 6,
    name: "قالب بريد إلكتروني",
    category: "رقمي",
    status: "نشط",
    price: "$60",
    createdAt: "01-06-2023",
    views: 98,
  },
  {
    id: 7,
    name: "تصميم بروشور",
    category: "مطبوعات",
    status: "مسودة",
    price: "$120",
    createdAt: "05-06-2023",
    views: 0,
  },
  {
    id: 8,
    name: "تصميم واجهة تطبيق",
    category: "موبايل",
    status: "نشط",
    price: "$250",
    createdAt: "10-06-2023",
    views: 210,
  },
]

// Mock data for categories
const categories = [
  { id: 1, name: "مطبوعات", count: 3, color: "bg-orange-500" },
  { id: 2, name: "رقمي", count: 2, color: "bg-orange-400" },
  { id: 3, name: "هوية بصرية", count: 1, color: "bg-orange-600" },
  { id: 4, name: "ويب", count: 1, color: "bg-orange-700" },
  { id: 5, name: "موبايل", count: 1, color: "bg-orange-300" },
]

export default function DesignsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [newCategory, setNewCategory] = useState("")

  // Filter designs based on active tab
  const filteredDesigns =
    activeTab === "all"
      ? designs
      : designs.filter((design) => design.category.toLowerCase() === activeTab.toLowerCase())

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">خدمات التصميم</h1>
          <p className="text-muted-foreground">إدارة جميع خدمات التصميم والفئات في مكان واحد</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="default" className="bg-orange-600 hover:bg-orange-700">
            <a href="/admin/designs/new">
              <Plus className="ml-2 h-4 w-4" /> إضافة تصميم جديد
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="/admin/designs/categories">إدارة الفئات</a>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardHeader className={`${category.color} text-white p-4`}>
              <CardTitle className="text-lg">{category.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{category.count}</div>
              <p className="text-sm text-muted-foreground">تصاميم</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-end">
              <Button variant="ghost" size="sm" className="text-xs">
                عرض الكل
              </Button>
            </CardFooter>
          </Card>
        ))}
        <Card className="overflow-hidden border-dashed border-2 flex items-center justify-center">
            <Button variant="ghost" className="h-full w-full flex flex-col gap-2 items-center justify-center" onClick={() => setIsAddCategoryOpen(true)}>
              <Plus className="h-8 w-8 text-muted-foreground" />
              <span className="text-muted-foreground">إضافة فئة</span>
            </Button>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList className="mb-4">
            <TabsTrigger value="all">جميع التصاميم</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.name.toLowerCase()}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="ml-2 h-4 w-4" /> تصفية
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>تصفية حسب</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>الحالة: نشط</DropdownMenuItem>
              <DropdownMenuItem>الحالة: مسودة</DropdownMenuItem>
              <DropdownMenuItem>السعر: من الأقل إلى الأعلى</DropdownMenuItem>
              <DropdownMenuItem>السعر: من الأعلى إلى الأقل</DropdownMenuItem>
              <DropdownMenuItem>التاريخ: الأحدث</DropdownMenuItem>
              <DropdownMenuItem>التاريخ: الأقدم</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">الرقم</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        الاسم
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>الفئة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>السعر</TableHead>
                    <TableHead>المشاهدات</TableHead>
                    <TableHead>تاريخ الإنشاء</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDesigns.map((design) => (
                    <TableRow key={design.id}>
                      <TableCell className="font-medium">{design.id}</TableCell>
                      <TableCell>{design.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-orange-500 text-orange-500">
                          {design.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={design.status === "نشط" ? "default" : "secondary"}
                          className={design.status === "نشط" ? "bg-orange-500" : ""}
                        >
                          {design.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{design.price}</TableCell>
                      <TableCell>{design.views}</TableCell>
                      <TableCell>{design.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.name.toLowerCase()} className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>تصاميم {category.name}</CardTitle>
                <CardDescription>عرض جميع التصاميم في فئة {category.name}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">الرقم</TableHead>
                      <TableHead>الاسم</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>السعر</TableHead>
                      <TableHead>المشاهدات</TableHead>
                      <TableHead>تاريخ الإنشاء</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDesigns.map((design) => (
                      <TableRow key={design.id}>
                        <TableCell className="font-medium">{design.id}</TableCell>
                        <TableCell>{design.name}</TableCell>
                        <TableCell>
                          <Badge
                            variant={design.status === "نشط" ? "default" : "secondary"}
                            className={design.status === "نشط" ? "bg-orange-500" : ""}
                          >
                            {design.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{design.price}</TableCell>
                        <TableCell>{design.views}</TableCell>
                        <TableCell>{design.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة فئة جديدة</DialogTitle>
            <DialogDescription>إنشاء فئة جديدة لخدمات التصميم الخاصة بك</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                الاسم
              </Label>
              <Input
                id="name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                اللون
              </Label>
              <div className="col-span-3 flex gap-2">
                {["bg-orange-300", "bg-orange-400", "bg-orange-500", "bg-orange-600", "bg-orange-700"].map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 rounded-full cursor-pointer ${color} border-2 ${color === "bg-orange-500" ? "border-black" : "border-transparent"}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
              إلغاء
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setIsAddCategoryOpen(false)}>
              حفظ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

