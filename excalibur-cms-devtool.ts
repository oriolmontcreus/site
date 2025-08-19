import { defineToolbarApp } from "astro/toolbar";

interface ComponentIssue {
    componentName: string;
    instanceId: string;
    reason: string;
    pageSlug?: string;
}

export default defineToolbarApp({
    init(canvas, app, server) {
        const issues: ComponentIssue[] = [];
        let sidebarElement: HTMLElement;
        let isDarkMode = false;

        // Detect theme preference
        function detectTheme() {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            isDarkMode = mediaQuery.matches;

            // Listen for theme changes
            mediaQuery.addEventListener('change', (e) => {
                isDarkMode = e.matches;
                updateTheme();
            });
        }

        // Apply your custom color scheme
        function getThemeColors() {
            return {
                background: isDarkMode ? 'oklch(0.1450 0 0)' : 'oklch(0.9612 0 0)',
                card: isDarkMode ? 'oklch(0.2046 0 0)' : 'oklch(0.9911 0 0)',
                cardForeground: isDarkMode ? 'oklch(0.9288 0.0126 255.5078)' : 'oklch(0.2046 0 0)',
                muted: isDarkMode ? 'oklch(0.2393 0 0)' : 'oklch(0.9461 0 0)',
                mutedForeground: isDarkMode ? 'oklch(0.7122 0 0)' : 'oklch(0.2435 0 0)',
                border: isDarkMode ? 'oklch(0.2809 0 0)' : 'oklch(0.9037 0 0)',
                input: isDarkMode ? 'oklch(0.2603 0 0)' : '#dbdbdb',
                primary: isDarkMode ? 'oklch(0.4365 0.1044 156.7556)' : 'oklch(0.7611 0.1735 156.3879)',
                primaryForeground: isDarkMode ? 'oklch(0.9213 0.0135 167.1556)' : 'oklch(0.2626 0.0147 166.4589)',
                secondary: isDarkMode ? 'oklch(0.2603 0 0)' : 'oklch(0.9189 0 0)',
                secondaryForeground: isDarkMode ? 'oklch(0.9851 0 0)' : 'oklch(0.2046 0 0)',
                destructive: isDarkMode ? 'oklch(0.5523 0.1927 32.7272)' : 'oklch(0.5523 0.1927 32.7272)',
                destructiveForeground: isDarkMode ? 'oklch(0.9368 0.0045 34.3092)' : 'oklch(0.9934 0.0032 17.2118)',
                ring: isDarkMode ? 'oklch(0.8003 0.1821 151.7110)' : 'oklch(0.7611 0.1735 156.3879)',
                accent: isDarkMode ? 'oklch(0.3132 0 0)' : 'oklch(0.9461 0 0)',
                accentForeground: isDarkMode ? 'oklch(0.9851 0 0)' : 'oklch(0.2435 0 0)',
            };
        }

        // Create sidebar
        function createSidebar() {
            const sidebar = document.createElement('div');
            const colors = getThemeColors();

            sidebar.style.cssText = `
        position: fixed;
        top: 0;
        right: -420px;
        width: 420px;
        height: 100vh;
        background: ${colors.background};
        border-left: 1px solid ${colors.border};
        z-index: 999998;
        transition: right 0.15s ease-out;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        display: flex;
        flex-direction: column;
        box-shadow: 0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 8px 10px -1px hsl(0 0% 0% / 0.17);
      `;

            // Header
            const header = document.createElement('div');
            header.style.cssText = `
        padding: 24px;
        border-bottom: 1px solid ${colors.border};
        background: ${colors.card};
      `;

            const title = document.createElement('div');
            title.style.cssText = `
        font-size: 18px;
        font-weight: 600;
        color: ${colors.cardForeground};
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 2px;
      `;
            title.innerHTML = `Excalibur CMS DevTool`;

            const subtitle = document.createElement('div');
            subtitle.style.cssText = `
        font-size: 14px;
        color: ${colors.mutedForeground};
        font-weight: 400;
      `;

            header.appendChild(title);
            header.appendChild(subtitle);

            // Content area
            const content = document.createElement('div');
            content.style.cssText = `
        flex: 1;
        overflow-y: auto;
      `;

            sidebar.appendChild(header);
            sidebar.appendChild(content);

            return { sidebar, subtitle, content };
        }

        // Update theme
        function updateTheme() {
            if (!sidebarElement) return;

            const colors = getThemeColors();

            sidebarElement.style.background = colors.background;
            sidebarElement.style.borderColor = colors.border;

            const header = sidebarElement.querySelector('div') as HTMLElement;
            if (header) {
                header.style.background = colors.card;
                header.style.borderColor = colors.border;

                const title = header.querySelector('div') as HTMLElement;
                if (title) {
                    title.style.color = colors.cardForeground;
                }
            }

            updateIssueDisplay();
        }

        // Update issue display in sidebar
        function updateIssueDisplay() {
            const sidebar = sidebarElement;
            if (!sidebar) return;

            const colors = getThemeColors();
            const header = sidebar.querySelector('div') as HTMLElement;
            const subtitle = header?.querySelector('div:nth-child(2)') as HTMLElement;
            const content = sidebar.querySelector('div:nth-child(2)') as HTMLElement;

            if (subtitle) {
                const count = issues.length;
                if (count === 0) {
                    subtitle.textContent = 'All components are working correctly';
                    subtitle.style.color = colors.mutedForeground;
                } else {
                    subtitle.textContent = `${count} component issue${count > 1 ? 's' : ''} detected`;
                    subtitle.style.color = colors.destructive;
                }
            }

            if (content) {
                content.innerHTML = '';

                if (issues.length === 0) {
                    const noIssues = document.createElement('div');
                    noIssues.style.cssText = `
            padding: 48px 24px;
            text-align: center;
            color: ${colors.mutedForeground};
          `;
                    noIssues.innerHTML = `
            <div style="width: 48px; height: 48px; margin: 0 auto 16px; background: ${colors.muted}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">✓</div>
            <div style="font-size: 16px; font-weight: 500; color: ${colors.cardForeground}; margin-bottom: 8px;">
              No issues found
            </div>
            <div style="font-size: 14px;">
              All components are loading correctly
            </div>
          `;
                    content.appendChild(noIssues);
                } else {
                    issues.forEach((issue, index) => {
                        const issueCard = document.createElement('div');
                        issueCard.style.cssText = `
              padding: 12px;
              margin-top: 12px;
              background: ${colors.card};
              border: 1px solid ${colors.border};
              border-radius: 0.5rem;
              transition: border-color 0.15s ease-in-out;
            `;

                        // Add subtle hover effect
                        issueCard.addEventListener('mouseenter', () => {
                            issueCard.style.borderColor = colors.ring;
                        });
                        issueCard.addEventListener('mouseleave', () => {
                            issueCard.style.borderColor = colors.border;
                        });

                        issueCard.innerHTML = `
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="width: 20px; height: 20px; background: ${colors.destructive}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; color: ${colors.destructiveForeground}; flex-shrink: 0; margin-top: 1px;">!</div>
                <div style="flex: 1; min-width: 0;">
                  <div style="font-weight: 600; font-size: 14px; color: ${colors.cardForeground}; margin-bottom: 4px;">
                    ${issue.componentName}
                  </div>
                  <div style="font-size: 12px; color: ${colors.mutedForeground}; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace; margin-bottom: 8px;">
                    ${issue.instanceId}
                  </div>
                  <div style="background: ${colors.muted}; padding: 8px; border-radius: 0.375rem; font-size: 13px; color: ${colors.mutedForeground}; line-height: 1.4;">
                    ${issue.reason}
                  </div>
                  ${issue.pageSlug ? `
                    <div style="margin-top: 8px; font-size: 12px; color: ${colors.mutedForeground};">
                      <span style="background: ${colors.accent}; padding: 1px 6px; border-radius: 0.25rem; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;">${issue.pageSlug}</span>
                    </div>
                  ` : ''}
                </div>
              </div>
            `;

                        content.appendChild(issueCard);
                    });
                }
            }
        }

        // Show/hide sidebar
        function showSidebar() {
            if (sidebarElement) {
                sidebarElement.style.right = '0';
                createOverlay();
            }
        }

        function hideSidebar() {
            if (sidebarElement) {
                sidebarElement.style.right = '-420px';
                removeOverlay();
            }
        }

        // Create overlay
        function createOverlay() {
            const overlay = document.createElement('div');
            overlay.id = 'excalibur-cms-devtool-overlay';
            overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.15);
        z-index: 999997;
        transition: opacity 0.15s ease-out;
        opacity: 0;
      `;

            overlay.addEventListener('click', () => {
                hideSidebar();
                app.toggleState({ state: false });
            });
            canvas.appendChild(overlay);

            // Fade in
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
            });
        }

        // Remove overlay
        function removeOverlay() {
            const overlay = canvas.querySelector('#excalibur-cms-devtool-overlay');
            if (overlay) {
                overlay.remove();
            }
        }

        // Scan for component issues
        function scanForIssues() {
            const newIssues: ComponentIssue[] = [];

            const errorElements = document.querySelectorAll('.component-error[data-instance-id]');

            errorElements.forEach((element) => {
                const instanceId = element.getAttribute('data-instance-id');
                const errorText = element.querySelector('p')?.textContent || '';

                const componentNameMatch = errorText.match(/Component '([^']+)' not found/);
                const componentName = componentNameMatch ? componentNameMatch[1] : 'Unknown';

                if (instanceId) {
                    newIssues.push({
                        componentName,
                        instanceId,
                        reason: errorText,
                        pageSlug: window.location.pathname
                    });
                }
            });

            issues.length = 0;
            issues.push(...newIssues);

            updateIssueDisplay();
        }

        // Initialize
        function initToolbar() {
            detectTheme();

            const { sidebar, subtitle, content } = createSidebar();
            sidebarElement = sidebar;

            canvas.appendChild(sidebar);

            // Initial scan
            scanForIssues();

            // Periodic scanning
            setInterval(scanForIssues, 2000);

            // Navigation detection
            let lastPath = window.location.pathname;
            setInterval(() => {
                if (window.location.pathname !== lastPath) {
                    lastPath = window.location.pathname;
                    setTimeout(scanForIssues, 500);
                }
            }, 100);
        }

        // Handle app toggle - sidebar opens/closes instantly with dev toolbar toggle
        app.onToggled(({ state }) => {
            if (state) {
                scanForIssues();
                showSidebar();
            } else {
                hideSidebar();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Check if the dev toolbar app is active by checking our sidebar visibility
            const sidebarVisible = sidebarElement && sidebarElement.style.right === '0px';

            if (e.key === 'Escape' && sidebarVisible) {
                hideSidebar();
                app.toggleState({ state: false });
            }
        });

        initToolbar();
    },

    beforeTogglingOff() {
        // Ensure sidebar is hidden when the app is being toggled off
        const sidebarElement = document.querySelector('#excalibur-cms-devtool-overlay')?.parentElement?.querySelector('div[style*="position: fixed"][style*="right:"]') as HTMLElement;
        if (sidebarElement && sidebarElement.style.right === '0px') {
            sidebarElement.style.right = '-420px';
        }
        
        // Remove overlay if it exists
        const overlay = document.querySelector('#excalibur-cms-devtool-overlay');
        if (overlay) {
            overlay.remove();
        }
        
        return true;
    },
});
