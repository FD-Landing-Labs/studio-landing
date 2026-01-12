"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"
import placeholderData from "@/data/placeholder.json"

const { works } = placeholderData

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const imageHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export function Works() {
  return (
    <section id="works" className="py-20 md:py-28 lg:py-32 bg-white">
      <div className="px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12 md:mb-16">
          {/* Left Side - Title & Description */}
          <div className="flex-1 max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[clamp(2.5rem,6vw,4rem)] font-medium tracking-tight leading-[1.1] mb-4"
            >
              {works.sectionTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-sm md:text-base text-muted-foreground max-w-sm"
            >
              {works.sectionDescription}
            </motion.p>
          </div>

          {/* Right Side - Section Number & Link */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-end gap-4"
          >
            <span className="text-sm text-muted-foreground font-mono">
              ({works.sectionNumber})
            </span>
            <Link
              href={works.viewAllLink.href}
              className="group flex items-center gap-2 text-sm font-medium hover:text-muted-foreground transition-colors"
            >
              {works.viewAllLink.label}
              <span className="flex items-center justify-center w-6 h-6 rounded-full border border-current transition-transform group-hover:rotate-90">
                <Plus className="w-3 h-3" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Works Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {works.items.map((work, index) => (
            <motion.article
              key={work.id}
              variants={cardVariants}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <motion.div
                initial="rest"
                whileHover="hover"
                className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted mb-4"
              >
                <motion.div variants={imageHover} className="absolute inset-0">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </motion.div>
              </motion.div>

              {/* Project Info */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold mb-1 group-hover:text-muted-foreground transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {work.category}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground font-mono">
                  {work.year}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
