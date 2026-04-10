const PRESENTATIONS = [
  { num:'R2-001', bp_id:4, client_name:'Lotchi',              client_website_url:'https://lotchi.live',          canva_url:'https://www.canva.com/design/DAHEbxMRS_4/edit', active_levers:['SEO','CRO'],                         pricing:'8 000 €',   date_r1:'2026-03-18', date_r2:'2026-04-02', status:'terminee',  context_entreprise:'Plateforme de live shopping B2C.', context_enjeux:'Visibilite organique et conversion.', context_challenges:'Concurrence forte sur le live commerce.', created_at:'2026-03-15T10:30:00Z' },
  { num:'R2-002', bp_id:4, client_name:'La Tribu Happy Kids', client_website_url:'https://latribuhappykids.fr',  canva_url:'https://www.canva.com/design/DAHCiYVgh84/edit', active_levers:['SEO','Google Ads','Meta Ads','CRO'], pricing:'102 000 €', date_r1:'2026-02-25', date_r2:'2026-03-12', status:'terminee',  context_entreprise:'Marque de vetements enfants premium.', context_enjeux:'Acquisition digitale multi-canal.', context_challenges:'Marche concurrentiel avec budget limite.', created_at:'2026-02-19T08:17:00Z' },
  { num:'R2-004', bp_id:4, client_name:'Star Aid',            client_website_url:'https://staraid.fr',           canva_url:'https://www.canva.com/design/DAHCPh89bss/edit', active_levers:['SEO','Google Ads','LinkedIn Ads'],   pricing:'189 000 €', date_r1:'2026-02-18', date_r2:'2026-03-04', status:'en_cours',  context_entreprise:'Solutions RH et bien-etre au travail.', context_enjeux:'Generation de leads RH qualifies.', context_challenges:'Acteurs historiques bien implantes.', created_at:'2026-02-13T06:15:00Z' },
  { num:'R2-005', bp_id:1, client_name:'Coface',              client_website_url:'https://coface.com',           canva_url:'https://www.canva.com/design/DAG_5FyK8Qk/edit', active_levers:['Google Ads','Meta Ads'],              pricing:'26 500 €',  date_r1:'2026-01-22', date_r2:'2026-02-05', status:'terminee',  context_entreprise:'Leader mondial assurance-credit.', context_enjeux:'Acquisition paid sur les marches EU.', context_challenges:'Cycles de vente longs en B2B.', created_at:'2026-01-16T15:25:00Z' },
  { num:'R2-006', bp_id:1, client_name:'Join',                client_website_url:'https://join.com',             canva_url:'https://www.canva.com/design/DAHENg7Me9I/edit', active_levers:['SEO','CRO'],                         pricing:'6 000 €',   date_r1:'2026-02-12', date_r2:'2026-02-25', status:'terminee',  context_entreprise:'Plateforme de recrutement gratuite.', context_enjeux:'SEO et conversion du site.', context_challenges:'Concurrence de Welcome to the Jungle.', created_at:'2026-02-09T19:02:00Z' },
  { num:'R2-007', bp_id:1, client_name:'Cafeyn',              client_website_url:'https://cafeyn.co',            canva_url:'https://www.canva.com/design/DAHFgYxUqtk/edit', active_levers:['Google Ads','LinkedIn Ads','CRO'],   pricing:'20 000 €',  date_r1:'2026-03-27', date_r2:'2026-04-10', status:'en_cours',  context_entreprise:'Presse digitale illimitee B2B/B2C.', context_enjeux:'Acquisition B2B via paid et conversion.', context_challenges:'Concurrence de Readly.', created_at:'2026-03-23T11:53:00Z' },
  { num:'R2-008', bp_id:2, client_name:'Eleven VMS',          client_website_url:'https://elevenvms.com',        canva_url:'https://www.canva.com/design/DAHGL6PPFS4/edit', active_levers:['SEO','GEO'],                         pricing:'4 500 €',   date_r1:'2026-03-30', date_r2:'2026-04-14', status:'brouillon', context_entreprise:'Logiciel de gestion de freelances.', context_enjeux:'Visibilite SEO et GEO en France.', context_challenges:'Marche domine par SAP Fieldglass.', created_at:'2025-12-01T14:15:00Z' },
  { num:'R2-009', bp_id:2, client_name:'Marc Foujols',        client_website_url:'https://marcfoujols.com',      canva_url:'https://www.canva.com/design/DAHEwYw8JvQ/edit', active_levers:['SEO','Google Ads','CRO'],             pricing:'11 500 €',  date_r1:'2026-03-17', date_r2:'2026-03-31', status:'terminee',  context_entreprise:'Agence immobiliere de prestige Paris.', context_enjeux:'Visibilite digitale haut de gamme.', context_challenges:'Concurrence Barnes et Daniel Feau.', created_at:'2026-03-12T09:20:00Z' },
  { num:'R2-010', bp_id:2, client_name:'Waat',                client_website_url:'https://waat.fr',              canva_url:'https://www.canva.com/design/DAG5sHfQ-Yw/edit', active_levers:['SEO','Google Ads','Meta Ads'],        pricing:'64 000 €',  date_r1:'2025-11-18', date_r2:'2025-12-02', status:'terminee',  context_entreprise:'Bornes de recharge pour coproprietes.', context_enjeux:'Capter la demande croissante en bornes.', context_challenges:'Concurrence forte de Zeplug et Driveco.', created_at:'2025-11-10T14:12:00Z' },
  { num:'R2-011', bp_id:3, client_name:'Expertimo',           client_website_url:'https://expertimo.com',        canva_url:'https://www.canva.com/design/DAHFn3bqyOo/edit', active_levers:['SEO','CRO','LinkedIn Ads'],           pricing:'13 000 €',  date_r1:'2026-03-28', date_r2:'2026-04-11', status:'en_cours',  context_entreprise:'Reseau de mandataires immobiliers.', context_enjeux:'Recrutement de mandataires via digital.', context_challenges:'Concurrence IAD, Safti et MegAgence.', created_at:'2026-03-25T15:21:00Z' },
];

