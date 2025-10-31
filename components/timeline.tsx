"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Timeline() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const timelineData = [
    {
      year: "2004",
      items: ["Founded Fulcrum Consulting in Vienna, Austria"],
    },
    {
      year: "2011",
      items: [
        "Began partnership with SAP and delivered the first Public Cloud project using SAP Business ByDesign",
      ],
    },
    {
      year: "2013",
      items: ["Opened Fulcrum branch in Dubai, United Arab Emirates"],
    },
    {
      year: "2019",
      items: [
        "Recognized by SAP as the Best Business ByDesign Partner in Central & Eastern Europe",
      ],
    },
    {
      year: "2021",
      items: [
        "Again recognized by SAP as the Best Business ByDesign Partner in Central & Eastern Europe",
      ],
    },
    {
      year: "2022",
      items: ["Delivered first project with SAP S/4HANA Public Cloud"],
    },
    {
      year: "2023",
      items: ["Established Fulcrum Consulting Deutschland in Germany"],
    },
  ]

  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2.5
    }
    return 3.5
  }

  // Important for hydration: use the same initial value on server and client
  const [itemsPerView, setItemsPerView] = useState(3.5)

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView())
    setItemsPerView(getItemsPerView())
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, timelineData.length - Math.floor(itemsPerView))

  // Auto-advance every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) return 0
        return prev + 1
      })
    }, 3000)
    return () => clearInterval(intervalId)
  }, [maxIndex])

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex // Go to end when at the beginning
      }
      return prev - 1
    })
  }

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0 // Restart from beginning when reaching the end
      }
      return prev + 1
    })
  }

  return (
    <div className="w-full mx-auto my-0 py-0 md:py-0 px-2 md:px-4">
      <div className="relative max-w-[1300px] mx-auto pl-12 sm:pl-16 md:pl-20 pr-8 md:pr-16">
        <div className="absolute left-0 top-6 flex flex-col gap-1 md:gap-2 z-20">
          <Button
            onClick={handlePrevious}
            variant="outline"
            size="icon"
            className="border-[#3E4143] text-[#3E4143] hover:bg-[#3E4143] hover:text-white bg-white h-8 w-8 md:h-10 md:w-10"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </Button>

          <Button
            onClick={handleNext}
            variant="outline"
            size="icon"
            className="border-[#3E4143] text-[#3E4143] hover:bg-[#3E4143] hover:text-white bg-white h-8 w-8 md:h-10 md:w-10"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>

        {/* Timeline Container */}
        <div className="relative flex-1 overflow-hidden">
          <div className="absolute left-0 right-4 top-[60px] sm:top-[68px] md:top-[72px] h-[2px] bg-[#3E4143]" />

          <div className="absolute right-4 top-[55px] sm:top-[63px] md:top-[67px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[12px] border-l-[#3E4143]" />

          <div
            className="relative flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {timelineData.map((milestone, index) => {

              return (
                <div
                  key={index}
                  className="flex flex-col shrink-0 px-4 sm:px-6 md:px-8"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="mb-4 md:mb-6 text-left">
                    <div className="text-[#3E4143] font-bold text-[36px] sm:text-[40px] leading-tight ">{milestone.year}</div>
                  </div>

                  <div className="relative z-10 flex items-start">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border-[2px] sm:border-[3px] border-[#3E4143] mx-[-5px] my-[-9px]" />

                    {/* Vertical line segments that pass through the center of each red bullet */}
                    {milestone.items.map((_, itemIndex) => {
                      const itemGap = 16 // gap-4
                      const itemTextHeight = 24 // text height per item
                      const redBulletTopMargin = 16 // mt-1.5 alignment for red dot
                      const redBulletSize = 10 // w-2.5 h-2.5 = 10px
                      const timelineMarkerOffsetMobile = 7 // mobile: touch grey circle
                      const timelineMarkerOffsetDesktop = 18 // desktop: subtle separation
                      
                      // Calculate positions for both mobile and desktop
                      const mobileContainerMargin = 36 // mt-14 for a bit more breathing room on mobile
                      const desktopContainerMargin = 56 // mt-14
                      
                      // Calculate the center of each red bullet
                      const mobileRedBulletCenter = mobileContainerMargin + itemIndex * (itemTextHeight + itemGap) + redBulletTopMargin + (redBulletSize / 2)
                      const desktopRedBulletCenter = desktopContainerMargin + itemIndex * (itemTextHeight + itemGap) + redBulletTopMargin + (redBulletSize / 2)
                      
                      const mobileLineHeight = mobileRedBulletCenter - timelineMarkerOffsetMobile
                      const desktopLineHeight = desktopRedBulletCenter - timelineMarkerOffsetDesktop
                      
                      return (
                        <div key={itemIndex}>
                          {/* Mobile line */}
                          <div
                            className="absolute left-[2px] w-[2px] bg-[#C00000] md:hidden"
                            style={{ 
                              top: `${timelineMarkerOffsetMobile}px`,
                              height: `${mobileLineHeight}px`
                            }}
                          />
                          {/* Desktop line */}
                          <div
                            className="absolute left-[4px] mt-[-8px] w-[2px] bg-[#C00000] hidden md:block"
                            style={{ 
                              top: `${timelineMarkerOffsetDesktop}px`,
                              height: `${desktopLineHeight}px`
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-12 md:mt-14 flex flex-col gap-4">
                    {milestone.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-2 md:gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#C00000] shrink-0 mt-1.5 ml-[-2px] md:ml-0" />

                        <div className="text-[#3E4143] text-xs sm:text-sm font-bold leading-tight">
                          {item}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
