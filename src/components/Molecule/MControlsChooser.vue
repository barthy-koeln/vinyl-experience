<template>
  <div class="MControlsChooser">
    <AButton
      :active="mode === 'scroll'"
      @click="update('scroll')"
    >
      <span>Scroll</span>

      <svg
        fill="currentColor"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M164.75,224H347.11c16.4,0,24.59-19.85,13-31.41L269,101.41a18.36,18.36,0,0,0-13-5.41,18.15,18.15,0,0,0-13,5.41l-91.25,91.18C140.16,204.15,148.35,224,164.75,224ZM256,133.67,314.3,192H197.59ZM347.11,288H164.75c-16.4,0-24.59,19.85-13,31.41L243,410.59a18.15,18.15,0,0,0,13,5.41,18.34,18.34,0,0,0,13-5.41l91.18-91.18C371.7,307.85,363.52,288,347.11,288ZM256,378.33,197.59,320H314.3ZM350.88,26.94A247.21,247.21,0,0,0,256.1,8C158.8,8,66.49,65.64,26.94,161.12c-52.4,126.51,7.67,271.54,134.18,323.94A247.21,247.21,0,0,0,255.9,504c97.3,0,189.61-57.64,229.16-153.12C537.46,224.37,477.39,79.34,350.88,26.94ZM455.5,338.64A215.73,215.73,0,0,1,173.37,455.5C63.36,409.93,10.94,283.37,56.5,173.36A215.73,215.73,0,0,1,338.63,56.5C448.64,102.07,501.06,228.63,455.5,338.64Z"/>
      </svg>
    </AButton>

    <AButton
      :active="mode === 'orbit'"
      @click="update('orbit')"
    >
      <span>Orbit</span>

      <svg
        fill="currentColor"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M498.5 13.44c-21.9-21.9-62.97-17.05-122.1 14.62-7.777 4.154-10.71 13.84-6.528 21.65 4.154 7.809 13.9 10.75 21.65 6.528 47.01-25.18 76.34-28.3 84.4-20.18 6.591 6.622 8.714 33.73-25.27 93.58-4.332 7.631-9.136 15.47-14.21 23.43-35.86-62.63-103.2-105.1-180.4-105.1-114.6 0-207.1 93.34-207.1 207.1 0 77.19 42.44 144.5 105.1 180.4-7.951 5.076-15.79 9.88-23.42 14.21-59.75 33.98-86.99 31.86-93.58 25.27-8.121-8.09-5.029-37.33 20.18-84.4 4.185-7.809 1.249-17.49-6.528-21.65-7.715-4.248-17.46-1.249-21.65 6.528-31.67 59.13-36.58 100.2-14.62 122.1C22.5 507.5 34.68 512 49.98 512c24.18 0 56.1-11.21 95.45-33.58 13.53-7.69 27.61-16.59 41.1-26.41 21.5 7.542 44.52 11.96 68.56 11.96 114.6 0 207.1-93.34 207.1-207.1 0-24.04-4.406-47.08-11.95-68.58 9.825-14.39 18.72-28.46 26.41-41.1C514.1 81.07 521.7 36.68 498.5 13.44zM80.06 255.1c0-96.99 78.93-175.9 175.9-175.9 70.99 0 132.2 42.38 159.9 103.1-29.04 40.51-65.76 83.48-107.5 125.2-41.76 41.76-84.73 78.48-125.2 107.5-60.76-26.9-103.1-88.9-103.1-159.9zm351.84 0c0 96.99-78.93 175.9-175.9 175.9-12.23 0-24.17-1.269-35.7-3.657 36.38-27.64 74.08-60.58 110.7-97.24s69.59-74.35 97.23-110.7c2.37 12.397 3.67 24.297 3.67 35.697z"
        />
      </svg>
    </AButton>

    <AButton
      :active="mode === 'fps'"
      @click="update('fps')"
    >
      <span>FPV + WASD / Arrows</span>

      <svg
        fill="currentColor"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M192 64c0-35.35 28.7-64 64-64s64 28.65 64 64-28.7 64-64 64-64-28.65-64-64zm64 32c17.7 0 32-14.33 32-32s-14.3-32-32-32-32 14.33-32 32 14.3 32 32 32zm-96 128c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v56c0 16.1-11.9 29.4-27.3 31.7l-8.9 84.5c-2.2 20.3-19.3 35.8-40.7 35.8H236c-20.5 0-37.6-15.5-39.8-35.8l-8.9-84.5c-15.4-2.3-27.3-15.6-27.3-31.7v-56zm56.6 59.6 11.5 109.2c.4 4.1 3.8 7.2 7.9 7.2h39.1c5 0 8.4-3.1 8.8-7.2l11.5-109.2 23.7-3.6.9-56.9c0-16.8-14.3-32-32-32h-64c-17.7 0-32 15.2-32 32v56l24.6 4.5zM52.97 406.8c-8.43 4.5-14.03 8.8-17.34 12.5-3.23 3.6-3.63 5.9-3.63 6.9 0 1.7 1.25 6.7 11.93 14 10.16 7 25.92 13.9 46.83 20C132.4 472.3 190.8 480 256 480s123.6-7.7 165.2-19.8c21-6.1 36.7-13 46.9-20 10.6-7.3 11.9-12.3 11.9-14 0-1-.4-3.3-3.6-6.9-3.3-3.7-8.9-8-17.4-12.5-16.8-8.9-42-17-73.6-23.1-8.7-1.7-14.4-10.1-12.7-19.6 1.7-7.8 10.1-13.5 18.7-11.8 33.2 6.4 61.9 15.2 82.6 26.2 10.4 5.5 19.5 11.9 26.2 18.6 6.9 8.5 11.8 18 11.8 29.1 0 17.6-12.2 31-25.8 40.4-14.1 9.7-33.5 17.8-56 24.3C384.9 504.1 323.3 512 256 512c-67.3 0-128.9-7.9-174.17-21.1-22.52-6.5-41.91-14.6-56.03-24.3C12.18 457.2 0 443.8 0 426.2c0-11.1 4.947-20.6 11.76-29.1 6.73-6.7 15.87-13.1 26.23-18.6 20.75-11 49.37-19.8 82.61-26.2 8.6-1.7 17 4 18.7 11.8.8 9.5-4 17.9-12.7 19.6-31.62 6.1-56.8 14.2-73.63 23.1z"
        />
      </svg>
    </AButton>
  </div>
</template>

<script lang="ts">
  import AButton from '@/components/Atom/AButton.vue'
  import type { PropType } from 'vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'MControlsChooser',
    components: { AButton },

    props: {
      mode: {
        type: String as PropType<'scroll' | 'orbit' | 'fps'>,
        required: true
      }
    },

    methods: {
      update (value: string) {
        this.$emit('update:mode', value)
      }
    }
  })
</script>

<style lang="scss">
  @use "@/_variables.scss" as *;

  .MControlsChooser {
    display: flex;
    gap: var(--spacer);
    opacity: .7;
    transition: opacity $duration $easing;

    &:hover {
      opacity: 1;
    }
  }
</style>