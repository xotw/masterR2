# Master R2 — Bulldozer Collective

Outil interne de creation automatisee des presentations commerciales R2 pour les Business Partners de Bulldozer Collective.

## Le probleme

Creer une presentation R2 (52+ slides) prend **~2 heures** par client : lecture du transcript Claap, analyse des leviers, redaction du contexte, injection dans Canva, screenshots du preaudit, relecture...

## La solution

Master R2 automatise tout ca en **3 minutes**. Claude AI lit le transcript R1, analyse les leviers, genere le contenu, et injecte directement dans Canva.

## Architecture

```
master-r2/
  home.html          # Landing page SaaS-style (presentation de l'outil)
  index.html         # Dashboard — liste des presentations, filtres par BP
  nouveau.html       # Workflow de creation (4 etapes)
  aide.html          # FAQ / aide
  parametres.html    # Profils BP, outils MCP, configuration
  slides-thumbs/     # 51 thumbnails de slides pour le selecteur
  README.md
```

## Stack technique

- **React 18** (CDN, pas de build step) + Babel standalone pour le JSX
- **HTML/CSS** mono-fichier par page (pas de framework, pas de bundler)
- **localStorage** pour la persistance (cle `master_r2_v12`, partagee entre toutes les pages)
- **Clearbit API** pour les logos clients (via le domaine du site web)
- **Google Fonts** — Inconsolata (titres/identite) + system-ui (contenu)
- **JSZip** (CDN, charge a la demande) pour le telechargement des screenshots

## Les 4 etapes du workflow (`nouveau.html`)

### 1. Client
Saisie du nom, URL du site, lien Claap R1, Business Partner.
Les champs Canva et pre-audit sont optionnels (recuperes automatiquement).

### 2. Leviers & Slides
- **Gauche** : selection des leviers marketing (Demand Capture : SEO, GEO, Google Ads, CRO / Demand Gen : Meta Ads, LinkedIn Ads + option TDT)
- **Droite** : selecteur de slides avec thumbnails, groupees par categorie (Introduction, Preaudit DC/DG, TDT, Strategie, Pricing, Next Steps)
- Compteur dynamique du nombre de slides

### 3. Review
Mode **Tinder** : une card a la fois (contexte client, puis chaque levier).
- Navigation : fleches clavier, dots cliquables, progress bar
- Validation : Entree valide + passe au suivant automatiquement
- Regeneration : mini-chat contextuel par section ("insiste sur le mobile", "ton trop technique")
- Le contenu reste toujours visible (grise quand valide)
- Detection de contenu incomplet avec lien "Corriger"

### 4. Canva
- **Diff git-style** : lignes vertes (ajouts) / rouges (suppressions) par section, toggleables
- **Bouton "Mettre a jour dans Canva"** : copie un prompt complet pour Claude + MCP Canva
- **Timer + animation** des taches d'injection (4s chacune)
- **Historique** des lancements avec snapshot du JSON (cliquable pour voir le diff)
- **Screenshots** du preaudit a telecharger en ZIP
- **Checklist BP** : ce qu'il reste a faire manuellement (use cases, pricing, screenshots)

## Fonctionnalites transversales

### Navigation clavier
| Touche | Action |
|--------|--------|
| Fleche droite | Step/card suivant(e) |
| Fleche gauche | Step/card precedent(e) |
| Entree | Valider (Review) / Lancer (Canva) / Terminer |
| Escape | Retour dashboard (avec confirmation si brouillon) |
| Backspace | Retour etape precedente |
| Cmd+Shift+C | Copier le JSON |

### Mode lecture seule
Si un BP ouvre la presentation d'un autre BP :
- Bandeau orange "Lecture seule — Presentation de [BP]"
- Tous les champs desactives, boutons d'action masques
- Navigation possible (Suivant/Precedent) pour consulter

### Sauvegarde
- **Auto-save** : le `currentStep` est persiste dans localStorage a chaque changement
- **Brouillons** : bouton "Enregistrer et quitter" sur chaque etape
- **Section "Mes brouillons"** dans la sidebar du dashboard
- **Confirmation** avant de quitter une prez non sauvegardee

### Donnees
- **10 vrais clients** depuis HubSpot (Lotchi, La Tribu Happy Kids, Star Aid, Coface, Join, Cafeyn, Eleven VMS, Marc Foujols, Waat, Expertimo)
- **URLs Canva** reelles recuperees via le MCP Canva
- **4 BP** : Pierre-Arnaud, Jordan, Enguerrand, Leo — avec photos LinkedIn
- **Montants HubSpot** reels

## Pages annexes

### Dashboard (`index.html`)
- Tableau des presentations avec logos clients, photos BP (hover = nom), tags leviers colores
- Filtres par BP, barre de recherche, stats en haut
- Menu burger par presentation : Ouvrir / Dupliquer / Supprimer
- Section "Mes brouillons" + "Recent" dans la sidebar

### Parametres (`parametres.html`)
- Profils BP avec photos LinkedIn (ajout/modification d'URL)
- Outils MCP avec vrais logos : Claude, Canva, Claap, Slack, Notion, HubSpot + alternatives (Salesforce, Modjo, Gong, Teams, Jira)
- Migration automatique des photos au chargement

### Aide (`aide.html`)
- FAQ en accordeon

### Home (`home.html`)
- Landing page SaaS-style : hero, video, stats (-85% de temps), features, how it works, CTA

## Design system

- **Palette** : fond sombre (#303028), accent jaune-vert Bulldozer (#D4FF00)
- **Typographie** : Inconsolata (titres, identite) + system-ui (contenu)
- **Boutons unifies** : `.btn-p` (primaire), `.btn-s` (secondaire), `.btn-g` (ghost) — memes dimensions partout
- **Favicon** : logo Bulldozer

## Pour contribuer

1. Ouvrir n'importe quel fichier `.html` dans un navigateur — pas de build step
2. Les commentaires sont en francais, dans chaque fichier
3. La cle `STORAGE_KEY` doit etre incrementee si la structure du SEED change
4. Les thumbnails sont dans `slides-thumbs/` — nommees par numero de slide

---

Propulse par **Claude AI** (Opus 4.6) — Bulldozer Collective, 2026
