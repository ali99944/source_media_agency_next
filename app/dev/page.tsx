import Image from "next/image";
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-100">
      {/* Hero Section */}
      <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px]">
        <Image
          src="https://img.freepik.com/free-photo/aerial-view-business-team_53876-124515.jpg?ga=GA1.1.259795667.1741285641&semt=ais_hybrid"
          alt="Wardiere Inc. Team"
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-800/90 to-transparent">
          <div className="container mx-auto px-4 py-12 h-full flex flex-col justify-between">
            <div>
              <h1 className="text-white text-3xl md:text-4xl font-semibold">Wardiere Inc.</h1>
              <p className="text-stone-300 mt-1">123 Anywhere St. Any City</p>
            </div>
            
            <div className="max-w-md">
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Company Profile
              </h2>
              <div className="w-16 h-1 bg-white mb-6"></div>
              <h3 className="text-white text-2xl md:text-3xl font-medium mb-8">
                Your Partner in Financial Success
              </h3>
              
              <div className="bg-stone-700/90 p-6 rounded-sm">
                <h4 className="text-stone-200 text-xl font-medium mb-4">Our Service</h4>
                <ul className="space-y-2 text-stone-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full"></span>
                    <span>Wealth Management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full"></span>
                    <span>Financial Planning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full"></span>
                    <span>Tax Advisory</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full"></span>
                    <span>Corporate Finance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full"></span>
                    <span>Risk Management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full"></span>
                    <span>Retirement Planning</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 bg-stone-100 p-6 rounded-sm">
                <h4 className="text-stone-800 text-xl font-medium mb-4">Why Choose Us</h4>
                <ul className="space-y-2 text-stone-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-stone-500 rounded-full"></span>
                    <span>Expert Team</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-stone-500 rounded-full"></span>
                    <span>Tailored Solutions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-stone-500 rounded-full"></span>
                    <span>Transparency</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* About & Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-stone-50 p-8 rounded-sm shadow-sm">
            <h3 className="text-stone-700 text-2xl font-medium mb-4">About Us</h3>
            <p className="text-stone-600 leading-relaxed">
              At Wardiere Inc., we are dedicated to providing comprehensive financial services 
              that empower individuals and businesses to achieve their financial goals. With a 
              team of experienced professionals, we offer personalized solutions to help you navigate 
              the complexities of the financial landscape with confidence.
            </p>
            <p className="text-stone-600 leading-relaxed mt-4">
              Contact us to schedule a consultation and start your journey towards financial success!
            </p>
          </div>
          
          <div className="bg-stone-700 p-8 rounded-sm shadow-sm">
            <h3 className="text-stone-100 text-2xl font-medium mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-stone-200">
                <Phone className="w-5 h-5" />
                <span>+123-456-7890</span>
              </div>
              <div className="flex items-center gap-3 text-stone-200">
                <Mail className="w-5 h-5" />
                <span>hello@reallygreatsite.com</span>
              </div>
              <div className="flex items-center gap-3 text-stone-200">
                <Globe className="w-5 h-5" />
                <span>www.reallygreatsite.com</span>
              </div>
              <div className="flex items-center gap-3 text-stone-200">
                <MapPin className="w-5 h-5" />
                <span>123 Anywhere St., Any City</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-stone-800 text-stone-300 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Wardiere Inc. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
