---
title: A reading layout with room for notes
description: Development reference for article navigation, repeated citations, and margin notes.
date: 2026-09-14
category: Design reference
draft: true
---

This draft demonstrates the article layout. It is excluded from production builds. Read the main column, follow a section in the contents, or open a numbered note and use its return link to resume reading.[^layout]

## Finding your place

The contents list provides a quick way to see how an article is organized. On a wide screen it stays beside the text as you scroll. On a phone it becomes a disclosure above the article, leaving the full width available for reading. The navigation uses the same heading links in both views.

### Following a subsection

Subsections appear beneath their parent section when that section is current. They remain available while a keyboard user has focus inside the section's navigation. This lets the reader finish navigating without a focused link disappearing as the page moves.

The indicator marks a position in the article, not a measure of comprehension. A reader may skip ahead, reread a paragraph, or follow a reference and return. All of those are ordinary ways to use an article. The navigation should support them without demanding a particular reading order.

### Returning to a source

The same note can support more than one sentence. This is a second citation of the opening note.[^layout] Each return link belongs to its own citation, so the reader can return to either place. There is one note definition and one note ID, even when the page has enough room for a right margin.

## Reading notes together

Several references can appear in the same paragraph.[^first][^second][^third] A narrow margin cannot place them all at precisely the same height. It should keep them in order and leave enough separation to distinguish one note from the next. The article remains readable while the notes use the space they need.

### A longer explanation

Some references are only a short source link. Others include a qualification, a passage description, or an explanation of why the source is relevant. The layout should accommodate both. Expanding the text size should not cause one note to cover another, and changing the window width should restore ordinary endnotes when the margin no longer fits.

Images and fonts may load after the first page layout. When they change the height of a paragraph, the note beside it should follow. Readers should not need to reload the page to correct its alignment. The same applies when a disclosure inside the article opens or closes.

## Keeping the article usable

Links remain useful without the visual enhancements. A contents entry leads to its heading. A numbered citation leads to its note. A note provides a way back to the cited paragraph. These relationships should survive printing, resizing, and reading with JavaScript disabled.

### A final subsection with a deliberately long heading to check wrapping in the contents rail

Long headings should wrap naturally in the rail. They should not make the main text narrower or create horizontal scrolling. The selected heading can use a stronger weight and the site's accent color while the other entries remain quiet. A visible focus outline gives keyboard users a separate indication of which link they are about to activate.

The layout is complete when readers can move through this draft, inspect the notes, and return to their place at a comfortable text size. The surrounding site does not need to change for an article to make better use of a wide screen.

## References

[^layout]: Layout reference: [Preparing for Launch, Institute for Progress](https://ifp.org/preparing-for-launch/). This note is intentionally cited twice to check both return destinations.

[^first]: A short note in a group of closely spaced citations.

[^second]: A longer note for checking collision handling. The article's source references are written once using native Markdown footnotes. Desktop placement should use that same content and keep its links intact. This example is long enough to wrap across several lines in the margin and to require more vertical space when the reader enlarges text.

[^third]: The last note in the group must appear after the longer note, with a clear gap and an intact return link.
