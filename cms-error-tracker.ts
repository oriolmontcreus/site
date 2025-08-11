import { defineToolbarApp } from "astro/toolbar";

interface ComponentError {
    componentName: string;
    instanceId: string;
    reason: string;
    pageSlug?: string;
}

export default defineToolbarApp({
    init(canvas, app, server) {
        const errors: ComponentError[] = [];
        let errorCountElement: HTMLElement;
        let errorPanelElement: HTMLElement;
        let isExpanded = false;

        // Create the main toolbar button
        function createToolbarButton() {
            const button = document.createElement('div');
            button.style.cssText = `
        position: fixed;
        top: 60px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-family: system-ui, sans-serif;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        z-index: 999999;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 6px;
        min-width: 120px;
        justify-content: center;
      `;

            const icon = document.createElement('span');
            icon.textContent = '🔧';
            icon.style.fontSize = '16px';

            errorCountElement = document.createElement('span');
            errorCountElement.textContent = 'Loading...';

            button.appendChild(icon);
            button.appendChild(errorCountElement);

            button.addEventListener('click', toggleErrorPanel);
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.05)';
                button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
            });
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
                button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
            });

            return button;
        }

        // Create the error panel
        function createErrorPanel() {
            const panel = document.createElement('div');
            panel.style.cssText = `
        position: fixed;
        top: 110px;
        right: 20px;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        width: 400px;
        max-height: 500px;
        overflow-y: auto;
        z-index: 999998;
        font-family: system-ui, sans-serif;
        display: none;
      `;

            updateErrorPanel(panel);
            return panel;
        }

        // Update error count display
        function updateErrorCount() {
            if (errorCountElement) {
                const count = errors.length;
                if (count === 0) {
                    errorCountElement.textContent = 'No Errors ✅';
                    if (errorCountElement.parentElement) {
                        errorCountElement.parentElement.style.background = '#22c55e';
                    }
                } else {
                    errorCountElement.textContent = `${count} Error${count > 1 ? 's' : ''}`;
                    if (errorCountElement.parentElement) {
                        errorCountElement.parentElement.style.background = '#ff4444';
                    }
                }
            }
        }

        // Update error panel content
        function updateErrorPanel(panel: HTMLElement) {
            panel.innerHTML = '';

            const header = document.createElement('div');
            header.style.cssText = `
        padding: 16px;
        border-bottom: 1px solid #eee;
        background: #f8f9fa;
        border-radius: 8px 8px 0 0;
        font-weight: bold;
        font-size: 16px;
        color: #333;
      `;
            header.textContent = `Component Errors (${errors.length})`;
            panel.appendChild(header);

            if (errors.length === 0) {
                const noErrors = document.createElement('div');
                noErrors.style.cssText = `
          padding: 32px 16px;
          text-align: center;
          color: #666;
          font-size: 14px;
        `;
                noErrors.innerHTML = `
          <div style="font-size: 32px; margin-bottom: 12px;">✅</div>
          <div>No component errors detected!</div>
          <div style="font-size: 12px; margin-top: 8px; opacity: 0.7;">
            All components are loading correctly.
          </div>
        `;
                panel.appendChild(noErrors);
            } else {
                errors.forEach((error, index) => {
                    const errorItem = document.createElement('div');
                    errorItem.style.cssText = `
            padding: 16px;
            border-bottom: 1px solid #eee;
            ${index === errors.length - 1 ? 'border-bottom: none; border-radius: 0 0 8px 8px;' : ''}
          `;

                    errorItem.innerHTML = `
            <div style="font-weight: bold; color: #dc2626; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 16px;">❌</span>
              <span>${error.componentName}</span>
            </div>
            <div style="font-size: 12px; color: #666; margin-bottom: 4px;">
              Instance ID: <code style="background: #f3f4f6; padding: 2px 4px; border-radius: 3px;">${error.instanceId}</code>
            </div>
            ${error.pageSlug ? `
              <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
                Page: <code style="background: #f3f4f6; padding: 2px 4px; border-radius: 3px;">${error.pageSlug}</code>
              </div>
            ` : ''}
            <div style="font-size: 13px; color: #dc2626; padding: 8px; background: #fef2f2; border-radius: 4px; border-left: 3px solid #dc2626;">
              ${error.reason}
            </div>
          `;

                    panel.appendChild(errorItem);
                });
            }
        }

        // Toggle error panel visibility
        function toggleErrorPanel() {
            if (errorPanelElement) {
                isExpanded = !isExpanded;
                errorPanelElement.style.display = isExpanded ? 'block' : 'none';
            }
        }

        // Scan for component errors on the page
        function scanForErrors() {
            const newErrors: ComponentError[] = [];

            // Look for component error elements that were rendered by the site
            const errorElements = document.querySelectorAll('.component-error[data-instance-id]');

            errorElements.forEach((element) => {
                const instanceId = element.getAttribute('data-instance-id');
                const errorText = element.querySelector('p')?.textContent || '';

                // Extract component name from error message
                const componentNameMatch = errorText.match(/Component '([^']+)' not found/);
                const componentName = componentNameMatch ? componentNameMatch[1] : 'Unknown';

                if (instanceId) {
                    newErrors.push({
                        componentName,
                        instanceId,
                        reason: errorText,
                        pageSlug: window.location.pathname
                    });
                }
            });

            // Update errors array
            errors.length = 0;
            errors.push(...newErrors);

            // Update UI
            updateErrorCount();
            if (errorPanelElement) {
                updateErrorPanel(errorPanelElement);
            }
        }

        // Initialize the toolbar
        function initToolbar() {
            const button = createToolbarButton();
            errorPanelElement = createErrorPanel();

            canvas.appendChild(button);
            canvas.appendChild(errorPanelElement);

            // Initial scan
            scanForErrors();

            // Scan for errors periodically and on page changes
            setInterval(scanForErrors, 2000);

            // Listen for navigation changes
            let lastPath = window.location.pathname;
            setInterval(() => {
                if (window.location.pathname !== lastPath) {
                    lastPath = window.location.pathname;
                    setTimeout(scanForErrors, 500); // Give time for new content to load
                }
            }, 100);
        }

        // Handle app toggle
        app.onToggled(({ state }) => {
            if (state) {
                // App is being turned on
                scanForErrors();
            } else {
                // App is being turned off
                isExpanded = false;
                if (errorPanelElement) {
                    errorPanelElement.style.display = 'none';
                }
            }
        });

        // Initialize when app loads
        initToolbar();
    },
});
