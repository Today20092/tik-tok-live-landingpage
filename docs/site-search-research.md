# Site search for articles and podcast transcripts

Research date: September 11, 2026. This is a research and implementation proposal; no search service has been provisioned and no application code has changed. Product facts below come from official documentation or maintainers' repositories. Architecture choices and acceptance targets are recommendations, not measured results.

## Recommendation

For the requested meaning-based search, **evaluate Cloudflare AI Search with hybrid retrieval first**. **Pagefind is an optional, simpler free open-source baseline** if useful keyword search is wanted before the semantic pilot is ready. If owning the entire search engine matters more than avoiding server maintenance, evaluate **Typesense or Meilisearch Community Edition** instead of Cloudflare's managed service.

Pagefind is a good fit for the current static site, but it does not by itself fulfill the requirement to understand differently worded questions. Hybrid search combines lexical matches with embeddings, which represent similarity in meaning. It is the appropriate category to test for a query such as “How do I keep believing when life gets difficult?” finding an article about patience and a relevant podcast passage even when those exact words are absent. This example illustrates the intended behavior; the site does not yet contain a representative corpus on which to demonstrate it. [Pagefind](https://pagefind.app/), [Cloudflare hybrid search](https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/).

Do not build two remote engines or a custom vector pipeline initially. A small Pagefind implementation can remain a fallback if the semantic service is unavailable or becomes uneconomical. If meaning-based search is required from the very first public release, pilot Cloudflare immediately and use the same relevance tests before launch; there is no technical reason to wait for an arbitrary article count.

## What exists in this repository

The current site uses Astro 7 static output on Cloudflare Pages, pinned pnpm, a shared `src/layouts/HubPage.astro`, and articles in the Content Layer. `src/content.config.ts` defines article title, description, date, category, cover, and a `draft` flag that defaults to true. `src/pages/articles/[...id].astro` generates published article routes with `getStaticPaths()` and renders Markdown. There is one published article and one draft. These are findings from the local source, not assumptions based on the old single-page project description.

The podcast preview route is development-only and includes illustrative transcript material. There is no real episode collection or existing transcript export to reuse. Production also contains alternative layout routes (`pocket/`, `journal/`, `focus/`) and a Ko-fi preview route. These must not become duplicate or misleading search hits.

Astro already renders the content as HTML, so adding a search index does not require converting the site to server rendering, adding a CMS, or replacing Content Layer. Astro documents static route generation and collection rendering through `getStaticPaths()` and `render()`. [Astro content collections](https://docs.astro.build/en/guides/content-collections/).

“Entire site” should mean published articles, future published episodes and transcripts, and the site's own resource descriptions. An outbound Quran or YouTube link does not put the destination's full contents into this site's search index. Crawling outside sources would be a separate scope, provenance, and maintenance decision.

## What “good understanding” involves

| Capability | Purpose here | What it does not guarantee |
| --- | --- | --- |
| Full-text / lexical search | Titles, names, exact quotations, verse references, and phrases | Finding a passage that uses different vocabulary |
| Prefix / typo tolerance | Partial input and common misspellings | Understanding concepts or translating languages |
| Synonyms and aliases | Quran / Qur'an / Koran; selected transliteration variants | Correctly equating every ambiguous religious term |
| Semantic / vector search | Questions and paraphrases with similar meaning | Exact identifier accuracy or reliable relevance for every query |
| Hybrid retrieval | Combines exact words and semantic candidates | Automatic superiority without testing the corpus |
| Reranking | Reorders a short candidate list against the actual question | Free latency or free model usage |
| Generated answers | Summarizes retrieved passages | A necessary component of search |

Cloudflare documents vector plus BM25 keyword retrieval and rank fusion, with optional reranking. Typesense and Meilisearch also provide hybrid search. For this site, launch source results and excerpts first. A generated religious answer adds a separate accuracy problem without helping someone open the right article or moment in an episode. [Cloudflare hybrid](https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/), [Typesense vector and hybrid search](https://typesense.org/docs/28.0/api/vector-search.html), [Meilisearch hybrid search](https://www.meilisearch.com/products/hybrid-search).

## Options and tradeoffs

| Option | Open source and cost | Strengths | Limitations | Fit |
| --- | --- | --- | --- | --- |
| **Pagefind** | MIT; no search-service bill; static hosting/build usage still applies | Indexes generated HTML, small on-demand index delivery, metadata, filters, heading links, ready-made UI | Lexical rather than semantic; published changes need a new build/index; language indexes are separate | Best immediate baseline |
| **MiniSearch** | MIT; browser or Node library | Fuzzy/prefix search, field boosting, suggestions; good control over custom transcript records | You own index generation, UI, snippets, grouping, and loading; in-memory corpus cost; no built-in semantic pipeline | Choose for a specific custom browser search need |
| **FlexSearch** | Apache-2.0; browser or Node library | Full-text search, encoders, document indexes, workers and persistence options | More application plumbing than Pagefind; its “contextual” text matching is not embedding-based meaning understanding | Alternative when measured browser performance/customization warrants it |
| **Orama** | Apache-2.0 open-source engine | Full-text, vector and hybrid modes in JavaScript; browser/server/edge possibilities | Embedding generation, model delivery or API usage, persistence, and UI still need a plan | Interesting prototype option; do not assume browser semantics are lightweight |
| **Meilisearch Community** | MIT community engine; self-hosting compute/backups cost money or existing capacity | Typo-friendly full-text search, filters and hybrid with configurable embedding providers | Separate running service; sync, updates, backups, model cost; enterprise features have separate terms | Strong open-source shortlist |
| **Typesense** | GPL-3.0 server; self-hosting infrastructure required | Typo tolerance, facets, grouping, field control, built-in/external embedding support and hybrid retrieval | Separate service and memory sizing; index publishing and operations remain your responsibility | Strong open-source shortlist, particularly for grouped transcript passages |
| **Cloudflare AI Search** | Managed proprietary service; currently free beta within limits, with separately metered AI-related usage | Managed ingestion, keyword/vector/hybrid retrieval, filters, source references, hosted endpoints and UI options | Beta pricing can change; service dependency; metadata/model constraints; relevance still needs tuning | Best managed pilot for this existing Cloudflare site |
| **Workers + D1 FTS5** | Cloudflare managed runtime/database with free allowances | Simple server-side lexical search with SQL and structured records | No semantic meaning by itself; more code than Pagefind for today's site | Useful when a database already exists or server queries become necessary |
| **Workers + Vectorize + Workers AI + D1** | Managed services with free allowances and usage charges | Full control of chunking, embeddings, lexical/vector fusion, filters and result shape | You build ingestion, sync, retries, ranking, deletion and monitoring | Reserve for a demonstrated limitation in packaged engines |

License and feature sources: [Pagefind repository](https://github.com/Pagefind/pagefind), [MiniSearch repository](https://github.com/lucaong/minisearch), [FlexSearch repository](https://github.com/nextapps-de/flexsearch), [Orama package metadata](https://github.com/oramasearch/orama/blob/main/package.json), [Orama README](https://github.com/oramasearch/orama/blob/main/README.md), [Meilisearch Community FAQ](https://www.meilisearch.com/docs/resources/help/faq), [Typesense repository](https://github.com/typesense/typesense), [Cloudflare AI Search](https://developers.cloudflare.com/ai-search/), [D1 FTS5 support](https://developers.cloudflare.com/d1/sql-api/sql-statements/).

The practical difference between Pagefind and the browser libraries is who owns the integration. Pagefind consumes the built site and supplies a search bundle; MiniSearch/FlexSearch consume records that you prepare. Orama can bridge to hybrid search, but moving a large embedding model and all transcript vectors into visitors' browsers may work against a quiet, fast mobile site. That last assessment is an architectural tradeoff to measure, not a published benchmark.

Typesense and Meilisearch run as separate services; static Pages hosting does not itself run those servers. Keeping Astro static and querying a remote engine is sufficient. Local embedding models avoid an embedding API bill but consume your own compute. Meilisearch documents local Hugging Face and several hosted providers; model compatibility must be verified rather than assuming equal dimensions imply interchangeable embeddings. [Meilisearch embedding providers](https://www.meilisearch.com/docs/capabilities/hybrid_search/how_to/choose_an_embedder), [Typesense deployment options](https://github.com/typesense/typesense).

## What “free” means today

All prices here are USD and were checked on the research date; they are planning inputs, not a quote.

- **Pagefind and the browser engines:** no per-search service charge when you serve the index yourself. They still use build resources, storage, bandwidth, and visitor memory.
- **Meilisearch Cloud:** advertises a starting price of **$20/month** and a **14-day trial**. The estimator varies with records, searches, document size or provisioned resources. The free Community software is distinct from the paid hosted product. [Meilisearch pricing](https://www.meilisearch.com/pricing).
- **Typesense Cloud:** hourly dedicated-cluster pricing, introductory credits, and no per-search/per-record charges on the advertised cluster model. Get a configuration-specific quote; this research did not verify a universal minimum price or permanent free hosted tier. [Typesense Cloud](https://cloud.typesense.org/).
- **Cloudflare AI Search:** currently free in open beta. Workers Free allows **20,000 queries/month**, **100,000 files per instance**, **500 crawled pages/day**, and **4 MB per file**. Managed storage, vector indexing, and crawling Browser Run usage are included; **Workers AI and AI Gateway usage are separate**. Cloudflare says pricing will be announced at least 30 days before billing begins. This is not a promise of permanently free semantic search. [AI Search limits and pricing](https://developers.cloudflare.com/ai-search/platform/limits-pricing/).
- **Workers AI:** includes **10,000 neurons/day**. Paid overage is **$0.011 per 1,000 neurons**, with model-specific consumption. Listed BGE-M3 embedding pricing is **$0.012 per million input tokens**; indexing, query embeddings, optional rewriting/reranking, and optional answer generation have different usage profiles. Daily allowance and rate limits matter even if a monthly total looks small. [Workers AI pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/).
- **DIY Vectorize:** Free includes **30 million queried dimensions/month** and **5 million stored dimensions**. For example, 1,000 passages × 1,024 dimensions = 1.024 million stored dimensions. Paid allowances and overage are listed in dimensions, not a flat price per document. [Vectorize pricing](https://developers.cloudflare.com/vectorize/platform/pricing/).
- **DIY D1:** Free includes **5 million rows read/day**, **100,000 rows written/day**, and **5 GB total storage**. Rows read are not equivalent to search requests. [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/).

A modest corpus can plausibly fit free allowances, but that cannot be promised without traffic, transcript volume, model, and ingestion frequency. A search box firing remotely on every keystroke can consume many requests per visitor; submit or debounce remote queries, suppress duplicates, and measure actual use. Paid Workers starts at $5/month if an upgrade is needed. [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/).

Do not add R2 and Vectorize charges to the current managed AI Search estimate automatically. Older AutoRAG/AI Search deployments used account-owned infrastructure; current managed pricing explicitly distinguishes that history. DIY Vectorize/D1 remains separately billed.

## Making podcasts searchable at the right moment

The most useful result is “Episode title — 12:34 — matching passage,” followed by a link to read that passage or start playback there. An episode description alone is not transcript search.

Recommended publishing shape:

1. Keep a canonical episode record with ID, slug, title, summary, publication date, language, topics, audio/video URL, and draft status.
2. Keep the reviewed transcript as timed segments: stable segment ID, start seconds, end seconds, text, and optional speaker. Keep the original text separate from search aliases/normalization.
3. Render the readable transcript in the episode's static HTML. Use stable chapter headings with IDs and sensible transcript anchors.
4. For semantic indexing, group adjacent segments into coherent passages, carrying their episode ID and precise start/end times. Include episode title and chapter context in the embedding text.
5. Search passages, then group hits by article/episode so a single long recording cannot fill the entire first page.

A starting experiment is roughly 150–300 words per passage, split at sentence/topic boundaries with modest overlap. Token count, not word count, must ultimately enforce the chosen embedding model's input limit. Very short subtitle cues lose context; a whole hour in one vector makes precise retrieval difficult. These are tunable implementation recommendations, not universal optimal sizes.

Pagefind's standard sub-results split on heading elements with IDs. Arbitrary timestamp spans or paragraphs do not automatically become those heading sub-results; custom mapping can use its anchors and word locations. Start with chapter headings; add detailed moment mapping only when the player and transcript format exist. [Pagefind sub-results](https://pagefind.app/docs/sub-results/).

Cloudflare's managed chunking can divide text, but it cannot infer authoritative episode offsets from an unstructured transcript. For precise results, upload one deliberately bounded passage per item with an application-owned ID/URL mapping, or verify that the chosen ingestion method preserves usable anchors. Do not imply that a generic crawler automatically creates timestamped audio search. [AI Search chunking](https://developers.cloudflare.com/ai-search/configuration/indexing/chunking/), [AI Search metadata](https://developers.cloudflare.com/ai-search/configuration/indexing/metadata/).

Transcription is a separate publishing step. OpenAI Whisper's code and weights are MIT licensed and support multilingual transcription, with compute and accuracy varying by model/language. Existing platform transcripts can be an input if available; either way, review names, Arabic expressions, quotations, and verse references before indexing. Search quality cannot recover words missing from the transcript. [Whisper repository](https://github.com/openai/whisper).

## Arabic, English, and transliteration

Treat these as separate requirements: searching Arabic text, handling spelling variants, and searching across languages are not the same capability.

Pagefind supports Arabic stemming and UI localization, but normally creates a separate index for each HTML language and searches the current page's language. That is not automatic English-to-Arabic semantic search. Mixed-language content and merging language indexes need explicit testing. [Pagefind multilingual documentation](https://pagefind.app/docs/multilingual/).

Typesense supports per-field locale configuration including Arabic. A multilingual embedding model is still needed for semantic cross-language matches. BGE-M3's maintainers describe support for more than 100 languages; this does not establish accuracy on this site's Quran terminology, transliterations, or mixed speech. [Typesense locales](https://typesense.org/docs/guide/locale.html), [BGE-M3 model card](https://huggingface.co/BAAI/bge-m3).

Cloudflare AI Search currently lists BGE-M3 at 1,024 dimensions with a **512-token input limit**, even though the upstream model card advertises a larger context. It also lists Qwen3 embedding 0.6B with 8,192 input tokens. Use the deployed service's limit, not the upstream maximum, when choosing passage sizes. Evaluate multilingual candidates with the actual content. [AI Search supported models](https://developers.cloudflare.com/ai-search/configuration/models/supported-models/).

Maintain a small reviewed alias list for variants such as Quran/Qur'an/Koran and salah/salat. “Prayer” is broader than salah, so indiscriminate replacement can damage results. Normalize punctuation, diacritics and spacing in search fields where appropriate while preserving displayed quotations verbatim. Keep verse IDs such as `2:255` as exact structured identifiers; semantic similarity must not silently substitute a different verse. These are content-specific design recommendations.

## Proposed implementation in this site

### Optional starting phase: static search and publishable content

- Add a compact Search entry to the existing shared navigation and a dedicated `/search/` page with a visible label, shareable query URL, keyboard access, result count, empty state, and mobile-friendly excerpts.
- Add Pagefind as a pinned development dependency through the existing pnpm workflow. Run it after `astro build` against `dist`, for example by extending the build script to `astro build && pagefind --site dist`. Preserve the existing Pages command's `node scripts/check-mobile-hub.mjs` check after `pnpm build`.
- Use explicit page/body inclusion on canonical published content. Exclude drafts, podcast samples, Ko-fi preview, duplicate layout routes, search results, navigation and repeated footer text. A robots `noindex` tag is not the verification strategy for the private search index.
- Attach title, content type, description and category metadata. Weight titles/headings sensibly; do not boost long transcripts simply for containing many words. Index the home hub's actual resource descriptions, not its repeated alternate designs.
- Resolve search bundle URLs using `import.meta.env.BASE_URL`. Lazy-load the search code when needed. A vanilla script or Pagefind's components can avoid adding another React island.

Pagefind documents indexing generated HTML, restricting content with `data-pagefind-body`/`data-pagefind-ignore`, and returning custom metadata. Its current ranking controls include page-length handling and metadata weights. [Running Pagefind](https://pagefind.app/docs/running-pagefind/), [Index scope](https://pagefind.app/docs/indexing/), [Metadata](https://pagefind.app/docs/metadata/), [Ranking](https://pagefind.app/docs/ranking/).

Keep the initial result filter simple: All, Articles, Podcasts, Resources. Do not display an empty podcast tab before published episodes exist. The transcript schema is worth deciding when the first real episode is prepared; an unused player, queue system, database, or crawler is not required now.

### Recommended pilot: Cloudflare hybrid search

Use a representative set of real published articles and reviewed transcript passages. Start with retrieval-only search, vector + keyword indexing and default rank fusion. Compare against Pagefind on the same questions. Add reranking only if it improves the result set enough to justify measured latency and usage. Query rewriting should be evaluated separately because it can alter names and exact references. [Hybrid retrieval](https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/), [Reranking](https://developers.cloudflare.com/ai-search/configuration/retrieval/reranking/), [Query rewriting controls](https://developers.cloudflare.com/ai-search/api/search/workers-binding/).

Prefer an explicit build-generated export of published content for controlled IDs, deletion and transcript mapping. Crawling the public site is an alternative for an initial article-only experiment. Index updates must handle deletion/unpublishing as well as adding content; show only records tied to the current published manifest. Keep source documents and transcript data in the repository or existing publishing system, not solely in the search provider.

AI Search's five custom metadata fields require a deliberate mapping. A compact proposal is `content_type`, `source_id`, `language`, `start_seconds`, and `topic`; store title, canonical URL, publication date and end time in an application manifest keyed by source/item ID if necessary. Check the selected ingestion API's returned identifiers before committing to this mapping. The built-in `timestamp` means object modification time, **not playback time**. Filterable string data is also length-limited. [AI Search metadata](https://developers.cloudflare.com/ai-search/configuration/indexing/metadata/).

Try Cloudflare's native public endpoint and embeddable options before creating a Worker. Add a small Worker only when custom result grouping, transcript mapping, request controls or the site's UI contract needs it. Keep management credentials server-side. With a Worker, use the current `AI_SEARCH` binding and retrieval `search()`; the older `env.AI.autorag()` API is no longer recommended. The static Pages site can call this service without migrating the site to Workers hosting. [Public endpoint settings](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/), [Current Workers search binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/).

Serve source snippets and destination links. If Pagefind was added, keep it available as a clearly labeled basic-search fallback, but do not download and query both systems for every keystroke. Rate-limit expensive remote operations, constrain query length and result count, and avoid retaining raw search queries unnecessarily. Cloudflare's native public endpoint already provides rate-limit settings, so these alone do not require a custom Worker. Enable only the search endpoint for this use case. [Public endpoint controls](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/).

### Later: change engines only for a demonstrated need

Choose Typesense or Meilisearch if open-source ownership is the priority, a suitable server already exists, or managed relevance/filtering constraints prevent the required results. Test both against the same query set before selecting one; documentation does not establish a universal quality winner.

Build a custom Cloudflare pipeline only if you need controls a packaged engine cannot provide. The shape would be publication export → deterministic passages → D1 FTS5 plus Vectorize embeddings → query embedding and lexical lookup → rank fusion → grouped source results. D1 provides the lexical side; Vectorize alone is a vector index, not a complete hybrid search experience. This path adds synchronization between indexes and more failure cases to own. [D1 supported extensions](https://developers.cloudflare.com/d1/sql-api/sql-statements/), [Vectorize](https://developers.cloudflare.com/vectorize/).

## How to decide whether it is actually good

Create 20–40 real questions from the author's content once enough representative material exists. Record expected articles or transcript passages before tuning. Include:

- Exact titles, people, Arabic expressions and verse identifiers.
- Misspellings and common transliteration variants.
- Paraphrases that share few words with the target passage.
- English questions about Arabic material, Arabic queries, and mixed-language queries.
- Queries whose relevant passage is deep inside a long recording.
- Broad questions needing several sources, and questions for which the site has no relevant source.
- Filters, removed content, draft-only terms, and duplicate route exclusions.

Measure whether a relevant source appears in the first five results, the first relevant position, whether snippets genuinely match, and whether timestamp links seek to the correct segment. Record zero-result behavior, cold/warm latency on mobile, initial download size, indexing delay, and actual provider usage. A reasonable proposed launch target is a useful top-five result on at least 90% of answerable test questions, zero draft/sample leakage, and correct destinations for every tested result. Set latency targets after a first mobile measurement; these numbers are proposed acceptance criteria, not observed performance.

Use some held-out questions when tuning so aliases and weights are not merely memorizing the test set. Re-run the small corpus after changing embedding models, transcript chunk sizes or ranking. Score thresholds are engine/model specific; do not compare raw scores across engines as if they shared a relevance scale. Verify keyboard-only operation, focus behavior, announced result counts, readable highlighting and mobile layout as well as result quality. With one welcome article, feature support can be checked, but meaningful semantic relevance cannot yet be established.

## Final decision guide

| Priority | Choice |
| --- | --- |
| Free, open source, minimal work, useful now | Pagefind |
| Meaning-based search with the least backend work on this hosting stack | Pilot Cloudflare AI Search hybrid |
| Meaning-based search with an open-source server you control | Benchmark Typesense and Meilisearch Community |
| Custom JavaScript engine and willingness to own ingestion/model integration | Consider Orama |
| Bespoke ranking/data lifecycle beyond those products | DIY Cloudflare only after proving the gap |

The recommended next decision is a small hybrid-search pilot on real content and a clean publishing contract for transcripts. Add the Pagefind baseline if immediate keyword search is useful; it is not a prerequisite for the hybrid route. Neither choice requires changing the site's calm layout or turning the link hub into a chatbot.
