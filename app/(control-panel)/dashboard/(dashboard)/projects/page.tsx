// "use client"

// import React from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import {
//   Eye,
//   MoreVertical,
//   Search,
//   Edit,
//   Trash2,
//   Plus,
//   Calendar,
//   User,
//   Tag,
//   CheckCircle,
//   Clock,
//   AlertCircle,
// } from "lucide-react"

// export default function ProjectsPage() {
//   const [selectedProject, setSelectedProject] = React.useState(null)
//   const [isDialogOpen, setIsDialogOpen] = React.useState(false)
//   const [searchQuery, setSearchQuery] = React.useState("")
//   const [statusFilter, setStatusFilter] = React.useState("all")
//   const [clientFilter, setClientFilter] = React.useState("all")

//   // Mock data for projects
//   const projects = [
//     {
//       id: 1,
//       name: "تصميم هوية بصرية",
//       client: {
//         id: 1,
//         name: "شركة الأفق للتقنية",
//         logo: "/placeholder.svg?height=40&width=40",
//       },
//       description: "تصميم شعار وهوية بصرية كاملة لشركة تقنية ناشئة",
//       startDate: "2024-01-15",
//       endDate: "2024-02-28",
//       status: "completed",
//       category: "هوية بصرية",
//       budget: "15000 ريال",
//       team: ["أحمد محمد", "سارة علي"],
//       progress: 100,
//     },
//     {
//       id: 2,
//       name: "تطوير موقع إلكتروني",
//       client: {
//         id: 2,
//         name: "مؤسسة النور التعليمية",
//         logo: "/placeholder.svg?height=40&width=40",
//       },
//       description: "تصميم وتطوير موقع إلكتروني تفاعلي لمؤسسة تعليمية",
//       startDate: "2024-02-10",
//       endDate: "2024-04-30",
//       status: "in-progress",
//       category: "تطوير ويب",
//       budget: "25000 ريال",
//       team: ["محمد خالد", "فاطمة عبدالله", "عمر حسن"],
//       progress: 65,
//     },
//     {
//       id: 3,
//       name: "حملة تسويقية",
//       client: {
//         id: 3,
//         name: "مطعم الذواقة",
//         logo: "/placeholder.svg?height=40&width=40",
//       },
//       description: "تصميم وإدارة حملة تسويقية شاملة على منصات التواصل الاجتماعي",
//       startDate: "2024-03-01",
//       endDate: "2024-05-15",
//       status: "in-progress",
//       category: "تسويق رقمي",
//       budget: "18000 ريال",
//       team: ["سارة علي", "عمر حسن"],
//       progress: 40,
//     },
//     {
//       id: 4,
//       name: "تصميم تطبيق جوال",
//       client: {
//         id: 4,
//         name: "شركة التوصيل السريع",
//         logo: "/placeholder.svg?height=40&width=40",
//       },
//       description: "تصميم واجهات مستخدم لتطبيق توصيل طلبات",
//       startDate: "2024-02-20",
//       endDate: "2024-03-25",
//       status: "completed",
//       category: "تصميم تطبيقات",
//       budget: "20000 ريال",
//       team: ["أحمد محمد", "محمد خالد"],
//       progress: 100,
//     },
//     {
//       id: 5,
//       name: "فيديو إعلاني",
//       client: {
//         id: 5,
//         name: "بنك الاستثمار",
//         logo: "/placeholder.svg?height=40&width=40",
//       },
//       description: "إنتاج فيديو إعلاني لخدمات البنك الجديدة",
//       startDate: "2024-03-10",
//       endDate: "2024-04-10",
//       status: "pending",
//       category: "إنتاج فيديو",
//       budget: "30000 ريال",
//       team: ["فاطمة عبدالله", "عمر حسن"],
//       progress: 0,
//     },
//   ]

//   // Get unique clients for filter
//   const clients = [...new Set(projects.map((project) => project.client.name))]

