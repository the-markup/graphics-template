<script>
    export let series, seriesLink, title, subhed, datetime, dateString;
    export let bylines = [];

    let last = (a, i) => i == a.length - 1;
    let secondLast = (a, i) => i == a.length - 2;
</script>

<div class="article-titles">
    <div class="article-titles__inner print-hidden"><p class="article-type"><a href="/series/{seriesLink}" class="article-type__link article-type__link--series">{series}</a></p><h1 class="article-title">{title}</h1>
      <p class="article-subhead">
        {subhed}       
        
          
<span class="article-author">
  <span>By </span>
  

    {#each bylines as byline, index}
        <a class="article-author__link" href={byline.link}>{byline.name}</a>{#if bylines.length > 0}{#if last(bylines,index)}{:else if secondLast(bylines, index)}&nbsp;and&nbsp;{:else},&nbsp;{/if}{/if}{/each}
</span>

        
      </p>
      <div class="article-date">
        <time datetime="{datetime}">{dateString}</time></div>
    </div>
  </div>

  <style lang="scss">
      .article-titles {
          margin: 0 0 12px 0;
          left: 6px;

          .article-titles__inner {
            background-color: transparent;

            .article-title, .article-type__link--series, .article-subhead, .article-author, .article-date time {
                // background: #fff;
                // display: inline;
                // padding: 2px;
                // filter: drop-shadow(2px 2px 10px #ffffff);
                text-shadow: 
                    -3px -3px 5px #ffffff, 
                    -2px -2px 5px #ffffff, 
                    -1px -1px 5px #ffffff, 
                    -3px 3px 5px #ffffff, 
                    -2px 2px 5px #ffffff, 
                    -1px 1px 5px #ffffff, 
                    1px 1px 5px #ffffff, 
                    2px 2px 5px #ffffff, 
                    3px 3px 5px #ffffff,
                    -1px 1px 5px #ffffff, 
                    -2px 2px 5px #ffffff, 
                    -3px 3px 5px #ffffff;
            }           
          }
          &:after {
                background: transparent;
            }

            .article-author__link {
                text-shadow: 
                    -3px -3px 5px #ffffff, 
                    -2px -2px 5px #ffffff, 
                    -1px -1px 5px #ffffff, 
                    -3px 3px 5px #ffffff, 
                    -2px 2px 5px #ffffff, 
                    -1px 1px 5px #ffffff, 
                    1px 1px 5px #ffffff, 
                    2px 2px 5px #ffffff, 
                    3px 3px 5px #ffffff,
                    -1px 1px 5px #ffffff, 
                    -2px 2px 5px #ffffff, 
                    -3px 3px 5px #ffffff;
            }
          
      }
  </style>