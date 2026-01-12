"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import placeholderData from "@/data/placeholder.json"

const { navbar } = placeholderData

// Animation variants
const menuVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

const staggerContainer = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
}

const menuItemVariants = {
  closed: { opacity: 0, y: 20 },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

const imageVariants = {
  closed: { opacity: 0, scale: 0.95 },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false)

  const closeMenu = () => setIsExpanded(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isExpanded])

  return (
    <>
      {/* Collapsed Navbar - Dark Bar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed max-w-lg top-0 left-0 right-0 z-50 transition-colors duration-300 mx-auto rounded-b-3xl ${isExpanded ? "bg-transparent" : "bg-primary-500"
          }`}
      >
        <nav className="flex items-center justify-between px-6 py-2">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-baseline gap-0 transition-colors duration-300 ${isExpanded ? "text-foreground" : "text-white"
              }`}
          >
            <span className="text-2xl font-medium tracking-tighter">
              {navbar.brandName}
            </span>
            <span className="text-xl align-super">{navbar.brandMark}</span>
          </Link>

          {/* Center/Right - Desktop Links (hidden when expanded) */}
          {/* <div
            className={`hidden md:flex items-center gap-8 transition-opacity duration-300 ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
          >
            {navbar.barLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div> */}

          {/* Right side: CTA + Menu Toggle */}
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              variant={"outline"}
              className={`hidden sm:flex rounded-full px-5 transition-all duration-300 tracking-tight ${isExpanded
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "bg-white text-black hover:bg-white/90"
                }`}
              asChild
            >
              <Link href={navbar.cta.href}>{navbar.cta.label}</Link>
            </Button>

            {/* Menu Toggle Button */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${isExpanded
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/10"
                }`}
              aria-label={isExpanded ? "Close menu" : "Open menu"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" strokeWidth={1.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Plus className="w-5 h-5" strokeWidth={1.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Expanded Menu Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-background"
          >
            {/* Menu Content */}
            <div className="h-full flex flex-col pt-20 pb-8 px-6 lg:px-10">
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-16 overflow-y-auto">
                {/* Left Side - Navigation Links */}
                <motion.nav
                  variants={staggerContainer}
                  initial="closed"
                  animate="open"
                  className="flex-1 lg:max-w-md"
                >
                  <ul className="space-y-0">
                    {navbar.menuLinks.map((link, index) => (
                      <motion.li
                        key={link.name}
                        variants={menuItemVariants}
                        className="border-b border-border/50"
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className="group flex items-center justify-between py-5 transition-colors hover:text-primary tracking-tight"
                        >
                          <span className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tighter">
                            {link.name}
                          </span>
                          <span className="text-sm text-muted-foreground font-mono tracking-tight">
                            ({link.number})
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.nav>

                {/* Right Side - Featured Image */}
                <motion.div
                  variants={imageVariants}
                  initial="closed"
                  animate="open"
                  className="hidden lg:flex flex-1 items-start justify-end"
                >
                  <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden ">
                    <Image
                      src={navbar.featured.image}
                      alt="Featured work"
                      fill
                      className="object-cover grayscale hover:grayscale-0"
                      unoptimized
                    />
                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      <p className="text-white/90 text-4xl font-medium tracking-tighter">
                        {navbar.featured.studioName}
                      </p>
                      <p className="text-white/70 text-xs tracking-tight">
                        {navbar.featured.copyright}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Footer Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-8 mt-auto"
              >
                {/* Contact Info */}
                <div className="space-y-1">
                  <p className="text-sm font-medium tracking-tight">{navbar.contact.email}</p>
                  <p className="text-sm text-muted-foreground tracking-tight">
                    {navbar.contact.phone}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-6">
                  {navbar.socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-tight"
                    >
                      {social.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
