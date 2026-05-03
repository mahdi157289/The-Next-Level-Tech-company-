"use client"

import * as React from "react"
// import { ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

const Accordion = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("w-full", className)}>{children}</div>
)

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <div className="flex">
    <button
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <span className="h-4 w-4 shrink-0 transition-transform duration-200">▼</span>
    </button>
  </div>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className="overflow-hidden text-sm transition-all"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </div>
)
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
