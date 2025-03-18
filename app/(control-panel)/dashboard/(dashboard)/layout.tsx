"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Settings,
  FileText,
  MessageSquare,
  CreditCard,
  PanelRight,
  Bell,
  LogOut,
  HelpCircle,
  Menu,
  Megaphone,
  Image,
  Film,
  Globe,
  Smartphone,
  ShoppingCart,
  ChevronLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/sonner"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  badge?: string
  submenu?: NavItem[]
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const navItems: NavItem[] = [
    {
      title: "لوحة التحكم",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "المشاريع",
      href: "/dashboard/projects",
      icon: <FolderKanban className="h-5 w-5" />,
      badge: "12",
      submenu: [
        {
          title: "كل المشاريع",
          href: "/dashboard/projects",
          icon: <FolderKanban className="h-4 w-4" />,
        },
        {
          title: "مشاريع جديدة",
          href: "/dashboard/projects/new",
          icon: <FolderKanban className="h-4 w-4" />,
        },
        {
          title: "قيد التنفيذ",
          href: "/dashboard/projects/in-progress",
          icon: <FolderKanban className="h-4 w-4" />,
        },
        {
          title: "مكتملة",
          href: "/dashboard/projects/completed",
          icon: <FolderKanban className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "العملاء",
      href: "/dashboard/clients",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "الخدمات",
      href: "/dashboard/services",
      icon: <ShoppingCart className="h-5 w-5" />,
      submenu: [
        {
          title: "التسويق الذكي",
          href: "/dashboard/services/marketing",
          icon: <Megaphone className="h-4 w-4" />,
        },
        {
          title: "الحلول البرمجية",
          href: "/dashboard/services/solutions",
          icon: <Globe className="h-4 w-4" />,
        },
        {
          title: "الفيديو والمونتاج",
          href: "/dashboard/services/video",
          icon: <Film className="h-4 w-4" />,
        },
        {
          title: "التصاميم",
          href: "/dashboard/services/designs",
          icon: <Image className="h-4 w-4" />,
        },
        {
          title: "قوائم الطعام الإلكترونية",
          href: "/dashboard/services/emenu",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          title: "بطاقات الأعمال الرقمية",
          href: "/dashboard/services/business-cards",
          icon: <Smartphone className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "التسويق",
      href: "/dashboard/marketing",
      icon: <Megaphone className="h-5 w-5" />,
      submenu: [
        {
          title: "الحملات الإعلانية",
          href: "/dashboard/marketing/campaigns",
          icon: <Megaphone className="h-4 w-4" />,
        },
        {
          title: "وسائل التواصل الاجتماعي",
          href: "/dashboard/marketing/social-media",
          icon: <Globe className="h-4 w-4" />,
        },
        {
          title: "زيادة المتابعين",
          href: "/dashboard/marketing/followers",
          icon: <Users className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "المحتوى",
      href: "/dashboard/content",
      icon: <FileText className="h-5 w-5" />,
      submenu: [
        {
          title: "الصفحات",
          href: "/dashboard/content/pages",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          title: "معرض الأعمال",
          href: "/dashboard/content/portfolio",
          icon: <Image className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "الرسائل",
      href: "/dashboard/contact-messages",
      icon: <MessageSquare className="h-5 w-5" />,
      badge: "5",
    },
    {
      title: "الفواتير",
      href: "/dashboard/invoices",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "الإعدادات",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
      submenu: [
        {
          title: "الملف الشخصي",
          href: "/dashboard/settings/profile",
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "إعدادات الموقع",
          href: "/dashboard/settings/site",
          icon: <Globe className="h-4 w-4" />,
        },
        {
          title: "المستخدمين",
          href: "/dashboard/settings/users",
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "الأدوار والصلاحيات",
          href: "/dashboard/settings/roles",
          icon: <Users className="h-4 w-4" />,
        },
      ],
    },
  ]

  return (
      <div className="min-h-screen bg-black text-white flex flex-col" dir="rtl">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b  bg-black px-4 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden text-white hover:bg-orange-500/10 hover:text-orange-500"
          >
            <Menu className="h-6 w-6" />
          </Button>

          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-orange-500">
                <div className="absolute inset-0 flex items-center justify-center font-bold text-black">SM</div>
              </div>
              <span className="text-lg font-bold">Source Media</span>
            </Link>
          </div>

          <div className="flex-1"></div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-white hover:bg-orange-500/10 hover:text-orange-500"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>الإشعارات</span>
                  <Badge variant="outline" className="text-xs">
                    5 جديدة
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem key={i} className="flex flex-col items-start p-4 cursor-pointer">
                    <div className="flex w-full justify-between">
                      <span className="font-medium">تم إضافة مشروع جديد</span>
                      <span className="text-xs text-gray-400">منذ 2 ساعة</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      تم إضافة مشروع &quot;تصميم موقع إلكتروني&quot; إلى قائمة المشاريع
                    </p>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center font-medium text-orange-500 focus:text-orange-500">
                  عرض كل الإشعارات
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-orange-500/10 hover:text-orange-500">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>المساعدة</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>مركز المساعدة</DropdownMenuItem>
                <DropdownMenuItem>الدعم الفني</DropdownMenuItem>
                <DropdownMenuItem>الأسئلة الشائعة</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" size="icon">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-orange-500 text-black">أح</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Users className="ml-2 h-4 w-4" />
                  <span>الملف الشخصي</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="ml-2 h-4 w-4" />
                  <span>الإعدادات</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="ml-2 h-4 w-4" />
                  <span>تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">


          {/* Sidebar */}
          <aside
            className={cn(
              "h-[calc(100vh-4rem)] z-30 border-l  bg-black/95 transition-all duration-300 overflow-hidden",
              isSidebarOpen ? "w-64" : "w-20",
              isMobile && !isSidebarOpen && "w-0",
            )}
          >
            <div className="h-full flex flex-col">
              {/* Sidebar Toggle */}
              <div className="flex h-16 items-center justify-between px-4 py-4">
                {!isMobile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-white hover:bg-orange-500/10 hover:text-orange-500"
                  >
                    <PanelRight className="h-5 w-5" />
                  </Button>
                )}
              </div>

              <Separator className="bg-slate-200/20" />

              {/* Navigation */}
              <div className="flex-1 overflow-auto py-4">
                <nav className="grid gap-1 px-2">
                  {navItems.map((item) => (
                    <div key={item.title}>
                      <NavItem item={item} pathname={pathname} isCollapsed={!isSidebarOpen} />
                    </div>
                  ))}
                </nav>
              </div>

              <Separator className="bg-orange-500/20" />

              {/* User */}
              <div className="p-4">
                <div className={cn("flex items-center justify-between", !isSidebarOpen && "flex-col gap-2")}>
                  <div className={cn("flex items-center gap-2", !isSidebarOpen && "flex-col")}>
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-orange-500 text-black">أح</AvatarFallback>
                    </Avatar>
                    {isSidebarOpen && (
                      <div>
                        <p className="text-sm font-medium">أحمد محمد</p>
                        <p className="text-xs text-gray-400">مدير</p>
                      </div>
                    )}
                  </div>
                  {isSidebarOpen && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-orange-500/10 hover:text-orange-500"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Users className="ml-2 h-4 w-4" />
                          <span>الملف الشخصي</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="ml-2 h-4 w-4" />
                          <span>الإعدادات</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <LogOut className="ml-2 h-4 w-4" />
                          <span>تسجيل الخروج</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </div>
          </aside>

          <div dir="rtl" className={cn("flex-1 overflow-auto transition-all duration-300", isSidebarOpen ? "" : "ml-0")}>
            <main className="flex-1" dir="rtl">{children}</main>
          </div>
        </div>
      </div>
  )
}

interface NavItemProps {
  item: NavItem
  pathname: string
  isCollapsed: boolean
}

function NavItem({ item, pathname, isCollapsed }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isActive = pathname === item.href
  const isSubActive = item.submenu?.some((subitem) => pathname === subitem.href)

  useEffect(() => {
    if (isSubActive) {
      setIsOpen(true)
    }
  }, [isSubActive])

  return (
    <div>
      <Link
        href={item.submenu ? "#" : item.href}
        onClick={
          item.submenu
            ? (e) => {
                e.preventDefault()
                setIsOpen(!isOpen)
              }
            : undefined
        }
        className={cn(
          "group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-orange-500/10 hover:text-orange-500 transition-colors",
          isActive || isSubActive ? "bg-orange-500/10 text-orange-500" : "text-white",
          isCollapsed && "justify-center",
        )}
      >
        <div className="flex items-center gap-3">
          {item.icon}
          {!isCollapsed && <span>{item.title}</span>}
        </div>
        {!isCollapsed && (
          <div className="flex items-center gap-1">
            {item.badge && (
              <Badge variant="outline" className="h-5 text-xs bg-orange-500/10 text-orange-500 ">
                {item.badge}
              </Badge>
            )}
            {item.submenu && (
              <div className={`transition-transform duration-200 ${isOpen ? "-rotate-90" : ""}`}>
                <ChevronLeft className="h-4 w-4" />
              </div>
            )}
          </div>
        )}
      </Link>

      {item.submenu && !isCollapsed && isOpen && (
        <div className="mt-1 mr-4 space-y-1 border-r  pr-3">
          {item.submenu.map((subitem) => (
            <Link
              key={subitem.title}
              href={subitem.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-orange-500/10 hover:text-orange-500 transition-colors",
                pathname === subitem.href ? "bg-orange-500/10 text-orange-500" : "text-white",
              )}
            >
              {subitem.icon}
              <span>{subitem.title}</span>
            </Link>
          ))}
        </div>
      )}

      <Toaster />
    </div>
  )
}

