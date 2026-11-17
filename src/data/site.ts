export const site = {
  name: 'Pachamamicos',
  url: 'https://pachamamicos.cl',
  locale: 'es-CL',
  description:
    'Guías para empezar, textos clásicos comentados y eventos de meditación y mindfulness en Santiago. Hecho por una comunidad.',
};

export type NavLink = { label: string; href: string; color: string };
export type NavGroup = { label: string; color: string; children: NavLink[] };
export type NavItem = NavLink | NavGroup;

export const nav: NavItem[] = [
  {
    label: 'Leer',
    color: 'decoration-amarillo',
    children: [
      { label: 'Blog', href: '/blog/', color: 'decoration-celeste' },
      { label: 'Guías', href: '/guias/', color: 'decoration-lima' },
      { label: 'Textos', href: '/textos/', color: 'decoration-violeta' },
    ],
  },
  { label: 'Quiénes somos', href: '/quienes-somos/', color: 'decoration-texto' },
];

export const institucional = [
  { label: 'Quiénes somos', href: '/quienes-somos/' },
  { label: 'Apoya pachamamicos', href: '/apoya/' },
  { label: 'Política de afiliados', href: '/afiliados/' },
  { label: 'Privacidad', href: '/privacidad/' },
  { label: 'Contacto', href: '/contacto/' },
];

export const instagram = '';