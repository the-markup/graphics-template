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
</script>

<footer class="article-footer print-hidden">
        <div class="article-footer-titles">
          <h2 class="article-footer-titles__overline">You just read</h2>
          <p class="article-footer-titles__title">{articleMeta.title}</p><p class="article-footer-titles__series">From the series —
    

      <a href="/series/{articleMeta.seriesLink}">{articleMeta.series}</a></p><div class="article-footer-titles__share">
            <h2 class="article-footer-titles__overline">Share This Article</h2>
            
              <a class="button  js-CopyLink">
    <span class="button__label button__label--main">
        
        Copy Link
    </span><span class="button__label button__label--temp">Copied!</span></a>
          </div>
        </div>

        <div id="credits" class="article-footer__details print-hidden">
          <h3 class="article-details__overline">Credits</h3>
          <div class="article-authors">
            <ul class="article__author-list">
              {#each articleMeta.bylines as author}
              <li class="article__author-list-item">
                <div class="article__author-headshot">
                    <picture>
                      <source media="(min-width: 491px)" srcset="{author.photo}-60x60.jpg, {author.photo}-120x120.jpg 2x">
                      <source media="(max-width: 490px)" srcset="{author.photo}-240x240.jpg 3x">
                      <img src="{author.photo}-60x60.jpg" alt="" class="article__author-image">
                    </picture>
                </div>
                <p class="article__author-description">
                    <a href="{author.link}" class="article__author-link">{author.name}</a>
                    <span class="article__author-non-link">{author.title}</span>
                </p>
              </li>
              {/each}
            </ul>
            <div class="article__credits">
              <div class="article__credits-section">
                <h3 class="article-details__overline">Design and Development</h3>
                <ul class="article__credits-list">
                  <li class="article__credits-list-item article__author-description">
                    <a href="https://themarkup.org/people/joel-eastwood" class="article__author-link">Joel Eastwood</a>
                    <span class="article__author-non-link"></span>
                  </li>
                  <li class="article__credits-list-item article__author-description">
                    <a href="https://themarkup.org/people/miles-hilton" class="article__author-link">Miles Hilton
                    </a>
                    <span class="article__author-non-link"></span>
                  </li>
                  <li class="article__credits-list-item article__author-description">
                        <a href="https://themarkup.org/people/gabriel-hongsdusit" class="article__author-link">Gabriel Hongsdusit</a>
                        <span class="article__author-non-link"></span>
                  </li>
                </ul>
              </div>
  
              
              <div class="article__credits-section">
                <h3 class="article-details__overline">Engagement</h3>
                <ul class="article__credits-list">
                  <li class="article__credits-list-item article__author-description">
                        <a href="https://themarkup.org/people/maria-puertas" class="article__author-link">Maria Puertas</a>
                        <span class="article__author-non-link"></span>
                  </li>
                </ul>
              </div>
  
              
              <div class="article__credits-section">
                <h3 class="article-details__overline">Editing</h3>
                <ul class="article__credits-list">
                  <li class="article__credits-list-item article__author-description">
                        <a href="https://themarkup.org/people/sisi-wei" class="article__author-link">Sisi Wei</a>
                        <span class="article__author-non-link"></span>
                  </li>
                  <li class="article__credits-list-item article__author-description">
                        <a href="https://themarkup.org/people/ryan-tate" class="article__author-link">Ryan Tate</a>
                        <span class="article__author-non-link"></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </footer>

<style lang="scss">

  .article-footer, .article-footer *:not(.button__label) {
    border-color: #d6d0c9;
  }

  .article__author-link, .article-footer-titles__series a {
    text-shadow: 
      -3px 0px 0 #ECECD8, 
      -2px 0px 0 #ECECD8, 
      -1px 0px 0 #ECECD8, 
      3px 0px 0 #ECECD8, 
      2px 0px 0 #ECECD8, 
      1px 0px 0 #ECECD8, 
  }
  
</style>