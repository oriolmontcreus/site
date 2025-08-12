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

        // Minimal shadcn-style theme colors
        function getThemeColors() {
            return {
                background: isDarkMode ? 'hsl(224 71% 4%)' : 'hsl(0 0% 100%)',
                card: isDarkMode ? 'hsl(224 71% 4%)' : 'hsl(0 0% 100%)',
                cardForeground: isDarkMode ? 'hsl(213 31% 91%)' : 'hsl(224 71% 4%)',
                muted: isDarkMode ? 'hsl(215 28% 17%)' : 'hsl(220 14% 96%)',
                mutedForeground: isDarkMode ? 'hsl(217 33% 64%)' : 'hsl(220 9% 46%)',
                border: isDarkMode ? 'hsl(215 28% 17%)' : 'hsl(220 13% 91%)',
                input: isDarkMode ? 'hsl(215 28% 17%)' : 'hsl(220 13% 91%)',
                primary: isDarkMode ? 'hsl(210 40% 98%)' : 'hsl(224 71% 4%)',
                primaryForeground: isDarkMode ? 'hsl(222.2 84% 4.9%)' : 'hsl(210 40% 98%)',
                secondary: isDarkMode ? 'hsl(215 28% 17%)' : 'hsl(220 14% 96%)',
                secondaryForeground: isDarkMode ? 'hsl(210 40% 98%)' : 'hsl(220 9% 46%)',
                destructive: isDarkMode ? 'hsl(0 63% 31%)' : 'hsl(0 84% 60%)',
                destructiveForeground: 'hsl(210 40% 98%)',
                ring: isDarkMode ? 'hsl(216 34% 17%)' : 'hsl(215 20% 65%)',
                accent: isDarkMode ? 'hsl(215 28% 17%)' : 'hsl(220 14% 96%)',
                accentForeground: isDarkMode ? 'hsl(210 40% 98%)' : 'hsl(220 9% 46%)',
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
        font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        display: flex;
        flex-direction: column;
        box-shadow: -4px 0 6px -1px rgba(0, 0, 0, 0.1), -2px 0 4px -1px rgba(0, 0, 0, 0.06);
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
              border-radius: 8px;
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
                  <div style="background: ${colors.muted}; padding: 8px; border-radius: 6px; font-size: 13px; color: ${colors.mutedForeground}; line-height: 1.4;">
                    ${issue.reason}
                  </div>
                  ${issue.pageSlug ? `
                    <div style="margin-top: 8px; font-size: 12px; color: ${colors.mutedForeground};">
                      <span style="background: ${colors.accent}; padding: 1px 6px; border-radius: 4px; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;">${issue.pageSlug}</span>
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

            overlay.addEventListener('click', hideSidebar);
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
            // Check if the toolbar app is active
            const toolbarApp = document.querySelector('[data-app-id="excalibur-cms-devtool"]');
            const isActive = toolbarApp?.getAttribute('data-app-active') === 'true';

            if (e.key === 'Escape' && isActive) {
                hideSidebar();
                // Also disable the toolbar app
                if (toolbarApp) {
                    (toolbarApp as HTMLElement).click();
                }
            }
        });

        initToolbar();
    },
});
