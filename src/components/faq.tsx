"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Plus } from "lucide-react"
import placeholderData from "@/data/placeholder.json"

const { faq } = placeholderData

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
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// FAQ Item component
function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: typeof faq.items[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="border-b border-border/50 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-start justify-between gap-4 text-left group"
      >
        <span className="text-base tracking-tighter md:text-xl font-medium text-foreground group-hover:text-foreground/80 transition-colors">
          {index + 1}. {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex-shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center mt-0.5"
        >
          <Plus className="w-3.5 h-3.5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                opacity: { duration: 0.2, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                opacity: { duration: 0.15 },
              },
            }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm md:text-base text-muted-foreground leading-snug tracking-tight pr-10">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faq" className="py-20 md:py-28 lg:py-32 bg-white">
      <div className="px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex items-start justify-between mb-8 md:mb-12">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm text-muted-foreground"
          >
            {faq.sectionLabel}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm text-muted-foreground font-mono"
          >
            ({faq.sectionNumber})
          </motion.span>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Header Content */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[clamp(2rem,5vw,3.5rem)] text-primary-700 font-medium tracking-tighter leading-[1.15] mb-5"
            >
              {faq.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-sm md:text-base tracking-tight text-muted-foreground leading-relaxed mb-8 max-w-sm"
            >
              {faq.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link
                href={faq.cta.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:bg-muted/50 transition-colors text-sm font-medium"
              >
                {faq.cta.label}
                <Plus className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column - FAQ Accordion */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="rounded-2xl border border-border/50 bg-gray-100 overflow-hidden"
          >
            <div className="divide-y divide-border/50 m-1.5 bg-white rounded-xl">
              {faq.items.map((item, index) => (
                <div key={item.id} className="px-6">
                  <FAQItem
                    item={item}
                    index={index}
                    isOpen={openId === item.id}
                    onToggle={() => toggleItem(item.id)}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
