// 'use client';

// import React from "react";
// import { 
//   Card, 
//   CardContent, 
//   CardDescription, 
//   CardHeader, 
//   CardTitle 
// } from "@/components/ui/card";
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from "@/components/ui/select";
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogDescription, 
//   DialogHeader, 
//   DialogTitle 
// } from "@/components/ui/dialog";
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuTrigger 
// } from "@/components/ui/dropdown-menu";
// import { Eye, MoreVertical, Search, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

// export default function ContactMessagesPage() {
//   const [selectedMessage, setSelectedMessage] = React.useState(null);
//   const [isDialogOpen, setIsDialogOpen] = React.useState(false);
//   const [searchQuery, setSearchQuery] = React.useState("");
//   const [statusFilter, setStatusFilter] = React.useState("all");

//   // Mock data for contact messages
//   const messages = [
//     {
//       id: 1,
//       name: "أحمد محمد",
//       email: "ahmed@example.com",
//       phone: "0501234567",
//       subject: "استفسار عن خدمات التصميم",
//       message: "أود معرفة المزيد عن خدمات التصميم الجرافيكي التي تقدمونها وأسعاركم.",
//       date: "2024-03-10",
//       status: "unread",
//     },
//     {
//       id: 2,
//       name: "سارة علي",
//       email: "sara@example.com",
//       phone: "0567891234",
//       subject: "طلب عرض سعر",
//       message: "نحن شركة ناشئة ونبحث عن مصمم لتصميم هوية بصرية كاملة. هل يمكنكم تقديم عرض سعر؟",
//       date: "2024-03-09",
//       status: "read",
//     },
//     {
//       id: 3,
//       name: "محمد خالد",
//       email: "mohammed@example.com",
//       phone: "0512345678",
//       subject: "مشكلة في الموقع",
//       message: "أواجه مشكلة في تصفح قسم المشاريع في موقعكم. الصفحة لا تعمل بشكل صحيح.",
//       date: "2024-03-08",
//       status: "replied",
//     },
//     {
//       id: 4,
//       name: "فاطمة عبدالله",
//       email: "fatima@example.com",
//       phone: "0523456789",
//       subject: "تعاون محتمل",
//       message: "أنا مسؤول التسويق في شركة كبيرة ونبحث عن شركة تصميم للتعاون معها في مشاريعنا القادمة.",
//       date: "2024-03-07",
//       status: "unread",
//     },
//     {
//       id: 5,
//       name: "عمر حسن",
//       email: "omar@example.com",
//       phone: "0534567890",
//       subject: "استفسار عن التوظيف",
//       message: "هل لديكم فرص عمل متاحة لمصممين جرافيك؟ أود التقدم للعمل معكم.",
//       date: "2024-03-06",
//       status: "read",
//     },
//   ];

//   // Filter messages based on search query and status filter
//   const filteredMessages = messages.filter((message) => {
//     const matchesSearch = 
//       message.name.includes(searchQuery) || 
//       message.email.includes(searchQuery) || 
//       message.subject.includes(searchQuery);
    
//     const matchesStatus = 
//       statusFilter === "all" || 
//       message.status === statusFilter;
    
//     return matchesSearch && matchesStatus;
//   });

//   const handleViewMessage = (message) => {
//     setSelectedMessage(message);
//     setIsDialogOpen(true);
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "unread":
//         return <Badge className="bg-orange-500 hover:bg-orange-600">غير مقروءة</Badge>;
//       case "read":
//         return <Badge className="bg-white text-black border border-black hover:bg-gray-100">مقروءة</Badge>;
//       case "replied":
//         return <Badge className="bg-green-500 text-black hover:bg-green-600">تم الرد</Badge>;
//       default:
//         return null;
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "unread":
//         return <Clock className="h-4 w-4 text-orange-500" />;
//       case "read":
//         return <Eye className="h-4 w-4 text-black" />;
//       case "replied":
//         return <CheckCircle className="h-4 w-4 text-black" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="p-6 space-y-6 rtl">
//       <Card>
//         <CardHeader className="pb-3">
//           <CardTitle className="text-2xl font-bold text-right">إدارة الرسائل</CardTitle>
//           <CardDescription className="text-right">عرض وإدارة جميع الرسائل المستلمة من نموذج الاتصال</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
//             <div className="relative flex-1">
//               <Search className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
//               <Input
//                 placeholder="البحث عن رسائل..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-3 pr-10 text-right"
//               />
//             </div>
//             <div className="w-full md:w-48">
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="text-right">
//                   <SelectValue placeholder="تصفية حسب الحالة" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">جميع الرسائل</SelectItem>
//                   <SelectItem value="unread">غير مقروءة</SelectItem>
//                   <SelectItem value="read">مقروءة</SelectItem>
//                   <SelectItem value="replied">تم الرد</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="text-right">المرسل</TableHead>
//                   <TableHead className="text-right">الموضوع</TableHead>
//                   <TableHead className="text-right">التاريخ</TableHead>
//                   <TableHead className="text-right">الحالة</TableHead>
//                   <TableHead className="text-right">الإجراءات</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredMessages.length > 0 ? (
//                   filteredMessages.map((message) => (
//                     <TableRow key={message.id}>
//                       <TableCell className="font-medium text-right">
//                         <div>{message.name}</div>
//                         <div className="text-sm text-gray-500">{message.email}</div>
//                       </TableCell>
//                       <TableCell className="text-right">{message.subject}</TableCell>
//                       <TableCell className="text-right">{message.date}</TableCell>
//                       <TableCell className="text-right">
//                         {getStatusBadge(message.status)}
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex justify-end gap-2">
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => handleViewMessage(message)}
//                           >
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
//                                 <CheckCircle className="h-4 w-4 ml-2" />
//                                 <span>تحديد كمقروءة</span>
//                               </DropdownMenuItem>
//                               <DropdownMenuItem>
//                                 <XCircle className="h-4 w-4 ml-2" />
//                                 <span>تحديد كغير مقروءة</span>
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
//                     <TableCell colSpan={5} className="h-24 text-center">
//                       لا توجد رسائل مطابقة للبحث
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Message Details Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="max-w-md rtl">
//           {selectedMessage && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="text-right">تفاصيل الرسالة</DialogTitle>
//                 <DialogDescription className="text-right">
//                   {getStatusIcon(selectedMessage.status)}
//                   <span className="mr-2">{selectedMessage.date}</span>
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="font-semibold text-right">المرسل</h3>
//                   <p className="text-right">{selectedMessage.name}</p>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-right">البريد الإلكتروني</h3>
//                   <p className="text-right">{selectedMessage.email}</p>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-right">رقم الهاتف</h3>
//                   <p className="text-right">{selectedMessage.phone}</p>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-right">الموضوع</h3>
//                   <p className="text-right">{selectedMessage.subject}</p>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-right">الرسالة</h3>
//                   <p className="text-right whitespace-pre-wrap">{selectedMessage.message}</p>
//                 </div>
//                 <div className="flex justify-between pt-4">
//                   <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
//                     إغلاق
//                   </Button>
//                   <Button className="bg-orange-500 hover:bg-orange-600">
//                     الرد على الرسالة
//                   </Button>
//                 </div>
//               </div>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }



const ContactMessagesPage = () => {
  return (
    <div>ContactMessagesPage</div>
  )
}

export default ContactMessagesPage