"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react"
import placeholderData from "@/data/placeholder.json"

const { testimonials } = placeholderData

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

const cardVariants = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// Star rating component
function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-white text-white" />
      ))}
    </div>
  )
}

// Video testimonial card
function VideoCard({ item }: { item: typeof testimonials.items[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      className="relative flex-shrink-0 w-[320px] md:w-[380px] h-[420px] md:h-[480px] rounded-2xl overflow-hidden group cursor-pointer"
    >
      {/* Background Image */}
      <Image
        src={item.videoThumbnail}
        alt={`${item.name} testimonial`}
        fill
        className="object-cover"
        unoptimized
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Top content - Stars and rating */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
        <StarRating count={item.rating} />
        <span className="text-white/90 text-sm font-medium">{item.ratingText}</span>
      </div>

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg"
        >
          <Play className="w-6 h-6 text-foreground fill-foreground ml-1" />
        </motion.div>
      </div>

      {/* Bottom content - Author info */}
      <div className="absolute bottom-5 left-5">
        <p className="text-white font-medium">{item.name}</p>
        <p className="text-white/70 text-xs tracking-widest uppercase">{item.role}</p>
      </div>
    </motion.div>
  )
}

// Text testimonial card
function TextCard({ item }: { item: typeof testimonials.items[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      className="flex-shrink-0 w-[300px] md:w-[340px] h-[420px] md:h-[480px] rounded-2xl bg-primary-800 p-6 flex flex-col"
    >
      {/* Top content - Stars and rating */}
      <div className="flex items-center justify-between mb-6">
        <StarRating count={item.rating} />
        <span className="text-white/70 text-sm">{item.ratingText}</span>
      </div>

      {/* Quote */}
      <blockquote className="text-white text-lg md:text-2xl leading-snug tracking-tight flex-1">
        "{item.quote}"
      </blockquote>

      {/* Bottom content - Author info */}
      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10">
          <Image
            src={item.avatar}
            alt={item.name}
            width={40}
            height={40}
            className="object-cover"
            unoptimized
          />
        </div>
        <div>
          <p className="text-white font-medium text-sm">{item.name}</p>
          <p className="text-white/60 text-xs tracking-widest uppercase">{item.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 360
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
      setTimeout(checkScrollButtons, 300)
    }
  }

  return (
    <section id="testimonials" className="py-16 bg-primary-950 mx-6 md:mx-10 rounded-3xl">
      <div className="px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex items-start justify-between mb-8 md:mb-12">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-white/60"
          >
            {testimonials.sectionLabel}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm text-white/60 font-mono"
          >
            ({testimonials.sectionNumber})
          </motion.span>
        </div>

        {/* Headline and Navigation */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-medium tracking-tighter leading-[1.15] text-white max-w-2xl"
          >
            {testimonials.headline}
          </motion.h2>

          {/* Navigation Arrows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-2"
          >
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${canScrollLeft
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-white/10 text-white/30 cursor-not-allowed"
                }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${canScrollRight
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-white/10 text-white/30 cursor-not-allowed"
                }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Testimonials Carousel */}
        <motion.div
          ref={scrollRef}
          onScroll={checkScrollButtons}
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 lg:-mx-10 lg:px-10"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollBehavior: "smooth",
          }}
        >
          {testimonials.items.map((item) =>
            item.type === "video" ? (
              <VideoCard key={item.id} item={item} />
            ) : (
              <TextCard key={item.id} item={item} />
            )
          )}
        </motion.div>
      </div>
    </section>
  )
}
