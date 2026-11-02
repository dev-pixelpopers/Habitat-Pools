import React from "react";

interface PillListProps {
  items: string[];
  /** Columns from `columnsFrom` up. Narrower screens stack one per row. */
  columns?: 2 | 3;
  /**
   * Width at which the columns start.
   *
   * `md` (768px) suits pills that sit in a full-width block. `desktop`
   * (1025px) is for the image-and-text sections, whose own grid stacks below
   * that — their pills stay one per row for as long as the section does.
   */
  columnsFrom?: "md" | "desktop";
  /**
   * Which background the pills sit on. `dark` is the teal sections, `light`
   * the white ones — a white-on-white pill would be invisible.
   */
  tone?: "dark" | "light";
  className?: string;
}

const TONES = {
  dark: "border-white/20 bg-white/10 text-white/90",
  light: "border-[#112931]/20 bg-[#112931]/5 text-[#112931]/80",
} as const;

/**
 * Written out in full per combination rather than composed from a prefix:
 * Tailwind only generates classes it can find as complete strings in the
 * source, so a template literal would compile to nothing.
 */
const LAYOUTS = {
  md: {
    2: {
      grid: "md:grid-cols-2",
      trailing: "md:col-span-2 md:justify-self-center",
    },
    3: {
      grid: "md:grid-cols-3",
      trailing: "md:col-start-2",
    },
  },
  desktop: {
    2: {
      grid: "min-[1025px]:grid-cols-2",
      trailing: "min-[1025px]:col-span-2 min-[1025px]:justify-self-center",
    },
    3: {
      grid: "min-[1025px]:grid-cols-3",
      trailing: "min-[1025px]:col-start-2",
    },
  },
} as const;

/**
 * Short labels as glass pills on an even grid.
 *
 * Equal-width cells keep the labels in a tidy matrix rather than the ragged
 * edge a right-aligned bulleted list produces. A count that does not divide
 * evenly would leave its last row against the left edge, so the stragglers are
 * nudged into the middle instead — centred when a single one is left over.
 * Below `columnsFrom` the pills stack in a single full-width column.
 */
export const PillList: React.FC<PillListProps> = ({
  items,
  columns = 3,
  columnsFrom = "md",
  tone = "dark",
  className = "",
}) => {
  if (items.length === 0) return null;

  // `desktop` is 1025px: the complement of the image-and-text sections' own
  // `max-[1025px]` stacking, so the pills and the section change shape together.
  const layout = LAYOUTS[columnsFrom][columns];

  // Trailing row once the columns start. On a three-column grid the row starts
  // one cell in, which centres a lone pill and puts a pair in the middle and
  // right cells. A two-column grid has no middle cell, so a lone pill spans the
  // row and centres itself instead.
  const remainder = items.length % columns;
  const trailingStart = remainder === 0 ? -1 : items.length - remainder;

  return (
    <ul className={`grid grid-cols-1 ${layout.grid} gap-3 list-none p-0 ${className}`}>
      {items.map((item, index) => {
        const classes = [
          "inline-flex items-center justify-center rounded-full border backdrop-blur-md",
          "px-3 sm:px-4 py-2.5 sm:py-3 text-[16px] sm:text-[18px]",
          "leading-[24px] sm:leading-[26px] text-center",
          TONES[tone],
        ];

        if (index === trailingStart) {
          classes.push(layout.trailing);
        }

        return (
          <li key={`${item}-${index}`} className={classes.join(" ")}>
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default PillList;
