import Link from 'next/link'
import Legal, { type Section } from '../components/Legal'

export const metadata = {
  title: 'Terms of Service · ROOH',
  description: 'The ground rules for using the ROOH website and taking part in the ROOH Discord community.',
}

const contact = <Link href="/contact">Contact page</Link>

const sections: Section[] = [
  {
    id: 'agreement',
    title: 'Agreement',
    body: (
      <p>
        These terms cover the ROOH website and the ROOH Discord community. By using either one, you agree to them. If you don’t agree, please don’t use the site or the server.
      </p>
    ),
  },
  {
    id: 'discord',
    title: 'Discord’s rules come first',
    body: (
      <>
        <p>
          ROOH runs on Discord, so <a href="https://discord.com/terms" target="_blank" rel="noreferrer">Discord’s Terms of Service</a> and{' '}
          <a href="https://discord.com/guidelines" target="_blank" rel="noreferrer">Community Guidelines</a> apply to everything you do in the server. ROOH is an independent
          community and is not affiliated with Discord Inc.
        </p>
        <p>The rules posted inside the server also apply. The team can update them at any time.</p>
      </>
    ),
  },
  {
    id: 'conduct',
    title: 'How we treat each other',
    body: (
      <ul>
        <li>Be respectful. No harassment, hate speech, threats or targeting anyone.</li>
        <li>No scams, fake vouches, impersonation, or attempts to mislead other members.</li>
        <li>No spam, unwanted promotion, or sharing anyone’s personal information.</li>
        <li>Nothing illegal and no NSFW content outside places the server allows it.</li>
      </ul>
    ),
  },
  {
    id: 'vouches',
    title: 'Vouches and trades',
    body: (
      <>
        <p>
          Vouches are statements made by members about their own experience. They are <strong>not a guarantee</strong> from ROOH, and ROOH is not a party to any trade between
          members.
        </p>
        <ul>
          <li>Trade at your own risk and use your own judgement.</li>
          <li>Posting a false or paid-for vouch can get you removed from the server.</li>
          <li>If something goes wrong in a trade, report it through a ticket so the team can look into it.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'events',
    title: 'Events and rewards',
    body: (
      <ul>
        <li>Each event’s rules and rewards are announced on Discord. Those announcements apply to that event.</li>
        <li>The team may change, delay or cancel an event, and may disqualify anyone who breaks the rules or tries to cheat.</li>
        <li>Rewards go to the winners the team confirms, in the way announced for that event. Winners may need to share payment details privately through a ticket.</li>
        <li>The team’s decisions on results are final.</li>
      </ul>
    ),
  },
  {
    id: 'moderation',
    title: 'Moderation',
    body: (
      <p>
        The team may warn, mute, remove or ban anyone who breaks these terms or the server rules. If you think a decision was wrong, open a ticket and a different team member
        will review it.
      </p>
    ),
  },
  {
    id: 'content',
    title: 'Your content',
    body: (
      <p>
        What you post belongs to you. By posting in public channels such as #vouches, you let ROOH show that content on this website as described in our{' '}
        <Link href="/privacy">Privacy Policy</Link>. You can ask for it to be taken down at any time through our {contact}.
      </p>
    ),
  },
  {
    id: 'ours',
    title: 'Our name and artwork',
    body: <p>The ROOH name, logo, artwork and website design belong to ROOH. Please don’t use them in a way that suggests you represent us.</p>,
  },
  {
    id: 'as-is',
    title: 'No guarantees',
    body: (
      <p>
        The website and community are provided as they are, by volunteers. We do our best to keep things accurate and running, but we can’t promise the site will always be
        available or free of mistakes. To the extent the law allows, ROOH isn’t responsible for losses that come from using the site or server, including trades between
        members.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes',
    body: <p>We may update these terms. The date at the top of this page shows the latest version, and big changes will be announced on Discord.</p>,
  },
  {
    id: 'contact',
    title: 'Contact',
    body: <p>Questions about these terms? Visit our {contact} and open a ticket on Discord.</p>,
  },
]

export default function Terms() {
  return (
    <Legal
      label="Legal"
      title="Terms of Service"
      updated="6 Nov 2026"
      intro="The ground rules for the ROOH website and the community behind it, in plain words."
      sections={sections}
    />
  )
}
