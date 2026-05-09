---
name: ToDo project
description: Contexte et détails de l'app familiale ToDo (single HTML + Firebase)
type: project
---

App familiale "Ma liste" — single file index.html + Firebase Firestore.

Membres : A (Alex), Y (Yann), X (enfant), C (enfant). Auth par mot de passe, session 7 jours.

Onglets : Tâches (todos priorisés 1-5), Se régaler (recettes + photos), Agenda (événements 2026).

**Nono** = le chatbot IA intégré dans l'app, accessible en cliquant sur "Nono" dans le sous-titre.
Basé sur Groq API (llama-3.3-70b-versatile). Clé stockée dans GROQ_API_KEY dans index.html et .env.

**Why:** L'utilisateur veut se souvenir que "Nono" désigne le chatbot, pas juste un nom.
**How to apply:** Quand l'utilisateur parle de "Nono", il parle du chatbot IA de l'app.

**Déploiement :** GitHub Pages (repo public, NonoGap/ToDo). Ne pas utiliser Vercel pour cette app.
**Why:** L'utilisateur préfère éviter Vercel pour ToDo.
**How to apply:** Pour toute suggestion de déploiement, recommander GitHub Pages ou Firebase Hosting.
