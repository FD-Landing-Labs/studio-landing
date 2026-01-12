"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Check } from "lucide-react"
import Link from "next/link"
import placeholderData from "@/data/placeholder.json"

const { pricing } = placeholderData

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function Pricing() {
  const [activeTab, setActiveTab] = useState<"monthly" | "project">("monthly")
  const [addOnEnabled, setAddOnEnabled] = useState(false)

  const currentPlan = activeTab === "monthly" ? pricing.plans.monthly : pricing.plans.project

  return (
    <section id="pricing" className="py-20 md:py-28 lg:py-32 bg-white">
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
              {pricing.sectionTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-sm md:text-base text-muted-foreground max-w-sm"
            >
              {pricing.sectionDescription}
            </motion.p>
          </div>

          {/* Right Side - Section Number */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-end gap-4"
          >
            <span className="text-sm text-muted-foreground font-mono">
              ({pricing.sectionNumber})
            </span>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2 mb-8"
        >
          {pricing.tabs.map((tab, index) => {
            const tabKey = index === 0 ? "monthly" : "project"
            const isActive = activeTab === tabKey
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tabKey as "monthly" | "project")}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-foreground text-white"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                {tab}
              </button>
            )
          })}
        </motion.div>

        {/* Pricing Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-lg"
          >
            {/* Left Side - White */}
            <div className="bg-white p-8 md:p-10 lg:p-12 border border-border/50 rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
              {/* Label */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">{currentPlan.label}</span>
                <span className="text-sm font-medium">{currentPlan.brandName}</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-[clamp(3rem,8vw,5rem)] font-medium tracking-tight leading-none">
                    ${currentPlan.price.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground text-lg">{currentPlan.period}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
                {currentPlan.description}
              </p>

              {/* Add-on Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAddOnEnabled(!addOnEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      addOnEnabled ? "bg-foreground" : "bg-muted-foreground/30"
                    }`}
                  >
                    <motion.div
                      animate={{ x: addOnEnabled ? 24 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </button>
                  <div>
                    <p className="text-sm font-medium">{currentPlan.addOn.label}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold">+${currentPlan.addOn.price}</span>
                  <span className="text-sm text-muted-foreground">{currentPlan.addOn.period}</span>
                </div>
              </div>
            </div>

            {/* Right Side - Dark */}
            <div className="bg-[#1a1a1a] p-8 md:p-10 lg:p-12 rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none flex flex-col">
              {/* Features List */}
              <ul className="space-y-4 flex-1 mb-8">
                {currentPlan.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/90 text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Delivery Time */}
              <div className="flex items-center justify-between text-white/70 text-sm mb-6 pt-6 border-t border-white/10">
                <span>{currentPlan.delivery.label}</span>
                <span className="text-white font-medium">{currentPlan.delivery.value}</span>
              </div>

              {/* CTA Button */}
              <Link
                href={currentPlan.cta.href}
                className="flex items-center justify-center gap-2 w-full py-4 bg-white text-foreground rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                {currentPlan.cta.label}
                <Plus className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
