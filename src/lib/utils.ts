import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const MONTHS_IT = [
  'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
  'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre',
];

export function formatDate(date: string | null) {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getDate()} ${MONTHS_IT[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatPrice(price: number) {
  const fixed = price.toFixed(2);
  const [intPart, decPart] = fixed.split('.');
  // Add thousand separator (dot) manually
  const withDots = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `€${withDots},${decPart}`;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number) {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function generateId() {
  return crypto.randomUUID();
}
