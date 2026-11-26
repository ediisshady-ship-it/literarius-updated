import React from 'react';

const institutionCredits = [
  {
    institution: 'The University of Melbourne',
    file: 'campus-unimelb.webp',
    description: 'Old Arts Building and Clock Tower, Parkville Campus, Melbourne, Victoria',
    source: 'Wikimedia Commons — File:Old Arts Building, University of Melbourne (2650386749).jpg',
    author: 'Alan Levine (cogdogblog)',
    licence: 'Creative Commons CC0 1.0 Universal Public Domain Dedication',
  },
  {
    institution: 'The University of Sydney',
    file: 'campus-usyd.webp',
    description: 'Main Quadrangle, Camperdown Campus, Sydney, New South Wales',
    source: 'Wikimedia Commons — File:The University of Sydney\'s Main Quadrangle.jpg',
    author: 'Jason Tong',
    licence: 'Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)',
  },
  {
    institution: 'UNSW Sydney',
    file: 'campus-unsw.webp',
    description: 'John Niland Scientia Building, Kensington Campus, Sydney, New South Wales',
    source: 'Wikimedia Commons — File:John Niland Scientia Building UNSW.jpg',
    author: 'unsw.flickr',
    licence: 'Creative Commons Attribution 2.0 Generic (CC BY 2.0)',
  },
  {
    institution: 'Australian National University',
    file: 'campus-anu.webp',
    description: 'Kambri Cultural & Student Precinct, Acton Campus, Canberra, ACT',
    source: 'Wikimedia Commons — File:Kambri at ANU.jpg',
    author: 'Alvinz',
    licence: 'Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
  },
  {
    institution: 'Monash University',
    file: 'campus-monash.webp',
    description: 'Robert Menzies Building, Clayton Campus, Melbourne, Victoria',
    source: 'Wikimedia Commons — File:Monash University Menzies Building.jpg',
    author: 'Melburnian',
    licence: 'Creative Commons Attribution 2.5 Generic (CC BY 2.5)',
  },
  {
    institution: 'University of Queensland',
    file: 'campus-uq.webp',
    description: 'Forgan Smith Building & Great Court, St Lucia Campus, Brisbane, Queensland',
    source: 'Wikimedia Commons — File:AUS Brisbane, St Lucia, University of Queensland 0010.jpg',
    author: '-wuppertaler',
    licence: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
  },
  {
    institution: 'University of Western Australia',
    file: 'campus-uwa.webp',
    description: 'Winthrop Hall and Reflection Pond, Crawley Campus, Perth, Western Australia',
    source: 'Wikimedia Commons — File:Winthrop Hall, UWA, September 2020 02.jpg',
    author: 'Calistemon',
    licence: 'Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
  },
];

const topicCredits = [
  {
    file: 'academic-excellence.webp',
    depicts: 'Academic square caps (graduation mortarboards)',
    source: 'File:Square academic cap (graduation hats).JPG by Raysonho',
    licence: 'CC BY-SA 4.0',
  },
  {
    file: 'research-innovation.webp',
    depicts: 'Scientific research in modern laboratory',
    source: 'File:Barbara McClintock in her laboratory in 1947.jpg (Smithsonian Institution)',
    licence: 'Public Domain',
  },
  {
    file: 'campus-life.webp',
    depicts: 'University campus grounds and lawns',
    source: 'File:Stanford Oval panorama.jpg by King of Hearts',
    licence: 'CC BY-SA 3.0',
  },
  {
    file: 'about-founded.webp',
    depicts: 'Academy library and study collection',
    source: 'File:Library and reading room of Oxford College ca.1899 (3195489874).jpg',
    licence: 'Public Domain',
  },
  {
    file: 'about-expansion.webp',
    depicts: 'University lecture theatre',
    source: 'File:Mathematics lecture at the Helsinki University of Technology.jpg',
    licence: 'Public Domain',
  },
  {
    file: 'article-cost-of-living.webp',
    depicts: 'Australian currency & financial history',
    source: 'File:AUS-3b-Commonwealth of Australia-10 Shillings (1918).jpg',
    licence: 'Public Domain',
  },
  {
    file: 'article-work-rights.webp',
    depicts: 'Sydney Harbour and commercial CBD',
    source: 'File:SydneyHarbour.jpg',
    licence: 'Public Domain',
  },
  {
    file: 'article-ielts-pte.webp',
    depicts: 'Student studying at library desk',
    source: 'File:HK Aberdeen Public Library n %E8%87%AA%E4%BF%AE%E5%AE%A4 Student Self-Study Room.JPG',
    licence: 'CC BY-SA 3.0',
  },
];

export default function Credits() {
  return (
    <div className="max-w-content mx-auto py-24">
      <div className="px-6 mb-12">
        <h1 className="font-playfair text-[32px] md:text-[44px] text-green-logo mb-6 tracking-tight">
          Image Credits & Attributions
        </h1>
        <p className="text-muted-aa">
          Campus imagery verified via Wikimedia Commons. All attributions below are reproduced from the source documents.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Institution Campus Imagery */}
        <div>
          <h2 className="font-playfair text-[28px] mb-6 tracking-tight">Institution Campus Imagery</h2>
          <ol className="space-y-4">
            {institutionCredits.map((credit) => (
              <li key={credit.institution} className="text-muted-aa">
                <p className="font-playfair italic text-emerald-text mb-2">
                  <strong>{credit.institution}</strong>
                </p>
                <p className="text-sm">
                  <strong>File:</strong> {credit.file}<br />
                  <strong>Depicts:</strong> {credit.description}<br />
                  <strong>Source:</strong> <a href={credit.source} target="_blank" rel="noopener noreferrer" className="underline">
                    {credit.source}
                  </a><br />
                  <strong>Author:</strong> {credit.author}<br />
                  <strong>Licence:</strong> {credit.licence}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Topic & Educational Imagery */}
        <div>
          <h2 className="font-playfair text-[28px] mb-6 tracking-tight">Topic & Educational Imagery</h2>
          <ol className="space-y-4">
            {topicCredits.map((credit) => (
              <li key={credit.file} className="text-muted-aa">
                <p className="font-playfair italic text-emerald-text mb-2">
                  <strong>{credit.file}</strong>
                </p>
                <p className="text-sm">
                  <strong>Depicts:</strong> {credit.depicts}<br />
                  <strong>Source:</strong> <a href={credit.source} target="_blank" rel="noopener noreferrer" className="underline">
                    {credit.source}
                  </a><br />
                  <strong>Licence:</strong> {credit.licence}
                </p>
              </li>
            ))}
          </ol>
        </div>

      </div>

      <div className="pt-12 border-t border-bdr mt-12">
        <p className="text-muted-aa">
          Based on IMAGE_CREDITS.md and IMAGE_AUDIT.md from the repository. Last verified 2026-10-28.
        </p>
      </div>
    </div>
  );
}