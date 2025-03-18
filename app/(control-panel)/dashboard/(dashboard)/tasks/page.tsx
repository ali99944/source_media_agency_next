"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Search,
  Filter,
  Calendar,
  List,
  LayoutGrid,
  BarChart2,
  Clock,
  MoreHorizontal,
  CheckCircle,
  Circle,
  AlertCircle,
  X,
  Edit,
  Trash2,
  MessageSquare,
  Paperclip,
  CalendarDays,
  Tag,
  Flag,
  LinkIcon,
  CheckSquare,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

// نوع البيانات للمهمة
interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "in_progress" | "review" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"
  dueDate: string | null
  createdAt: string
  assignedTo: UserType[]
  project: Project | null
  tags: string[]
  attachments: number
  comments: number
  progress: number
  checklist: { id: string; text: string; completed: boolean }[]
  timeTracked: number // بالدقائق
  isStarred: boolean
}

// نوع البيانات للمستخدم
interface UserType {
  id: string
  name: string
  avatar: string
  role: string
  department: string
}

// نوع البيانات للمشروع
interface Project {
  id: string
  name: string
  color: string
}

// بيانات وهمية للمهام
const dummyTasks: Task[] = [
  {
    id: "task-1",
    title: "تصميم الصفحة الرئيسية للموقع الإلكتروني",
    description: "إنشاء تصميم جديد للصفحة الرئيسية بما يتماشى مع هوية العلامة التجارية الجديدة",
    status: "in_progress",
    priority: "high",
    dueDate: "2025-03-25",
    createdAt: "2025-03-15",
    assignedTo: [
      {
        id: "user-1",
        name: "أحمد محمد",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "مصمم",
        department: "التصميم",
      },
      {
        id: "user-2",
        name: "سارة علي",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "مطور واجهة أمامية",
        department: "التطوير",
      },
    ],
    project: { id: "project-1", name: "إعادة تصميم الموقع", color: "bg-orange-500" },
    tags: ["تصميم", "واجهة المستخدم"],
    attachments: 3,
    comments: 5,
    progress: 60,
    checklist: [
      { id: "check-1", text: "تحليل متطلبات العميل", completed: true },
      { id: "check-2", text: "إنشاء النموذج الأولي", completed: true },
      { id: "check-3", text: "تصميم الصفحة الرئيسية", completed: false },
      { id: "check-4", text: "مراجعة التصميم مع الفريق", completed: false },
    ],
    timeTracked: 480, // 8 ساعات
    isStarred: true,
  },
  {
    id: "task-2",
    title: "تطوير واجهة المستخدم للوحة التحكم",
    description: "تطوير واجهة المستخدم للوحة التحكم باستخدام React و Tailwind CSS",
    status: "pending",
    priority: "medium",
    dueDate: "2025-03-30",
    createdAt: "2025-03-17",
    assignedTo: [
      {
        id: "user-2",
        name: "سارة علي",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "مطور واجهة أمامية",
        department: "التطوير",
      },
    ],
    project: { id: "project-1", name: "إعادة تصميم الموقع", color: "bg-orange-500" },
    tags: ["تطوير", "React"],
    attachments: 1,
    comments: 2,
    progress: 0,
    checklist: [
      { id: "check-1", text: "إعداد بيئة التطوير", completed: false },
      { id: "check-2", text: "تنفيذ المكونات الأساسية", completed: false },
    ],
    timeTracked: 0,
    isStarred: false,
  },
  {
    id: "task-3",
    title: "تحسين أداء الموقع",
    description: "تحسين سرعة تحميل الصفحات وتحسين تجربة المستخدم",
    status: "review",
    priority: "high",
    dueDate: "2025-03-22",
    createdAt: "2025-03-10",
    assignedTo: [
      {
        id: "user-3",
        name: "محمد خالد",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "مطور خلفية",
        department: "التطوير",
      },
    ],
    project: { id: "project-1", name: "إعادة تصميم الموقع", color: "bg-orange-500" },
    tags: ["أداء", "تحسين"],
    attachments: 2,
    comments: 7,
    progress: 90,
    checklist: [
      { id: "check-1", text: "تحليل الأداء الحالي", completed: true },
      { id: "check-2", text: "تحسين تحميل الصور", completed: true },
      { id: "check-3", text: "تحسين JavaScript", completed: true },
      { id: "check-4", text: "اختبار الأداء", completed: false },
    ],
    timeTracked: 720, // 12 ساعة
    isStarred: true,
  },
  {
    id: "task-4",
    title: "إنشاء محتوى للمدونة",
    description: "كتابة 5 مقالات جديدة للمدونة حول تصميم المواقع",
    status: "completed",
    priority: "low",
    dueDate: "2025-03-18",
    createdAt: "2025-03-05",
    assignedTo: [
      {
        id: "user-4",
        name: "فاطمة أحمد",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "كاتب محتوى",
        department: "التسويق",
      },
    ],
    project: { id: "project-2", name: "حملة تسويقية", color: "bg-orange-700" },
    tags: ["محتوى", "مدونة"],
    attachments: 0,
    comments: 3,
    progress: 100,
    checklist: [
      { id: "check-1", text: "البحث عن الكلمات المفتاحية", completed: true },
      { id: "check-2", text: "كتابة المقالات", completed: true },
      { id: "check-3", text: "مراجعة المحتوى", completed: true },
      { id: "check-4", text: "نشر المقالات", completed: true },
    ],
    timeTracked: 960, // 16 ساعة
    isStarred: false,
  },
  {
    id: "task-5",
    title: "تطوير واجهة برمجة التطبيقات (API)",
    description: "تطوير واجهة ب��مجة التطبيقات للتكامل مع تطبيق الهاتف المحمول",
    status: "in_progress",
    priority: "urgent",
    dueDate: "2025-03-28",
    createdAt: "2025-03-12",
    assignedTo: [
      {
        id: "user-3",
        name: "محمد خالد",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "مطور خلفية",
        department: "التطوير",
      },
      {
        id: "user-5",
        name: "عمر علي",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "مهندس DevOps",
        department: "العمليات",
      },
    ],
    project: { id: "project-3", name: "تطبيق الهاتف", color: "bg-orange-600" },
    tags: ["API", "تطوير الخلفية"],
    attachments: 4,
    comments: 10,
    progress: 40,
    checklist: [
      { id: "check-1", text: "تصميم هيكل API", completed: true },
      { id: "check-2", text: "تنفيذ نقاط النهاية الأساسية", completed: true },
      { id: "check-3", text: "إضافة المصادقة", completed: false },
      { id: "check-4", text: "اختبار API", completed: false },
      { id: "check-5", text: "توثيق API", completed: false },
    ],
    timeTracked: 1200, // 20 ساعة
    isStarred: true,
  },
  {
    id: "task-6",
    title: "إعداد بيئة الاختبار الآلي",
    description: "إعداد بيئة اختبار آلي باستخدام Jest و Cypress",
    status: "cancelled",
    priority: "medium",
    dueDate: "2025-03-20",
    createdAt: "2025-03-08",
    assignedTo: [
      {
        id: "user-5",
        name: "عمر علي",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "مهندس DevOps",
        department: "العمليات",
      },
    ],
    project: { id: "project-1", name: "إعادة تصميم الموقع", color: "bg-orange-500" },
    tags: ["اختبار", "DevOps"],
    attachments: 1,
    comments: 4,
    progress: 0,
    checklist: [
      { id: "check-1", text: "تثبيت أدوات الاختبار", completed: false },
      { id: "check-2", text: "إعداد اختبارات الوحدة", completed: false },
      { id: "check-3", text: "إعداد اختبارات التكامل", completed: false },
    ],
    timeTracked: 120, // 2 ساعة
    isStarred: false,
  },
]

