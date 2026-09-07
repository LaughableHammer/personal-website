import { useCallback, useState } from 'react';
import { Award, ShieldCheck, Trophy } from 'lucide-react';
import TypewriterCycle from './components/ui/typewriter-effect';
import { Dialog } from './components/ui/dialog';
import { competitions, contacts, profile, skills, type Skill } from './site-content';

export default function App() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const closeSkill = useCallback(() => setActiveSkill(null), []);

  return (
    <>
      <header className="profile-hero">
        <div className="site-container profile-hero-layout">
          <div className="profile-avatar-wrap">
            <img className="profile-avatar" src="/portrait.jpg" alt="Portrait of Kushaagra" />
          </div>
          <div className="profile-identity">
            <TypewriterCycle />
            <p>{profile.introduction}</p>
            <div className="profile-badges" aria-label="Profile highlights">
              <span className="pill"><ShieldCheck aria-hidden="true" /> OSCP-certified</span>
              <span className="pill"><Trophy aria-hidden="true" /> {competitions.length} competitions</span>
              <span className="pill"><Award aria-hidden="true" /> UNSW SecSoc director</span>
            </div>
          </div>
        </div>
      </header>

      <div className="site-container profile-content">
        <section className="content-section" aria-labelledby="whoami-heading">
          <div className="section-heading">
            <span className="section-eyebrow">Player profile</span>
            <h2 id="whoami-heading">whoami</h2>
          </div>
          <div className="content-card biography-card">
            {profile.biography.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </section>

        <section className="content-section" aria-labelledby="skills-heading">
          <div className="section-heading">
            <span className="section-eyebrow">Awards</span>
            <h2 id="skills-heading">Skills</h2>
          </div>
          <div className="skill-grid">
            {skills.map((skill) => (
              <button className="skill-card" type="button" key={skill.name} onClick={() => setActiveSkill(skill)}>
                <Award aria-hidden="true" />
                <span>{skill.name}</span>
                <small>View details</small>
              </button>
            ))}
          </div>
        </section>

        <section className="content-section" aria-labelledby="contact-heading">
          <div className="section-heading">
            <span className="section-eyebrow">Get in touch</span>
            <h2 id="contact-heading">Contact Me</h2>
          </div>
          <div className="contact-grid">
            {contacts.map((contact) => (
              <a
                className="contact-card"
                key={contact.name}
                href={contact.href}
                target={contact.external ? '_blank' : undefined}
                rel={contact.external ? 'noopener noreferrer' : undefined}
              >
                <img src={contact.icon} alt="" />
                <span>{contact.name}</span>
              </a>
            ))}
          </div>
        </section>
      </div>

      {activeSkill && (
        <Dialog title={activeSkill.name} onClose={closeSkill}>
          <div className="skill-dialog-copy">{activeSkill.description}</div>
        </Dialog>
      )}
    </>
  );
}
