"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Star, Camera, Aperture, ImageIcon, Eye, Frame, Focus } from "lucide-react"
import placeholderData from "@/data/placeholder.json"

const { hero } = placeholderData

// Map icon names to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  camera: Camera,
  aperture: Aperture,
  image: ImageIcon,
  eye: Eye,
  frame: Frame,
  focus: Focus,
}

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
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const logoItem = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export function Hero() {
  return (
    <section id="hero" className="relative bg-white pt-24 pb-0 overflow-hidden">
      <div className="px-4 lg:px-10">
        {/* Top Section - Brand Name & Description */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16 mb-12">
          {/* Large Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-shrink-0"
          >
            <h1 className="flex items-start">
              <span className="text-[6rem] md:text-[15rem] font-medium -tracking-[0.1em] leading-[0.85] text-foreground text-primary-700">
                {hero.brandName}
              </span>
              <span className="text-[clamp(2rem,4vw,5rem)] font-normal mt-2 lg:mt-4 ml-1">
                {hero.brandMark}
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-sm md:text-lg font-medium tracking-tighter text-muted-foreground max-w-xs lg:max-w-[350px] lg:text-right lg:mt-4"
          >
            {hero.description}
          </motion.p>
        </div>

        {/* Logo Cloud / Trust Bar */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex items-center justify-between gap-4 mb-8 overflow-x-auto pb-4"
        >
          {/* Rating Badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex-shrink-0"
          >
            <div className="flex items-center gap-1 justify-start mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 fill-foreground text-foreground"
                />
              ))}
              <span className="text-sm font-medium ml-1 tracking-tight">{hero.clients.rating}</span>
            </div>
            <p className="text-xs text-muted-foreground tracking-tight">
              {hero.clients.trustText}{" "}
              <span className="font-semibold text-foreground tracking-tight">
                {hero.clients.trustHighlight}
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full"
        >
          <div className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/7] w-full rounded-3xl overflow-hidden bg-muted">
            <Image
              src={hero.image}
              alt="Hero portrait"
              fill
              className="object-cover grayscale hover:grayscale-0"
              priority
              unoptimized
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
