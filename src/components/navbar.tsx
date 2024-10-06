'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, BookOpen, Briefcase, Users, HelpCircle, Presentation, GraduationCap, UserPlus, HeartHandshake, BookOpenCheck, Newspaper } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useInView } from 'react-intersection-observer'
import { toast } from "../hooks/use-toast"

export default function Navbar() {
const [isMenuOpen, setIsMenuOpen] = useState(false)
const [scrollPosition, setScrollPosition] = useState(0)
const [activeMenuItem, setActiveMenuItem] = useState<number | null>(null)
const [email, setEmail] = useState('')
const [showBackToTop, setShowBackToTop] = useState(false)
const [isHovered, setIsHovered] = useState(false)
const [showJoinOptions, setShowJoinOptions] = useState(false)
const joinButtonRef = useRef<HTMLDivElement>(null)
const { ref, inView } = useInView({
  threshold: 0.1,
  triggerOnce: true,
})

const menuItems = [
  {
    title: 'Resource Hub',
    icon: <BookOpen className="w-5 h-5" />,
    submenu: [
      { 
        title: 'Business News & Updates',
        description: 'Access to the latest industry news and trends.',
        link: '/resources/news-updates'
      },
      {
        title: 'Admissions',
        description: 'Information and resources for business school admissions.',
        link: '/resources/admissions'
      },
      { 
        title: 'Course Syllabi',
        description: 'A searchable database of syllabi from various business programs.',
        link: '/resources/course-syllabi'
      },
      { 
        title: 'Past Examination Papers',
        description: 'Archive of past exam papers for exam preparation.',
        link: '/resources/past-papers'
      },
      {
        title: 'Find Business School and University',
        description: 'Explore and compare business schools and universities.',
        link: '/resources/find-schools'
      },
    ],
  },
  {
    title: 'Career Listings',
    icon: <Briefcase className="w-5 h-5" />,
    submenu: [
      { 
        title: 'Internships',
        description: 'Unlock Your Future with Internships',
        link: '/career-listings/internships'
      },
      { 
        title: 'Entry-Level Jobs',
        description: 'Kickstart Your Career with Entry-Level Opportunities',
        link: '/career-listings/entry-level-jobs'
      },
      { 
        title: 'Walk-In Recruitment',
        description: 'Seize Opportunities with Walk-In Recruitment Events',
        link: '/career-listings/walk-in-recruitment'
      },
      { 
        title: 'Career-Oriented Programs',
        description: 'Enhance Your Career Readiness',
        link: '/career-listings/career-programs'
      },
      { 
        title: 'Government Jobs',
        description: 'Explore Government Job Opportunities',
        link: '/career-listings/government-jobs'
      },
    ],
  },
  {
    title: 'Workshops',
    icon: <Presentation className="w-5 h-5" />,
    submenu: [
      { 
        title: 'Upcoming Workshops',
        description: 'List of scheduled workshops with dates, times, and topics.',
        link: '/workshops/upcoming'
      },
      { 
        title: 'Workshop Archive',
        description: 'Access to recorded sessions for those unable to attend live.',
        link: '/workshops/archive'
      },
    ],
  },
  {
    title: 'Networking',
    icon: <Users className="w-5 h-5" />,
    submenu: [
      { 
        title: 'Upcoming Events',
        description: 'Calendar of networking events, webinars, and speaker series.',
        link: '/networking/events'
      },
      { 
        title: 'Virtual Meetups',
        description: 'Information on scheduled virtual networking sessions.',
        link: '/networking/virtual-meetups'
      },
      { 
        title: 'Networking Tips',
        description: 'Resources and articles on effective networking strategies.',
        link: '/networking/tips'
      },
    ],
  },
  {
    title: 'Courses',
    icon: <BookOpenCheck className="w-5 h-5" />,
    link: '/courses'
  },
  {
    title: 'Blogs',
    icon: <Newspaper className="w-5 h-5" />,
    link: '/blogs'
  },
  { title: 'About Us', icon: <Users className="w-5 h-5" />, link: '/about-us' },
  { title: 'FAQ', icon: <HelpCircle className="w-5 h-5" />, link: '/faq' },
]

useEffect(() => {
  const handleScroll = () => {
    setScrollPosition(window.pageYOffset)
    setShowBackToTop(window.pageYOffset > 300)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (joinButtonRef.current && !joinButtonRef.current.contains(event.target as Node)) {
      setShowJoinOptions(false)
    }
  }
  document.addEventListener('mousedown', handleClickOutside)
  return () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
}, [joinButtonRef])

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const handleSubscribe = (e: React.FormEvent) => {
  e.preventDefault()
  // Handle subscription logic here
  console.log('Subscribed:', email)
  toast({
    title: "Subscribed!",
    description: "You've successfully subscribed to our newsletter.",
  })
  setEmail('')
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

return (
  <div className="min-h-screen bg-white flex flex-col">
    {/* Header Section */}
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      scrollPosition > 50
        ? 'bg-white shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative">
            <Image
              src="https://intend-career-new-bucket.s3.ap-south-1.amazonaws.com/Intend+career+logo+(1).png"
              alt="Intend Career Logo"
              width={200}
              height={80}
              className="w-auto h-12"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.submenu ? (
                  <button
                    className={`flex items-center space-x-1 text-gray-700 hover:text-[#2581f3] transition-all duration-300 px-3 py-2 rounded-full ${
                      activeMenuItem === index ? 'bg-gray-100' : 'hover:bg-gray-100'
                    }`}
                    onMouseEnter={() => setActiveMenuItem(index)}
                    onMouseLeave={() => setActiveMenuItem(null)}
                  >
                    <span>{item.icon}</span>
                    <span className="text-sm font-medium">{item.title}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                      activeMenuItem === index ? 'rotate-180' : ''
                    }`} />
                  </button>
                ) : (
                  <Link
                    href={item.link}
                    className="flex items-center space-x-1 text-gray-700 hover:text-[#2581f3] transition-all duration-300 px-3 py-2 rounded-full hover:bg-gray-100"
                  >
                    <span>{item.icon}</span>
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                )}
                {item.submenu && (
                  <div
                    className={`absolute left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform ${
                      activeMenuItem === index ? 'translate-y-0' : 'translate-y-2'
                    }`}
                    onMouseEnter={() => setActiveMenuItem(index)}
                    onMouseLeave={() => setActiveMenuItem(null)}
                  >
                    <div className="bg-white rounded-lg shadow-lg p-4 grid gap-2">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.link}
                          className="text-sm text-gray-700 hover:text-[#2581f3] transition-colors duration-300 flex flex-col space-y-1 p-2 rounded-md hover:bg-gray-100"
                        >
                          <span className="font-semibold">{subItem.title}</span>
                          <span className="text-xs text-gray-500">{subItem.description}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <div className="relative" ref={joinButtonRef}>
              <Button 
                className="bg-[#2581f3] text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#2581f3]/30 relative overflow-hidden group"
                onClick={() => setShowJoinOptions(!showJoinOptions)}
              >
                <span className="relative z-10 flex items-center">
                  Join our community
                  <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-300 ${showJoinOptions ? 'rotate-180' : ''}`} />
                </span>
                <span className="absolute inset-0 bg-[#0a274c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
              <AnimatePresence>
                {showJoinOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-2 z-50"
                  >
                    <Link href="/join/student" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 group">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium">As Student</div>
                        <div className="text-xs text-gray-500">Join our learning community</div>
                      </div>
                    </Link>
                    <Link href="/join/mentor" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 group mt-1">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                        <UserPlus className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium">As Mentor</div>
                        <div className="text-xs text-gray-500">Share your expertise</div>
                      </div>
                    </Link>
                    <Link href="/join/volunteer" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 group mt-1">
                      <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition-colors duration-200">
                        <HeartHandshake className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium">As Volunteer</div>
                        <div className="text-xs text-gray-500">Support our community</div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            className="lg:hidden text-gray-700 hover:text-[#2581f3] transition-colors duration-300 p-2 rounded-full hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <nav className="mt-4 space-y-2 bg-white rounded-lg p-4 shadow-lg">
                {menuItems.map((item, index) => (
                  <div key={index} className="group">
                    {item.submenu ? (
                      <>
                        <button className="flex items-center justify-between w-full text-left text-gray-700 hover:text-[#2581f3] transition-colors duration-300 py-2 px-4 rounded-md hover:bg-gray-100">
                          <span className="flex items-center space-x-2">
                            <span>{item.icon}</span>
                            <span className="text-sm font-medium">{item.title}</span>
                          </span>
                          <ChevronDown className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-300" />
                        </button>
                        <div className="pl-8 mt-2 space-y-2 max-h-0 opacity-0 group-hover:max-h-screen group-hover:opacity-100 transition-all duration-300 ease-in-out">
                          {item.submenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.link}
                              className="block text-sm text-gray-700 hover:text-[#2581f3] transition-colors duration-300 py-1 px-4 rounded-md hover:bg-gray-100"
                            >
                              <span className="font-semibold">{subItem.title}</span>
                              <span className="text-xs text-gray-500 block">{subItem.description}</span>
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.link}
                        className="flex items-center justify-between w-full text-left text-gray-700 hover:text-[#2581f3] transition-colors duration-300 py-2 px-4 rounded-md hover:bg-gray-100"
                      >
                        <span className="flex items-center space-x-2">
                          <span>{item.icon}</span>
                          <span className="text-sm font-medium">{item.title}</span>
                        </span>
                      </Link>
                    )}
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button 
                    className="w-full bg-[#2581f3] text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#2581f3]/30 relative overflow-hidden group"
                    onClick={() => setShowJoinOptions(!showJoinOptions)}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Join our community
                      <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-300 ${showJoinOptions ? 'rotate-180' : ''}`} />
                    </span>
                    <span className="absolute inset-0 bg-[#0a274c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                  <AnimatePresence>
                    {showJoinOptions && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 space-y-2"
                      >
                        <Link href="/join/student" className="flex items-center w-full px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 group">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                            <GraduationCap className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium">As Student</div>
                            <div className="text-xs text-gray-500">Join our learning community</div>
                          </div>
                        </Link>
                        <Link href="/join/mentor" className="flex items-center w-full px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 group">
                          <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                            <UserPlus className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium">As Mentor</div>
                            <div className="text-xs text-gray-500">Share your expertise</div>
                          </div>
                        </Link>
                        <Link href="/join/volunteer" className="flex items-center w-full px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 group">
                          <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition-colors duration-200">
                            <HeartHandshake className="w-6 h-6 text-yellow-600" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium">As Volunteer</div>
                            <div className="text-xs text-gray-500">Support our community</div>
                          </div>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>

    {/* Main content would go here */}

    {/* Footer and other sections would follow */}

  </div>
)
}