import Link from 'next/link'
import Legal, { type Section } from '../components/Legal'

export const metadata = {
  title: 'Privacy Policy · ROOH',
  description: 'What the ROOH website shows, where it comes from, and how to get anything about you changed or removed.',
}

const contact = <Link href="/contact">Contact page</Link>

const sections: Section[] = [
  {
    id: 'summary',
    title: 'The short version',
    body: (
      <>
        <p>
          ROOH is a Discord community. This website is a window into it. It has <strong>no accounts, no sign-up, no forms, no ads and no tracking</strong>.
        </p>
        <p>
          Everything you see about people here (names, avatars, vouches, team roles) is already public inside the ROOH Discord server. If you want something about you changed or
          taken down, follow the steps on our {contact}.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-show',
    title: 'What this website shows',
    body: (
      <>
        <p>We display a small amount of information from the ROOH Discord server:</p>
        <ul>
          <li>
            <strong>Team members:</strong> Discord display name, username, avatar, profile banner, the date they joined the server and their team role.
          </li>
          <li>
            <strong>Vouches:</strong> messages posted in the server’s #vouches channel, including the text, the author’s name and avatar, the members mentioned, the date, and a
            link to the original message.
          </li>
          <li>
            <strong>Server stats:</strong> total member count and how many people are online. These are totals only and never name anyone.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'where-from',
    title: 'Where it comes from',
    body: (
      <>
        <p>
          Our Discord bot reads this information from the ROOH server and from Discord’s official API, and keeps a copy in our database so the website loads quickly. We
          don’t collect it from anywhere else, and we never buy or sell data.
        </p>
        <p>We use it only to run this website and the ROOH server. It is not shared with advertisers or data brokers.</p>
      </>
    ),
  },
  {
    id: 'visitors',
    title: 'When you visit',
    body: (
      <>
        <ul>
          <li>
            <strong>No cookies</strong> for tracking or advertising, and no analytics tools.
          </li>
          <li>
            Like any website, our hosting provider may keep short-lived technical logs (such as IP address, browser type and the page requested) to keep the site secure and
            running.
          </li>
          <li>
            Avatars and banners load directly from Discord’s image servers, so Discord can see that your browser requested those images. Discord’s own privacy policy covers that.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'other-sites',
    title: 'Discord and Instagram',
    body: (
      <p>
        Buttons on this site take you to Discord and to our Instagram. Once you’re there, their privacy policies apply, not this one. ROOH is not affiliated with Discord Inc. or
        Meta.
      </p>
    ),
  },
  {
    id: 'how-long',
    title: 'How long we keep it',
    body: (
      <ul>
        <li>When a vouch message is deleted in Discord, it disappears from this website automatically.</li>
        <li>When someone leaves the team, they are removed from the Team page.</li>
        <li>Profile details refresh from Discord, so changing your name or avatar on Discord updates it here too.</li>
      </ul>
    ),
  },
  {
    id: 'your-choices',
    title: 'Your choices',
    body: (
      <>
        <p>You can ask us to:</p>
        <ul>
          <li>remove your profile or a vouch that mentions you from the website,</li>
          <li>correct something that is wrong, or</li>
          <li>tell you what we hold about you.</li>
        </ul>
        <p>Open a ticket on our Discord server and the team will handle it. The steps are on our {contact}.</p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Age',
    body: <p>ROOH lives on Discord, so you need to meet Discord’s minimum age for your country to join. This website isn’t aimed at children.</p>,
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: <p>If this policy changes, we’ll update the date at the top of this page. Big changes will also be announced in the Discord server.</p>,
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: <p>We don’t handle requests by email. For any privacy question or request, visit our {contact} and open a ticket on Discord.</p>,
  },
]

export default function Privacy() {
  return (
    <Legal
      label="Legal"
      title="Privacy Policy"
      updated="6 Nov 2026"
      intro="No accounts, no tracking. Just a window into a Discord server, and here’s exactly what it shows."
      sections={sections}
    />
  )
}