// بيانات وهمية للمستخدمين
const dummyUsers: UserType[] = [
  {
    id: "user-1",
    name: "أحمد محمد",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "مصمم",
    department: "التصميم",
  },
  {
    id: "user-2",
    name: "سارة علي",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "مطور واجهة أمامية",
    department: "التطوير",
  },
  {
    id: "user-3",
    name: "محمد خالد",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "مطور خلفية",
    department: "التطوير",
  },
  {
    id: "user-4",
    name: "فاطمة أحمد",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "كاتب محتوى",
    department: "التسويق",
  },
  {
    id: "user-5",
    name: "عمر علي",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "مهندس DevOps",
    department: "العمليات",
  },
  {
    id: "user-6",
    name: "نورا حسن",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "مدير مشروع",
    department: "الإدارة",
  },
]

// بيانات وهمية للمشاريع
const dummyProjects: Project[] = [
  { id: "project-1", name: "إعادة تصميم الموقع", color: "bg-orange-500" },
  { id: "project-2", name: "حملة تسويقية", color: "bg-orange-700" },
  { id: "project-3", name: "تطبيق الهاتف", color: "bg-orange-600" },
  { id: "project-4", name: "تحسين تجربة المستخدم", color: "bg-orange-400" },
]

// مكون عرض حالة المهمة
function TaskStatusBadge({ status }: { status: Task["status"] }) {
  const statusMap = {
    pending: { label: "قيد الانتظار", color: "bg-orange-500/10 text-orange-500 " },
    in_progress: { label: "قيد التنفيذ", color: "bg-orange-600/10 text-orange-600 border-orange-600/20" },
    review: { label: "قيد المراجعة", color: "bg-orange-700/10 text-orange-700 border-orange-700/20" },
    completed: { label: "مكتملة", color: "bg-green-500/10 text-green-500 border-green-500/20" },
    cancelled: { label: "ملغاة", color: "bg-gray-500/10 text-gray-500 border-gray-500/20" },
  }

  const { label, color } = statusMap[status]

  return (
    <Badge variant="outline" className={cn("rounded-md font-medium", color)}>
      {label}
    </Badge>
  )
}

