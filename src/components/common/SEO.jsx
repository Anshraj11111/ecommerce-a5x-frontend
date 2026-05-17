import { Helmet } from "react-helmet-async";

const SITE_NAME = "A5X Robotics";
const SITE_URL = "https://shop.a5x.in";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * SEO component — drop into any page to set per-page meta tags.
 *
 * Props:
 *   title        — page title (appended with " | A5X Robotics")
 *   description  — meta description (max ~160 chars)
 *   keywords     — comma-separated keywords string
 *   image        — OG image URL (absolute)
 *   url          — canonical URL path e.g. "/shop"
 *   type         — OG type: "website" | "product" | "article"
 *   noIndex      — true to block indexing (admin pages)
 *   structuredData — JSON-LD object or array to inject
 */
function SEO({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  url = "",
  type = "website",
  noIndex = false,
  structuredData,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Buy Robotics Kits, Arduino, ESP32 & Sensors in India`;
  const canonical = `${SITE_URL}${url}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData])}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;
