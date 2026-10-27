"use client";

import * as React from "react";
import Image from "next/image";
import "./index-list-carousel.css";

// Adapted from the supplied IndexListCarousel: wrap/pad2/layerOf, indexed
// selection, layered directional reveals, and visibility-aware autoplay.
export type Slide = {
  image: string;
  title: string;
  description: string;
  alt: string;
  position?: string;
};
export type IndexListCarouselProps = {
  slides: readonly Slide[];
  editorial: React.ReactNode;
  autoplay?: number;
  imageSide?: "left" | "right";
  variant?: "indexed" | "circular";
  decoration?: React.ReactNode;
  onChange?: (index: number) => void;
  ariaLabel?: string;
};
export function wrap(i: number, n: number) {
  return n ? ((i % n) + n) % n : 0;
}
export function pad2(n: number) {
  return String(n).padStart(2, "0");
}
export function layerOf(i: number, active: number, previous: number) {
  return i === active
    ? "on"
    : i === previous
      ? "was"
      : i > active
        ? "after"
        : "before";
}
const subscribeMotion = (notify: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const readMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function IndexListCarousel({
  slides,
  editorial,
  autoplay = 6500,
  imageSide = "left",
  variant = "indexed",
  decoration,
  onChange,
  ariaLabel = "The Elevate Care approach",
}: IndexListCarouselProps) {
  const [state, setState] = React.useState({
    active: 0,
    previous: -1,
    direction: "forward",
    turn: 0,
  });
  const current = React.useRef(state);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const rows = React.useRef<Array<HTMLButtonElement | null>>([]);
  const ready = React.useRef(new Set<number>());
  const pending = React.useRef<{
    index: number;
    direction: string;
    manual: boolean;
  } | null>(null);
  const activity = React.useRef({
    visible: false,
    hover: false,
    focus: false,
    lastManual: 0,
    paused: false,
    reduced: true,
  });
  const [announcement, setAnnouncement] = React.useState("");
  const reduced = React.useSyncExternalStore(
    subscribeMotion,
    readMotion,
    () => true,
  );
  const id = React.useId();

  const commit = React.useCallback(
    (index: number, direction: string, manual: boolean) => {
      if (index === current.current.active) return;
      const next = {
        active: index,
        previous: current.current.active,
        direction,
        turn: current.current.turn + 1,
      };
      current.current = next;
      setState(next);
      if (manual)
        setAnnouncement(
          `${pad2(index + 1)} of ${pad2(slides.length)}: ${slides[index].title}`,
        );
    },
    [slides],
  );
  const show = React.useCallback(
    (index: number, direction: string, manual = true) => {
      if (manual) activity.current.lastManual = performance.now();
      pending.current = null;
      if (index === current.current.active) return;
      if (!ready.current.has(index)) {
        pending.current = { index, direction, manual };
        return;
      }
      commit(index, direction, manual);
    },
    [commit],
  );
  React.useEffect(() => {
    onChange?.(state.active);
  }, [state.active, onChange]);
  React.useEffect(() => {
    activity.current.reduced = reduced;
  }, [reduced]);
  React.useEffect(() => {
    const root = rootRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        activity.current.visible = entry.intersectionRatio >= 0.55;
      },
      { threshold: [0, 0.55] },
    );
    if (root) observer.observe(root);
    if (!autoplay || slides.length < 2) return () => observer.disconnect();
    const timer = window.setInterval(() => {
      const a = activity.current;
      if (
        !a.visible ||
        a.hover ||
        a.focus ||
        a.paused ||
        a.reduced ||
        document.hidden ||
        performance.now() - a.lastManual < autoplay
      )
        return;
      show(wrap(current.current.active + 1, slides.length), "forward", false);
    }, autoplay);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [autoplay, slides.length, show]);

  if (!slides.length) return null;
  return (
    <div
      ref={rootRef}
      className={`il-root${variant === "circular" ? " il-circular" : ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      data-side={imageSide}
      data-active={state.active}
      data-turn={state.turn}
      data-direction={state.direction}
      data-reduced={reduced}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") activity.current.hover = true;
      }}
      onPointerLeave={() => {
        activity.current.hover = false;
      }}
      onFocusCapture={() => {
        activity.current.focus = true;
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null))
          activity.current.focus = false;
      }}
      onKeyDown={(e) => {
        const delta = ["ArrowDown", "ArrowRight"].includes(e.key)
          ? 1
          : ["ArrowUp", "ArrowLeft"].includes(e.key)
            ? -1
            : 0;
        if (!delta || e.altKey || e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        const next = wrap(current.current.active + delta, slides.length);
        show(next, delta > 0 ? "forward" : "backward");
        if ((e.target as HTMLElement).classList.contains("il-row"))
          rows.current[next]?.focus();
      }}
    >
      <div className="il-editorial about-copy">{editorial}</div>
      <div className={variant === "circular" ? "il-visual" : "il-visual-plain"}>
        {decoration}
        <figure className="il-pane" aria-label="Pharmacy care stories">
          {slides.map((slide, i) => (
            <div
              key={slide.image}
              className="il-layer"
              data-layer={layerOf(i, state.active, state.previous)}
              aria-hidden={i !== state.active}
            >
              <Image
                src={slide.image}
                alt={i === state.active ? slide.alt : ""}
                fill
                sizes="(max-width: 950px) calc(100vw - 40px), (min-width: 1800px) 1000px, 900px"
                style={{ objectFit: "cover", objectPosition: slide.position }}
                onLoad={() => {
                  ready.current.add(i);
                  const request = pending.current;
                  if (request?.index === i) {
                    pending.current = null;
                    commit(i, request.direction, request.manual);
                  }
                }}
              />
            </div>
          ))}
        </figure>
      </div>
      <div className="il-list" aria-label="Choose a care principle">
        {slides.map((slide, i) => (
          <button
            key={slide.title}
            ref={(node) => {
              rows.current[i] = node;
            }}
            type="button"
            className="il-row"
            data-on={i === state.active}
            aria-expanded={
              variant === "indexed" ? i === state.active : undefined
            }
            aria-pressed={
              variant === "circular" ? i === state.active : undefined
            }
            aria-controls={`${id}-description-${i}`}
            aria-describedby={
              variant === "circular" ? `${id}-description-${i}` : undefined
            }
            aria-label={`${pad2(i + 1)} ${slide.title}`}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse")
                show(i, i > current.current.active ? "forward" : "backward");
            }}
            onClick={() =>
              show(i, i > current.current.active ? "forward" : "backward")
            }
          >
            <span className="il-number">{pad2(i + 1)}</span>
            <span className="il-title">{slide.title}</span>
            <span
              id={`${id}-description-${i}`}
              className="il-more"
              aria-hidden={
                variant === "circular" ? undefined : i !== state.active
              }
            >
              <span>{slide.description}</span>
            </span>
          </button>
        ))}
      </div>
      <span className="il-sr" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>
    </div>
  );
}
