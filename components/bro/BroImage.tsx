"use client"

import { type ImgHTMLAttributes } from "react"

type BroImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "onError">

export function BroImage({ src, ...props }: BroImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      {...props}
      onError={(e) => {
        const img = e.target as HTMLImageElement
        if (!img.src.endsWith(".svg")) img.src = "/images/bro-default.svg"
      }}
    />
  )
}
