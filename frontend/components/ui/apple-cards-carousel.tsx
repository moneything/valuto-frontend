"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
// Using inline SVG icons instead of external library

interface Card {
  src: string
  title: string
  category: string
  content: React.ReactNode
  description?: string
  icon?: React.ReactNode
}

interface AppleCardsCarouselProps {
  items: Card[]
  initialScroll?: number
  className?: string
}

interface CardProps {
  card: Card
  index: number
  layout?: boolean
  onClick: () => void
}

const useOnClickOutside = (ref: React.RefObject<HTMLElement>, handler: () => void) => {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler()
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}

const BlurImage = React.forwardRef<
  HTMLImageElement,
  {
    src: string
    alt?: string
    className?: string
    fill?: boolean
    width?: number
    height?: number
  }
>(({ src, alt = "Background of a beautiful view", className, fill = false, width, height, ...props }, ref) => {
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        "object-cover transition-all duration-300",
        fill ? "h-full w-full" : "h-auto w-full",
        className
      )}
      {...props}
    />
  )
})
BlurImage.displayName = "BlurImage"

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ card, index, layout = false, onClick }, ref) => {
    return (
      <motion.div
        ref={ref}
        layout={layout}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="group relative h-80 w-72 cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        onClick={onClick}
      >
        <div className="absolute inset-0">
          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-white/80">{card.category}</span>
            <h3 className="text-xl font-bold text-white">{card.title}</h3>
            {card.description && (
              <p className="text-sm text-white/90 line-clamp-2">{card.description}</p>
            )}
          </div>
        </div>

        {card.icon && (
          <div className="absolute top-4 right-4 text-white/80 group-hover:text-white transition-colors">
            {card.icon}
          </div>
        )}
      </motion.div>
    )
  }
)
Card.displayName = "Card"

const Modal = ({ card, isOpen, onClose }: { card: Card | null; isOpen: boolean; onClose: () => void }) => {
  const modalRef = React.useRef<HTMLDivElement>(null)
  useOnClickOutside(modalRef, onClose)

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && card && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="relative h-96 w-full">
              <BlurImage
                src={card.src}
                alt={card.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8">
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500">{card.category}</span>
                <h2 className="text-3xl font-bold text-gray-900">{card.title}</h2>
              </div>
              <div className="prose prose-lg max-w-none">
                {card.content}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const AppleCardsCarousel = React.forwardRef<HTMLDivElement, AppleCardsCarouselProps>(
  ({ items, initialScroll = 0, className }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const [selectedCard, setSelectedCard] = React.useState<Card | null>(null)
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [canScrollLeft, setCanScrollLeft] = React.useState(false)
    const [canScrollRight, setCanScrollRight] = React.useState(true)

    const checkScrollPosition = React.useCallback(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
      }
    }, [])

    React.useEffect(() => {
      const scrollElement = scrollRef.current
      if (scrollElement) {
        scrollElement.scrollLeft = initialScroll
        checkScrollPosition()
        
        scrollElement.addEventListener("scroll", checkScrollPosition)
        return () => scrollElement.removeEventListener("scroll", checkScrollPosition)
      }
    }, [initialScroll, checkScrollPosition])

    const scroll = (direction: "left" | "right") => {
      if (scrollRef.current) {
        const scrollAmount = 300
        const newScrollLeft = scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
        scrollRef.current.scrollTo({
          left: newScrollLeft,
          behavior: "smooth"
        })
      }
    }

    const handleCardClick = (card: Card) => {
      setSelectedCard(card)
      setIsModalOpen(true)
    }

    const handleCloseModal = () => {
      setIsModalOpen(false)
      setSelectedCard(null)
    }

    return (
      <div ref={ref} className={cn("relative", className)}>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((card, index) => (
              <Card
                key={index}
                card={card}
                index={index}
                onClick={() => handleCardClick(card)}
              />
            ))}
          </div>

          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
            >
              <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
            >
              <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        <Modal
          card={selectedCard}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    )
  }
)
AppleCardsCarousel.displayName = "AppleCardsCarousel"

export { type Card, type AppleCardsCarouselProps }
