"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import placeholderData from "@/data/placeholder.json"

const { footer } = placeholderData

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const letterVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  // Split brand name for letter animation
  const brandText = `${footer.brand.name}${footer.brand.brandMark} ${footer.brand.tagline}`

  return (
    <footer id="contact" className="bg-primary-950 pt-8 md:pt-24 lg:pt-32 pb-8 rounded-t-3xl">
      <div className="px-6 lg:px-10">
        {/* Large Brand Name */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 md:mb-16 overflow-hidden"
        >
          <motion.h2
            variants={staggerContainer}
            className="text-5xl md:text-[clamp(3rem,18vw,14rem)] font-medium -tracking-[0.1em] leading-[0.9] text-primary-400"
          >
            {brandText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>

        {/* Middle Section - Description, Contact & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 ">
          {/* Left - Description & Contact */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/70 text-base md:text-lg leading-tight tracking-tighter mb-8 max-w-lg"
            >
              {footer.description.text}{" "}
              <span className="text-white font-medium">{footer.description.highlight}</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-1"
            >
              <a
                href={`mailto:${footer.contact.email}`}
                className="block text-white font-medium text-lg hover:text-white/80 transition-colors"
              >
                {footer.contact.email}
              </a>
              <a
                href={`tel:${footer.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="block text-white/70 hover:text-white transition-colors"
              >
                {footer.contact.phone}
              </a>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className=""
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              {/* Link Groups */}
              {footer.linkGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="space-y-2">
                  {group.links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block text-sm font-medium text-white/60 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>


      </div>
    </footer>
  )
}
