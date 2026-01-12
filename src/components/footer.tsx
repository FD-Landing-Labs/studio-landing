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
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
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
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
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
    <footer id="contact" className="bg-[#1a1a1a] pt-16 md:pt-24 lg:pt-32 pb-8">
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
            className="text-[clamp(3rem,12vw,10rem)] font-medium tracking-tight leading-[0.9] text-white"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 md:mb-20">
          {/* Left - Description & Contact */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-md"
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

          {/* Right - Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:max-w-sm lg:ml-auto"
          >
            <p className="text-white/70 text-sm mb-4">{footer.newsletter.title}</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={footer.newsletter.placeholder}
                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-white text-foreground rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                {footer.newsletter.buttonText}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Link Groups */}
            {footer.linkGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-3">
                {group.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            ))}

            {/* Credits */}
            <div className="space-y-2 text-right col-span-2 md:col-span-1">
              <p className="text-sm text-white/60">
                {footer.credits.designedIn}{" "}
                <span className="text-white">{footer.credits.tool}</span>{" "}
                {footer.credits.by}{" "}
                <span className="text-white">{footer.credits.author}</span>
              </p>
              <p className="text-sm text-white/60">{footer.copyright}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
