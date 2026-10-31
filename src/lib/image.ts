import { getImageProps } from "next/image";

/** Host serving the WordPress media library — keep in sync with `next.config.ts`. */
const CMS_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN ?? "hb-pools.demo-link.tech";
const CMS_UPLOADS = `https://${CMS_DOMAIN}/wp-content/uploads/`;

/**
 * `src` / `srcSet` / `sizes` for a plain `<img>`, routed through Next's image
 * optimiser so phones get a resized WebP instead of the full CMS original.
 *
 * Only the source attributes change — the element, its classes and layout stay
 * exactly as written. Anything the optimiser is not allowed to fetch (another
 * host, an SVG) is passed through untouched, since `/_next/image` would 400.
 */
export function responsiveSrc(src: string | undefined, sizes: string) {
  if (!src) return { src };
  const optimisable =
    (src.startsWith("/") && !src.startsWith("//")) || src.startsWith(CMS_UPLOADS);
  if (!optimisable || src.toLowerCase().endsWith(".svg")) return { src };

  const { props } = getImageProps({ src, alt: "", fill: true, sizes });
  return { src: props.src, srcSet: props.srcSet, sizes: props.sizes };
}

/** A single optimised URL at `width`, for CSS backgrounds that cannot take a srcset. */
export function optimisedUrl(src: string | undefined, width: number) {
  const { src: out, srcSet } = responsiveSrc(src, `${width}px`);
  if (!srcSet) return out;
  // The srcset lists ascending widths; take the first candidate at or above `width`.
  const candidates = srcSet.split(", ").map((entry) => {
    const [url, w] = entry.split(" ");
    return { url, w: parseInt(w, 10) };
  });
  return (candidates.find((c) => c.w >= width) ?? candidates[candidates.length - 1]).url;
}
