import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FAQ_ITEMS, PRACTICE_AREAS } from '~/data/firm';
import { ABOUT_TABS, AboutAttorney } from '~/sections/AboutAttorney';
import { FaqSection, filterFaqs } from '~/sections/FaqSection';
import { Navbar } from '~/sections/Navbar';
import { filterPracticeAreas, PracticeAreas } from '~/sections/PracticeAreas';

describe('FaqSection (single-open accordion)', () => {
  it('opens the first item by default and keeps only one open at a time', async () => {
    const user = userEvent.setup();
    render(<FaqSection onOpenConsultation={vi.fn()} />);

    const [first, second] = FAQ_ITEMS;
    const firstBtn = screen.getByRole('button', { name: first.question });
    const secondBtn = screen.getByRole('button', { name: second.question });

    expect(firstBtn).toHaveAttribute('aria-expanded', 'true');
    expect(firstBtn).toHaveAttribute('aria-controls', `faq-panel-${first.id}`);
    expect(document.getElementById(`faq-panel-${first.id}`)).toBeVisible();

    await user.click(secondBtn);
    expect(secondBtn).toHaveAttribute('aria-expanded', 'true');
    expect(firstBtn).toHaveAttribute('aria-expanded', 'false');
    expect(document.getElementById(`faq-panel-${first.id}`)).not.toBeVisible();

    await user.click(secondBtn);
    expect(secondBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('filters by category and search text', () => {
    expect(filterFaqs(FAQ_ITEMS, '', 'fees').every((f) => f.category === 'fees')).toBe(true);
    expect(filterFaqs(FAQ_ITEMS, 'REMOTE', 'all').map((f) => f.id)).toEqual(['faq-4']);
    expect(filterFaqs(FAQ_ITEMS, 'zzz-no-match', 'all')).toHaveLength(0);
  });
});

describe('Navbar mobile menu', () => {
  it('opens the drawer dialog, closes on Escape and restores focus', async () => {
    const user = userEvent.setup();
    render(<Navbar onOpenConsultation={vi.fn()} />);

    const toggle = screen.getByRole('button', { name: /open navigation menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');
    expect(dialog).toContainElement(document.activeElement as HTMLElement);

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
  });

  it('traps Tab focus inside the drawer', async () => {
    const user = userEvent.setup();
    render(<Navbar onOpenConsultation={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: /open navigation menu/i }));
    const dialog = screen.getByRole('dialog');
    for (let i = 0; i < 15; i += 1) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
    await user.tab({ shift: true });
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
  });

  it('a nav link click closes the drawer', async () => {
    const user = userEvent.setup();
    render(<Navbar onOpenConsultation={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: /open navigation menu/i }));
    await user.click(within(screen.getByRole('dialog')).getByRole('link', { name: 'FAQ' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('PracticeAreas filter', () => {
  it('filters by group with stable ids', () => {
    expect(filterPracticeAreas('all')).toHaveLength(PRACTICE_AREAS.length);
    expect(filterPracticeAreas('business').map((p) => p.id)).toEqual(['international-business', 'contract-disputes']);
    expect(filterPracticeAreas('defense').map((p) => p.id)).toEqual(['personal-injury', 'criminal-defense']);
  });

  it('updates the rendered cards and pressed state when a filter is chosen', async () => {
    const user = userEvent.setup();
    render(<PracticeAreas onSelectPractice={vi.fn()} onBookConsultation={vi.fn()} />);
    const headings = () => screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);

    expect(headings()).toHaveLength(PRACTICE_AREAS.length);
    const businessBtn = screen.getByRole('button', { name: 'Corporate & Business' });
    await user.click(businessBtn);
    expect(businessBtn).toHaveAttribute('aria-pressed', 'true');
    expect(headings()).toEqual(['International Business', 'Contract Disputes']);
  });

  it('wires detail and consult callbacks with the practice area', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onBook = vi.fn();
    render(<PracticeAreas onSelectPractice={onSelect} onBookConsultation={onBook} />);
    await user.click(screen.getByRole('button', { name: 'View details: Family Law' }));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'family-law' }));
    await user.click(screen.getByRole('button', { name: 'Request a Family Law consultation' }));
    expect(onBook).toHaveBeenCalledWith('family-law');
  });
});

describe('AboutAttorney tabs', () => {
  it('uses tablist semantics with roving tabindex and arrow-key navigation', async () => {
    const user = userEvent.setup();
    render(<AboutAttorney />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs.map((t) => t.textContent)).toEqual(ABOUT_TABS.map((t) => t.label));
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', tabs[0].id);

    tabs[0].focus();
    await user.keyboard('{ArrowRight}');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', tabs[1].id);

    await user.keyboard('{End}');
    expect(tabs[2]).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(tabs[0]).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{Home}');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('keeps all panels in the DOM (prerendered for SEO), hiding inactive ones', () => {
    render(<AboutAttorney />);
    expect(screen.getByText('Juris Doctor (J.D.)')).not.toBeVisible();
    expect(screen.getByText('Arrival in the United States')).toBeVisible();
  });
});
