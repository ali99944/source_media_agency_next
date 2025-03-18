import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import { getContactsData } from '@/src/server-actions/contacts-data-actions';
import useGetServerData from '@/src/hooks/use-get-server-data';
import Link from 'next/link';


const Footer: React.FC = () => {
    const { data: contacts_data } = useGetServerData(getContactsData, {
      facebook_account_link: "",
      instagram_account_link: "",
      location: "",
      phone_number: "",
      tiktok_account_link: "",
      whatsapp_phone: "",
      email: "",
      id: 0
    })
  return (
    <footer className="bg-black text-white py-12" dir='rtl'>
      <div className="container mx-auto px-4">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <img
              src="/images/logo.png" // Replace with your logo URL
              alt="Source Media Agency Logo"
              className="h-32"
            />
            <p className="text-gray-400">
            نحن وكالة دعايا واعلان نعمل علي ادارة الصفحات علي جميع منصات التواصل الاجتماعي
            </p>
            <p className="text-orange-500 font-semibold">
              Powered by Source Media Agency
            </p>
            <p className="text-gray-400">تخصص تلميع براندات</p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-orange-500 font-semibold text-lg">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-500 transition">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-orange-500 transition">
                  عنا
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-orange-500 transition">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-orange-500 font-semibold text-lg">تابعنا</h3>
            <div className="flex space-x-4">
              <a
                href={contacts_data?.facebook_account_link}
                className="text-gray-400 hover:text-orange-500 transition"
              >
                <Facebook size={24} />
              </a>
              <a
                href={contacts_data?.tiktok_account_link}
                className="text-gray-400 hover:text-orange-500 transition"
              >
                <FaTiktok size={24} />
              </a>
              <a
                href={contacts_data?.instagram_account_link}
                className="text-gray-400 hover:text-orange-500 transition"
              >
                <Instagram size={24} />
              </a>

              <a
                href={`https://wa.me/${contacts_data?.phone_number}`}
                className="text-gray-400 hover:text-orange-500 transition"
              >
                <FaWhatsapp className='text-green-500 hover:text-green-600' size={24} />
              </a>

            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-orange-500 font-semibold text-lg">تواصل معنا</h3>
            <p className="text-gray-400">البريد الإلكتروني: {contacts_data?.email}</p>
            <p className="text-gray-400">الهاتف: {contacts_data?.phone_number}</p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Source Media Agency. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;