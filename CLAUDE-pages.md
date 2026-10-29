# AlloJ, pages intérieures (suite du projet de la page d'accueil)

## Mission

Ajouter **4 pages** au projet Next.js de la page d'accueil AlloJ déjà en place, puis redéployer sur Vercel. Ces pages seront **présentées au client directement sur le web**, sans validation de maquette avant : elles doivent être finies, cohérentes avec l'accueil et **interactives pour de vrai** (filtres, onglets, formulaires qui répondent).

| Route | Page | Référence de mise en page |
|---|---|---|
| `/restaurants` | Liste des restaurants avec filtres et top 10 | `design/reference/restaurants.reference.html` |
| `/restaurants/[slug]` | Fiche restaurant avec réservation | `design/reference/fiche-restaurant.reference.html` |
| `/voyages` | Voyage cacher | `design/reference/voyages.reference.html` |
| `/annonceurs` | Espace annonceurs avec demande de devis | `design/reference/annonceurs.reference.html` |

## Avant de coder

1. Lis le `CLAUDE.md` existant à la racine du projet (celui de la page d'accueil) et le code déjà écrit : `components/home/`, `app/globals.css`, `useInView`, le compteur animé, le header, le menu mobile, le footer.
2. **Réutilise** ces briques. Si le header et le footer sont encore dans `components/home/`, sors-les dans `components/layout/` et branche-les dans `app/layout.tsx` pour toutes les pages. Ne duplique rien.
3. Lis les 4 maquettes de référence. Format interne : `<sc-for>` / `<sc-if>` / `{{…}}` = boucles et conditions alimentées par `renderVals()` en bas du fichier. Ce sont des **références de mise en page** : les contenus font foi dans `content/*.json`, pas dans les maquettes. Les liens `Main`, `Restaurants`… correspondent à `/`, `/restaurants`, etc.

## Ce que ce dossier apporte

- `content/restaurants.json`, `content/voyages.json`, `content/annonceurs.json` : tout le contenu. **Aucun texte en dur dans le JSX.**
- `design/reference/*.reference.html` : les 4 maquettes.
- `design/tokens.css` : identique à celui de l'accueil (ne pas l'écraser s'il a été modifié).
- `public/images/` : mêmes images que l'accueil (ne remplace pas un fichier existant).

## Langage visuel : aligner sur l'accueil, pas sur les maquettes

Les maquettes datent d'avant les animations de l'accueil. Applique le même langage partout :

- Bandeau Chabbat 🕯️, header avec picto qui fait coucou et point rouge clignotant sur « Alloj Le Live », lien actif souligné.
- Étiquettes de section en capitales sur fond violet, avec emoji (comme sur l'accueil). Titres H1/H2 en minuscules avec point final, partie clé en étiquette surlignée.
- Apparitions au scroll (`aj-up` / `aj-pop` via `useInView`), cascade dans les grilles, cartes qui montent au survol et images qui zooment, boutons `aj-btn`, emojis en pastille ronde blanche sur les photos.
- **Aucun bloc rayé « Photo · … »** des maquettes en ligne : si une image manque, carte de remplacement soignée = fond dégradé lilas (`--aj-lilas-fond` → `--aj-lilas`) + gros emoji du restaurant ou de la catégorie au centre.
- Aucun texte entre crochets (`[ADRESSE]`, `[PRIX]`…) à l'écran : si une info manque, on masque la ligne.
- `prefers-reduced-motion` respecté, emojis décoratifs en `aria-hidden`.

## Page par page

### `/restaurants`

- En-tête lilas : fil d'Ariane, H1 « restaurants cacher **à Paris.** », barre de recherche.
- 3 colonnes desktop (filtres · résultats · top 10), une seule sur mobile avec les filtres dans un panneau « 🎛️ Filtres (n) » qui s'ouvre en bas d'écran.
- **Filtres fonctionnels côté client**, état synchronisé dans l'URL (`?cuisine=Pizza&cert=…`) : recherche texte (nom, lieu, cuisine), certifications (cases), catégorie Viande/Lait et cuisines (puces `aria-pressed` avec emoji), ville (select), options (ouvert maintenant, livraison Chabbat, réservation en ligne), tri. Puces des filtres actifs retirables + « Tout effacer ». Compteur « n résultats » animé. État vide sympa (🤷 + bouton réinitialiser).
- Cartes : photo 16:10 (ou carte emoji si pas d'image), badge « ✨ NOUVEAU » si `nouveau`, nom, statut d'ouverture (vert « Ouvert » ou texte `ouverture`), 📍 lieu · cuisine, badges certification ✡︎ et catégorie, boutons « Réserver » et « Voir la fiche » vers `/restaurants/[slug]`. Les restaurants `reel` en premier par défaut.
- Top 10 « 🏆 les plus consultés » calculé depuis `vues` (tri décroissant), dans la carte violet nuit. Encadré pointillé « Vous tenez un restaurant ? ».

### `/restaurants/[slug]`

- `generateStaticParams` depuis `restaurants.json`. 404 propre sur slug inconnu.
- Galerie : grande image (photo du resto ou carte emoji), et sur desktop 4 vignettes qui réutilisent des images thématiques (cartes emoji si rien). Pas de « Voir les 24 photos ».
- Badges certification / catégorie, H1 nom, ligne « cuisine · catégorie · lieu · statut », boutons favori (cœur qui se remplit au clic, état local) et partage (`navigator.share`, sinon copie du lien + toast « Lien copié ✅ »).
- Horaires depuis `fiche_defaut.horaires_exemple`. Section « à propos » et « la carte » **masquées** (pas de données). Infos pratiques : lieu seulement.
- Bloc « 🎬 Vu dans Alloj Le Live » (`fiche_defaut.reportage`).
- Carte de réservation sticky sur desktop, en bas de page sur mobile : date (`input type="date"`, min = aujourd'hui), créneaux en puces sélectionnables, couverts. Envoi = pas de réseau : l'écran passe à une confirmation « Table réservée ! 🎉 » avec le récapitulatif et un bouton « Modifier ».
- « dans le même esprit. » : 3 restaurants de même cuisine ou même ville (hors celui affiché).

### `/voyages`

- Hero violet avec les deux étiquettes empilées, H1 « les fêtes au soleil, **100 % cacher.** », texte, formulaire Quand / Où / Voyageurs, et à droite la photo Mykonos inclinée qui flotte avec la bulle `hero.bulle` (sous le formulaire sur mobile).
- Barre d'onglets catégories (emoji + label), sticky sous le header au scroll. **Elle filtre la grille de séjours** (« Tous » par défaut), avec transition.
- « 📅 le calendrier des fêtes » : 5 cartes ; celles qui ont une image l'affichent en fond assombri. Clic = sélectionne l'onglet correspondant et défile jusqu'aux séjours.
- Grille de séjours : image ou carte emoji de la catégorie, étiquette catégorie, titre, 📅 dates, tags, bouton « Demander un devis » qui ouvre une **modale** (nom, téléphone, e-mail, nb de voyageurs, séjour prérempli) avec confirmation « Demande envoyée ✈️ ». Pas de prix.
- Bloc Colonies, bande organisateurs partenaires qui défile, CTA « Devenir partenaire » → `/annonceurs`.

### `/annonceurs`

- Header simplifié comme la maquette (picto + « alloj » + badge PRO, ancres Audience / Formats / Partenaires / Retour au site, téléphone, bouton devis). Le footer reste celui du site.
- Hero photo plein cadre avec dégradé violet, H1 et boutons.
- Audience : 6 tuiles, la première `mise_en_avant` en violet plein, **compteurs animés** (même composant que l'accueil).
- 3 formats : les deux premiers clairs, le 3e sombre avec badge et 2 vignettes vidéo (bouton play qui pulse). « Choisir ce format » coche le format dans le formulaire et défile jusqu'au devis.
- Partenaires en défilement infini.
- Devis : formulaire avec validation simple (champs requis, e-mail, téléphone FR), secteurs en puces, formats en cases. Envoi = pas de réseau : message `devis.confirmation` avec un petit confetti emoji (CSS). Le téléphone reste visible à gauche.

## Liens internes

- Mets à jour l'accueil : rubrique Restaurants → `/restaurants`, Voyages → `/voyages`, cartes « nouveaux restaurants » → `/restaurants/[slug]` (même slug que dans `restaurants.json`), cartes séjours → `/voyages`, CTA annonceurs et « Demander un devis » → `/annonceurs`. Le header pointe vers les vraies routes.
- Les rubriques sans page (Réceptions, Vie juive, Immobilier, Israël, USA, Évènements) restent sur l'accueil (ancre ou `#`).

## Données provisoires

Rien ne s'affiche différemment à l'écran, mais **n'invente aucune donnée** : pas de prix, d'adresse, de téléphone de resto, de nom d'hôtel ni d'avis. Les restaurants `exemple` servent à remplir la liste. Les champs listés dans `provisoire` sont à confirmer par AlloJ.

## Qualité et livraison

1. `npm run build` sans erreur ni warning. Toutes les routes générées en statique.
2. Vérifie chaque page à 1440 px et 390 px : pas de scroll horizontal, filtres, onglets, modale et formulaires utilisables au clavier (focus visible, `Échap` ferme la modale et le panneau de filtres, focus piégé dans la modale).
3. Lighthouse mobile ≥ 90 en Performance et Accessibilité sur `/restaurants` et `/voyages`.
4. `metadata` par page (titre « Restaurants cacher à Paris · AlloJ », etc.), toujours `noindex`.
5. Redéploie avec `npx vercel --prod` et donne les 4 URL.
