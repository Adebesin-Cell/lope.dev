<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="utf-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="rss/channel/title"/> — RSS feed</title>
        <style>
          :root { color-scheme: light dark; }
          body { max-width: 40rem; margin: 3rem auto; padding: 0 1.25rem;
            font: 1rem/1.65 system-ui, sans-serif; }
          .note { padding: .85rem 1rem; border: 1px solid color-mix(in oklab, currentColor 20%, transparent);
            border-radius: .5rem; font-size: .9rem; opacity: .85; margin-bottom: 2.5rem; }
          h1 { font-size: 1.6rem; margin: 0 0 .25rem; }
          .desc { opacity: .75; margin: 0 0 2rem; }
          ul { list-style: none; padding: 0; }
          li { padding: 1rem 0; border-top: 1px solid color-mix(in oklab, currentColor 15%, transparent); }
          a { color: inherit; }
          time { font-size: .8rem; opacity: .6; display: block; margin-bottom: .2rem; }
          .item-desc { opacity: .75; font-size: .92rem; margin: .3rem 0 0; }
          .via { font-size: .7rem; letter-spacing: .03em; text-transform: uppercase;
            opacity: .55; border: 1px solid color-mix(in oklab, currentColor 25%, transparent);
            border-radius: 999px; padding: .05rem .5rem; margin-left: .5rem; vertical-align: middle; }
        </style>
      </head>
      <body>
        <div class="note">
          📡 This is an RSS feed. Copy the URL into a feed reader to subscribe.
        </div>
        <h1><xsl:value-of select="rss/channel/title"/></h1>
        <p class="desc"><xsl:value-of select="rss/channel/description"/></p>
        <ul>
          <xsl:for-each select="rss/channel/item">
            <li>
              <time><xsl:value-of select="pubDate"/></time>
              <a href="{link}"><xsl:value-of select="title"/></a>
              <xsl:if test="contains(link, 'medium.com')"><span class="via">via Medium</span></xsl:if>
              <p class="item-desc"><xsl:value-of select="description"/></p>
            </li>
          </xsl:for-each>
        </ul>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