//   // Filter projects based on search query, status filter, and client filter
//   const filteredProjects = projects.filter((project) => {
//     const matchesSearch =
//       project.name.includes(searchQuery) ||
//       project.description.includes(searchQuery) ||
//       project.client.name.includes(searchQuery)

//     const matchesStatus = statusFilter === "all" || project.status === statusFilter

//     const matchesClient = clientFilter === "all" || project.client.name === clientFilter

//     return matchesSearch && matchesStatus && matchesClient
//   })

//   const handleViewProject = (project) => {
//     setSelectedProject(project)
//     setIsDialogOpen(true)
//   }

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "completed":
//         return <Badge className="bg-white text-black border border-black hover:bg-gray-100">مكتمل</Badge>
//       case "in-progress":
//         return <Badge className="bg-orange-500 hover:bg-orange-600">قيد التنفيذ</Badge>
//       case "pending":
//         return <Badge className="bg-black hover:bg-gray-800">قيد الانتظار</Badge>
//       default:
//         return null
//     }
//   }

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircle className="h-4 w-4 text-black" />
//       case "in-progress":
//         return <Clock className="h-4 w-4 text-orange-500" />
//       case "pending":
//         return <AlertCircle className="h-4 w-4 text-black" />
//       default:
//         return null
//     }
//   }


//   return (
//     <div className="p-6 space-y-6 " dir="rtl">
//       <Card>
//         <CardHeader className="pb-3">
//           <div className="flex justify-between items-center">
//             <Button className="bg-orange-500 hover:bg-orange-600">
//               <Plus className="h-4 w-4 ml-2" />
//               مشروع جديد
//             </Button>
//             <div>
//               <CardTitle className="text-2xl font-bold text-right">إدارة المشاريع</CardTitle>
//               <CardDescription className="text-right">عرض وإدارة جميع مشاريع الشركة</CardDescription>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
//             <div className="relative flex-1">
//               <Search className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
//               <Input
//                 placeholder="البحث عن مشاريع..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-3 pr-10 text-right"
//               />
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="w-full sm:w-48">
//                 <Select value={statusFilter} onValueChange={setStatusFilter}>
//                   <SelectTrigger className="text-right">
//                     <SelectValue placeholder="تصفية حسب الحالة" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">جميع الحالات</SelectItem>
//                     <SelectItem value="completed">مكتمل</SelectItem>
//                     <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
//                     <SelectItem value="pending">قيد الانتظار</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="w-full sm:w-48">
//                 <Select value={clientFilter} onValueChange={setClientFilter}>
//                   <SelectTrigger className="text-right">
//                     <SelectValue placeholder="تصفية حسب العميل" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">جميع العملاء</SelectItem>
//                     {clients.map((client, index) => (
//                       <SelectItem key={index} value={client}>
//                         {client}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="text-right">اسم المشروع</TableHead>
//                   <TableHead className="text-right">العميل</TableHead>
//                   <TableHead className="text-right">التاريخ</TableHead>
//                   <TableHead className="text-right">الحالة</TableHead>
//                   <TableHead className="text-right">الميزانية</TableHead>
//                   <TableHead className="text-right">الإجراءات</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredProjects.length > 0 ? (
//                   filteredProjects.map((project) => (
//                     <TableRow key={project.id}>
//                       <TableCell className="font-medium text-right">{project.name}</TableCell>
//                       <TableCell className="text-right">
//                         <div className="flex items-center justify-end gap-2">
//                           <span>{project.client.name}</span>
//                           <img
//                             src={project.client.logo || "/placeholder.svg"}
//                             alt={project.client.name}
//                             className="h-6 w-6 rounded-full"
//                           />
//                         </div>
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <div>{project.startDate}</div>
//                         <div className="text-sm text-gray-500">إلى {project.endDate}</div>
//                       </TableCell>
//                       <TableCell className="text-right">{getStatusBadge(project.status)}</TableCell>
//                       <TableCell className="text-right">{project.budget}</TableCell>
//                       <TableCell>
//                         <div className="flex justify-end gap-2">
//                           <Button variant="ghost" size="icon" onClick={() => handleViewProject(project)}>
//                             <Eye className="h-4 w-4" />
//                           </Button>
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="icon">
//                                 <MoreVertical className="h-4 w-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuItem>
//                                 <Edit className="h-4 w-4 ml-2" />
//                                 <span>تعديل</span>
//                               </DropdownMenuItem>
//                               <DropdownMenuItem className="text-red-600">
//                                 <Trash2 className="h-4 w-4 ml-2" />
//                                 <span>حذف</span>
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={6} className="h-24 text-center">
//                       لا توجد مشاريع مطابقة للبحث
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Project Details Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="max-w-3xl rtl">
//           {selectedProject && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="text-right text-xl">{selectedProject.name}</DialogTitle>
//                 <DialogDescription className="text-right flex items-center justify-end gap-2">
//                   {getStatusIcon(selectedProject.status)}
//                   <span>{getStatusBadge(selectedProject.status)}</span>
//                 </DialogDescription>
//               </DialogHeader>

