// Handstand workshops, retreats and festivals around the world, shown at /festival/mundo.
// Source: Drive `pesquisas/handstand-workshops-retreats.md` (map of 04/11/2026; every link was loaded that day).
// Only facts published on each event's own page: name, dates, place, teachers, link. No descriptions.
// `sort` is the ISO start date; `when` is what the page shows.

export type Evento = {
  sort: string;
  when: string;
  name: string;
  place: string;
  teachers: string;
  url?: string;
  ours?: boolean;
};

export const LEVANTAMENTO = '4 de novembro de 2026';

export const eventos: Evento[] = [
  { sort: '2026-11-07', when: '7 — 13 nov 2026', name: 'Handstand Retreat Thailand', place: 'Phuket, Tailândia', teachers: 'Nicolas Montes de Oca, Marie-Ève Dicaire', url: 'https://balancenotion.com/handstand-retreat-thailand/' },
  { sort: '2026-11-28', when: '28 — 29 nov 2026', name: 'Yuval Ayalon: workshop de fim de semana', place: 'Colônia, Alemanha', teachers: 'Yuval Ayalon', url: 'https://yuvalonhandsworkshops.weebly.com/' },
  { sort: '2026-12-05', when: '5 — 6 dez 2026', name: 'Yuval Ayalon: workshop de fim de semana', place: 'Zurique, Suíça', teachers: 'Yuval Ayalon', url: 'https://yuvalonhandsworkshops.weebly.com/' },
  { sort: '2026-12-05', when: '5 — 6 dez 2026', name: 'Bangkok Handstand Festival', place: 'Bangkok, Tailândia', teachers: 'John Lizcano, Hakim Azahar, Vesse & May', url: 'https://actacrobatics.com/bhf2026/' },
  { sort: '2026-12-05', when: '5 — 6 dez 2026', name: 'Handstand Workshop Montreal', place: 'Montreal, Canadá', teachers: 'Marie-Ève Dicaire', url: 'https://balancenotion.com/workshop/handstand-workshop-in-montreal-2026/' },
  { sort: '2026-12-12', when: '12 — 13 dez 2026', name: 'Handstand Club Intensive', place: 'Hamburgo, Alemanha', teachers: 'Lucie Beyer', url: 'https://www.lucieinthesky.org/handstand-wonderland/handstand-club-events/' },
  { sort: '2027-01-07', when: '7 — 10 jan 2027', name: 'Winter Extravaganza', place: 'Mazara del Vallo, Sicília, Itália', teachers: 'Sam on Hands, Dan Liddiard, Alice Di Stefano, Nicole Barbieri', url: 'https://handstandconvention.com/winter/' },
  { sort: '2027-01-07', when: '7 — 10 jan 2027', name: 'Handstand Revolution: Winter Intensive', place: 'Brunnenhaus, Wermelskirchen, Alemanha', teachers: 'Jules Kühner, Jordis Troost', url: 'https://www.tickettailor.com/events/brunnenhausgmbh/2065188' },
  { sort: '2027-01-08', when: '8 — 14 jan 2027', name: 'YogaSlackers Thailand Retreat', place: 'Chiang Mai, Tailândia', teachers: 'Sam Salwei, Raquel Hernández-Cruz, Ajlaan Raza Sayani', url: 'https://yogaslackers.com/shop/all-products/thailand-retreat/' },
  { sort: '2027-01-16', when: '16 — 23 jan 2027', name: 'Handstand Camp Phuket', place: 'Phuket, Tailândia', teachers: 'Daryna Yahorava', url: 'https://handstand.camp/thailand' },
  { sort: '2027-01-24', when: '24 — 26 jan 2027', name: 'Australia Day Intensive', place: 'Bondi Beach, Sydney, Austrália', teachers: "Miguel Sant'Ana", url: 'https://artofhandstands.com/australia-day-intensive-2027' },
  { sort: '2027-01-29', when: '29 — 30 jan 2027', name: 'Handstand Workshop Riyadh', place: 'Riad, Arábia Saudita', teachers: 'Nicolas Montes de Oca', url: 'https://balancenotion.com/workshop/handstand-workshop-in-riyadh/' },
  { sort: '2027-02-20', when: '20 — 21 fev 2027', name: 'Handstand Club Intensive', place: 'Lucerna, Suíça', teachers: 'Lucie Beyer', url: 'https://www.shyoga.ch/handstand' },
  { sort: '2027-03-03', when: '3 — 11 mar 2027', name: 'Art of Handstands Teacher Training 2.0', place: 'Hong Kong', teachers: "Miguel Sant'Ana", url: 'https://artofhandstands.com/aohhandstandteachertraining' },
  { sort: '2027-03-09', when: '9 — 12 mar 2027', name: 'Ultimate Handstand Camp', place: 'Ayampe, Equador', teachers: 'Mario Lemuriath, Kolin, Anna', url: 'https://bookretreats.com/r/4-day-handstand-retreat-in-ecuador' },
  { sort: '2027-03-09', when: '9 — 14 mar 2027', name: 'Thailand Handstand Intensive', place: 'Koh Phangan, Tailândia', teachers: 'Yuval Ayalon', url: 'https://yuvalintensive.weebly.com/' },
  { sort: '2027-03-12', when: '12 — 17 mar 2027', name: 'Jungle Fiesta', place: 'Riviera Maya, México', teachers: 'Mikael Kristiansen, Mau Jara, Dora Skelton, Eamonn Doran', url: 'https://www.handstandfiesta.com/' },
  { sort: '2027-03-20', when: '20 — 21 mar 2027', name: 'Handstand Club Intensive', place: 'Hamburgo, Alemanha', teachers: 'Lucie Beyer', url: 'https://www.lucieinthesky.org/handstand-wonderland/handstand-club-events/' },
  { sort: '2027-04-16', when: '16 — 18 abr 2027', name: '1º HandstandFest', place: 'Trapézio Voador, São Paulo, Brasil', teachers: 'Agustin Melesi, Rocío, Louisse Aldrigues, Dany García', ours: true },
  { sort: '2027-04-24', when: '24 — 30 abr 2027', name: 'Handstand Retreat Costa Rica', place: 'Cahuita, Costa Rica', teachers: 'Nicolas Montes de Oca, Marie-Ève Dicaire', url: 'https://balancenotion.com/handstand-retreat-costarica2027/' },
  { sort: '2027-07-14', when: '14 — 18 jul 2027', name: 'Handstand Intensive Slovenia', place: 'Škofja Loka, Eslovênia', teachers: 'Sam on Hands, Giorgia Giana, Katharina Karner, Lana Fuketa, Issy Denman', url: 'https://barefootyoga.eu/handstand-intensive/' },
  { sort: '2027-07-15', when: '15 — 18 jul 2027', name: 'Handstand Revolution: Summer Intensive', place: 'Brunnenhaus, Alemanha', teachers: 'Jules Kühner, Sebastian Friess, Jordis Troost', url: 'https://www.tickettailor.com/events/brunnenhausgmbh/2442784' },
  { sort: '2027-08-21', when: '21 — 22 ago 2027', name: 'Handstand Club Intensive', place: 'Hamburgo, Alemanha', teachers: 'Lucie Beyer', url: 'https://www.lucieinthesky.org/handstand-wonderland/handstand-club-events/' },
  { sort: '2027-09-01', when: 'Setembro 2027 · dias a confirmar', name: 'Handstand Extravaganza Convention', place: 'Menfi, Sicília, Itália', teachers: 'Sam on Hands, Dora Skelton, Mau Jara, Erin Skye, Luca Forte, Nicole Barbieri, Mikael Kristiansen', url: 'https://handstandconvention.com/summer/' },
];

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

// Events grouped by month, in date order
export const porMes = () => {
  const groups: { label: string; items: Evento[] }[] = [];
  for (const e of [...eventos].sort((a, b) => a.sort.localeCompare(b.sort))) {
    const [y, m] = e.sort.split('-');
    const label = `${MESES[Number(m) - 1]} ${y}`;
    const last = groups[groups.length - 1];
    if (last?.label === label) last.items.push(e);
    else groups.push({ label, items: [e] });
  }
  return groups;
};

export const paises = () => new Set(eventos.map((e) => e.place.split(', ').pop())).size;
