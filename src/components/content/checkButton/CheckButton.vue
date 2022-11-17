<template>
    <div class="check-button">
        <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
import { createDiffieHellmanGroup } from 'crypto';

export default {
    name:'CheckButton',

}
</script>

<style scoped>
.check-button{
    border-radius: 50%;
    border: 1px solid #aaa;
}

.checked{
    background: var(--color-tint);
    border-color: var(--color-tint);
}

</style>