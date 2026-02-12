// ============================================================
// OWLTECH — Design System Constants
// ============================================================

export const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  orange: '#FF6600',
  red: '#FF3300',
  surface: '#111111',
  surface2: '#1A1A1A',
  border: '#333333',
  muted: '#999999',
  dim: '#555555',
} as const;

export const NAV_ITEMS = [
  { label: 'Servizi', href: '/#servizi' },
  { label: 'Progetti', href: '/#progetti' },
  { label: 'Shop', href: '/shop' },
  { label: 'Blog', href: '/blog' },
  { label: 'Preventivo', href: '/preventivo', isCta: true },
] as const;

export const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'Hero', href: '/admin/hero', icon: 'Monitor' },
  { label: 'Servizi', href: '/admin/servizi', icon: 'Wrench' },
  { label: 'Progetti', href: '/admin/progetti', icon: 'FolderOpen' },
  { label: 'Shop', href: '/admin/shop', icon: 'ShoppingBag' },
  { label: 'Blog', href: '/admin/blog', icon: 'FileText' },
  { label: 'Preventivi', href: '/admin/preventivi', icon: 'Inbox' },
  { label: 'Impostazioni', href: '/admin/settings', icon: 'Settings' },
] as const;

export const TIPO_CLIENTE_OPTIONS = [
  'Privato',
  'Azienda',
  'Professionista',
  'Ente / Istituzione',
] as const;

export const SETTORE_OPTIONS = [
  'Orologeria',
  'Meccanica di precisione',
  'Robotica & Automazione',
  'Design & Prototipazione',
  'Hobby & Modellismo',
  'Automotive',
  'Medicale',
  'Aerospaziale',
  'Industriale',
  'Gioielleria & Accessori',
  'Elettronica',
  'Architettura & Edilizia',
  'Altro',
] as const;

export const ALLOWED_FILE_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'video/mp4', 'video/webm', 'video/quicktime',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'model/stl', 'application/sla',
  'model/step', 'application/step',
  'model/iges',
] as const;

export const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB per file
export const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50 MB total

export const SERVIZI_ICONS: Record<string, string> = {
  web: 'Globe',
  mobile: 'Smartphone',
  design: 'Palette',
  cloud: 'Cloud',
  ai: 'Brain',
  security: 'Shield',
  consulting: 'MessageSquare',
  ecommerce: 'ShoppingCart',
  _3d: 'Box',
  data: 'Database',
};
