<script>
    export let quote, name, pronouns, school, photo = null, color = "blue"
</script>

<div class="outer-container">
    <div class="top-bar" style="--backgroundColor:{color}">
        <div class="browser-lines">
            {#each {length: 3} as _ }
                <div class="line"></div>
            {/each}
        </div>
    </div>
    <div class="scroll-container">
        <div class="inner-container">
            <span class="quote-punct">“</span>
            <p class="quote">{quote}</p>
            <figure class="photo-block">
                {#if photo != null}
                <img src="{process.env.GRAPHIC_PATH}/assets/headshots/headshot-{photo}.jpg" alt="Photo of {name}">
                {/if}
                <figcaption class="caption">
                    <span class="name">{name}</span>
                    <span class="location">{pronouns} | {school}</span>
                </figcaption>
            </figure>
        </div>
        <div class="scrollbar">
            <div class="arrow">▲</div>
            <div class="arrow">▼</div>
        </div>
    </div>
    
</div>


<style lang="scss">
    .outer-container {
        max-width: 800px;
    }
    .top-bar {
        background-color: var(--backgroundColor);
        border: 1px solid $c-navy;
        width: 100%;
        height: 45px;
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        padding: 12px 15px;
        gap: 10px;
        z-index: 2;
    }
    .browser-lines {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        width: 100%;

        .line {
            display: block;
            width: 100%;
            height: 2px;
            background-color: #333;
        }
    }

    .scroll-container {
        display: flex;

        .scrollbar{
            display: flex;
            flex-flow: column nowrap;
            align-items: stretch;
            justify-content: space-between;
            width: 50px;            
            background-color: #ddd;
            border-right: 1px solid $c-navy;
            
            .arrow {
                border-top: 1px solid $c-navy;
                border-bottom: 1px solid $c-navy;
                padding: 2px;
                color: $c-tan;
            }
        }
    }

    .inner-container {
        display: flex;
        flex-flow: column nowrap;
        background-color: $c-white;
        border: 1px solid $c-navy;
        padding: 2em;
    }

    .quote-punct {
        font-family: $ff-chicago;
        font-size: $fs-xxxl;
        line-height: 0.5em;
        font-weight: 700;
    }

    .quote {
        font-size: $fs-sm;
        margin-bottom: 1em;
        &::first-line {
            font-weight: 700;
        }

        @include mq($bp-tablet) {
            font-size: $fs-md;
        }
    }

    .photo-block {
        display: flex;
        align-items: center;
        gap: 20px;

        img {
            width: 100px;
            border: 1px solid $c-navy;

            @include mq($bp-tablet) {
                width: 120px;
            }
        }
    }

    .caption {
        display: flex;
        flex-flow: column nowrap;
        

        .name {
            font-size: $fs-xs;
            margin-bottom: 0.2em;

            @include mq($bp-tablet) {
                font-size: $fs-sm;
            }
        }

        .location {
            font-size: $fs-xxs;
            color: $c-tan;

            @include mq($bp-tablet) {
                font-size: $fs-xs;
            }
        }
    }
</style>