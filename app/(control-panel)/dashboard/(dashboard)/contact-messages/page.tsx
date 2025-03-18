'use client';

import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

import { Search } from 'lucide-react';
import useGetServerData from "@/src/hooks/use-get-server-data";
import { getContactMessages } from "@/src/server-actions/contact-message-actions";

export default function ContactMessagesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const { data: messages } = useGetServerData(getContactMessages, [])
  // Filter messages based on search query and status filter
  const filteredMessages = messages.filter((message) => {
    const matchesSearch = 
      message.client_name.includes(searchQuery) || 
      message.client_email.includes(searchQuery) || 
      message.subject.includes(searchQuery);
    
    
    return matchesSearch;
  });


  return (
    <div className="p-6 space-y-6 rtl">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold text-right">إدارة الرسائل</CardTitle>
          <CardDescription className="text-right">عرض وإدارة جميع الرسائل المستلمة من نموذج الاتصال</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="البحث عن رسائل..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-10 text-right"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="تصفية حسب الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الرسائل</SelectItem>
                  <SelectItem value="unread">غير مقروءة</SelectItem>
                  <SelectItem value="read">مقروءة</SelectItem>
                  <SelectItem value="replied">تم الرد</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المرسل</TableHead>
                  <TableHead className="text-right">رقم الهاتف</TableHead>
                  <TableHead className="text-right">الموضوع</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium text-right">
                        <div>{message.client_name}</div>
                        <div className="text-sm text-gray-500">{message.client_email}</div>
                      </TableCell>
                      <TableCell className="text-right">{message.client_phone}</TableCell>
                      <TableCell className="text-right">{message.subject}</TableCell>
                      <TableCell className="text-right">{message.sent_at}</TableCell>

                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      لا توجد رسائل مطابقة للبحث
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
