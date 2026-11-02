// Gold ornaments from the banner identity, shared by every section so the
// hero, body and footer draw the same diamond and rules. All decorative.
//
// Physical gradient directions are deliberate: each outer line fades away
// from the centre, whichever side of the RTL row it lands on.

export function Diamond({ className = "size-2.5" }) {
  return (
    <span
      aria-hidden="true"
      className={`${className} inline-block shrink-0 rotate-45 bg-gradient-to-br from-[#F8E5A6] via-majd-gold to-majd-gold-dark shadow-[0_0_0_1px_rgb(181_136_59/0.35)]`}
    />
  )
}

/** Long rule under the banner title: line, short line, diamond, mirrored. */
export function TitleRule() {
  return (
    <div aria-hidden="true" className="mx-auto mt-1 flex items-center justify-center gap-[0.6em] text-[clamp(0.6rem,2.4vw,0.95rem)] sm:mt-[0.4vw]">
      <span className="h-0.5 w-[clamp(3.5rem,13vw,15rem)] rounded-full bg-gradient-to-r from-majd-gold-dark to-transparent" />
      <span className="h-0.5 w-[clamp(1.5rem,4vw,4.5rem)] rounded-full bg-majd-gold" />
      <Diamond className="size-[1em]" />
      <span className="h-0.5 w-[clamp(1.5rem,4vw,4.5rem)] rounded-full bg-majd-gold" />
      <span className="h-0.5 w-[clamp(3.5rem,13vw,15rem)] rounded-full bg-gradient-to-l from-majd-gold-dark to-transparent" />
    </div>
  )
}

/** Short rule with a diamond, as under each subject card's title. */
export function CardRule({ className = "mt-1.5", wide = "w-12 sm:w-16 lg:w-[5vw]" }) {
  return (
    <div aria-hidden="true" className={`${className} flex items-center justify-center gap-2`}>
      <span className={`h-px ${wide} bg-gradient-to-r from-majd-gold-dark to-transparent`} />
      <Diamond className="size-2" />
      <span className={`h-px ${wide} bg-gradient-to-l from-majd-gold-dark to-transparent`} />
    </div>
  )
}

/** Centred section title in the banner's display face, with its gold rule. */
export function SectionHeading({ id, children, className = "" }) {
  return (
    <div className={`text-center ${className}`}>
      <h2 id={id} className="font-display text-[1.9rem] font-black leading-tight text-majd-ink sm:text-[2.4rem]">
        {children}
      </h2>
      <CardRule className="mt-2" wide="w-14 sm:w-24" />
    </div>
  )
}
