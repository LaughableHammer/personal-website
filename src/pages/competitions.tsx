import { useState } from 'react';
import { Info } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { competitions, type CompetitionCategory } from '../site-content';

const tabs: CompetitionCategory[] = ['Cyber', 'Coding'];

export default function Competitions() {
  const [activeTab, setActiveTab] = useState<CompetitionCategory>('Cyber');
  const visibleCompetitions = competitions.filter((competition) => competition.category === activeTab);

  return (
    <>
      <PageHero title="Scoreboard">
        <p>Competition placements and teams across cyber security and competitive programming.</p>
      </PageHero>
      <div className="site-container page-content scoreboard-page">
        <div className="scoreboard-title-row">
          <div>
            <span className="section-eyebrow">Standings</span>
            <h2>{activeTab === 'Cyber' ? 'Cyber Competitions' : 'Coding Competitions'}</h2>
          </div>
          {activeTab === 'Cyber' && (
            <div className="info-popover">
              <button type="button" className="icon-button info-button" aria-describedby="competition-note">
                <Info aria-hidden="true" />
                <span className="sr-only">About this list</span>
              </button>
              <span className="info-tooltip" role="tooltip" id="competition-note">
                at least the ones that I remembered to record :(
              </span>
            </div>
          )}
        </div>

        <div className="scoreboard-tabs" role="tablist" aria-label="Competition category">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              className={activeTab === tab ? 'is-active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="scoreboard-card">
          <table className="scoreboard-table">
            <thead>
              <tr><th>Place</th><th>Competition</th><th>Result</th></tr>
            </thead>
            <tbody>
              {visibleCompetitions.map((competition, index) => (
                <tr key={competition.name}>
                  <td data-label="Place"><span className="standing-number">{index + 1}</span></td>
                  <td data-label="Competition" className="competition-name">{competition.name}</td>
                  <td data-label="Result">{competition.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
