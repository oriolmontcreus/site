const componentCache = new Map();

// Import all components using Vite's glob import
const componentModules = import.meta.glob('../components/*.{astro,tsx,ts,jsx,js}', { eager: false });

export async function resolveComponent(componentName: string) {
  // Check cache first
  if (componentCache.has(componentName)) {
    return componentCache.get(componentName);
  }

  try {
    // Find the component by matching the filename
    const matchingPath = Object.keys(componentModules).find(path => {
      const filename = path.split('/').pop()?.replace(/\.(astro|tsx|ts|jsx|js)$/, '');
      return filename === componentName;
    });

    if (matchingPath) {
      const importedModule = await componentModules[matchingPath]() as any;
      const component = importedModule.default || importedModule;

      // Cache the resolved component
      componentCache.set(componentName, component);
      return component;
    } else {
      // List available components for debugging
      const availableComponents = Object.keys(componentModules).map(path => {
        return path.split('/').pop()?.replace(/\.(astro|tsx|ts|jsx|js)$/, '');
      }).filter(Boolean);

      console.error(`Component '${componentName}' not found. Available components: ${availableComponents.join(', ')}`);
      return null;
    }
  } catch (error) {
    console.error(`Error resolving component '${componentName}':`, error);
    return null;
  }
}

export function clearComponentCache() {
  componentCache.clear();
} 