//               <Tabs defaultValue="details">
//                 <TabsList className="grid grid-cols-3 mb-4">
//                   <TabsTrigger value="details">التفاصيل</TabsTrigger>
//                   <TabsTrigger value="timeline">الجدول الزمني</TabsTrigger>
//                   <TabsTrigger value="team">فريق العمل</TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="details" className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <h3 className="font-semibold text-right mb-2 flex items-center justify-end">
//                         <Tag className="h-4 w-4 mr-2" />
//                         الوصف
//                       </h3>
//                       <p className="text-right text-gray-700">{selectedProject.description}</p>
//                     </div>

//                     <div>
//                       <h3 className="font-semibold text-right mb-2 flex items-center justify-end">
//                         <User className="h-4 w-4 mr-2" />
//                         العميل
//                       </h3>
//                       <div className="flex items-center justify-end gap-3">
//                         <div>
//                           <p className="text-right font-medium">{selectedProject.client.name}</p>
//                         </div>
//                         <img
//                           src={selectedProject.client.logo || "/placeholder.svg"}
//                           alt={selectedProject.client.name}
//                           className="h-10 w-10 rounded-full"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="font-semibold text-right mb-2 flex items-center justify-end">
//                         <Calendar className="h-4 w-4 mr-2" />
//                         التاريخ
//                       </h3>
//                       <div className="text-right">
//                         <p>تاريخ البدء: {selectedProject.startDate}</p>
//                         <p>تاريخ الانتهاء: {selectedProject.endDate}</p>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="font-semibold text-right mb-2">الميزانية</h3>
//                       <p className="text-right text-gray-700">{selectedProject.budget}</p>
//                     </div>

//                     <div>
//                       <h3 className="font-semibold text-right mb-2">التصنيف</h3>
//                       <p className="text-right text-gray-700">{selectedProject.category}</p>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="font-semibold text-right mb-2">نسبة الإنجاز</h3>
//                     <div className="w-full bg-gray-200 rounded-full h-2.5">
//                       <div
//                         className="bg-orange-500 h-2.5 rounded-full"
//                         style={{ width: `${selectedProject.progress}%` }}
//                       ></div>
//                     </div>
//                     <p className="text-right mt-1">{selectedProject.progress}%</p>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="timeline" className="space-y-4">
//                   <div className="border rounded-lg p-4">
//                     <h3 className="font-semibold text-right mb-4">الجدول الزمني للمشروع</h3>
//                     <div className="space-y-6">
//                       <div className="flex items-start">
//                         <div className="ml-4 flex flex-col items-center">
//                           <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center">
//                             <CheckCircle className="h-4 w-4 text-white" />
//                           </div>
//                           <div className="h-16 w-0.5 bg-gray-200"></div>
//                         </div>
//                         <div>
//                           <h4 className="font-medium text-right">بدء المشروع</h4>
//                           <p className="text-sm text-gray-500 text-right">{selectedProject.startDate}</p>
//                           <p className="text-right mt-1">تم الاجتماع مع العميل وتحديد متطلبات المشروع</p>
//                         </div>
//                       </div>

