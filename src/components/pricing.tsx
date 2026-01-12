"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Link from "next/link"
import placeholderData from "@/data/placeholder.json"

const { pricing } = placeholderData

type Package = (typeof pricing.packages)[0]

export function Pricing() {
  const [selectedPackage, setSelectedPackage] = useState<Package>(
    pricing.packages.find((p) => p.popular) || pricing.packages[0]
  )

  return (
    <section id="pricing" className="py-20 md:py-28 lg:py-32 bg-muted/30">
      <div className="px-4 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12 md:mb-16">
          <div className="flex-1 max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[clamp(2.5rem,6vw,4rem)] text-primary-700 font-medium tracking-tighter leading-[1.1] mb-4"
            >
              {pricing.sectionTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-sm md:text-base tracking-tighter text-muted-foreground max-w-lg"
            >
              {pricing.sectionDescription}
            </motion.p>
          </div>

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

        {/* Pricing Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white rounded-3xl p-2 shadow-sm"
        >
          {/* Left Side - Package Selection */}
          <div className="grid md:grid-cols-2 gap-2">
            {pricing.packages.map((pkg) => {
              const isSelected = selectedPackage.id === pkg.id
              return (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`w-full cursor-pointer flex justify-between p-4 md:p-5 rounded-2xl transition-all duration-300 text-left ${isSelected
                    ? "bg-primary-700 text-white shadow-lg shadow-primary-700/20"
                    : "bg-muted/50 hover:bg-muted text-foreground"
                    }`}
                >
                  <div className="flex item gap-4">
                    {/* Radio indicator */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected
                        ? "border-white bg-white"
                        : "border-muted-foreground/30"
                        }`}
                    >
                      {isSelected && (
                        <Check className="w-4 h-4 text-primary-700" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p
                        className={`font-semibold tracking-tighter text-base md:text-xl ${isSelected ? "text-white" : "text-primary-700"
                          }`}
                      >
                        {pkg.name}
                      </p>
                      {pkg.popular && (
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit ${isSelected
                            ? "bg-white/20 text-white"
                            : "bg-primary-100 text-primary-700"
                            }`}
                        >
                          Popular
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right items-end flex flex-col justify-end">
                    <p
                      className={`text-xl md:text-4xl tracking-tighter font-semibold ${isSelected ? "text-white" : "text-primary-500"
                        }`}
                    >
                      ${pkg.price.toLocaleString()}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right Side - Features */}
          <div className="p-2">
            <h3 className="text-3xl tracking-tighter font-semibold text-foreground mb-2">
              Includes:
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {selectedPackage.description}
            </p>

            <ul className="space-y-4">
              {selectedPackage.features.map((feature, index) => (
                <motion.li
                  key={`${selectedPackage.id}-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
                >
                  <span className="text-sm md:text-base font-medium tracking-tight text-muted-foreground">
                    {feature}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 ml-4">
                    <Check className="w-3 h-3 text-primary-700" />
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