// Analyses for each presentation — keyed by num
const ANALYSES = {
  'R2-001': {
    SEO: { note_globale:6.5, lecture_business:'Le site a une base correcte mais manque de contenu editorial et de maillage interne.', sub_scores:[{nom:'Visibilite',note:7,description:'Bon potentiel'},{nom:'Trafic',note:6.5,description:'En progression'},{nom:'Contenu',note:5.5,description:'A renforcer'},{nom:'Technique',note:8,description:'Solide'},{nom:'Autorite',note:6,description:'Correct'}] },
    CRO: { note_globale:7, lecture_business:'Le parcours de conversion est trop long et manque de preuves sociales.', sub_scores:[{nom:'Ergonomie',note:7,description:'Bon potentiel'},{nom:'Message',note:6.5,description:'En progression'},{nom:'CTA',note:5.5,description:'A renforcer'},{nom:'Reassurance',note:8,description:'Solide'},{nom:'Opportunites',note:6,description:'Correct'}] },
  },
  'R2-002': {
    SEO: { note_globale:6.5, lecture_business:'Le site a une base correcte mais manque de contenu editorial et de maillage interne.', sub_scores:[{nom:'Visibilite',note:7,description:'Bon potentiel'},{nom:'Trafic',note:6.5,description:'En progression'},{nom:'Contenu',note:5.5,description:'A renforcer'},{nom:'Technique',note:8,description:'Solide'},{nom:'Autorite',note:6,description:'Correct'}] },
    'Google Ads': { note_globale:7, lecture_business:'Les campagnes search captent du trafic mais le quality score est perfectible.', sub_scores:[{nom:'Structure',note:7,description:'Bon potentiel'},{nom:'Mots-cles',note:6.5,description:'En progression'},{nom:'Annonces',note:5.5,description:'A renforcer'},{nom:'Landing pages',note:8,description:'Solide'},{nom:'Performance',note:6,description:'Correct'}] },
    'Meta Ads': { note_globale:5.5, lecture_business:'Meta genere du volume mais la qualification des leads reste un enjeu.', sub_scores:[{nom:'Strategie',note:7,description:'Bon potentiel'},{nom:'Creas',note:6.5,description:'En progression'},{nom:'Ciblage',note:5.5,description:'A renforcer'},{nom:'Budget',note:8,description:'Solide'},{nom:'Performance',note:6,description:'Correct'}] },
    CRO: { note_globale:6, lecture_business:'Le parcours de conversion est trop long et manque de preuves sociales.', sub_scores:[{nom:'Ergonomie',note:7,description:'Bon potentiel'},{nom:'Message',note:6.5,description:'En progression'},{nom:'CTA',note:5.5,description:'A renforcer'},{nom:'Reassurance',note:8,description:'Solide'},{nom:'Opportunites',note:6,description:'Correct'}] },
  },
  'R2-004': {
    SEO: { note_globale:6.5, lecture_business:'Le site a une base correcte mais manque de contenu editorial et de maillage interne.', sub_scores:[{nom:'Visibilite',note:7,description:'Bon potentiel'},{nom:'Trafic',note:6.5,description:'En progression'},{nom:'Contenu',note:5.5,description:'A renforcer'},{nom:'Technique',note:8,description:'Solide'},{nom:'Autorite',note:6,description:'Correct'}] },
    'Google Ads': { note_globale:7, lecture_business:'Les campagnes search captent du trafic mais le quality score est perfectible.', sub_scores:[{nom:'Structure',note:7,description:'Bon potentiel'},{nom:'Mots-cles',note:6.5,description:'En progression'},{nom:'Annonces',note:5.5,description:'A renforcer'},{nom:'Landing pages',note:8,description:'Solide'},{nom:'Performance',note:6,description:'Correct'}] },
    'LinkedIn Ads': { note_globale:5.5, lecture_business:'LinkedIn est pertinent pour la cible B2B avec un bon potentiel ABM.', sub_scores:[{nom:'Strategie',note:7,description:'Bon potentiel'},{nom:'Creas',note:6.5,description:'En progression'},{nom:'Ciblage',note:5.5,description:'A renforcer'},{nom:'Budget',note:8,description:'Solide'},{nom:'Performance',note:6,description:'Correct'}] },
  },
  'R2-005': {
    'Google Ads': { note_globale:6.5, lecture_business:'Les campagnes search captent du trafic mais le quality score est perfectible.', sub_scores:[{nom:'Structure',note:7,description:'Bon potentiel'},{nom:'Mots-cles',note:6.5,description:'En progression'},{nom:'Annonces',note:5.5,description:'A renforcer'},{nom:'Landing pages',note:8,description:'Solide'},{nom:'Performance',note:6,description:'Correct'}] },
    'Meta Ads': { note_globale:7, lecture_business:'Meta genere du volume mais la qualification des leads reste un enjeu.', sub_scores:[{nom:'Strategie',note:7,description:'Bon potentiel'},{nom:'Creas',note:6.5,description:'En progression'},{nom:'Ciblage',note:5.5,description:'A renforcer'},{nom:'Budget',note:8,description:'Solide'},{nom:'Performance',note:6,description:'Correct'}] },
  },
  'R2-006': {
    SEO: { note_globale:6.5, lecture_business:'Le site a une base correcte mais manque de contenu editorial et de maillage interne.', sub_scores:[{nom:'Visibilite',note:7,description:'Bon potentiel'},{nom:'Trafic',note:6.5,description:'En progression'},{nom:'Contenu',note:5.5,description:'A renforcer'},{nom:'Technique',note:8,description:'Solide'},{nom:'Autorite',note:6,description:'Correct'}] },
    CRO: { note_globale:7, lecture_business:'Le parcours de conversion est trop long et manque de preuves sociales.', sub_scores:[{nom:'Ergonomie',note:7,description:'Bon potentiel'},{nom:'Message',note:6.5,description:'En progression'},{nom:'CTA',note:5.5,description:'A renforcer'},{nom:'Reassurance',note:8,description:'Solide'},{nom:'Opportunites',note:6,description:'Correct'}] },
  },
  'R2-007': {
    'Google Ads': { note_globale:6.5, lecture_business:'Les campagnes search captent du trafic mais le quality score est perfectible.', sub_scores:[{nom:'Structure',note:7,description:'Bon potentiel'},{nom:'Mots-cles',note:6.5,description:'En progression'},{nom:'Annonces',note:5.5,description:'A renforcer'},{nom:'Landing pages',note:8,description:'Solide'},{nom:'Performance',note:6,description:'Correct'}] },
    'LinkedIn Ads': { note_globale:7, lecture_business:'LinkedIn est pertinent pour la cible B2B avec un bon potentiel ABM.', sub_scores:[{nom:'Strategie',note:7,description:'Bon potentiel'},{nom:'Creas',note:6.5,description:'En progression'},{nom:'Ciblage',note:5.5,description:'A renforcer'},{nom:'Budget',note:8,description:'Solide'},{nom:'Performance',note:6,description:'Correct'}] },
    CRO: { note_globale:5.5, lecture_business:'Le parcours de conversion est trop long et manque de preuves sociales.', sub_scores:[{nom:'Ergonomie',note:7,description:'Bon potentiel'},{nom:'Message',note:6.5,description:'En progression'},{nom:'CTA',note:5.5,description:'A renforcer'},{nom:'Reassurance',note:8,description:'Solide'},{nom:'Opportunites',note:6,description:'Correct'}] },
  },
  'R2-008': {
    SEO: { note_globale:6.5, lecture_business:'Le site a une base correcte mais manque de contenu editorial et de maillage interne.', sub_scores:[{nom:'Visibilite',note:7,description:'Bon potentiel'},{nom:'Trafic',note:6.5,description:'En progression'},{nom:'Contenu',note:5.5,description:'A renforcer'},{nom:'Technique',note:8,description:'Solide'},{nom:'Autorite',note:6,description:'Correct'}] },
    GEO: { note_globale:7, lecture_business:'Faible presence dans les reponses IA. Le contenu doit etre restructure pour les LLM.', sub_scores:[{nom:'Presence IA',note:7,description:'Bon potentiel'},{nom:'Contenu optimise',note:6.5,description:'En progression'},{nom:'Citations',note:5.5,description:'A renforcer'},{nom:'Autorite',note:8,description:'Solide'},{nom:'Visibilite LLM',note:6,description:'Correct'}] },
  },
  'R2-009': {
    SEO: { note_globale:6.5, lecture_business:'Le site a une base correcte mais manque de contenu editorial et de maillage interne.', sub_scores:[{nom:'Visibilite',note:7,description:'Bon potentiel'},{nom:'Trafic',note:6.5,description:'En progression'},{nom:'Contenu',note:5.5,description:'A renforcer'},{nom:'Technique',note:8,description:'Solide'},{nom:'Autorite',note:6,description:'Correct'}] },
    'Google Ads': { note_globale:7, lecture_business:'Les campagnes search captent du trafic mais le quality score est perfectible.', sub_scores:[{nom:'Structure',note:7,description:'Bon potentiel'},{nom:'Mots-cles',note:6.5,description:'En progression'},{nom:'Annonces',note:5.5,description:'A renforcer'},{nom:'Landing pages',note:8,description:'Solide'},{nom:'Performance',note:6,description:'Correct'}] },
    CRO: { note_globale:5.5, lecture_business:'Le parcours de conversion est trop long et manque de preuves sociales.', sub_scores:[{nom:'Ergonomie',note:7,description:'Bon potentiel'},{nom:'Message',note:6.5,description:'En progression'},{nom:'CTA',note:5.5,description:'A renforcer'},{nom:'Reassurance',note:8,description:'Solide'},{nom:'Opportunites',note:6,description:'Correct'}] },
  },
  'R2-010': {
    SEO: { note_globale:6.5, lecture_business:'Le site a une base correcte mais manque de contenu editorial et de maillage interne.', sub_scores:[{nom:'Visibilite',note:7,description:'Bon potentiel'},{nom:'Trafic',note:6.5,description:'En progression'},{nom:'Contenu',note:5.5,description:'A renforcer'},{nom:'Technique',note:8,description:'Solide'},{nom:'Autorite',note:6,description:'Correct'}] },
    'Google Ads': { note_globale:7, lecture_business:'Les campagnes search captent du trafic mais le quality score est perfectible.', sub_scores:[{nom:'Structure',note:7,description:'Bon potentiel'},{nom:'Mots-cles',note:6.5,description:'En progression'},{nom:'Annonces',note:5.5,description:'A renforcer'},{nom:'Landing pages',note:8,description:'Solide'},{nom:'Performance',note:6,description:'Correct'}] },
    'Meta Ads': { note_globale:5.5, lecture_business:'Meta genere du volume mais la qualification des leads reste un enjeu.', sub_scores:[{nom:'Strategie',note:7,description:'Bon potentiel'},{nom:'Creas',note:6.5,description:'En progression'},{nom:'Ciblage',note:5.5,description:'A renforcer'},{nom:'Budget',note:8,description:'Solide'},{nom:'Performance',note:6,description:'Correct'}] },
  },
  'R2-011': {
    SEO: { note_globale:6.5, lecture_business:'Le site a une base correcte mais manque de contenu editorial et de maillage interne.', sub_scores:[{nom:'Visibilite',note:7,description:'Bon potentiel'},{nom:'Trafic',note:6.5,description:'En progression'},{nom:'Contenu',note:5.5,description:'A renforcer'},{nom:'Technique',note:8,description:'Solide'},{nom:'Autorite',note:6,description:'Correct'}] },
    CRO: { note_globale:7, lecture_business:'Le parcours de conversion est trop long et manque de preuves sociales.', sub_scores:[{nom:'Ergonomie',note:7,description:'Bon potentiel'},{nom:'Message',note:6.5,description:'En progression'},{nom:'CTA',note:5.5,description:'A renforcer'},{nom:'Reassurance',note:8,description:'Solide'},{nom:'Opportunites',note:6,description:'Correct'}] },
    'LinkedIn Ads': { note_globale:5.5, lecture_business:'LinkedIn est pertinent pour la cible B2B avec un bon potentiel ABM.', sub_scores:[{nom:'Strategie',note:7,description:'Bon potentiel'},{nom:'Creas',note:6.5,description:'En progression'},{nom:'Ciblage',note:5.5,description:'A renforcer'},{nom:'Budget',note:8,description:'Solide'},{nom:'Performance',note:6,description:'Correct'}] },
  },
};

exports.seed = async function (knex) {
  await knex('sub_scores').del();
  await knex('lever_analyses').del();
  await knex('presentations').del();

  // Insert presentations
  for (const p of PRESENTATIONS) {
    const [inserted] = await knex('presentations').insert({
      ...p,
      active_levers: `{${p.active_levers.map(l => `"${l}"`).join(',')}}`,
    }).returning('*');

    // Insert analyses for this presentation
    const analyses = ANALYSES[p.num];
    if (!analyses) continue;

    for (const [lever, data] of Object.entries(analyses)) {
      const [analysis] = await knex('lever_analyses').insert({
        presentation_id: inserted.id,
        lever,
        note_globale: data.note_globale,
        lecture_business: data.lecture_business,
      }).returning('*');

      if (data.sub_scores?.length) {
        await knex('sub_scores').insert(
          data.sub_scores.map(s => ({
            analysis_id: analysis.id,
            nom: s.nom,
            note: s.note,
            description: s.description,
          }))
        );
      }
    }
  }
};
