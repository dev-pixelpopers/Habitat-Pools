import { acfImageUrl, acfText, getPageBySlug } from "./wp";
import type { AcfImage } from "./wp-types";

/**
 * The `contact` page field group, from
 * `/wp-json/wp/v2/pages?slug=contact&acf_format=standard`.
 */
export interface ContactAcf {
  banner_section?: {
    sub_heading?: string;
    heading?: string;
    background_image?: AcfImage | false;
  };
  second_section?: {
    sub_heading?: string;
    heading?: string;
    call_label?: string;
    phone_number?: string;
    /** Who picks up, one name per line. */
    respondents?: string;
    email_label?: string;
    email?: string;
    location_label?: string;
    location?: string;
    hours_label?: string;
    hours?: string;
  };
}

export interface ContactContent {
  banner: {
    tagline?: string;
    heading?: string;
    backgroundImage?: string;
  };
  details: {
    tagline?: string;
    heading?: string;
    callLabel?: string;
    phoneNumber?: string;
    respondents?: string;
    emailLabel?: string;
    email?: string;
    locationLabel?: string;
    location?: string;
    hoursLabel?: string;
    hours?: string;
  };
}

/**
 * WordPress textareas store Windows line endings; the components render
 * multi-line copy with `whitespace-pre-line`, which only honours `\n`.
 */
function text(value: unknown): string | undefined {
  const result = acfText(value);
  return result ? result.replace(/\r\n?/g, "\n") : undefined;
}

/**
 * Everything the contact page renders.
 *
 * Sections the CMS has no content for come back undefined so the page keeps
 * its own defaults — it still renders if WordPress is down.
 */
export async function getContactContent(): Promise<ContactContent> {
  const page = await getPageBySlug<ContactAcf>("contact");
  const acf = page?.acf ?? {};
  const details = acf.second_section ?? {};

  return {
    banner: {
      tagline: text(acf.banner_section?.sub_heading),
      heading: text(acf.banner_section?.heading),
      backgroundImage:
        acfImageUrl(acf.banner_section?.background_image) || undefined,
    },
    details: {
      tagline: text(details.sub_heading),
      heading: text(details.heading),
      callLabel: text(details.call_label),
      phoneNumber: text(details.phone_number),
      respondents: text(details.respondents),
      emailLabel: text(details.email_label),
      email: text(details.email),
      locationLabel: text(details.location_label),
      location: text(details.location),
      hoursLabel: text(details.hours_label),
      hours: text(details.hours),
    },
  };
}
