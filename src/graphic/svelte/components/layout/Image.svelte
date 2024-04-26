<script>
  export let imgPath, slug, alt, blocked = "";
</script>

<picture>
<source media="(min-width: 491px)" srcset="{imgPath}/800/{slug}{blocked}.jpg, {imgPath}/1200/{slug}{blocked}.jpg 2x">
<source media="(max-width: 490px)" srcset="{imgPath}/500/{slug}{blocked}.jpg, {imgPath}/800/{slug}{blocked}.jpg 3x">
<img loading="lazy" src="{imgPath}/800/{slug}{blocked}.jpg" alt="{alt}">
</picture>