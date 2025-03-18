"use client"

import {
  Users,
  FolderKanban,
  BarChart3,
  CreditCard,
  Plus,
  CheckCircle,
  Calendar,
  Download
} from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Chart component (simplified for demo)
const AreaChart = ({ className }: { className?: string }) => (
  <div className={cn("w-full h-[200px] flex items-end gap-1", className)}>
    {Array.from({ length: 30 }).map((_, i) => {
      const height = Math.max(15, Math.floor(Math.random() * 100))
      return (
        <div
          key={i}
          className="bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-sm w-full"
          style={{ height: `${height}%` }}
        ></div>
      )
    })}
  </div>
)




export default function AdminDashboard() {

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">مرحبًا، أحمد 👋</h1>
          <p className="text-gray-400">هذه نظرة عامة على أداء شركتك وآخر المشاريع.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
                <CreditCard className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,231 ريال</div>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">المشاريع النشطة</CardTitle>
                <FolderKanban className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">العملاء الجدد</CardTitle>
                <Users className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+8</div>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">معدل إكمال المشاريع</CardTitle>
                <BarChart3 className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 ">
              <CardHeader>
                <CardTitle>نظرة عامة على الإيرادات</CardTitle>
              </CardHeader>
              <CardContent>
                <AreaChart />
              </CardContent>
            </Card>
            <Card className=" lg:col-span-3">
                <CardHeader>
                  <CardTitle>المهام القادمة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-5 h-5 border border-orange-500 rounded-sm ml-3 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-orange-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">اجتماع مع فريق التصميم</p>
                        <p className="text-xs text-gray-400">اليوم، 14:00</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-orange-500">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                    <Separator className="bg-white/10" />
                    <div className="flex items-center">
                      <div className="w-5 h-5 border border-white/20 rounded-sm ml-3"></div>
                      <div className="flex-1">
                        <p className="text-sm">تسليم مشروع شركة النور</p>
                        <p className="text-xs text-gray-400">غدًا، 10:00</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-orange-500">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                    <Separator className="bg-white/10" />
                    <div className="flex items-center">
                      <div className="w-5 h-5 border border-white/20 rounded-sm ml-3"></div>
                      <div className="flex-1">
                        <p className="text-sm">مراجعة تصميمات متجر الأناقة</p>
                        <p className="text-xs text-gray-400">الخميس، 13:00</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-orange-500">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </div>


          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">إضافة مشروع</CardTitle>
                <Plus className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-400">إنشاء مشروع جديد وتعيين فريق العمل</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-black">
                  إضافة
                </Button>
              </CardFooter>
            </Card>
            <Card className="">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">إضافة عميل</CardTitle>
                <Users className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-400">إضافة عميل جديد وإدارة بياناته</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-black">
                  إضافة
                </Button>
              </CardFooter>
            </Card>
            <Card className="">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">إنشاء فاتورة</CardTitle>
                <CreditCard className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-400">إنشاء فاتورة جديدة وإرسالها للعميل</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-black">
                  إنشاء
                </Button>
              </CardFooter>
            </Card>
            <Card className="">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">تقارير الأداء</CardTitle>
                <Download className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-400">تحميل تقارير الأداء والإحصائيات</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-black">
                  تحميل
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
    </div>
  )
}

