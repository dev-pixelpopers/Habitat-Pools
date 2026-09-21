import React from "react";

interface PillListProps {
  items: string[];
  /** Columns from the `sm` breakpoint up. Narrow screens always use two. */
  columns?: 2 | 3;
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
 * Short labels as glass pills on an even grid.
 *
 * Equal-width cells keep the labels in a tidy matrix rather than the ragged
 * edge a right-aligned bulleted list produces. A count that does not divide
 * evenly would leave its last row against the left edge, so the stragglers are
 * nudged into the middle instead — centred when a single one is left over.
 */
export const PillList: React.FC<PillListProps> = ({
  items,
  columns = 3,
  tone = "dark",
  className = "",
}) => {
  if (items.length === 0) return null;

  const gridCols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";

  // Trailing row at the `sm` breakpoint and up. On a three-column grid the row
  // starts one cell in, which centres a lone pill and puts a pair in the middle
  // and right cells. A two-column grid has no middle cell, so a lone pill spans
  // the row and centres itself instead.
  const remainder = items.length % columns;
  const trailingStart = remainder === 0 ? -1 : items.length - remainder;
  const trailingClasses =
    columns === 2
      ? "sm:col-span-2 sm:justify-self-center"
      : "sm:col-start-2";

  // Trailing item in the two-column layout narrow screens always use.
  const lastIsOrphanOnMobile = items.length % 2 === 1;

  return (
    <ul className={`grid grid-cols-2 ${gridCols} gap-3 list-none p-0 ${className}`}>
      {items.map((item, index) => {
        const classes = [
          "inline-flex items-center justify-center rounded-full border backdrop-blur-md",
          "px-3 sm:px-4 py-2.5 sm:py-3 text-[16px] sm:text-[18px]",
          "leading-[24px] sm:leading-[26px] text-center",
          TONES[tone],
        ];

        // A lone pill on the narrow two-column grid spans the row and centres.
        const isMobileOrphan = lastIsOrphanOnMobile && index === items.length - 1;
        const isTrailing = index === trailingStart;
        // Only reset that span at `sm` when the wider grid wants this pill in a
        // single cell — otherwise the two rules would set conflicting values for
        // the same properties and stylesheet order, not class order, would win.
        const resetsAtSm = columns !== 2;

        if (isMobileOrphan) {
          classes.push("col-span-2 justify-self-center");
        }
        if (isTrailing) {
          classes.push(trailingClasses);
        }
        if (isMobileOrphan && resetsAtSm) {
          classes.push("sm:col-span-1 sm:justify-self-stretch");
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
