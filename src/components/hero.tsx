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
      <div className="px-6 lg:px-10">
        {/* Top Section - Brand Name & Description */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16 mb-12">
          {/* Large Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-shrink-0"
          >
            <h1 className="flex items-start">
              <span className="text-[clamp(4rem,15vw,12rem)] font-medium tracking-tight leading-[0.85] text-foreground">
                {hero.brandName}
              </span>
              <span className="text-[clamp(1.5rem,4vw,3rem)] font-normal mt-2 lg:mt-4 ml-1">
                {hero.brandMark}
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-sm md:text-base text-muted-foreground max-w-xs lg:max-w-[240px] lg:text-right lg:mt-4"
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
          {/* Client Logos */}
          <div className="flex items-center gap-6 md:gap-10">
            {hero.clients.logos.map((client, index) => {
              const IconComponent = iconMap[client.icon] || Camera
              return (
                <motion.div
                  key={client.name}
                  variants={logoItem}
                  className="flex items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                >
                  <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="hidden md:inline text-xs font-medium uppercase tracking-wider">
                    {client.name}
                  </span>
                </motion.div>
              )
            })}
          </div>

          {/* Rating Badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex-shrink-0 text-right"
          >
            <div className="flex items-center gap-1 justify-end mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 fill-foreground text-foreground"
                />
              ))}
              <span className="text-sm font-medium ml-1">{hero.clients.rating}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {hero.clients.trustText}{" "}
              <span className="font-semibold text-foreground">
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
          <div className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9] w-full rounded-t-3xl overflow-hidden bg-muted">
            <Image
              src={hero.image}
              alt="Hero portrait"
              fill
              className="object-cover grayscale"
              priority
              unoptimized
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
