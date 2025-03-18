"use client"

import { useState, useEffect } from "react"

import {
  File,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Database,
  FileCode,
  Folder,
  FolderPlus,
  Upload,
  Download,
  Search,
  Grid,
  List,
  MoreVertical,
  Star,
  StarOff,
  Share2,
  Trash2,
  Edit,
  Eye,
  Filter,
  ChevronRight,
  X,
  Check,
  RefreshCw,
  SlidersHorizontal,
  Copy,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// نوع البيانات للملف
type FileItem = {
  id: string
  name: string
  type: "file" | "folder" | "image" | "video" | "audio" | "document" | "archive" | "code"
  size: number
  extension?: string
  path: string[]
  createdAt: Date
  updatedAt: Date
  createdBy: {
    id: string
    name: string
    avatar: string
  }
  starred: boolean
  shared: boolean
  tags: string[]
  thumbnail?: string
  description?: string
  category?: string
  comments?: number
}

// نوع البيانات للمجلد
type FolderType = {
  id: string
  name: string
  path: string[]
  createdAt: Date
  createdBy: {
    id: string
    name: string
    avatar: string
  }
  itemsCount: number
}

// بيانات تجريبية للملفات
const dummyFiles: FileItem[] = [
  {
    id: "1",
    name: "تقرير المبيعات الشهري",
    type: "document",
    extension: "xlsx",
    size: 2500000,
    path: ["المستندات", "تقارير"],
    createdAt: new Date("2023-12-15"),
    updatedAt: new Date("2023-12-20"),
    createdBy: {
      id: "1",
      name: "أحمد محمد",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    starred: true,
    shared: true,
    tags: ["تقرير", "مبيعات", "شهري"],
    category: "تقارير",
    comments: 5,
  },
  {
    id: "2",
    name: "تصميم الشعار الجديد",
    type: "image",
    extension: "png",
    size: 5800000,
    path: ["التصاميم", "شعارات"],
    createdAt: new Date("2023-12-10"),
    updatedAt: new Date("2023-12-10"),
    createdBy: {
      id: "2",
      name: "سارة أحمد",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    starred: false,
    shared: true,
    tags: ["شعار", "تصميم", "هوية"],
    thumbnail: "/placeholder.svg?height=100&width=100",
    category: "تصاميم",
    comments: 12,
  },
  {
    id: "3",
    name: "فيديو العرض التقديمي",
    type: "video",
    extension: "mp4",
    size: 158000000,
    path: ["وسائط", "فيديوهات"],
    createdAt: new Date("2023-12-05"),
    updatedAt: new Date("2023-12-07"),
    createdBy: {
      id: "3",
      name: "محمد علي",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    starred: true,
    shared: true,
    tags: ["فيديو", "عرض", "تسويق"],
    thumbnail: "/placeholder.svg?height=100&width=100",
    category: "وسائط",
    comments: 3,
  },
  {
    id: "4",
    name: "كود الموقع الإلكتروني",
    type: "code",
    extension: "zip",
    size: 25000000,
    path: ["تطوير", "مشاريع"],
    createdAt: new Date("2023-11-28"),
    updatedAt: new Date("2023-12-18"),
    createdBy: {
      id: "4",
      name: "خالد عمر",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    starred: false,
    shared: true,
    tags: ["كود", "تطوير", "موقع"],
    category: "تطوير",
    comments: 8,
  },
  {
    id: "5",
    name: "خطة التسويق السنوية",
    type: "document",
    extension: "pdf",
    size: 3800000,
    path: ["المستندات", "تسويق"],
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2023-12-15"),
    createdBy: {
      id: "1",
      name: "أحمد محمد",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    starred: true,
    shared: true,
    tags: ["تسويق", "خطة", "استراتيجية"],
    category: "تسويق",
    comments: 15,
  },
  {
    id: "6",
    name: "ملفات العملاء",
    type: "folder",
    size: 0,
    path: ["العملاء"],
    createdAt: new Date("2023-11-15"),
    updatedAt: new Date("2023-12-20"),
    createdBy: {
      id: "2",
      name: "سارة أحمد",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    starred: false,
    shared: true,
    tags: ["عملاء", "ملفات"],
    category: "عملاء",
  },
  {
    id: "7",
    name: "قاعدة بيانات المنتجات",
    type: 'folder',
    extension: "sql",
    size: 12500000,
    path: ["قواعد البيانات"],
    createdAt: new Date("2023-11-10"),
    updatedAt: new Date("2023-12-12"),
    createdBy: {
      id: "4",
      name: "خالد عمر",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    starred: false,
    shared: true,
    tags: ["قاعدة بيانات", "منتجات", "بيانات"],
    category: "بيانات",
    comments: 2,
  },
  {
    id: "8",
    name: "موسيقى الإعلان",
    type: "audio",
    extension: "mp3",
    size: 8500000,
    path: ["وسائط", "صوتيات"],
    createdAt: new Date("2023-12-08"),
    updatedAt: new Date("2023-12-08"),
    createdBy: {
      id: "3",
      name: "محمد علي",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    starred: true,
    shared: false,
    tags: ["موسيقى", "إعلان", "صوت"],
    category: "وسائط",
    comments: 0,
  },
]

// بيانات تجريبية للمجلدات
const dummyFolders: FolderType[] = [
  {
    id: "folder1",
    name: "المستندات",
    path: [],
    createdAt: new Date("2023-10-01"),
    createdBy: {
      id: "1",
      name: "أحمد محمد",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    itemsCount: 25,
  },
  {
    id: "folder2",
    name: "التصاميم",
    path: [],
    createdAt: new Date("2023-10-05"),
    createdBy: {
      id: "2",
      name: "سارة أحمد",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    itemsCount: 18,
  },
  {
    id: "folder3",
    name: "وسائط",
    path: [],
    createdAt: new Date("2023-10-10"),
    createdBy: {
      id: "3",
      name: "محمد علي",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    itemsCount: 32,
  },
  {
    id: "folder4",
    name: "تطوير",
    path: [],
    createdAt: new Date("2023-10-15"),
    createdBy: {
      id: "4",
      name: "خالد عمر",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    itemsCount: 15,
  },
]

// بيانات تجريبية للتصنيفات
const dummyCategories = [
  { id: "cat1", name: "تقارير", count: 12 },
  { id: "cat2", name: "تصاميم", count: 24 },
  { id: "cat3", name: "وسائط", count: 18 },
  { id: "cat4", name: "تطوير", count: 9 },
  { id: "cat5", name: "تسويق", count: 15 },
  { id: "cat6", name: "عملاء", count: 30 },
  { id: "cat7", name: "بيانات", count: 6 },
]

// بيانات تجريبية للوسوم
const dummyTags = [
  { id: "tag1", name: "مهم", count: 8 },
  { id: "tag2", name: "تقرير", count: 12 },
  { id: "tag3", name: "مبيعات", count: 7 },
  { id: "tag4", name: "تصميم", count: 18 },
  { id: "tag5", name: "فيديو", count: 9 },
  { id: "tag6", name: "عرض", count: 5 },
  { id: "tag7", name: "كود", count: 11 },
  { id: "tag8", name: "تسويق", count: 14 },
  { id: "tag9", name: "عملاء", count: 22 },
  { id: "tag10", name: "استراتيجية", count: 6 },
]

// تحويل حجم الملف إلى صيغة مقروءة
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 بايت"
  const k = 1024
  const sizes = ["بايت", "كيلوبايت", "ميجابايت", "جيجابايت", "تيرابايت"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// تحويل التاريخ إلى صيغة مقروءة
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

// أيقونة الملف حسب النوع
const FileIcon = ({ type }: { type: string; extension?: string }) => {
  switch (type) {
    case "folder":
      return <Folder className="h-6 w-6 text-orange-500" />
    case "image":
      return <Image className="h-6 w-6 text-orange-500" />
    case "video":
      return <Video className="h-6 w-6 text-orange-500" />
    case "audio":
      return <Music className="h-6 w-6 text-orange-500" />
    case "document":
      return <FileText className="h-6 w-6 text-orange-500" />
    case "archive":
      return <Archive className="h-6 w-6 text-orange-500" />
    case "database":
      return <Database className="h-6 w-6 text-orange-500" />
    case "code":
      return <FileCode className="h-6 w-6 text-orange-500" />
    default:
      return <File className="h-6 w-6 text-orange-500" />
  }
}

// الصفحة الرئيسية لإدارة الملفات
export default function FilesPage() {
  // حالة العرض (شبكة أو قائمة)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // المسار الحالي
  const [currentPath, setCurrentPath] = useState<string[]>([])

  // الملفات المعروضة
  const [files, setFiles] = useState<FileItem[]>(dummyFiles)

  // المجلدات المعروضة
  const [folders, setFolders] = useState<FolderType[]>(dummyFolders)

  // حالة التحميل
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // الملفات المحددة
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  // حالة البحث
  const [searchQuery, setSearchQuery] = useState<string>("")

  // التصنيف المحدد
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  // الوسم المحدد
  const [selectedTag, setSelectedTag] = useState<string>("")

  // حالة عرض الملفات المميزة فقط
  const [showStarredOnly, setShowStarredOnly] = useState<boolean>(false)

  // حالة عرض الملفات المشتركة فقط
  const [showSharedOnly, setShowSharedOnly] = useState<boolean>(false)

  // الملف المحدد للعرض
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  // حالة فتح مربع حوار إضافة ملف
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState<boolean>(false)

  // حالة فتح مربع حوار إنشاء مجلد
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState<boolean>(false)

  // اسم المجلد الجديد
  const [newFolderName, setNewFolderName] = useState<string>("")

  // حالة فتح لوحة التفاصيل
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState<boolean>(false)

  // تحميل الملفات والمجلدات
  useEffect(() => {
    // محاكاة تحميل البيانات
    setIsLoading(true)
    setTimeout(() => {
      // تصفية الملفات حسب المسار الحالي
      const filteredFiles = dummyFiles.filter((file) => {
        // التحقق من المسار
        if (currentPath.length === 0 && file.path.length === 0) return true
        if (currentPath.length === 0 && file.path.length > 0) return false
        if (currentPath.length > 0 && file.path.length === 0) return false

        // التحقق من تطابق المسار
        for (let i = 0; i < currentPath.length; i++) {
          if (currentPath[i] !== file.path[i]) return false
        }

        // التحقق من أن الملف في المستوى الحالي
        return file.path.length === currentPath.length + 1
      })

      // تصفية المجلدات حسب المسار الحالي
      const filteredFolders = dummyFolders.filter((folder) => {
        // التحقق من المسار
        if (currentPath.length === 0 && folder.path.length === 0) return true
        if (currentPath.length === 0 && folder.path.length > 0) return false
        if (currentPath.length > 0 && folder.path.length === 0) return false

        // التحقق من تطابق المسار
        for (let i = 0; i < currentPath.length; i++) {
          if (currentPath[i] !== folder.path[i]) return false
        }

        // التحقق من أن المجلد في المستوى الحالي
        return folder.path.length === currentPath.length
      })

      // تطبيق البحث والتصفية
      let searchedFiles = filteredFiles
      if (searchQuery) {
        searchedFiles = searchedFiles.filter(
          (file) =>
            file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
        )
      }

      // تصفية حسب التصنيف
      if (selectedCategory) {
        searchedFiles = searchedFiles.filter((file) => file.category === selectedCategory)
      }

      // تصفية حسب الوسم
      if (selectedTag) {
        searchedFiles = searchedFiles.filter((file) => file.tags.includes(selectedTag))
      }

      // تصفية الملفات المميزة
      if (showStarredOnly) {
        searchedFiles = searchedFiles.filter((file) => file.starred)
      }

      // تصفية الملفات المشتركة
      if (showSharedOnly) {
        searchedFiles = searchedFiles.filter((file) => file.shared)
      }

      setFiles(searchedFiles)
      setFolders(filteredFolders)
      setIsLoading(false)
    }, 500)
  }, [currentPath, searchQuery, selectedCategory, selectedTag, showStarredOnly, showSharedOnly])

  // التنقل إلى مجلد
  const navigateToFolder = (folderName: string) => {
    setCurrentPath([...currentPath, folderName])
    setSelectedItems([])
  }

  // الرجوع إلى المجلد السابق
  const navigateBack = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1))
      setSelectedItems([])
    }
  }

  // التنقل إلى مستوى محدد في المسار
  const navigateToPath = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1))
    setSelectedItems([])
  }

  // تحديد ملف أو مجلد
  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  // تحديد جميع العناصر
  const selectAllItems = () => {
    const allIds = [...files.map((file) => file.id), ...folders.map((folder) => folder.id)]
    setSelectedItems(allIds)
  }

  // إلغاء تحديد جميع العناصر
  const deselectAllItems = () => {
    setSelectedItems([])
  }

  // تبديل حالة التمييز بنجمة
  const toggleStarred = (id: string) => {
    setFiles(files.map((file) => (file.id === id ? { ...file, starred: !file.starred } : file)))
  }

  // فتح ملف للعرض
  const openFile = (file: FileItem) => {
    setSelectedFile(file)
    setIsDetailsPanelOpen(true)
  }

  // إنشاء مجلد جديد
  const createNewFolder = () => {
    if (newFolderName.trim() === "") return

    const newFolder: FolderType = {
      id: `folder${Date.now()}`,
      name: newFolderName,
      path: currentPath,
      createdAt: new Date(),
      createdBy: {
        id: "1",
        name: "أحمد محمد",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      itemsCount: 0,
    }

    setFolders([...folders, newFolder])
    setNewFolderName("")
    setIsNewFolderDialogOpen(false)
  }

  // حذف العناصر المحددة
  const deleteSelectedItems = () => {
    setFiles(files.filter((file) => !selectedItems.includes(file.id)))
    setFolders(folders.filter((folder) => !selectedItems.includes(folder.id)))
    setSelectedItems([])
  }

  // تنزيل الملفات المحددة
  const downloadSelectedFiles = () => {
    // محاكاة تنزيل الملفات
    alert(`تم تنزيل ${selectedItems.length} ملفات`)
  }

  // مشاركة الملفات المحددة
  const shareSelectedFiles = () => {
    // محاكاة مشاركة الملفات
    alert(`تم مشاركة ${selectedItems.length} ملفات`)
  }

  return (
    <div className="container mx-auto p-4 rtl">
      <div className="flex flex-col space-y-4">
        {/* العنوان والأزرار الرئيسية */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">إدارة الملفات</h1>
          <div className="flex space-x-2 space-x-reverse">
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(true)} className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>رفع ملفات</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsNewFolderDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <FolderPlus className="h-4 w-4" />
              <span>مجلد جديد</span>
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-orange-100" : ""}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>عرض شبكي</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-orange-100" : ""}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>عرض قائمة</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* شريط البحث والتصفية */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="البحث عن ملفات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 w-full"
            />
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>تصفية</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">التصنيفات</h4>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر تصنيفًا" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع التصنيفات</SelectItem>
                        {dummyCategories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name} ({category.count})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">الوسوم</h4>
                    <Select value={selectedTag} onValueChange={setSelectedTag}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر وسمًا" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الوسوم</SelectItem>
                        {dummyTags.map((tag) => (
                          <SelectItem key={tag.id} value={tag.name}>
                            {tag.name} ({tag.count})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="starred"
                      checked={showStarredOnly}
                      onCheckedChange={(checked) => setShowStarredOnly(checked as boolean)}
                    />
                    <Label htmlFor="starred" className="cursor-pointer">
                      عرض المميزة بنجمة فقط
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="shared"
                      checked={showSharedOnly}
                      onCheckedChange={(checked) => setShowSharedOnly(checked as boolean)}
                    />
                    <Label htmlFor="shared" className="cursor-pointer">
                      عرض المشتركة فقط
                    </Label>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory("")
                        setSelectedTag("")
                        setShowStarredOnly(false)
                        setShowSharedOnly(false)
                      }}
                    >
                      إعادة ضبط
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>خيارات</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>إجراءات متعددة</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={selectAllItems}>
                  <Check className="h-4 w-4 ml-2" />
                  <span>تحديد الكل</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={deselectAllItems}>
                  <X className="h-4 w-4 ml-2" />
                  <span>إلغاء تحديد الكل</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={downloadSelectedFiles} disabled={selectedItems.length === 0}>
                  <Download className="h-4 w-4 ml-2" />
                  <span>تنزيل المحدد</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareSelectedFiles} disabled={selectedItems.length === 0}>
                  <Share2 className="h-4 w-4 ml-2" />
                  <span>مشاركة المحدد</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={deleteSelectedItems}
                  disabled={selectedItems.length === 0}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 ml-2" />
                  <span>حذف المحدد</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* شريط المسار */}
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={navigateBack} disabled={currentPath.length === 0} className="ml-2">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => setCurrentPath([])}>الرئيسية</BreadcrumbLink>
              </BreadcrumbItem>
              {currentPath.map((path, index) => (
                <BreadcrumbItem key={index}>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbLink onClick={() => navigateToPath(index)}>{path}</BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* عرض الملفات والمجلدات */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <RefreshCw className="h-8 w-8 animate-spin text-orange-500" />
              <p className="mt-2">جاري التحميل...</p>
            </div>
          </div>
        ) : (
          <>
            {folders.length === 0 && files.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Folder className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">لا توجد ملفات</h3>
                <p className="text-gray-500 max-w-md">هذا المجلد فارغ. قم برفع بعض الملفات أو إنشاء مجلد جديد للبدء.</p>
                <div className="flex mt-4 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsUploadDialogOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>رفع ملفات</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsNewFolderDialogOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <FolderPlus className="h-4 w-4" />
                    <span>مجلد جديد</span>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* عرض المجلدات */}
                {folders.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-medium mb-3">المجلدات</h2>
                    {viewMode === "grid" ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {folders.map((folder) => (
                          <Card
                            key={folder.id}
                            className={cn(
                              "cursor-pointer hover:border-orange-300 transition-colors",
                              selectedItems.includes(folder.id) ? "border-orange-500 bg-orange-50" : "",
                            )}
                            onClick={() => toggleSelectItem(folder.id)}
                            onDoubleClick={() => navigateToFolder(folder.name)}
                          >
                            <CardContent className="p-4 flex flex-col items-center text-center">
                              <div className="mb-2 mt-2">
                                <Folder className="h-12 w-12 text-orange-500" />
                              </div>
                              <h3 className="font-medium text-sm mb-1 line-clamp-2">{folder.name}</h3>
                              <p className="text-xs text-gray-500">{folder.itemsCount} عنصر</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12"></TableHead>
                            <TableHead>الاسم</TableHead>
                            <TableHead>العناصر</TableHead>
                            <TableHead>تاريخ الإنشاء</TableHead>
                            <TableHead>المنشئ</TableHead>
                            <TableHead className="w-12"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {folders.map((folder) => (
                            <TableRow
                              key={folder.id}
                              className={cn("cursor-pointer", selectedItems.includes(folder.id) ? "bg-orange-50" : "")}
                              onClick={() => toggleSelectItem(folder.id)}
                              onDoubleClick={() => navigateToFolder(folder.name)}
                            >
                              <TableCell>
                                <Checkbox
                                  checked={selectedItems.includes(folder.id)}
                                  onCheckedChange={() => toggleSelectItem(folder.id)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Folder className="h-5 w-5 text-orange-500 ml-2" />
                                  <span>{folder.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>{folder.itemsCount} عنصر</TableCell>
                              <TableCell>{formatDate(folder.createdAt)}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Avatar className="h-6 w-6 ml-2">
                                    <AvatarImage src={folder.createdBy.avatar} />
                                    <AvatarFallback>{folder.createdBy.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span>{folder.createdBy.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => navigateToFolder(folder.name)}>
                                      <Folder className="h-4 w-4 ml-2" />
                                      <span>فتح</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Edit className="h-4 w-4 ml-2" />
                                      <span>إعادة تسمية</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Share2 className="h-4 w-4 ml-2" />
                                      <span>مشاركة</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="h-4 w-4 ml-2" />
                                      <span>حذف</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                )}

                {/* عرض الملفات */}
                {files.length > 0 && (
                  <div>
                    <h2 className="text-lg font-medium mb-3">الملفات</h2>
                    {viewMode === "grid" ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {files.map((file) => (
                          <Card
                            key={file.id}
                            className={cn(
                              "cursor-pointer hover:border-orange-300 transition-colors",
                              selectedItems.includes(file.id) ? "border-orange-500 bg-orange-50" : "",
                            )}
                            onClick={() => toggleSelectItem(file.id)}
                            onDoubleClick={() => openFile(file)}
                          >
                            <CardContent className="p-4 flex flex-col items-center text-center relative">
                              <div className="absolute top-2 right-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleStarred(file.id)
                                  }}
                                >
                                  {file.starred ? (
                                    <Star className="h-4 w-4 text-orange-500 fill-orange-500" />
                                  ) : (
                                    <StarOff className="h-4 w-4 text-gray-400" />
                                  )}
                                </Button>
                              </div>
                              <div className="mb-2 mt-2">
                                {file.type === "image" && file.thumbnail ? (
                                  <div className="h-16 w-16 rounded overflow-hidden">
                                    <img
                                      src={file.thumbnail || "/placeholder.svg"}
                                      alt={file.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <FileIcon type={file.type} extension={file.extension} />
                                )}
                              </div>
                              <h3 className="font-medium text-sm mb-1 line-clamp-2">{file.name}</h3>
                              <div className="flex items-center text-xs text-gray-500 mb-1">
                                <span>{file.extension?.toUpperCase()}</span>
                                <span className="mx-1">•</span>
                                <span>{formatFileSize(file.size)}</span>
                              </div>
                              {file.tags.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-1 mt-2">
                                  {file.tags.slice(0, 2).map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {file.tags.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{file.tags.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12"></TableHead>
                            <TableHead>الاسم</TableHead>
                            <TableHead>النوع</TableHead>
                            <TableHead>الحجم</TableHead>
                            <TableHead>تاريخ التعديل</TableHead>
                            <TableHead>المنشئ</TableHead>
                            <TableHead className="w-12"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {files.map((file) => (
                            <TableRow
                              key={file.id}
                              className={cn("cursor-pointer", selectedItems.includes(file.id) ? "bg-orange-50" : "")}
                              onClick={() => toggleSelectItem(file.id)}
                              onDoubleClick={() => openFile(file)}
                            >
                              <TableCell>
                                <Checkbox
                                  checked={selectedItems.includes(file.id)}
                                  onCheckedChange={() => toggleSelectItem(file.id)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <FileIcon type={file.type} extension={file.extension} />
                                  <span className="mr-2">{file.name}</span>
                                  {file.starred && <Star className="h-4 w-4 text-orange-500 fill-orange-500 mr-1" />}
                                </div>
                              </TableCell>
                              <TableCell>{file.extension?.toUpperCase() || file.type}</TableCell>
                              <TableCell>{formatFileSize(file.size)}</TableCell>
                              <TableCell>{formatDate(file.updatedAt)}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Avatar className="h-6 w-6 ml-2">
                                    <AvatarImage src={file.createdBy.avatar} />
                                    <AvatarFallback>{file.createdBy.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span>{file.createdBy.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => openFile(file)}>
                                      <Eye className="h-4 w-4 ml-2" />
                                      <span>عرض</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Download className="h-4 w-4 ml-2" />
                                      <span>تنزيل</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Share2 className="h-4 w-4 ml-2" />
                                      <span>مشاركة</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => toggleStarred(file.id)}>
                                      {file.starred ? (
                                        <>
                                          <StarOff className="h-4 w-4 ml-2" />
                                          <span>إزالة من المفضلة</span>
                                        </>
                                      ) : (
                                        <>
                                          <Star className="h-4 w-4 ml-2" />
                                          <span>إضافة للمفضلة</span>
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <Edit className="h-4 w-4 ml-2" />
                                      <span>تعديل</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="h-4 w-4 ml-2" />
                                      <span>حذف</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* مربع حوار رفع الملفات */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>رفع ملفات</DialogTitle>
            <DialogDescription>اسحب وأفلت الملفات هنا أو انقر لاختيار الملفات من جهازك.</DialogDescription>
          </DialogHeader>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-500 mb-2">اسحب وأفلت الملفات هنا، أو انقر لاختيار الملفات</p>
            <p className="text-xs text-gray-400">يدعم PNG، JPG، PDF، DOCX، XLSX، MP4 حتى 100 ميجابايت</p>
            <Button variant="outline" className="mt-4">
              اختيار ملفات
            </Button>
          </div>
          <DialogFooter className="sm:justify-between">
            <div className="text-xs text-gray-500">الحد الأقصى للملف: 100 ميجابايت</div>
            <Button type="submit" disabled>
              رفع الملفات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* مربع حوار إنشاء مجلد جديد */}
      <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إنشاء مجلد جديد</DialogTitle>
            <DialogDescription>أدخل اسم المجلد الجديد الذي تريد إنشاءه.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="folder-name">اسم المجلد</Label>
              <Input
                id="folder-name"
                placeholder="أدخل اسم المجلد"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewFolderDialogOpen(false)}>
              إلغاء
            </Button>
            <Button type="submit" onClick={createNewFolder} disabled={!newFolderName.trim()}>
              إنشاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* لوحة تفاصيل الملف */}
      <Sheet open={isDetailsPanelOpen} onOpenChange={setIsDetailsPanelOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto p-4">
          <SheetHeader>
            <SheetTitle>تفاصيل الملف</SheetTitle>
          </SheetHeader>
          {selectedFile && (
            <div className="py-4">
              <div className="flex flex-col items-center mb-6">
                <div className="mb-4">
                  {selectedFile.type === "image" && selectedFile.thumbnail ? (
                    <div className="h-32 w-32 rounded overflow-hidden">
                      <img
                        src={selectedFile.thumbnail || "/placeholder.svg"}
                        alt={selectedFile.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-32 w-32 flex items-center justify-center">
                      <FileIcon type={selectedFile.type} extension={selectedFile.extension} />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-medium">{selectedFile.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span>{selectedFile.extension?.toUpperCase() || selectedFile.type}</span>
                  <span className="mx-1">•</span>
                  <span>{formatFileSize(selectedFile.size)}</span>
                </div>
              </div>

              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">التفاصيل</TabsTrigger>
                  <TabsTrigger value="activity">النشاط</TabsTrigger>
                  <TabsTrigger value="sharing">المشاركة</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">المسار</span>
                      <span className="text-sm">
                        {selectedFile.path.length > 0 ? selectedFile.path.join(" / ") : "الرئيسية"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">تاريخ الإنشاء</span>
                      <span className="text-sm">{formatDate(selectedFile.createdAt)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">آخر تعديل</span>
                      <span className="text-sm">{formatDate(selectedFile.updatedAt)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">بواسطة</span>
                      <div className="flex items-center">
                        <Avatar className="h-5 w-5 ml-2">
                          <AvatarImage src={selectedFile.createdBy.avatar} />
                          <AvatarFallback>{selectedFile.createdBy.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{selectedFile.createdBy.name}</span>
                      </div>
                    </div>
                    {selectedFile.description && (
                      <div className="pt-2">
                        <span className="text-sm text-gray-500 block mb-1">الوصف</span>
                        <p className="text-sm">{selectedFile.description}</p>
                      </div>
                    )}
                    {selectedFile.tags.length > 0 && (
                      <div className="pt-2">
                        <span className="text-sm text-gray-500 block mb-2">الوسوم</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedFile.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="activity" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedFile.createdBy.avatar} />
                        <AvatarFallback>{selectedFile.createdBy.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{selectedFile.createdBy.name}</span>
                          <span className="text-xs text-gray-500">قام بإنشاء الملف</span>
                        </div>
                        <p className="text-xs text-gray-500">{formatDate(selectedFile.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedFile.createdBy.avatar} />
                        <AvatarFallback>{selectedFile.createdBy.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{selectedFile.createdBy.name}</span>
                          <span className="text-xs text-gray-500">قام بتعديل الملف</span>
                        </div>
                        <p className="text-xs text-gray-500">{formatDate(selectedFile.updatedAt)}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="sharing" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">مشاركة مع الفريق</span>
                      <Checkbox checked={selectedFile.shared} />
                    </div>
                    <div className="pt-2">
                      <Label className="text-sm mb-2 block">إضافة أشخاص</Label>
                      <div className="flex gap-2">
                        <Input placeholder="البريد الإلكتروني أو اسم المستخدم" className="flex-grow" />
                        <Button variant="outline" size="sm">
                          إضافة
                        </Button>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Label className="text-sm mb-2 block">رابط المشاركة</Label>
                      <div className="flex gap-2">
                        <Input value="https://source-media.com/files/share/xyz123" readOnly className="flex-grow" />
                        <Button variant="outline" size="icon">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between mt-8">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>تنزيل</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  <span>مشاركة</span>
                </Button>
                <Button variant="destructive" className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  <span>حذف</span>
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

