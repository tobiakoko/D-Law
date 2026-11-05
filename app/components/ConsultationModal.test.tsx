import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { buildConsultationMailto, ConsultationModal } from '~/components/ConsultationModal';
import { CONTACT_INFO } from '~/data/firm';
import { navigateTo } from '~/lib/navigate';

vi.mock('~/lib/navigate', () => ({ navigateTo: vi.fn() }));

const request = {
  fullName: 'Ama Mensah',
  phone: '(555) 010-2000',
  email: 'ama@example.com',
  practiceArea: 'family-law',
  preferredDate: '2030-01-15',
  preferredTime: '10:30 AM',
  consultationType: 'video' as const,
  briefNotes: 'Custody question & timeline?',
};

describe('buildConsultationMailto', () => {
  it('addresses the firm and encodes every field into subject/body', () => {
    const href = buildConsultationMailto(request);
    expect(href.startsWith(`mailto:${CONTACT_INFO.email}?subject=`)).toBe(true);

    const params = new URLSearchParams(href.slice(href.indexOf('?') + 1));
    expect(params.get('subject')).toBe('Consultation request: Family Law — Ama Mensah');
    const body = params.get('body') ?? '';
    for (const expected of [
      'Name: Ama Mensah',
      'Phone: (555) 010-2000',
      'Email: ama@example.com',
      'Practice area: Family Law',
      'Preferred date: 2030-01-15',
      'Preferred time: 10:30 AM',
      'Format: Video call',
      'Custody question & timeline?',
    ]) {
      expect(body).toContain(expected);
    }
  });

  it('notes when no description was given', () => {
    const body = new URLSearchParams(buildConsultationMailto({ ...request, briefNotes: '  ' }).split('?')[1]).get(
      'body',
    );
    expect(body).toContain('(none provided)');
  });
});

describe('ConsultationModal wizard', () => {
  beforeEach(() => vi.mocked(navigateTo).mockClear());

  const renderOpen = (initialPracticeArea?: string) =>
    render(<ConsultationModal isOpen onClose={vi.fn()} initialPracticeArea={initialPracticeArea} />);

  it('renders nothing when closed', () => {
    render(<ConsultationModal isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('preselects the requested practice area', () => {
    renderOpen('criminal-defense');
    expect(screen.getByLabelText('Practice Area')).toHaveValue('criminal-defense');
  });

  it('steps 1 → 2 → 3 and back, then opens a pre-filled mailto on submit', async () => {
    const user = userEvent.setup();
    renderOpen('immigration');

    expect(screen.getByRole('dialog', { name: 'Schedule a Consultation' })).toBeInTheDocument();
    expect(screen.queryByText(/attorney-client privilege/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole('radio', { name: /phone call/i }));
    await user.click(screen.getByRole('button', { name: /continue to date/i }));
    expect(screen.getByLabelText('Preferred Date')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByLabelText('Practice Area')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /continue to date/i }));
    await user.click(screen.getByRole('radio', { name: '04:00 PM' }));
    await user.click(screen.getByRole('button', { name: /continue to your details/i }));

    // Required fields block submission.
    await user.click(screen.getByRole('button', { name: /open email to send/i }));
    expect(navigateTo).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText(/full name/i), 'Kofi Boateng');
    await user.type(screen.getByLabelText(/^phone/i), '813-000-0000');
    await user.type(screen.getByLabelText(/^email/i), 'kofi@example.com');
    await user.click(screen.getByRole('button', { name: /open email to send/i }));

    expect(navigateTo).toHaveBeenCalledTimes(1);
    const href = vi.mocked(navigateTo).mock.calls[0][0];
    expect(href).toMatch(new RegExp(`^mailto:${CONTACT_INFO.email}\\?`));
    const body = new URLSearchParams(href.split('?')[1]).get('body') ?? '';
    expect(body).toContain('Name: Kofi Boateng');
    expect(body).toContain('Practice area: Immigration Law');
    expect(body).toContain('Preferred time: 04:00 PM');
    expect(body).toContain('Format: Phone call');

    // Honest confirmation: must press Send; never "received".
    expect(screen.getByRole('heading', { name: /press send/i })).toBeInTheDocument();
    expect(screen.queryByText(/has been received/i)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open email again/i })).toHaveAttribute('href', href);
  });

  it('always shows tel: and mailto: fallbacks', () => {
    renderOpen();
    expect(screen.getByRole('link', { name: CONTACT_INFO.phone })).toHaveAttribute(
      'href',
      `tel:${CONTACT_INFO.phoneTel}`,
    );
    expect(screen.getByRole('link', { name: CONTACT_INFO.email })).toHaveAttribute(
      'href',
      `mailto:${CONTACT_INFO.email}`,
    );
  });

  it('closes on Escape', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ConsultationModal isOpen onClose={onClose} />);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