// مكون عرض أولوية المهمة
function TaskPriorityBadge({ priority }: { priority: Task["priority"] }) {
  const priorityMap = {
    low: {
      label: "منخفضة",
      color: "bg-gray-500/10 text-gray-500 border-gray-500/20",
      icon: <Flag className="h-3 w-3 mr-1" />,
    },
    medium: {
      label: "متوسطة",
      color: "bg-orange-500/10 text-orange-500 ",
      icon: <Flag className="h-3 w-3 mr-1" />,
    },
    high: {
      label: "عالية",
      color: "bg-orange-600/10 text-orange-600 border-orange-600/20",
      icon: <Flag className="h-3 w-3 mr-1" />,
    },
    urgent: {
      label: "عاجلة",
      color: "bg-red-500/10 text-red-500 border-red-500/20",
      icon: <Flag className="h-3 w-3 mr-1" />,
    },
  }

  const { label, color, icon } = priorityMap[priority]

  return (
    <Badge variant="outline" className={cn("rounded-md font-medium", color)}>
      <span className="flex items-center">
        {icon}
        {label}
      </span>
    </Badge>
  )
}

// مكون عرض الوقت المتبقي
function DueDate({ dueDate }: { dueDate: string | null }) {
  if (!dueDate) return null

  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  let badgeClass = "bg-gray-500/10 text-gray-500 border-gray-500/20"
  let label = `${due.toLocaleDateString("ar-SA")}`

  if (diffDays < 0) {
    badgeClass = "bg-red-500/10 text-red-500 border-red-500/20"
    label = `متأخرة بـ ${Math.abs(diffDays)} يوم`
  } else if (diffDays === 0) {
    badgeClass = "bg-orange-600/10 text-orange-600 border-orange-600/20"
    label = "اليوم"
  } else if (diffDays === 1) {
    badgeClass = "bg-orange-500/10 text-orange-500 "
    label = "غداً"
  } else if (diffDays <= 3) {
    badgeClass = "bg-orange-400/10 text-orange-400 border-orange-400/20"
    label = `خلال ${diffDays} أيام`
  }

  return (
    <Badge variant="outline" className={cn("rounded-md font-medium", badgeClass)}>
      <span className="flex items-center">
        <CalendarDays className="h-3 w-3 ml-1" />
        {label}
      </span>
    </Badge>
  )
}

// مكون عرض الوقت المستغرق
function TimeTracked({ minutes }: { minutes: number }) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  return (
    <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20 rounded-md font-medium">
      <span className="flex items-center">
        <Clock className="h-3 w-3 ml-1" />
        {hours > 0 ? `${hours} ساعة` : ""} {mins > 0 ? `${mins} دقيقة` : ""}
      </span>
    </Badge>
  )
}

