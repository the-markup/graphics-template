<script>
  export let articleMeta = {
    series: "Series",
    seriesLink: "/seriesLink",
    title: "Headline Goes Here",
    subhed: "Subhed goes here with more details",
    datetime: Date.now(), 
    dateString: "Jan. 1, 2024",
    bylines: [{name: "Joel Eastwood", link: "https://themarkup.org/people/joel-eastwood"}]
  }

    let last = (a, i) => i == a.length - 1;
    let secondLast = (a, i) => i == a.length - 2;
</script>

<div class="header-container">
  <div class="article-titles">
    <div class="article-titles__inner print-hidden">
      <p class="article-type">
        <a href="/series/{articleMeta.seriesLink}" class="article-type__link article-type__link--series">
          {articleMeta.series}
        </a>
      </p>
      <h1 class="article-title" id="headline">
        {articleMeta.title}
      </h1>
      <p class="article-subhead">
        {@html articleMeta.subhed}          
        <span class="article-author">
          <span>By </span>
          {#each articleMeta.bylines as byline, index}
            <a class="article-author__link" href={byline.link}>{byline.name}</a>
              {#if articleMeta.bylines.length > 0}
                {#if last(articleMeta.bylines,index)}
                {:else if secondLast(articleMeta.bylines, index)}&nbsp;and&nbsp;
                {:else},&nbsp;
              {/if}
            {/if}
          {/each}
        </span>
      </p>
      <div class="article-date">
        <time datetime="{articleMeta.datetime}">{articleMeta.dateString}</time>
      </div>
    </div>
  </div>
</div> 

<style lang="scss">

  .header-container {
    margin-bottom: 20px;
  }
  .article-titles {
    width: 100%;
    max-width: 620px;
    margin: 0 0 12px 0;
    text-align: center;

    .article-titles__inner {
      background-color: transparent;
      padding: 0px;

      #headline {
        font-size: $fs-xl;
        text-align: center;
        font-family: $ff-chicago;

        @include mq($bp-tablet) {
          font-size: $fs-xxl;
        }
      }

      .article-subhead {
        font-size: $fs-xs;
        color: $c-tan;
        text-align: center;

        @include mq($bp-tablet) {
          font-size: $fs-sm;
        }
      }

  .article-title, .article-type__link--series, .article-subhead, .article-author, .article-date time {
    font-family: $ff-sans;
      text-shadow: 
        -3px -3px 5px var(--bg-color), 
        -2px -2px 5px var(--bg-color), 
        -1px -1px 5px var(--bg-color), 
        -3px 3px 5px var(--bg-color), 
        -2px 2px 5px var(--bg-color), 
        -1px 1px 5px var(--bg-color), 
        1px 1px 5px var(--bg-color), 
        2px 2px 5px var(--bg-color), 
        3px 3px 5px var(--bg-color),
        -1px 1px 5px var(--bg-color), 
        -2px 2px 5px var(--bg-color), 
        -3px 3px 5px var(--bg-color);
    }           
  }
    &:after {
      background: transparent;
    }
    .article-author__link {
      text-shadow: 
        -3px -3px 5px var(--bg-color), 
        -2px -2px 5px var(--bg-color), 
        -1px -1px 5px var(--bg-color), 
        -3px 3px 5px var(--bg-color), 
        -2px 2px 5px var(--bg-color), 
        -1px 1px 5px var(--bg-color), 
        1px 1px 5px var(--bg-color), 
        2px 2px 5px var(--bg-color), 
        3px 3px 5px var(--bg-color),
        -1px 1px 5px var(--bg-color), 
        -2px 2px 5px var(--bg-color), 
        -3px 3px 5px var(--bg-color);
    }
  }
</style>