import { Href, usePathname } from 'expo-router';

export function useActiveRoute(href: Href): boolean {
  const pathname = usePathname();

  const hrefPath = typeof href === 'string' ? href : href.pathname || '';
  const actualPath = hrefPath.replace(/^\/\([^)]+\)/, '');

  if (pathname === actualPath) {
    return true;
  }

  if (actualPath !== '/' && pathname.startsWith(actualPath + '/')) {
    return true;
  }

  return false;
}

export function useActiveRoutes(hrefs: Href[]): boolean {
  const pathname = usePathname();

  return hrefs.some((href) => {
    const hrefPath = typeof href === 'string' ? href : href.pathname || '';
    const actualPath = hrefPath.replace(/^\/\([^)]+\)/, '');

    return pathname === actualPath;
  });
}