// مكون عرض المهمة في القائمة
function TaskListItem({ task, onSelect }: { task: Task; onSelect: (task: Task) => void }) {
  return (
    <div
      className="group flex flex-col gap-2 rounded-lg border  bg-black p-4  cursor-pointer"
      onClick={() => onSelect(task)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {task.isStarred && <Badge className="bg-orange-500 text-white h-2 w-2 p-0 rounded-full" />}
          <h3 className="font-semibold text-white group-hover:text-orange-500">{task.title}</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-orange-500/10 hover:text-orange-500"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="ml-2 h-4 w-4" />
              <span>تعديل</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CheckCircle className="ml-2 h-4 w-4" />
              <span>تحديد كمكتملة</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 focus:text-red-500">
              <Trash2 className="ml-2 h-4 w-4" />
              <span>حذف</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-sm text-gray-400 line-clamp-2">{task.description}</p>

      <div className="flex flex-wrap gap-2 mt-2">
        <TaskStatusBadge status={task.status} />
        <TaskPriorityBadge priority={task.priority} />
        {task.dueDate && <DueDate dueDate={task.dueDate} />}
      </div>

      <div className="mt-2">
        <Progress value={task.progress} className="h-1 bg-gray-800" />
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex -space-x-2 rtl:space-x-reverse">
          {task.assignedTo.map((user) => (
            <Avatar key={user.id} className="border-2 border-black h-7 w-7">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-orange-500 text-black text-xs">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>

        <div className="flex items-center gap-3 text-gray-400 text-sm">
          {task.comments > 0 && (
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 ml-1" />
              {task.comments}
            </div>
          )}
          {task.attachments > 0 && (
            <div className="flex items-center">
              <Paperclip className="h-4 w-4 ml-1" />
              {task.attachments}
            </div>
          )}
          {task.timeTracked > 0 && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 ml-1" />
              {Math.floor(task.timeTracked / 60)}س
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// مكون عرض المهمة في عرض الكانبان
function TaskCard({ task, onSelect }: { task: Task; onSelect: (task: Task) => void }) {
  return (
    <Card
      className="cursor-pointer"
      onClick={() => onSelect(task)}
    >
      <CardHeader className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {task.isStarred && <Badge className="bg-orange-500 text-white h-2 w-2 p-0 rounded-full" />}
          <h3 className="font-semibold text-white group-hover:text-orange-500 text-sm">{task.title}</h3>
        </div>
        <TaskPriorityBadge priority={task.priority} />
      </CardHeader>

      <CardContent className="text-xs text-gray-400 line-clamp-2">{task.description}</CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="flex -space-x-2 rtl:space-x-reverse">
          {task.assignedTo.slice(0, 2).map((user) => (
            <Avatar key={user.id} className="border-2 border-black h-6 w-6">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-orange-500 text-black text-xs">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          ))}
          {task.assignedTo.length > 2 && (
            <Avatar className="border-2 border-black h-6 w-6">
              <AvatarFallback className="bg-gray-700 text-white text-xs">+{task.assignedTo.length - 2}</AvatarFallback>
            </Avatar>
          )}
        </div>

        <div className="flex items-center gap-2 text-gray-400 text-xs">
          {task.dueDate && (
            <div className="flex items-center">
              <CalendarDays className="h-3 w-3 ml-1" />
              {new Date(task.dueDate).toLocaleDateString("ar-SA", { day: "numeric", month: "numeric" })}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

// مكون تفاصيل المهمة
function TaskDetails({ task, onClose }: { task: Task; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("details")
  const [editMode, setEditMode] = useState(false)
  const [taskData, setTaskData] = useState<Task>(task)

  const handleSave = () => {
    // هنا يتم حفظ البيانات
    setEditMode(false)
  }

  return (
    <div className="flex flex-col h-full">
      <DialogHeader className="pb-4 border-b ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {editMode ? (
              <Input
                value={taskData.title}
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                className="text-lg font-semibold"
              />
            ) : (
              <DialogTitle className="text-xl">{task.title}</DialogTitle>
            )}
          </div>
          <div className="flex items-center gap-2">
            {editMode ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setEditMode(false)}>
                  إلغاء
                </Button>
                <Button size="sm" onClick={handleSave} className="bg-orange-500 text-white hover:bg-orange-600">
                  حفظ
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-orange-500/10 hover:text-orange-500"
                  onClick={() => setEditMode(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-orange-500/10 hover:text-orange-500"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4 p-0">
          <TabsList className="bg-black border ">
            <TabsTrigger value="details" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              التفاصيل
            </TabsTrigger>
            <TabsTrigger value="subtasks" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              المهام الفرعية
            </TabsTrigger>
            <TabsTrigger value="comments" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              التعليقات
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              النشاط
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 p-4">
        <TabsContent value="details" className="mt-0">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">الوصف</h4>
                {editMode ? (
                  <Textarea
                    value={taskData.description}
                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-sm text-white">{task.description}</p>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">الحالة</h4>
                  {editMode ? (
                    <Select
                      value={taskData.status}
                      onValueChange={(value) => setTaskData({ ...taskData, status: value as Task["status"] })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">قيد الانتظار</SelectItem>
                        <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                        <SelectItem value="review">قيد المراجعة</SelectItem>
                        <SelectItem value="completed">مكتملة</SelectItem>
                        <SelectItem value="cancelled">ملغاة</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <TaskStatusBadge status={task.status} />
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">الأولوية</h4>
                  {editMode ? (
                    <Select
                      value={taskData.priority}
                      onValueChange={(value) => setTaskData({ ...taskData, priority: value as Task["priority"] })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر الأولوية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">منخفضة</SelectItem>
                        <SelectItem value="medium">متوسطة</SelectItem>
                        <SelectItem value="high">عالية</SelectItem>
                        <SelectItem value="urgent">عاجلة</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <TaskPriorityBadge priority={task.priority} />
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">تاريخ الاستحقاق</h4>
                  {editMode ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-right font-normal">
                          <CalendarDays className="ml-2 h-4 w-4" />
                          {taskData.dueDate ? new Date(taskData.dueDate).toLocaleDateString("ar-SA") : "اختر تاريخ"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={taskData.dueDate ? new Date(taskData.dueDate) : undefined}
                          onSelect={(date) =>
                            setTaskData({ ...taskData, dueDate: date ? date.toISOString().split("T")[0] : null })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  ) : task.dueDate ? (
                    <DueDate dueDate={task.dueDate} />
                  ) : (
                    <span className="text-sm text-gray-400">غير محدد</span>
                  )}
                </div>
              </div>
            </div>

            <Separator className="bg-orange-500/20" />

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">المشروع</h4>
              {editMode ? (
                <Select
                  value={taskData.project?.id || ""}
                  onValueChange={(value) => {
                    const project = dummyProjects.find((p) => p.id === value) || null
                    setTaskData({ ...taskData, project })
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر المشروع" />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full ${project.color} mr-2`} />
                          {project.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : task.project ? (
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full ${task.project.color} ml-2`} />
                  <span className="text-sm text-white">{task.project.name}</span>
                </div>
              ) : (
                <span className="text-sm text-gray-400">غير محدد</span>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">المكلفون بالمهمة</h4>
              {editMode ? (
                <div className="flex flex-wrap gap-2">
                  {dummyUsers.map((user) => (
                    <div
                      key={user.id}
                      className={cn(
                        "flex items-center gap-2 rounded-full px-3 py-1 text-sm border",
                        taskData.assignedTo.some((u) => u.id === user.id)
                          ? "bg-orange-500/10 text-orange-500 "
                          : "bg-gray-800 text-gray-300 border-gray-700",
                      )}
                      onClick={() => {
                        const isAssigned = taskData.assignedTo.some((u) => u.id === user.id)
                        if (isAssigned) {
                          setTaskData({
                            ...taskData,
                            assignedTo: taskData.assignedTo.filter((u) => u.id !== user.id),
                          })
                        } else {
                          setTaskData({
                            ...taskData,
                            assignedTo: [...taskData.assignedTo, user],
                          })
                        }
                      }}
                    >
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-orange-500 text-black text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {task.assignedTo.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1 text-sm text-orange-500 border "
                    >
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-orange-500 text-black text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">الوسوم</h4>
              {editMode ? (
                <div className="flex flex-wrap gap-2">
                  <Input
                    placeholder="أضف وسماً واضغط Enter"
                    className="w-full"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        setTaskData({
                          ...taskData,
                          tags: [...taskData.tags, e.currentTarget.value],
                        })
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  {taskData.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-orange-500/10 text-orange-500  flex items-center gap-1"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 rounded-full hover:bg-orange-500/20"
                        onClick={() => {
                          setTaskData({
                            ...taskData,
                            tags: taskData.tags.filter((_, i) => i !== index),
                          })
                        }}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-orange-500/10 text-orange-500  flex items-center gap-1"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator className="bg-orange-500/20" />

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">التقدم</h4>
              <div className="flex items-center gap-2">
                <Progress value={task.progress} className="h-2 flex-1 bg-gray-800" />
                <span className="text-sm text-white">{task.progress}%</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">الوقت المستغرق</h4>
              <div className="flex items-center gap-2">
                <TimeTracked minutes={task.timeTracked} />
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <Clock className="h-3 w-3 ml-1" />
                  بدء التتبع
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="subtasks" className="mt-0">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input placeholder="أضف مهمة فرعية جديدة" className="flex-1" />
              <Button size="sm" className="bg-orange-500 text-white hover:bg-orange-600">
                إضافة
              </Button>
            </div>

            <div className="space-y-2">
              {task.checklist.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Checkbox
                    id={item.id}
                    checked={item.completed}
                    className="border-orange-500/50 data-[state=checked]:bg-orange-500 data-[state=checked]:text-white"
                  />
                  <label
                    htmlFor={item.id}
                    className={cn("text-sm flex-1", item.completed ? "line-through text-gray-400" : "text-white")}
                  >
                    {item.text}
                  </label>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-gray-400 hover:text-white hover:bg-orange-500/10"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="comments" className="mt-0">
          <div className="space-y-4">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="أحمد محمد" />
                <AvatarFallback className="bg-orange-500 text-black">أح</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Textarea placeholder="أضف تعليقاً..." className="min-h-[80px]" />
                <Button size="sm" className="bg-orange-500 text-white hover:bg-orange-600">
                  إرسال
                </Button>
              </div>
            </div>

            <Separator className="bg-orange-500/20" />

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="اسم المستخدم" />
                    <AvatarFallback className="bg-orange-500 text-black">
                      {i === 1 ? "أح" : i === 2 ? "سع" : "مخ"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-white">
                        {i === 1 ? "أحمد محمد" : i === 2 ? "سارة علي" : "محمد خالد"}
                      </h4>
                      <span className="text-xs text-gray-400">منذ {i} ساعة</span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">
                      {i === 1
                        ? "تم الانتهاء من تصميم الصفحة الرئيسية، في انتظار المراجعة."
                        : i === 2
                          ? "هل يمكن إضافة المزيد من التفاصيل حول متطلبات العميل؟"
                          : "سأقوم بمراجعة التصميم اليوم وإرسال الملاحظات."}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-400 hover:text-orange-500">
                        الرد
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-400 hover:text-orange-500">
                        تعديل
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-0">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="relative">
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt={i % 2 === 0 ? "أحمد محمد" : "سارة علي"}
                    />
                    <AvatarFallback className="bg-orange-500 text-black text-xs">
                      {i % 2 === 0 ? "أح" : "سع"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute top-0 right-0 h-full w-[1px] bg-orange-500/20 translate-x-1/2" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-white">{i % 2 === 0 ? "أحمد محمد" : "سارة علي"}</h4>
                    <span className="text-xs text-gray-400">منذ {i} ساعة</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">
                    {i === 1
                      ? "قام بتغيير حالة المهمة من 'قيد الانتظار' إلى 'قيد التنفيذ'"
                      : i === 2
                        ? "قام بتعديل وصف المهمة"
                        : i === 3
                          ? "قام بإضافة مهمة فرعية جديدة"
                          : i === 4
                            ? "قام بتغيير تاريخ الاستحقاق إلى 25 مارس 2025"
                            : "قام بإضافة سارة علي إلى المهمة"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </ScrollArea>
        </Tabs>
      </DialogHeader>



      <DialogFooter className="pt-4 border-t ">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Paperclip className="h-3 w-3 ml-1" />
              إرفاق ملف
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <LinkIcon className="h-3 w-3 ml-1" />
              إضافة رابط
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              className="text-xs bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-500"
            >
              <Trash2 className="h-3 w-3 ml-1" />
              حذف المهمة
            </Button>
            <Button size="sm" className="text-xs bg-orange-500 text-white hover:bg-orange-600">
              <CheckCircle className="h-3 w-3 ml-1" />
              تحديد كمكتملة
            </Button>
          </div>
        </div>
      </DialogFooter>
    </div>
  )
}

// الصفحة الرئيسية
export default function TasksPage() {
  const [view, setView] = useState<"list" | "kanban" | "calendar" | "gantt">("list")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null)
  const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null)
  const [projectFilter, setProjectFilter] = useState<string | null>(null)
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(dummyTasks)

  // تطبيق الفلاتر
  useEffect(() => {
    let result = dummyTasks

    if (searchQuery) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (statusFilter) {
      result = result.filter((task) => task.status === statusFilter)
    }

    if (priorityFilter) {
      result = result.filter((task) => task.priority === priorityFilter)
    }

    if (assigneeFilter) {
      result = result.filter((task) => task.assignedTo.some((user) => user.id === assigneeFilter))
    }

    if (projectFilter) {
      result = result.filter((task) => task.project?.id === projectFilter)
    }

    setFilteredTasks(result)
  }, [searchQuery, statusFilter, priorityFilter, assigneeFilter, projectFilter])

  // تجميع المهام حسب الحالة للعرض الكانبان
  const tasksByStatus = {
    pending: filteredTasks.filter((task) => task.status === "pending"),
    in_progress: filteredTasks.filter((task) => task.status === "in_progress"),
    review: filteredTasks.filter((task) => task.status === "review"),
    completed: filteredTasks.filter((task) => task.status === "completed"),
    cancelled: filteredTasks.filter((task) => task.status === "cancelled"),
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">إدارة المهام والأعمال</h1>
          <p className="text-gray-400">إدارة وتتبع جميع المهام والمشاريع</p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-orange-500 text-white hover:bg-orange-600">
            <Plus className="ml-2 h-4 w-4" />
            مهمة جديدة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative w-full sm:w-auto sm:flex-1">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="البحث عن المهام..."
              className="pl-3 pr-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="ml-2 h-4 w-4" />
                الفلاتر
                {(statusFilter || priorityFilter || assigneeFilter || projectFilter) && (
                  <Badge className="mr-2 bg-orange-500 text-white">
                    {[statusFilter, priorityFilter, assigneeFilter, projectFilter].filter(Boolean).length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>تصفية حسب</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <div className="p-2">
                <h4 className="text-xs font-medium text-gray-400 mb-2">الحالة</h4>
                <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="جميع الحالات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع الحالات</SelectItem>
                    <SelectItem value="pending">قيد الانتظار</SelectItem>
                    <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                    <SelectItem value="review">قيد المراجعة</SelectItem>
                    <SelectItem value="completed">مكتملة</SelectItem>
                    <SelectItem value="cancelled">ملغاة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-2">
                <h4 className="text-xs font-medium text-gray-400 mb-2">الأولوية</h4>
                <Select value={priorityFilter || ""} onValueChange={(value) => setPriorityFilter(value || null)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="جميع الأولويات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع الأولويات</SelectItem>
                    <SelectItem value="low">منخفضة</SelectItem>
                    <SelectItem value="medium">متوسطة</SelectItem>
                    <SelectItem value="high">عالية</SelectItem>
                    <SelectItem value="urgent">عاجلة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-2">
                <h4 className="text-xs font-medium text-gray-400 mb-2">المكلف</h4>
                <Select value={assigneeFilter || ""} onValueChange={(value) => setAssigneeFilter(value || null)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="جميع المكلفين" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع المكلفين</SelectItem>
                    {dummyUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center">
                          <Avatar className="h-4 w-4 ml-2">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-orange-500 text-black text-xs">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {user.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="p-2">
                <h4 className="text-xs font-medium text-gray-400 mb-2">المشروع</h4>
                <Select value={projectFilter || ""} onValueChange={(value) => setProjectFilter(value || null)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="جميع المشاريع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع المشاريع</SelectItem>
                    {dummyProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full ${project.color} ml-2`} />
                          {project.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="justify-center text-orange-500 focus:text-orange-500"
                onClick={() => {
                  setStatusFilter(null)
                  setPriorityFilter(null)
                  setAssigneeFilter(null)
                  setProjectFilter(null)
                }}
              >
                إعادة تعيين الفلاتر
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className={cn("h-8 w-8 ", view === "list" && "bg-orange-500/10 text-orange-500")}
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn("h-8 w-8 ", view === "kanban" && "bg-orange-500/10 text-orange-500")}
              onClick={() => setView("kanban")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn("h-8 w-8 ", view === "calendar" && "bg-orange-500/10 text-orange-500")}
              onClick={() => setView("calendar")}
            >
              <Calendar className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn("h-8 w-8 ", view === "gantt" && "bg-orange-500/10 text-orange-500")}
              onClick={() => setView("gantt")}
            >
              <BarChart2 className="h-4 w-4" />
            </Button>
          </div>

          <Select defaultValue="newest">
            <SelectTrigger className="w-[160px] ">
              <SelectValue placeholder="الترتيب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">الأحدث أولاً</SelectItem>
              <SelectItem value="oldest">الأقدم أولاً</SelectItem>
              <SelectItem value="priority">حسب الأولوية</SelectItem>
              <SelectItem value="due_date">حسب تاريخ الاستحقاق</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {view === "list" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-orange-500/10 p-4 mb-4">
                <CheckSquare className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">لا توجد مهام</h3>
              <p className="text-gray-400 mb-4">لم يتم العثور على مهام تطابق معايير البحث الخاصة بك</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setStatusFilter(null)
                  setPriorityFilter(null)
                  setAssigneeFilter(null)
                  setProjectFilter(null)
                }}
                variant="outline"
              >
                إعادة تعيين الفلاتر
              </Button>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskListItem key={task.id} task={task} onSelect={(task) => setSelectedTask(task)} />
            ))
          )}
        </div>
      )}

      {view === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-auto pb-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-black p-2 rounded-md border ">
              <h3 className="font-medium text-white flex items-center">
                <Circle className="h-3 w-3 ml-2 text-orange-500" />
                قيد الانتظار
                <Badge className="mr-2 bg-orange-500/10 text-orange-500 ">
                  {tasksByStatus.pending.length}
                </Badge>
              </h3>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 p-2 max-h-[calc(100vh-16rem)] overflow-auto">
              {tasksByStatus.pending.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm border border-dashed  rounded-md">
                  لا توجد مهام
                </div>
              ) : (
                tasksByStatus.pending.map((task) => (
                  <TaskCard key={task.id} task={task} onSelect={(task) => setSelectedTask(task)} />
                ))
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between bg-black p-2 rounded-md border ">
              <h3 className="font-medium text-white flex items-center">
                <Clock className="h-3 w-3 ml-2 text-orange-600" />
                قيد التنفيذ
                <Badge className="mr-2 bg-orange-600/10 text-orange-600 border-orange-600/20">
                  {tasksByStatus.in_progress.length}
                </Badge>
              </h3>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 p-2 max-h-[calc(100vh-16rem)] overflow-auto">
              {tasksByStatus.in_progress.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm border border-dashed  rounded-md">
                  لا توجد مهام
                </div>
              ) : (
                tasksByStatus.in_progress.map((task) => (
                  <TaskCard key={task.id} task={task} onSelect={(task) => setSelectedTask(task)} />
                ))
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between bg-black p-2 rounded-md border ">
              <h3 className="font-medium text-white flex items-center">
                <AlertCircle className="h-3 w-3 ml-2 text-orange-700" />
                قيد المراجعة
                <Badge className="mr-2 bg-orange-700/10 text-orange-700 border-orange-700/20">
                  {tasksByStatus.review.length}
                </Badge>
              </h3>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 p-2 max-h-[calc(100vh-16rem)] overflow-auto">
              {tasksByStatus.review.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm border border-dashed  rounded-md">
                  لا توجد مهام
                </div>
              ) : (
                tasksByStatus.review.map((task) => (
                  <TaskCard key={task.id} task={task} onSelect={(task) => setSelectedTask(task)} />
                ))
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between bg-black p-2 rounded-md border ">
              <h3 className="font-medium text-white flex items-center">
                <CheckCircle className="h-3 w-3 ml-2 text-green-500" />
                مكتملة
                <Badge className="mr-2 bg-green-500/10 text-green-500 border-green-500/20">
                  {tasksByStatus.completed.length}
                </Badge>
              </h3>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 p-2 max-h-[calc(100vh-16rem)] overflow-auto">
              {tasksByStatus.completed.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm border border-dashed  rounded-md">
                  لا توجد مهام
                </div>
              ) : (
                tasksByStatus.completed.map((task) => (
                  <TaskCard key={task.id} task={task} onSelect={(task) => setSelectedTask(task)} />
                ))
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between bg-black p-2 rounded-md border ">
              <h3 className="font-medium text-white flex items-center">
                <X className="h-3 w-3 ml-2 text-gray-500" />
                ملغاة
                <Badge className="mr-2 bg-gray-500/10 text-gray-500 border-gray-500/20">
                  {tasksByStatus.cancelled.length}
                </Badge>
              </h3>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 p-2 max-h-[calc(100vh-16rem)] overflow-auto">
              {tasksByStatus.cancelled.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm border border-dashed  rounded-md">
                  لا توجد مهام
                </div>
              ) : (
                tasksByStatus.cancelled.map((task) => (
                  <TaskCard key={task.id} task={task} onSelect={(task) => setSelectedTask(task)} />
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {view === "calendar" && (
        <div className="border  rounded-lg p-4 bg-black">
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-white mb-2">عرض التقويم</h3>
            <p className="text-gray-400 mb-4">سيتم تنفيذ عرض التقويم قريباً</p>
          </div>
        </div>
      )}

      {view === "gantt" && (
        <div className="border  rounded-lg p-4 bg-black">
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-white mb-2">عرض مخطط جانت</h3>
            <p className="text-gray-400 mb-4">سيتم تنفيذ عرض مخطط جانت قريباً</p>
          </div>
        </div>
      )}

      <Dialog open={selectedTask !== null} onOpenChange={(open) => !open && setSelectedTask(null)}>
        <DialogContent className="max-w-3xl h-[80vh] p-0 overflow-hidden">
          {selectedTask && <TaskDetails task={selectedTask} onClose={() => setSelectedTask(null)} />}
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>إنشاء مهمة جديدة</DialogTitle>
            <DialogDescription>أضف مهمة جديدة وقم بتعيينها لأعضاء الفريق</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-200">
                عنوان المهمة
              </label>
              <Input id="title" placeholder="أدخل عنوان المهمة" />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-200">
                وصف المهمة
              </label>
              <Textarea id="description" placeholder="أدخل وصف المهمة" className="min-h-[100px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium text-gray-200">
                  الحالة
                </label>
                <Select defaultValue="pending">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">قيد الانتظار</SelectItem>
                    <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                    <SelectItem value="review">قيد المراجعة</SelectItem>
                    <SelectItem value="completed">مكتملة</SelectItem>
                    <SelectItem value="cancelled">ملغاة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="priority" className="text-sm font-medium text-gray-200">
                  الأولوية
                </label>
                <Select defaultValue="medium">
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="اختر الأولوية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">منخفضة</SelectItem>
                    <SelectItem value="medium">متوسطة</SelectItem>
                    <SelectItem value="high">عالية</SelectItem>
                    <SelectItem value="urgent">عاجلة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="project" className="text-sm font-medium text-gray-200">
                  المشروع
                </label>
                <Select>
                  <SelectTrigger id="project">
                    <SelectValue placeholder="اختر المشروع" />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full ${project.color} ml-2`} />
                          {project.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="due-date" className="text-sm font-medium text-gray-200">
                  تاريخ الاستحقاق
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-right font-normal" id="due-date">
                      <CalendarDays className="ml-2 h-4 w-4" />
                      <span>اختر تاريخ</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent mode="single" initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">المكلفون بالمهمة</label>
              <div className="flex flex-wrap gap-2">
                {dummyUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 rounded-full px-3 py-1 text-sm border border-gray-700 bg-gray-800 text-gray-300"
                  >
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-orange-500 text-black text-xs">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                    <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full hover:bg-gray-700">
                      <X className="h-2 w-2" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              إلغاء
            </Button>
            <Button className="bg-orange-500 text-white hover:bg-orange-600">إنشاء المهمة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

