// Govori Googleu da smije pregledati cijeli web i gdje je popis stranica.
export default function robots() {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: "https://pitmarinphoto.com/sitemap.xml", host: "https://pitmarinphoto.com" };
}
