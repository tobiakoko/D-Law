import { expect, test } from '@playwright/test';

test.describe('home page smoke', () => {
  test('prerendered HTML contains real content (SEO gate)', async ({ request }) => {
    const html = await (await request.get('/')).text();
    expect(html).toContain('Osei K. Prempeh');
    expect(html).toContain('Immigration Law');
    expect(html).toContain('(813) 879-5919');
    expect(html).toContain('application/ld+json');
    expect(html).not.toMatch(/555-01\d\d/);
    expect(html).not.toContain('fonts.googleapis.com');
  });

  test('hero, practice area and phone render; consultation modal opens and closes on Escape', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });

    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Uncompromising Legal Advocacy');
    await expect(page.getByRole('heading', { name: 'Immigration Law', level: 3 })).toBeVisible();
    await expect(page.getByRole('link', { name: /\(813\) 879-5919/ }).first()).toBeVisible();

    // Hero CTA (visible on every viewport).
    const cta = page.getByRole('button', { name: 'Schedule Consultation' }).first();
    await cta.click();
    const dialog = page.getByRole('dialog', { name: 'Schedule a Consultation' });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(cta).toBeFocused();

    expect(errors, `console/page errors:\n${errors.join('\n')}`).toEqual([]);
  });

  test('no horizontal overflow', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
