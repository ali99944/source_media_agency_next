// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import React from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
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
//   Phone,
//   Mail,
//   MapPin,
//   Building,
//   FileText,
//   Calendar,
//   User,
// } from "lucide-react"

// export default function ClientsPage() {
//   const [selectedClient, setSelectedClient] = React.useState(null)
//   const [isDialogOpen, setIsDialogOpen] = React.useState(false)
//   const [searchQuery, setSearchQuery] = React.useState("")

//   // Mock data for clients
//   const clients: any[] = []

//   // Filter clients based on search query
//   const filteredClients = clients.filter((client) => {
//     return (
//       client.name.includes(searchQuery) ||
//       client.contactPerson.includes(searchQuery) ||
//       client.email.includes(searchQuery) ||
//       client.industry.includes(searchQuery)
//     )
//   })

//   const handleViewClient = (client) => {
//     setSelectedClient(client)
//     setIsDialogOpen(true)
//   }

//   return (
//     <div className="p-6 space-y-6 rtl">
//       <Card>
//         <CardHeader className="pb-3">
//           <div className="flex justify-between items-center">

//             <div>
//               <CardTitle className="text-2xl font-bold text-right">إدارة العملاء</CardTitle>
//               <CardDescription className="text-right">عرض وإدارة جميع عملاء الشركة</CardDescription>
//             </div>
//             <Button className="bg-orange-500 hover:bg-orange-600">
//               <Plus className="h-4 w-4 ml-2" />
//               عميل جديد
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="relative flex-1 mb-6">
//             <Search className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
//             <Input
//               placeholder="البحث عن عملاء..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-3 pr-10 text-right"
//             />
//           </div>

//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="text-right">العميل</TableHead>
//                   <TableHead className="text-right">جهة الاتصال</TableHead>
//                   <TableHead className="text-right">المجال</TableHead>
//                   <TableHead className="text-right">المشاريع</TableHead>
//                   <TableHead className="text-right">تاريخ الانضمام</TableHead>
//                   <TableHead className="text-right">الإجراءات</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredClients.length > 0 ? (
//                   filteredClients.map((client) => (
//                     <TableRow key={client.id}>
//                       <TableCell className="font-medium text-right">
//                         <div className="flex items-center justify-end gap-2">
//                           <div>
//                             <div>{client.name}</div>
//                             <div className="text-sm text-gray-500">{client.email}</div>
//                           </div>
//                           <img
//                             src={client.logo || "/placeholder.svg"}
//                             alt={client.name}
//                             className="h-8 w-8 rounded-full"
//                           />
//                         </div>
//                       </TableCell>
//                       <TableCell className="text-right">{client.contactPerson}</TableCell>
//                       <TableCell className="text-right">{client.industry}</TableCell>
//                       <TableCell className="text-right">
//                         <div className="flex items-center justify-end gap-2">
//                           <div>
//                             <Badge className="bg-orange-500 hover:bg-orange-600">{client.activeProjects} نشط</Badge>
//                           </div>
//                           <div>{client.totalProjects} مشروع</div>
//                         </div>
//                       </TableCell>
//                       <TableCell className="text-right">{client.joinDate}</TableCell>
//                       <TableCell>
//                         <div className="flex justify-end gap-2">
//                           <Button variant="ghost" size="icon" onClick={() => handleViewClient(client)}>
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
//                               <DropdownMenuItem>
//                                 <Plus className="h-4 w-4 ml-2" />
//                                 <span>إضافة مشروع</span>
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
//                       لا يوجد عملاء مطابقين للبحث
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Client Details Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="max-w-3xl rtl">
//           {selectedClient && (
//             <>
//               <DialogHeader>
//                 <div className="flex items-center justify-end gap-3">
//                   <DialogTitle className="text-right text-xl">{selectedClient.name}</DialogTitle>
//                   <img
//                     src={selectedClient.logo || "/placeholder.svg"}
//                     alt={selectedClient.name}
//                     className="h-10 w-10 rounded-full"
//                   />
//                 </div>
//                 <DialogDescription className="text-right">
//                   <Badge className="bg-black hover:bg-gray-800 mt-2">{selectedClient.industry}</Badge>
//                 </DialogDescription>
//               </DialogHeader>

//               <Tabs defaultValue="info">
//                 <TabsList className="grid grid-cols-3 mb-4">
//                   <TabsTrigger value="info">معلومات العميل</TabsTrigger>
//                   <TabsTrigger value="projects">المشاريع</TabsTrigger>
//                   <TabsTrigger value="documents">المستندات</TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="info" className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <h3 className="font-semibold text-right mb-2 flex items-center justify-end">
//                         <User className="h-4 w-4 mr-2" />
//                         جهة الاتصال
//                       </h3>
//                       <p className="text-right text-gray-700">{selectedClient.contactPerson}</p>
//                     </div>

