import type { ReactNode } from 'react';

export interface SiteProfile {
  handles: string[];
  introduction: string;
  biography: ReactNode[];
}

export interface Skill {
  name: string;
  description: ReactNode;
}

export type CompetitionCategory = 'Cyber' | 'Coding';

export interface Competition {
  name: string;
  result: string;
  category: CompetitionCategory;
}

export interface ContactLink {
  name: string;
  href: string;
  icon: string;
  external?: boolean;
}

export const profile: SiteProfile = {
  handles: ['LaughableHammer', 'Kushaagra'],
  introduction:
    'Part-time penetration tester for the Australian Government and full-time Computer Science student at UNSW Sydney.',
  biography: [
    <>
      I'm a Computer Science (Sec. Engineering) student and a director at UNSW SecSoc. I'm
      involved with recruiting and leading subcommittee to build projects that improve technical
      ability and also have an impact on the security community at UNSW.
    </>,
    <>
      Alongside I'm an OSCP-certified penetration tester in APS, focusing primarily on web app
      security.
    </>,
    <>
      When I'm not doing security, you'll find me fixing PCs at{' '}
      <a href="https://www.arc.unsw.edu.au/community/ereuse" target="_blank" rel="noopener noreferrer">
        eReuse
      </a>
      , meddling with my homelab or playing car soccer.
    </>,
  ],
};

export const skills: Skill[] = [
  {
    name: 'Penetration Testing',
    description:
      "I use the skills I've acquired playing in many CTF competitions to identify security flaws in web apps, APIs, and infrastructure as part of my job",
  },
  {
    name: 'Infrastructure',
    description:
      'I enjoy setting up hardware/cloud infra to host projects that provide QoL improvements for myself and others. I have hosted infra for CTFs competitions on CTFd on bare metal and maintain a multi-use homelab',
  },
  {
    name: 'Programming',
    description: (
      <>
        I'm a CS student at UNSW and enjoy full stack dev, checkout my latest project -{' '}
        <a
          href="https://github.com/unswsecsoc/UNSW-Discord-Verification-Bot"
          target="_blank"
          rel="noopener noreferrer"
        >
          UNSW Discord Verification Bot
        </a>
      </>
    ),
  },
  {
    name: 'Mentoring',
    description:
      "As a previous cyber and networking tutor for high school students, I'm passionate about passing on my experience to those who want to get started in cyber",
  },
];

export const contacts: ContactLink[] = [
  {
    name: 'Discord',
    href: 'https://discord.com/users/421601310522081291',
    icon: '/discord.png',
    external: true,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/LaughableHammer',
    icon: '/github.png',
    external: true,
  },
  {
    name: 'Email Me',
    href: 'mailto:laughable.hammer@gmail.com',
    icon: '/email.png',
  },
];

export const competitions: Competition[] = [
  {
    name: 'CyberTaipan - Australian Youth Cyber Defence Competition 2021',
    result: '~40 / ~160 — Team: Cyber 4',
    category: 'Cyber',
  },
  {
    name: 'CyberTaipan - Australian Youth Cyber Defence Competition 2022',
    result: '~13 / ~160 — Team: Sudoers',
    category: 'Cyber',
  },
  { name: 'DUCTF 2022', result: '387 / 1938 — Team: Laughable-Duck', category: 'Cyber' },
  {
    name: 'CyberTaipan - Australian Youth Cyber Defence Competition 2023',
    result: '🥇 1 / ~160 | Won $5000 — Team: The Kernel Krushers',
    category: 'Cyber',
  },
  { name: 'DUCTF 2024', result: '234 / 1515 — Team: The Kernel Krushers', category: 'Cyber' },
  { name: 'DamCTF 2024', result: '62 / 207 — Team: P4$$word123', category: 'Cyber' },
  {
    name: 'ASD ANU CTF 2024',
    result: '88 / 187 — Team: The Kernel Krushers',
    category: 'Cyber',
  },
  {
    name: 'NahamCon CTF 2025',
    result: '388 / 2943 — Team: [Sev.Aus] Cyb3r-Gh0u1z',
    category: 'Cyber',
  },
  {
    name: 'SecSoc + DevSoc + CSESoc Rookie Code Rumble CTF (May 2025)',
    result: '🥇 1st non-beginner | 🥉 3rd overall | Won $90 — Team: The Hammers',
    category: 'Cyber',
  },
  { name: 'DUCTF 2025', result: '473 / 1668 — Team: [Sev.Aus] Cyber Ghoulz', category: 'Cyber' },
  {
    name: 'SecTalks Ninja Night 18',
    result: '🥉 3 / 20 | Won $10, RPi Pico, clear lockpicking lock — Team: ecorp',
    category: 'Cyber',
  },
  { name: 'K17 CTF 2025', result: ' 229 / 972 — Team: king of hacking', category: 'Cyber' },
  { name: 'CSE Rookie Code Rumble 2024', result: '🥇 1st place', category: 'Coding' },
  {
    name: 'South Pacific ICPC Level B 2024',
    result: '18 / 52 teams at UNSW',
    category: 'Coding',
  },
];