//                       <div className="flex items-start">
//                         <div className="ml-4 flex flex-col items-center">
//                           <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center">
//                             <CheckCircle className="h-4 w-4 text-white" />
//                           </div>
//                           <div className="h-16 w-0.5 bg-gray-200"></div>
//                         </div>
//                         <div>
//                           <h4 className="font-medium text-right">مرحلة التصميم</h4>
//                           <p className="text-sm text-gray-500 text-right">
//                             {
//                               new Date(new Date(selectedProject.startDate).getTime() + 7 * 24 * 60 * 60 * 1000)
//                                 .toISOString()
//                                 .split("T")[0]
//                             }
//                           </p>
//                           <p className="text-right mt-1">تم تقديم النماذج الأولية والحصول على موافقة العميل</p>
//                         </div>
//                       </div>

//                       <div className="flex items-start">
//                         <div className="ml-4 flex flex-col items-center">
//                           <div
//                             className={`h-8 w-8 rounded-full ${selectedProject.progress >= 50 ? "bg-orange-500" : "bg-gray-300"} flex items-center justify-center`}
//                           >
//                             {selectedProject.progress >= 50 ? (
//                               <CheckCircle className="h-4 w-4 text-white" />
//                             ) : (
//                               <Clock className="h-4 w-4 text-white" />
//                             )}
//                           </div>
//                           <div className="h-16 w-0.5 bg-gray-200"></div>
//                         </div>
//                         <div>
//                           <h4 className="font-medium text-right">مرحلة التطوير</h4>
//                           <p className="text-sm text-gray-500 text-right">
//                             {
//                               new Date(new Date(selectedProject.startDate).getTime() + 21 * 24 * 60 * 60 * 1000)
//                                 .toISOString()
//                                 .split("T")[0]
//                             }
//                           </p>
//                           <p className="text-right mt-1">تنفيذ المشروع وفقًا للتصاميم المعتمدة</p>
//                         </div>
//                       </div>

//                       <div className="flex items-start">
//                         <div className="ml-4 flex flex-col items-center">
//                           <div
//                             className={`h-8 w-8 rounded-full ${selectedProject.progress === 100 ? "bg-orange-500" : "bg-gray-300"} flex items-center justify-center`}
//                           >
//                             {selectedProject.progress === 100 ? (
//                               <CheckCircle className="h-4 w-4 text-white" />
//                             ) : (
//                               <Clock className="h-4 w-4 text-white" />
//                             )}
//                           </div>
//                         </div>
//                         <div>
//                           <h4 className="font-medium text-right">تسليم المشروع</h4>
//                           <p className="text-sm text-gray-500 text-right">{selectedProject.endDate}</p>
//                           <p className="text-right mt-1">تسليم المشروع النهائي للعميل</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="team" className="space-y-4">
//                   <div className="border rounded-lg p-4">
//                     <h3 className="font-semibold text-right mb-4">فريق العمل</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {selectedProject.team.map((member, index) => (
//                         <div key={index} className="flex items-center justify-end p-3 border rounded-lg">
//                           <div className="mr-3">
//                             <p className="font-medium text-right">{member}</p>
//                             <p className="text-sm text-gray-500 text-right">
//                               {index === 0 ? "مدير المشروع" : "عضو فريق"}
//                             </p>
//                           </div>
//                           <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
//                             <User className="h-5 w-5 text-orange-500" />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </TabsContent>
//               </Tabs>

//               <DialogFooter className="flex flex-row-reverse justify-start gap-2 mt-4">
//                 <Button className="bg-orange-500 hover:bg-orange-600">
//                   <Edit className="h-4 w-4 ml-2" />
//                   تعديل المشروع
//                 </Button>
//                 <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
//                   إغلاق
//                 </Button>
//               </DialogFooter>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }




const ProjectsPage = () => {
  return (
    <div>ProjectsPage</div>
  )
}

export default ProjectsPage