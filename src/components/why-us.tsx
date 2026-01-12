"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Plus, Star, Zap, Scissors, Clock, PlusCircle } from "lucide-react"
import placeholderData from "@/data/placeholder.json"

const { whyUs } = placeholderData

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  zap: Zap,
  scissors: Scissors,
  clock: Clock,
}

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
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function WhyUs() {
  return (
    <section id="why-us" className="py-20 md:py-28 lg:py-32 bg-white">
      <div className="px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex items-start justify-between mb-8 md:mb-12">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm text-muted-foreground tracking-tighter"
          >
            {whyUs.sectionLabel}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm text-muted-foreground font-mono tracking-tighter"
          >
            ({whyUs.sectionNumber})
          </motion.span>
        </div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[clamp(2rem,5vw,3.5rem)] font-medium tracking-tighter leading-[1] mb-12 md:mb-16 max-w-5xl"
        >
          {whyUs.headline.main}{" "}
          <span className="text-primary-500">{whyUs.headline.highlight}</span>
        </motion.h2>

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-gray-100 p-2 rounded-3xl"
        >
          {/* Card 1 - Featured Dark Card */}
          <motion.div variants={cardVariants} className="lg:row-span-2 flex flex-col">
            {/* Top part with image */}
            <div className="relative bg-[#1a1a1a]  rounded-2xl p-6 flex-1 flex flex-col min-h-[300px] overflow-hidden bg-[url('/assets/images/sky.jpg')] bg-cover bg-top grayscale hover:grayscale-0">
              <h3 className="text-white text-lg md:text-xl font-medium leading-tight mb-4 relative z-10 tracking-tighter">
                {whyUs.featuredCard.title}
              </h3>

              {/* Image */}
              <div className="relative flex-1 -mx-6 -mb-6 mt-auto">
                {/* Overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <span className="text-white/70 text-xs">© {whyUs.featuredCard.year}</span>
                  <Link
                    href={whyUs.featuredCard.cta.href}
                    className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white rounded-full text-sm font-medium text-foreground transition-colors tracking-tight"
                  >
                    {whyUs.featuredCard.cta.label}
                    <Plus className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bullet points below */}
            <div className="bg-gray-200 rounded-2xl p-5 mt-2">
              <ul className="space-y-3">
                {whyUs.featuredCard.bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-center gap-2 text-base font-medium tracking-tighter">
                    <div>
                      <PlusCircle className="w-3 h-3 text-primary-500" />
                    </div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 2 - Social Proof / Testimonial */}
          <motion.div variants={cardVariants} className="lg:row-span-2 flex flex-col gap-2">
            {/* Top - Avatars and rating */}
            <div className="bg-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex -space-x-2">
                  {whyUs.socialProof.avatars.map((avatar, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-muted"
                    >
                      <Image
                        src={avatar}
                        alt={`Client ${index + 1}`}
                        width={32}
                        height={32}
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-sm tracking-tight">
                  {whyUs.socialProof.rating}
                  <Star className="w-3 h-3 fill-foreground" />
                </div>
              </div>
              <p className="text-sm tracking-tight">
                <span className="font-semibold">{whyUs.socialProof.clientCount}</span>{" "}
                <span className="text-muted-foreground">{whyUs.socialProof.clientText}</span>
              </p>
            </div>

            {/* Bottom - Testimonial */}
            <div className="bg-[url('/assets/images/test.jpg')] bg-cover bg-bottom rounded-2xl p-5 flex-1 flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-foreground text-foreground" />
                ))}
              </div>
              <blockquote className="text-lg leading-6 flex-1 mb-4 tracking-tighter">
                {whyUs.socialProof.testimonial.quote}
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={whyUs.socialProof.testimonial.avatar}
                    alt={whyUs.socialProof.testimonial.author}
                    width={40}
                    height={40}
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-lg font-medium tracking-tighter">{whyUs.socialProof.testimonial.author}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{whyUs.socialProof.testimonial.role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Features Stack */}
          <motion.div variants={cardVariants} className="lg:row-span-2 flex flex-col gap-2">
            {whyUs.features.map((feature) => {
              const IconComponent = iconMap[feature.icon] || Zap
              return (
                <div
                  key={feature.id}
                  className="bg-gray-200 rounded-2xl p-5 flex-1 hover:bg-gray-300 transition-colors"
                >
                  <IconComponent className="w-5 h-5 mb-3 text-foreground" />
                  <h4 className="font-semibold text-xl mb-2 tracking-tight text-primary-700">{feature.title}</h4>
                  <p className="text-base font-medium text-muted-foreground leading-tight tracking-tight">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </motion.div>

          {/* Card 4 - Brand Card */}
          <motion.div
            variants={cardVariants}
            className="lg:row-span-2 relative bg-[#2a2a2a] rounded-2xl overflow-hidden min-h-[400px] lg:min-h-0"
          >
            {/* Background Image */}
            <Image
              src={whyUs.brandCard.image}
              alt="Brand visual"
              fill
              className="object-cover grayscale"
              unoptimized
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <span className="text-white/80 text-sm font-medium tracking-tight">
                {whyUs.brandCard.brandName}
              </span>
              <div>
                <h3 className="text-white text-xl md:text-2xl font-medium mb-1 tracking-tight">
                  {whyUs.brandCard.headline}
                </h3>
                <p className="text-white/70 text-sm tracking-tight">
                  {whyUs.brandCard.tagline}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
