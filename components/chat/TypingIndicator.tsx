export function TypingIndicator() {
  return (
    <div className="flex gap-2.5 items-end">
      <div className="shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/bro-default.png"
          alt="Bro"
          className="h-8 w-8 object-contain"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = "/images/bro-default.svg"
          }}
        />
      </div>
      <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