//                     <div>
//                       <h3 className="font-semibold text-right mb-2 flex items-center justify-end">
//                         <Mail className="h-4 w-4 mr-2" />
//                         البريد الإلكتروني
//                       </h3>
//                       <p className="text-right text-gray-700">{selectedClient.email}</p>
//                     </div>

//                     <div>
//                       <h3 className="font-semibold text-right mb-2 flex items-center justify-end">
//                         <Phone className="h-4 w-4 mr-2" />
//                         رقم الهاتف
//                       </h3>
//                       <p className="text-right text-gray-700">{selectedClient.phone}</p>
//                     </div>

//                     <div>
//                       <h3 className="font-semibold text-right mb-2 flex items-center justify-end">
//                         <MapPin className="h-4 w-4 mr-2" />
//                         العنوان
//                       </h3>
//                       <p className="text-right text-gray-700">{selectedClient.address}</p>
//                     </div>

//                     <div>
//                       <h3 className="font-semibold text-right mb-2 flex items-center justify-end">
//                         <Building className="h-4 w-4 mr-2" />
//                         المجال
//                       </h3>
//                       <p className="text-right text-gray-700">{selectedClient.industry}</p>
//                     </div>

//                     <div>
//                       <h3 className="font-semibold text-right mb-2 flex items-center justify-end">
//                         <Calendar className="h-4 w-4 mr-2" />
//                         تاريخ الانضمام
//                       </h3>
//                       <p className="text-right text-gray-700">{selectedClient.joinDate}</p>
//                     </div>
//                   </div>

//                   <div className="border-t pt-4 mt-4">
//                     <h3 className="font-semibold text-right mb-2">ملاحظات</h3>
//                     <p className="text-right text-gray-700">لا توجد ملاحظات مضافة لهذا العميل.</p>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="projects" className="space-y-4">
//                   <div className="flex justify-end mb-4">
//                     <Button className="bg-orange-500 hover:bg-orange-600">
//                       <Plus className="h-4 w-4 ml-2" />
//                       إضافة مشروع جديد
//                     </Button>
//                   </div>

//                   {selectedClient.projects.length > 0 ? (
//                     <div className="rounded-md border">
//                       <Table>
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead className="text-right">اسم المشروع</TableHead>
//                             <TableHead className="text-right">الحالة</TableHead>
//                             <TableHead className="text-right">الإجراءات</TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {selectedClient.projects.map((project) => (
//                             <TableRow key={project.id}>
//                               <TableCell className="font-medium text-right">{project.name}</TableCell>
//                               <TableCell className="text-right">
//                                 <Badge
//                                   className={
//                                     project.status === "completed"
//                                       ? "bg-white text-black border border-black hover:bg-gray-100"
//                                       : project.status === "in-progress"
//                                         ? "bg-orange-500 hover:bg-orange-600"
//                                         : "bg-black hover:bg-gray-800"
//                                   }
//                                 >
//                                   {project.status === "completed"
//                                     ? "مكتمل"
//                                     : project.status === "in-progress"
//                                       ? "قيد التنفيذ"
//                                       : "قيد الانتظار"}
//                                 </Badge>
//                               </TableCell>
//                               <TableCell>
//                                 <div className="flex justify-end gap-2">
//                                   <Button variant="ghost" size="icon">
//                                     <Eye className="h-4 w-4" />
//                                   </Button>
//                                   <Button variant="ghost" size="icon">
//                                     <Edit className="h-4 w-4" />
//                                   </Button>
//                                 </div>
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </div>
//                   ) : (
//                     <div className="text-center p-8 border rounded-md">
//                       <p className="text-gray-500">لا توجد مشاريع لهذا العميل</p>
//                     </div>
//                   )}
//                 </TabsContent>

//                 <TabsContent value="documents" className="space-y-4">
//                   <div className="flex justify-end mb-4">
//                     <Button className="bg-orange-500 hover:bg-orange-600">
//                       <Plus className="h-4 w-4 ml-2" />
//                       إضافة مستند جديد
//                     </Button>
//                   </div>

//                   <div className="text-center p-8 border rounded-md">
//                     <FileText className="h-12 w-12 mx-auto text-gray-300 mb-2" />
//                     <p className="text-gray-500">لا توجد مستندات مضافة لهذا العميل</p>
//                     <p className="text-gray-500 text-sm mt-1">يمكنك إضافة العقود والفواتير والمستندات الأخرى هنا</p>
//                   </div>
//                 </TabsContent>
//               </Tabs>

//               <DialogFooter className="flex flex-row-reverse justify-start gap-2 mt-4">
//                 <Button className="bg-orange-500 hover:bg-orange-600">
//                   <Edit className="h-4 w-4 ml-2" />
//                   تعديل بيانات العميل
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



const Page = () => {
  return (
    <div>page</div>
  )
}

export default Page