// ============================================================
// OWLTECH — Cybersecurity Utilities
// Input sanitization, validation, and protection
// ============================================================

/**
 * Strip HTML tags and script injections from a string
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script-related patterns
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/data:\s*text\/html/gi, '')
    // Remove null bytes
    .replace(/\0/g, '')
    // Trim excessive whitespace
    .replace(/\s{10,}/g, ' ')
    .trim();
}

/**
 * Validate email with strict pattern — prevents injection
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  // Max length check
  if (email.length > 254) return false;
  // No angle brackets, backticks, or other injection chars
  if (/[<>`'"|;(){}[\]\\]/.test(email)) return false;
  // Standard email regex
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
}

/**
 * Validate phone number — only digits, spaces, +, -, ()
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return true; // optional
  return /^[+\d\s()-]{0,25}$/.test(phone);
}

/**
 * Check for common malicious patterns in text content
 */
export function containsMaliciousContent(text: string): boolean {
  if (!text) return false;
  const patterns = [
    /<script\b/i,
    /javascript:/i,
    /on(load|error|click|mouseover)\s*=/i,
    /eval\s*\(/i,
    /document\.(cookie|write|location)/i,
    /window\.(location|open)/i,
    /\bexec\s*\(/i,
    /union\s+select/i,
    /;\s*drop\s+table/i,
    /--\s*$/m,
    /\/\*[\s\S]*?\*\//,
    /'\s*(or|and)\s+'?\d/i,
    /base64,/i,
  ];
  return patterns.some((p) => p.test(text));
}

/**
 * Validate file name — no path traversal or suspicious extensions
 */
export function isValidFileName(name: string): boolean {
  if (!name || typeof name !== 'string') return false;
  // No path traversal
  if (/\.\./.test(name)) return false;
  if (/[/\\]/.test(name)) return false;
  // No null bytes
  if (/\0/.test(name)) return false;
  // Max length
  if (name.length > 255) return false;
  // Block dangerous extensions
  const dangerous = /\.(exe|bat|cmd|sh|ps1|vbs|js|mjs|php|py|rb|pl|cgi|asp|aspx|jsp|com|scr|pif|hta)$/i;
  if (dangerous.test(name)) return false;
  return true;
}

/**
 * Simple in-memory rate limiter
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string,
  maxRequests: number = 5,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}

/**
 * Sanitize all text fields in an object
 */
export function sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
  const sanitized = { ...data };
  for (const key of Object.keys(sanitized)) {
    const val = sanitized[key];
    if (typeof val === 'string') {
      (sanitized as Record<string, unknown>)[key] = sanitizeString(val);
    } else if (Array.isArray(val)) {
      (sanitized as Record<string, unknown>)[key] = val.map((v) =>
        typeof v === 'string' ? sanitizeString(v) : v
      );
    }
  }
  return sanitized;
}

/**
 * Validate that a URL is a legitimate Supabase storage URL
 */
export function isValidSupabaseUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === 'https:' &&
      parsed.hostname.endsWith('.supabase.co') &&
      parsed.pathname.includes('/storage/')
    );
  } catch {
    return false;
  }
}
