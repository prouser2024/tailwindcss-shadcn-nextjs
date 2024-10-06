'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, BookOpen, Briefcase, Users, HelpCircle, Search, Presentation, Library, Mic2, Network, GraduationCap, UserPlus, Newspaper, FileText, Globe, MessageSquare, ThumbsUp, ArrowRight, Mail, Phone, MapPin, ChevronUp, Facebook, Linkedin, Twitter, Instagram, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useInView } from 'react-intersection-observer'
import { Toast } from "@/components/ui/toast"
import { toast } from "@/hooks/use-toast"
import { FaqSection } from "@/components/faq-section"
import Navbar from './navbar'

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activeMenuItem, setActiveMenuItem] = useState<number | null>(null)
  const [email, setEmail] = useState('')
  const [activeFeature, setActiveFeature] = useState('')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const menuItems = [
    {
      title: 'Resources',
      icon: <BookOpen className="w-5 h-5" />,
      submenu: [
        { 
          title: 'Business News & Updates',
          description: 'Access to the latest industry news and trends.',
          link: '/resources/news-updates'
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
        { 
          title: 'Registration Page',
          description: 'Easy sign-up process for upcoming workshops.',
          link: '/workshops/register'
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
    { title: 'About Us', icon: <Users className="w-5 h-5" />, link: '/about-us' },
    { title: 'FAQ', icon: <HelpCircle className="w-5 h-5" />, link: '/faq' },
  ]

  const benefits = [
    {
      title: "Comprehensive Resource Hub",
      description: "Access a centralized library featuring the latest business news, course syllabi, and past examination papers.",
      icon: <Library className="w-10 h-10" />,
      features: ["Weekly newsletters", "Searchable database", "User contributions"],
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: "Interactive Skill-Building Workshops",
      description: "Participate in monthly workshops covering essential skills like public speaking, financial analysis, and digital marketing.",
      icon: <Mic2 className="w-10 h-10" />,
      features: ["Hands-on learning", "Expert instructors", "Recorded sessions"],
      gradient: "from-green-400 to-green-600",
    },
    {
      title: "Exclusive Networking Opportunities",
      description: "Connect with fellow students, alumni, and industry professionals through tailored networking events.",
      icon: <Network className="w-10 h-10" />,
      features: ["Virtual meetups", "Discussion rooms", "Professional connections"],
      gradient: "from-purple-400 to-purple-600",
    },
    {
      title: "Career Readiness Support",
      description: "Access a dedicated job board featuring internships, entry-level positions, and career-oriented programs.",
      icon: <GraduationCap className="w-10 h-10" />,
      features: ["Updated job listings", "Employer video pitches", "Resume workshops"],
      gradient: "from-orange-400 to-orange-600",
    },
    {
      title: "Guidance from Experienced Mentors",
      description: "Participate in structured mentorship programs that connect you with seasoned professionals in your field.",
      icon: <UserPlus className="w-10 h-10" />,
      features: ["Mentor matching", "Progress tracking", "Industry resources"],
      gradient: "from-pink-400 to-pink-600",
    },
  ]

  const keyFeatures = [
    {
      title: "Resource Hub",
      icon: <Library className="w-6 h-6 md:w-8 md:h-8" />,
      color: "from-blue-400 to-blue-600",
      features: [
        {
          title: "Business News & Updates",
          description: "Stay informed with curated industry insights and trends.",
          icon: <Newspaper className="w-5 h-5 md:w-6 md:h-6" />,
        },
        {
          title: "Admissions Guide",
          description: "Navigate business school applications with expert advice.",
          icon: <FileText className="w-5 h-5 md:w-6 md:h-6" />,
        },
        {
          title: "Academic Materials",
          description: "Access a rich library of syllabi and past papers.",
          icon: <BookOpen className="w-5 h-5 md:w-6 md:h-6" />,
        },
      ]
    },
    {
      title: "Learning Hub",
      icon: <Presentation className="w-6 h-6 md:w-8 md:h-8" />,
      color: "from-blue-400 to-blue-600",
      features: [
        {
          title: "Expert Articles",
          description: "Gain insights from thought leaders in various business domains.",
          icon: <Newspaper className="w-5 h-5 md:w-6 md:h-6" />,
        },
        {
          title: "Interactive Workshops",
          description: "Enhance your skills through hands-on learning experiences.",
          icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
        },
      ]
    },
    {
      title: "Network Central",
      icon: <Network className="w-6 h-6 md:w-8 md:h-8" />,
      color: "from-blue-400 to-blue-600",
      features: [
        {
          title: "Industry Webinars",
          description: "Learn from top executives and expand your knowledge base.",
          icon: <Mic2 className="w-5 h-5 md:w-6 md:h-6" />,
        },
        {
          title: "Peer Connect Events",
          description: "Build lasting relationships with future business leaders.",
          icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
        },
      ]
    },
    {
      title: "Career Launchpad",
      icon: <Briefcase className="w-6 h-6 md:w-8 md:h-8" />,
      color: "from-blue-400 to-blue-600",
      features: [
        {
          title: "Opportunity Board",
          description: "Discover internships and jobs tailored for business students.",
          icon: <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />,
        },
        {
          title: "Mentor Match",
          description: "Get personalized guidance from industry professionals.",
          icon: <UserPlus className="w-5 h-5 md:w-6 md:h-6" />,
        },
        {
          title: "Career Toolkit",
          description: "Access cutting-edge tools for resume building and interview prep.",
          icon: <FileText className="w-5 h-5 md:w-6 md:h-6" />,
        },
      ]
    },
    {
      title: "Community Hub",
      icon: <MessageSquare className="w-6 h-6 md:w-8 md:h-8" />,
      color: "from-blue-400 to-blue-600",
      features: [
        {
          title: "Idea Exchange",
          description: "Engage in thought-provoking discussions with peers.",
          icon: <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />,
        },
        {
          title: "Community Voice",
          description: "Shape the future of our platform with your feedback.",
          icon: <ThumbsUp className="w-5 h-5 md:w-6 md:h-6" />,
        },
      ]
    },
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
    if (keyFeatures.length > 0 && !activeFeature) {
      setActiveFeature(keyFeatures[0].title)
    }
  }, [keyFeatures])

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

            <div className="hidden lg:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-[#2581f3] transition-colors duration-300 p-2 rounded-full hover:bg-gray-100">
                <Search className="w-5 h-5" />
              </button>
              <Button className="bg-[#2581f3] text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#2581f3]/30 relative overflow-hidden group">
                <span className="relative z-10">Join our community</span>
                <span className="absolute inset-0 bg-[#0a274c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
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
                    <Button className="w-full bg-[#2581f3] text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#2581f3]/30 relative overflow-hidden group">
                      <span className="relative z-10">Join our community</span>
                      <span className="absolute inset-0 bg-[#0a274c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden pt-20 lg:pt-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5 bg-repeat"></div>
          <div className="container mx-auto px-4 lg:min-h-screen flex flex-col lg:flex-row items-center justify-center relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="w-full lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left mb-10 lg:mb-0"
            >
              <motion.h2 variants={fadeInUpVariants} className="text-lg font-semibold uppercase tracking-wider text-[#2581f3]">
                Empower Your Business Education Journey
              </motion.h2>
              <motion.h1 variants={fadeInUpVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Join a Thriving Community of Future Business Leaders
              </motion.h1>
              <motion.p variants={fadeInUpVariants} className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Access essential resources, develop crucial skills, and connect with industry leaders—all in one community.
              </motion.p>
              <motion.div variants={fadeInUpVariants} className="flex justify-center lg:justify-start">
                <Button size="lg" className="bg-[#2581f3] text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#2581f3]/30 relative overflow-hidden group">
                  <span className="relative z-10">Join Now for Free</span>
                  <span className="absolute inset-0 bg-[#0a274c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative w-full h-[400px] lg:h-[600px] xl:h-[700px]">
                <Image
                  src="https://intend-career-new-bucket.s3.ap-south-1.amazonaws.com/advertiseperson.png"
                  alt="Successful business professional giving thumbs up"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full text-white" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 36.7C840 27 960 13 1080 16.7C1200 20 1320 40 1380 50L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="currentColor"/>
            </svg>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={fadeInUpVariants}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you're seeking the latest business insights, skill-building workshops, or professional networking opportunities, our community is dedicated to supporting your educational journey.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Our Community Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
          <div className="absolute inset-0 bg-opacity-50 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5"/>
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect width="100" height="100" fill="url(#smallGrid)"/>
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
                </pattern>
                <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.5)"/>
                  <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)"/>
              <rect width="100%" height="100%" fill="url(#fadeGradient)"/>
            </svg>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={staggerChildren}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUpVariants} className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Community?</motion.h2>
              <motion.p variants={fadeInUpVariants} className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join a thriving ecosystem designed to propel your business education and career to new heights.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.8 }}
                  variants={fadeInUpVariants}
                  custom={index}
                >
                  <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-none overflow-hidden group">
                    <div className={`h-2 bg-gradient-to-r ${benefit.gradient}`}></div>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className={`mr-4 p-3 bg-gradient-to-br ${benefit.gradient} rounded-full text-white transition-all duration-300 group-hover:scale-110`}>
                          {benefit.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{benefit.description}</p>
                      <ul className="space-y-2">
                        {benefit.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center text-sm text-gray-500">
                            <ChevronDown className="w-4 h-4 mr-2 text-[#2581f3]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={fadeInUpVariants}
              className="mt-16 text-center"
            >
              <Button size="lg" className="bg-gradient-to-r from-[#2581f3] to-[#1a4fa8] text-white hover:from-[#1a4fa8] hover:to-[#2581f3] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Join Our Community Today
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={staggerChildren}
              className="text-center mb-12 md:mb-16"
            >
              <motion.h2 variants={fadeInUpVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Unlock Your Potential</motion.h2>
              <motion.p variants={fadeInUpVariants} className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the cutting-edge tools and resources that will catapult your business education and career to new heights.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 xl:col-span-3">
                <div className="lg:sticky lg:top-24 space-y-2 md:space-y-3">
                  {keyFeatures.map((feature, index) => (
                    <motion.button
                      key={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.8 }}
                      variants={fadeInUpVariants}
                      custom={index}
                      onClick={() => setActiveFeature(feature.title)}
                      className={`w-full text-left p-3 md:p-4 rounded-lg transition-all duration-300 ${
                        activeFeature === feature.title
                          ? `bg-gradient-to-r ${feature.color} text-white shadow-lg transform scale-105`
                          : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`${activeFeature === feature.title ? 'text-white' : 'text-gray-500'}`}>
                          {feature.icon}
                        </div>
                        <span className="text-base md:text-lg font-semibold">{feature.title}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-8 xl:col-span-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid gap-4 md:gap-6 md:grid-cols-2"
                  >
                    {keyFeatures.find(f => f.title === activeFeature)?.features.map((subFeature, index) => (
                      <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                        <CardContent className="p-4 md:p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 p-2 md:p-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full transition-all duration-300 group-hover:scale-110">
                              {subFeature.icon}
                            </div>
                            <div>
                              <h3 className="text-lg md:text-xl font-semibold mb-2">{subFeature.title}</h3>
                              <p className="text-sm md:text-base text-gray-600">{subFeature.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action (CTA) Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={staggerChildren}
              className="relative z-10 max-w-5xl mx-auto text-center"
            >
              <div className="absolute inset-0 -z-10 bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl transform -skew-y-6 scale-110"></div>
              <div className="relative z-10 p-8 md:p-12 lg:p-16">
                <motion.h2
                  variants={fadeInUpVariants}
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Ready to Take the Next Step?
                </motion.h2>
                <motion.p
                  variants={fadeInUpVariants}
                  className="text-xl md:text-2xl text-gray-700 mb-8"
                >
                  Join Our Collaborative Business Education Community Today!
                </motion.p>
                <motion.div
                  variants={fadeInUpVariants}
                  className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
                >
                  <Button
                    size="lg"
                    className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span className="mr-2">Join Now for Free!</span>
                    <motion.div
                      animate={{ x: isHovered ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </Button>
                  <span className="text-gray-500 md:text-lg">or</span>
                  <div className="w-full md:w-auto max-w-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Subscribe for Updates</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Stay informed about upcoming workshops, events, and resources.
                    </p>
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-grow">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                        />
                      </div>
                      <Button type="submit" variant="outline" className="w-full sm:w-auto group bg-white hover:bg-gray-50">
                        <span>Subscribe</span>
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
              <defs>
                <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                  <path d="M100 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
                <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" strokeWidth="0" />
              </svg>
              <rect width="100%" height="100%" strokeWidth="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
            </svg>
          </div>
        </section>

        {/* FAQ Section */}
        <FaqSection />
        {/* Removed Newsletter Section */}
      </main>

      {/* Footer */}
      <footer ref={ref} className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
          >
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Quick Links</h3>
              <ul className="space-y-3">
                {['Resources', 'Career Listings', 'Workshops', 'Networking', 'About Us', 'FAQ'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-400 transition-colors duration-200 flex items-center">
                      <ArrowRight size={16} className="mr-2" />
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Connect With Us</h3>
              <div className="flex space-x-4">
                {[
                  { icon: <Facebook />, href: '#', label: 'Facebook', color: 'hover:text-blue-500' },
                  { icon: <Linkedin />, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' },
                  { icon: <Twitter />, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
                  { icon: <Instagram />, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`${social.color} transition-colors duration-200`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div>
              <h3 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Stay Updated</h3>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-full"
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 rounded-full">
                  Subscribe Now
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Contact Us</h3>
              <ul className="space-y-3">
                <motion.li whileHover={{ x: 5 }} className="flex items-center">
                  <Mail className="mr-2 text-blue-400" size={18} />
                  <a href="mailto:info@businesscommunity.com" className="hover:text-blue-400 transition-colors duration-200">
                    info@businesscommunity.com
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="flex items-center">
                  <Phone className="mr-2 text-blue-400" size={18} />
                  <a href="tel:+11234567890" className="hover:text-blue-400 transition-colors duration-200">
                    +1 (123) 456-7890
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="flex items-start">
                  <MapPin className="mr-2 mt-1 text-blue-400" size={18} />
                  <span>123 Business Lane, Suite 100, City, State, ZIP</span>
                </motion.li>
              </ul>
            </div>
          </motion.div>

          <Separator className="my-8 bg-gray-700" />

          {/* Legal Links and CTA */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start space-x-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-sm hover:text-blue-400 transition-colors duration-200">
                  {item}
                </Link>
              ))}
            </div>

            {/* Call to Action Reinforcement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <p className="text-sm font-medium">Join our community today!</p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 rounded-full text-sm">
                Get Started
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </motion.div>
          </div>

          {/* Copyright */}
          <p className="text-center text-gray-400 mt-8 text-sm">
            &copy; {new Date().getFullYear()} IntendCareer. All rights reserved.
          </p>
        </div>

        {/* Decorative background */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>
          <svg className="absolute bottom-0 left-0 right-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="currentColor" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              aria-label="Back to top"
            >
              <ChevronUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </footer>
    </div>
  )
}