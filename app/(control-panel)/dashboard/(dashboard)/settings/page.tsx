"use client"

import { useState } from "react"
import { Settings, Globe, Key, Save, RefreshCw, Bell } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast.success("تم حفظ الإعدادات بنجاح")
    }, 1000)
  }

  return (
    <div className="container p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">إعدادات النظام</h1>
          <p className="text-gray-400 mt-1">إدارة إعدادات نظام سورس ميديا</p>
        </div>
        <Button 
          onClick={handleSave} 
          className="bg-orange-500 hover:bg-orange-600 text-black"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
              جاري الحفظ...
            </>
          ) : (
            <>
              <Save className="ml-2 h-4 w-4" />
              حفظ الإعدادات
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4  border ">
          <TabsTrigger value="general" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
            <Settings className="ml-2 h-4 w-4" />
            عام
          </TabsTrigger>
          <TabsTrigger value="website" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
            <Globe className="ml-2 h-4 w-4" />
            الموقع
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
            <Bell className="ml-2 h-4 w-4" />
            الإشعارات
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
            <Key className="ml-2 h-4 w-4" />
            واجهة API
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card className=" ">
            <CardHeader>
              <CardTitle className="text-white">الإعدادات العامة</CardTitle>
              <CardDescription>إدارة الإعدادات العامة للنظام</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">اسم الشركة</Label>
                  <Input id="company-name" defaultValue="سورس ميديا" className=" " />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">البريد الإلكتروني للشركة</Label>
                  <Input id="company-email" defaultValue="info@sourcemedia.com" type="email" className=" " />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">رقم الهاتف</Label>
                  <Input id="company-phone" defaultValue="+966 50 123 4567" className=" " />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">العنوان</Label>
                  <Input id="company-address" defaultValue="الرياض، المملكة العربية السعودية" className=" " />
                </div>
              </div>

              <Separator className="bg-orange-500/20 my-4" />

              <div className="space-y-2">
                <Label htmlFor="company-description">وصف الشركة</Label>
                <Textarea 
                  id="company-description" 
                  defaultValue="سورس ميديا هي شركة رائدة في مجال التسويق الرقمي وتطوير المواقع الإلكترونية وتصميم الهوية البصرية."
                  className="min-h-[100px]  "
                />
              </div>



              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">وضع الصيانة</Label>
                  <p className="text-sm text-gray-400">تفعيل وضع الصيانة للموقع</p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
            </CardContent>
          </Card>

        </TabsContent>

        {/* Website Settings */}
        <TabsContent value="website" className="space-y-4 mt-4">
          <Card className=" ">
            <CardHeader>
              <CardTitle className="text-white">إعدادات الموقع</CardTitle>
              <CardDescription>إدارة إعدادات الموقع الإلكتروني</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-title">عنوان الموقع</Label>
                  <Input id="site-title" defaultValue="سورس ميديا | حلول تسويقية متكاملة" className=" " />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-url">رابط الموقع</Label>
                  <Input id="site-url" defaultValue="https://sourcemedia.com" className=" " />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">وصف الموقع (Meta Description)</Label>
                <Textarea 
                  id="meta-description" 
                  defaultValue="سورس ميديا - شركة رائدة في مجال التسويق الرقمي وتطوير المواقع الإلكترونية وتصميم الهوية البصرية في المملكة العربية السعودية."
                  className="min-h-[100px]  "
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-keywords">الكلمات المفتاحية (Meta Keywords)</Label>
                <Input 
                  id="meta-keywords" 
                  defaultValue="تسويق رقمي، تصميم مواقع، هوية بصرية، سوشيال ميديا، تطوير تطبيقات"
                  className=" "
                />
              </div>

              <Separator className="bg-orange-500/20 my-4" />

              <div className="space-y-2">
                <Label>روابط التواصل الاجتماعي</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">فيسبوك</Label>
                    <Input id="facebook" defaultValue="https://facebook.com/sourcemedia" className=" " />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">تويتر</Label>
                    <Input id="twitter" defaultValue="https://twitter.com/sourcemedia" className=" " />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">انستغرام</Label>
                    <Input id="instagram" defaultValue="https://instagram.com/sourcemedia" className=" " />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">لينكد إن</Label>
                    <Input id="linkedin" defaultValue="https://linkedin.com/company/sourcemedia" className=" " />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics">تفعيل Google Analytics</Label>
                  <p className="text-sm text-gray-400">تتبع زوار الموقع باستخدام Google Analytics</p>
                </div>
                <Switch id="analytics" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="analytics-id">معرف Google Analytics</Label>
                <Input id="analytics-id" defaultValue="UA-123456789-1" className=" " />
              </div>
            </CardContent>
          </Card>

          <Card className=" ">
            <CardHeader>
              <CardTitle className="text-white">إعدادات الصفحة الرئيسية</CardTitle>
              <CardDescription>تخصيص محتوى الصفحة الرئيسية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">عنوان القسم الرئيسي</Label>
                <Input 
                  id="hero-title" 
                  defaultValue="حلول تسويقية متكاملة لنمو أعمالك"
                  className=" "
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">العنوان الفرعي</Label>
                <Textarea 
                  id="hero-subtitle" 
                  defaultValue="نقدم خدمات احترافية في مجال التسويق الرقمي وتطوير المواقع الإلكترونية وتصميم الهوية البصرية لمساعدة عملائنا على تحقيق أهدافهم."
                  className="min-h-[80px]  "
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured-services">الخدمات المميزة (عدد الخدمات المعروضة)</Label>
                <Select defaultValue="6">
                  <SelectTrigger className=" ">
                    <SelectValue placeholder="اختر عدد الخدمات" />
                  </SelectTrigger>
                  <SelectContent className=" ">
                    <SelectItem value="3">3 خدمات</SelectItem>
                    <SelectItem value="6">6 خدمات</SelectItem>
                    <SelectItem value="9">9 خدمات</SelectItem>
                    <SelectItem value="12">12 خدمة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured-projects">المشاريع المميزة (عدد المشاريع المعروضة)</Label>
                <Select defaultValue="4">
                  <SelectTrigger className=" ">
                    <SelectValue placeholder="اختر عدد المشاريع" />
                  </SelectTrigger>
                  <SelectContent className=" ">
                    <SelectItem value="3">3 مشاريع</SelectItem>
                    <SelectItem value="4">4 مشاريع</SelectItem>
                    <SelectItem value="6">6 مشاريع</SelectItem>
                    <SelectItem value="8">8 مشاريع</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-testimonials">عرض آراء العملاء</Label>
                  <p className="text-sm text-gray-400">عرض قسم آراء العملاء في الصفحة الرئيسية</p>
                </div>
                <Switch id="show-testimonials" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-stats">عرض الإحصائيات</Label>
                  <p className="text-sm text-gray-400">عرض قسم الإحصائيات في الصفحة الرئيسية</p>
                </div>
                <Switch id="show-stats" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card className=" ">
            <CardHeader>
              <CardTitle className="text-white">إعدادات الإشعارات</CardTitle>
              <CardDescription>إدارة إعدادات الإشعارات والتنبيهات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">إشعارات البريد الإلكتروني</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-new-order">طلب جديد</Label>
                    <Switch id="email-new-order" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-new-user">مستخدم جديد</Label>
                    <Switch id="email-new-user" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-new-message">رسالة جديدة</Label>
                    <Switch id="email-new-message" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-system-updates">تحديثات النظام</Label>
                    <Switch id="email-system-updates" />
                  </div>
                </div>
              </div>

              <Separator className="bg-orange-500/20 my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">إشعارات النظام</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-new-order">طلب جديد</Label>
                    <Switch id="system-new-order" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-new-user">مستخدم جديد</Label>
                    <Switch id="system-new-user" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-new-message">رسالة جديدة</Label>
                    <Switch id="system-new-message" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-updates">تحديثات النظام</Label>
                    <Switch id="system-updates" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator className="bg-orange-500/20 my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">إشعارات الجوال</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mobile-new-order">طلب جديد</Label>
                    <Switch id="mobile-new-order" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mobile-new-message">رسالة جديدة</Label>
                    <Switch id="mobile-new-message" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mobile-updates">تحديثات النظام</Label>
                    <Switch id="mobile-updates" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-email">البريد الإلكتروني للإشعارات</Label>
                <Input 
                  id="notification-email" 
                  defaultValue="admin@sourcemedia.com"
                  className=" "
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className=" hover:bg-orange-500/10 hover:text-orange-500">
                <Bell className="ml-2 h-4 w-4" />
                اختبار الإشعارات
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-4 mt-4">
          <Card className=" ">
            <CardHeader>
              <CardTitle className="text-white">إعدادات واجهة API</CardTitle>
              <CardDescription>إدارة مفاتيح API والتكامل مع الخدمات الخارجية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">تكامل الخدمات</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>تكامل خدمة الدفع</Label>
                      <p className="text-sm text-gray-400">ربط النظام مع بوابة الدفع</p>
                    </div>
                    <Switch id="payment-integration" defaultChecked />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="payment-api-key">مفتاح API لبوابة الدفع</Label>
                      <Input 
                        id="payment-api-key" 
                        defaultValue="pk_test_51NzT7rKG8oBJ2Jx0"
                        className=" "
                        type="password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payment-secret-key">المفتاح السري لبوابة الدفع</Label>
                      <Input 
                        id="payment-secret-key" 
                        defaultValue="sk_test_51NzT7rKG8oBJ2Jx0"
                        className=" "
                        type="password"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>تكامل خدمة البريد الإلكتروني</Label>
                      <p className="text-sm text-gray-400">ربط النظام مع خدمة إرسال البريد الإلكتروني</p>
                    </div>
                    <Switch id="email-integration" defaultChecked />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-api-key">مفتاح API لخدمة البريد</Label>
                      <Input 
                        id="email-api-key" 
                        defaultValue="SG.pKyYr5U3RQWOqPVONOwLQw"
                        className=" "
                        type="password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-from">البريد المرسل</Label>
                      <Input 
                        id="email-from" 
                        defaultValue="no-reply@sourcemedia.com"
                        className=" "
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>تكامل وسائل التواصل الاجتماعي</Label>
                      <p className="text-sm text-gray-400">ربط النظام مع منصات التواصل الاجتماعي</p>
                    </div>
                    <Switch id="social-integration" defaultChecked />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="facebook-api-key">مفتاح API لفيسبوك</Label>
                      <Input 
                        id="facebook-api-key" 
                        defaultValue="EAANKcVZCZBZC0BAD9ZAjZBZCZCZCZA"
                        className=" "
                        type="password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter-api-key">مفتاح API لتويتر</Label>
                      <Input 
                        id="twitter-api-key" 
                        defaultValue="AAAAAAAAAAAAAAAAAAAAAMLheAAAAAAA"
                        className=" "
                        type="password"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
