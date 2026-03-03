# Balance Atlas

Community-driven directory for the global handstand and hand balancing community. Retreats, coaches, workshops, and training spots — curated by hand balancers, for hand balancers.

**[balanceatlas.com](https://balanceatlas.com)**

## Setup

```sh
npm install
npm run dev
```

Media files (images/videos) are hosted on Cloudflare R2 and not included in this repo. To download them locally for development:

```sh
pip install boto3 python-dotenv
cp .env.example .env  # fill in R2 credentials
python scripts/download_r2.py
```

## Stack

- [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com) + [Motion](https://motion.dev) + [Lenis](https://lenis.darkroom.engineering)
- Content: Markdown with YAML frontmatter (Astro Content Collections)
- Media: Cloudflare R2 (`media.balanceatlas.com`)
- Hosting: GitHub Pages

## Contributing

Know a retreat, coach, or training spot that should be listed? Open an issue or check [balanceatlas.com/contribute](https://balanceatlas.com/contribute).

## License

Content and code are open source. Coach/event descriptions are sourced from their official websites and social media — see individual pages for source links.
