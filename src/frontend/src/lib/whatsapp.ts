// WhatsApp contact helper for Asistenku
// Number: 628817743613 (no +, no spaces)

const WHATSAPP_NUMBER = '628817743613';

export const WHATSAPP_MESSAGES = {
  hero: 'Hai Asistenku, Saya butuh didampingi',
  tenang: 'Hai Asistenku, Saya butuh ngobrol tentang layanan Tenang',
  rapi: 'Hai Asistenku, Saya butuh ngobrol tentang layanan Rapi',
  fokus: 'Hai Asistenku, Saya butuh ngobrol tentang layanan Fokus',
  jaga: 'Hai Asistenku, Saya butuh ngobrol tentang layanan Jaga',
  comparison: 'Hai Asistenku, Saya butuh didampingi',
  faq: 'Hai Asistenku, Saya butuh ngobrol dulu',
  footer: 'Hai Asistenku, Saya ingin bertanya'
} as const;

export function buildWhatsAppLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export const WHATSAPP_LINKS = {
  hero: buildWhatsAppLink(WHATSAPP_MESSAGES.hero),
  tenang: buildWhatsAppLink(WHATSAPP_MESSAGES.tenang),
  rapi: buildWhatsAppLink(WHATSAPP_MESSAGES.rapi),
  fokus: buildWhatsAppLink(WHATSAPP_MESSAGES.fokus),
  jaga: buildWhatsAppLink(WHATSAPP_MESSAGES.jaga),
  comparison: buildWhatsAppLink(WHATSAPP_MESSAGES.comparison),
  faq: buildWhatsAppLink(WHATSAPP_MESSAGES.faq),
  footer: buildWhatsAppLink(WHATSAPP_MESSAGES.footer)
} as const;
