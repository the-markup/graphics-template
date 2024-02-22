<script>
    export let label;

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    const clicked = () => dispatch('clicked');
</script>

<a class="button" on:click={clicked}>
    <span class='button__label button__label--main'>
        { label }
    </span>
</a>



<style lang="scss">

.button {
    position: relative;
    z-index: 2;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    margin-right: 6px;
    outline: 0;
  
    &:hover {
      .button__label {
        @include mq(use-motion) {
          transform: translate(-3px, -3px);
        }
        border-color: $c-pink;
      }
  
      &:before {
        @include mq(use-motion) {
          transform: translate(-2px, -2px);
        }
        border-color: mix($c-pink, $c-navy, 80%);
      }
  
      &:after {
        @include mq(use-motion) {
          transform: translate(-1px, -1px);
        }
        border-color: mix($c-pink, $c-navy, 50%);
      }
  
      .button__label--main {
        color: $c-pink;
      }
  
      svg {
        fill: $c-pink
      }
    }
  
    &:before {
      content: '';
      position: absolute;
      z-index: 2;
      top: 3px;
      left: 3px;
      width: 100%;
      height: 100%;
      border: 1px solid $c-navy;
      background-color: $c-white;
      transition: border-color 0.2s linear;
  
      @include mq(use-motion) {
        transition: transform 0.2s linear, border-color 0.2s linear;
      }
    }
  
    &:after {
      content: '';
      position: absolute;
      top: 6px;
      left: 6px;
      width: 100%;
      height: 100%;
      border: 1px solid $c-navy;
      background-color: $c-white;
      transition: border-color 0.2s linear;
  
      @include mq(use-motion) {
        transition: transform 0.2s linear, border-color 0.2s linear;
      }
    }
  
    &--important {
      .button__label {
        background-color: $c-pink;
        color: $c-white;
      }
  
      &:hover {
        .button__label {
          border-color: $c-navy;
          color: $c-navy;
        }
  
        svg {
          fill: $c-navy;
        }
      }
    }
  
    &--faded {
      .button__label {
        color: lighten($c-tan, 20%);
      }
  
      svg {
        fill: $c-tan;
      }
  
      &:hover {
        .button__label {
          border-color: $c-pink;
          color: $c-pink;
        }
  
        svg {
          fill: $c-navy;
        }
      }
    }
  
    &--navy {
      .button__label,
      &:before,
      &:after {
        background-color: $c-navy;
        color: $c-white;
        border-color: $c-white;
      }
  
      .button__label--temp {
        background-color: $c-pink;
        color: $c-white;
      }
    }
  
    &--has-mobile-label {
      .button__label--main {
        display: none;
      }
  
      @include mq($bp-tablet) {
        .button__label--main {
          display: block;
        }
  
        .button__label--mobile {
          display: none;
        }
      }
    }
  }
  
  .button__label {
    position: relative;
    z-index: 3;
    border: 1px solid $c-navy;
    padding: 12px;
    font-size: $fs-xs;
    font-family: $ff-sans;
    font-weight: 700;
    line-height: 1.2;
    color: $c-navy;
    background-color: $c-white;
    display: block;
    transition: color 0.2s linear, transform 0.2s linear, border-color 0.2s linear;
  
    svg {
      fill: $c-navy;
      width: 1em;
      height: 0.9em;
      display: inline-block;
      margin: 0 3px -1px 0;
      transition: fill 0.2s linear;
    }
  }
  
  .button--mastodon .button__label svg {
    height: 1em;
  }
  
  .button__label--temp,
  .button__label--loading,
  .button__label--expanded,
  .button__label--success {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $c-pink;
    color: $c-white;
    text-align: center;
    transition: opacity 0.2s linear, color 0.2s linear, transform 0.2s linear;
  
    &.is-visible {
      opacity: 1;
    }
  }
  </style>