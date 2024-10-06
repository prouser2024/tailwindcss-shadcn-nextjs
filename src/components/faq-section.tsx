'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "What is IntendCareer and how can it benefit me?",
    answer: "IntendCareer is a comprehensive platform designed to support business students and professionals in their educational and career journeys. We offer resources like industry news, course materials, networking opportunities, and career support. By joining our community, you'll have access to valuable tools and connections that can help accelerate your professional growth."
  },
  {
    question: "Is membership free? What are the costs associated with using IntendCareer?",
    answer: "Basic membership to IntendCareer is free, giving you access to our community forums, select resources, and job listings. We also offer premium memberships with additional benefits such as exclusive workshops, one-on-one mentoring, and advanced career tools. Pricing for premium features varies, and we offer student discounts. Check our pricing page for current rates and special offers."
  },
  {
    question: "How often are new resources and job listings added to the platform?",
    answer: "We update our resources, including industry news and job listings, on a daily basis. New workshops and networking events are typically added on a weekly or monthly basis, depending on the type of event. Our team works diligently to ensure that you always have access to the most current and relevant information in the business world."
  },
  {
    question: "Can I contribute content or host a workshop on IntendCareer?",
    answer: "We encourage community contributions. If you're an expert in your field or have valuable insights to share, you can submit articles, resources, or proposals for workshops through our 'Contribute' page. Our team reviews all submissions to ensure quality and relevance before publishing."
  },
  {
    question: "How does the mentorship program work?",
    answer: "Our mentorship program connects students and early-career professionals with experienced industry leaders. To participate, create a profile highlighting your goals and areas of interest. Our algorithm will match you with potential mentors. You can then schedule virtual meetings, seek advice, and build a professional relationship. The program duration varies, but typically lasts for 3-6 months."
  },
  {
    question: "What types of networking events does IntendCareer offer?",
    answer: "We offer a variety of networking events, including virtual meetups, industry-specific webinars, career fairs, and local in-person gatherings (where available). These events range from casual networking sessions to formal panel discussions with industry leaders. Check our 'Events' page regularly for upcoming opportunities to connect with peers and professionals in your field."
  }
]

export function FaqSection() {
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

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={staggerChildren}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2 variants={fadeInUpVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</motion.h2>
          <motion.p variants={fadeInUpVariants} className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our community and services.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={staggerChildren}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <motion.div key={index} variants={fadeInUpVariants} custom={index}>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <span className="text-lg font-semibold text-gray-800">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}