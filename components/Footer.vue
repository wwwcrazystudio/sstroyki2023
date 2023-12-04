<template>
    <div>
        <button class="to-top" @click.prevent="handleToTop">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7.02477 3.43929L7.02408 15.3208H8.97592L8.97661 3.44067L14.2117 8.67572L15.592 7.29535L8 -0.296686L0.40796 7.29535L1.78833 8.67572L7.02477 3.43929Z"
                    fill="white" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
const handleToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
</script>

<style lang="scss" scoped>
.to-top {
    width: rem(46px);
    height: rem(46px);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    background: #000;
    border-radius: 50%;
    bottom: rem(32px);
    right: rem(32px);
}
</style>