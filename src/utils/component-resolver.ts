const componentCache = new Map();

// Explicitly import all components to avoid dynamic import issues
const componentModules = {
  Hero: () => import('../components/Hero.astro'),
  Carousel: () => import('../components/Carousel.astro'),
};

export async function resolveComponent(componentName: string) {
  // Check cache first
  if (componentCache.has(componentName)) {
    return componentCache.get(componentName);
  }

  // Try to find the component using explicit imports
  const importFn = componentModules[componentName as keyof typeof componentModules];

  if (importFn) {
    try {
      const component = await importFn();
      const resolvedComponent = component.default || component;

      // Cache the resolved component
      componentCache.set(componentName, resolvedComponent);
      return resolvedComponent;
    } catch (error) {
      console.error(`Error importing component '${componentName}':`, error);
    }
  }

  console.warn(`Component '${componentName}' not found. Available components: ${Object.keys(componentModules).join(', ')}`);
  return null;
}

export function clearComponentCache() {
  componentCache.clear();
} 