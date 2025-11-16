const snatchaSVGIcon = $("<div>");
snatchaSVGIcon.attr("style", "display: none;"),
    snatchaSVGIcon.attr("id", "snatcha-svg-icon"),
    snatchaSVGIcon.attr("class", ""),
    snatchaSVGIcon.html(`
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <g fill="#548264" fill-rule="evenodd">
        <path d="M32 1a31 31 0 1 0 0 62 31 31 0 1 0 0-62Z"></path>
        <path fill="#40634C" d="M60.588 20c1.55 3.692 2.41 7.747 2.41 12 0 17.1-13.9 31-31 31 -4.26 0-8.31-.86-12-2.42l-.95-4.52 13.2-20.98 1.48-27.36 26.84 12.261Z"></path>
    </g>
    <path fill="#615260" d="M28 34l-5.63.94c-3.68.61-6.37 3.79-6.37 7.52V62h32V42.46c0-3.73-2.69-6.91-6.37-7.52L36 34h-8Z" transform="translate(6.22118 6.22121) scale(.805588)"></path>
    <g fill="#4E3D4D">
        <path d="M42.489 34.29h-3l5.63.94c3.68.61 6.37 3.79 6.37 7.52v19.54h3V42.75c0-3.73-2.69-6.91-6.37-7.52l-5.63-.94Z" transform="translate(.993769 5.98651) scale(.805588)"></path>
        <g fill-rule="evenodd" fill="#4E3D4D">
            <path d="M-37.82 45.39v-16c0-.56-.45-1-1-1 -.56 0-1 .44-1 1v16h2Z" transform="translate(55.2095 19.599) scale(.805588)"></path>
            <path d="M-27.82 45.39v-27c0-.56-.45-1-1-1 -.56 0-1 .44-1 1v27h2Z" transform="translate(55.2095 19.599) scale(.805588)"></path>
            <path d="M-19.82 45.39h2v-16c0-.56-.45-1-1-1 -.56 0-1 .44-1 1v16Z" transform="translate(55.2095 19.599) scale(.805588)"></path>
        </g>
    </g>
    <path fill="#615260" d="M24 10c0-4.42 3.58-8 8-8s8 3.58 8 8l-8.02 1 -7.99-1Z" transform="translate(6.22118 6.22121) scale(.805588)"></path>
    <path fill="#4E3D4D" d="M35.24 3.14c.48-.1.98-.14 1.5-.14 4.42 0 8 3.58 8 8l-8.02 1 -1.5-.19 6.51-.82c0-3.907-2.8-7.158-6.5-7.86Z" transform="translate(2.40242 5.41562) scale(.805588)"></path>
    <path fill="#FBBD80" d="M28 28.13V34c2.21 2.21 5.79 2.21 8 0v-5.87h-8Z" transform="translate(6.22118 6.22121) scale(.805588)"></path>
    <path fill="#FFD18D" d="M40 14l-.03 8c0 4.42-3.58 8-8 8s-8-3.58-8-8v-8H40Z" transform="translate(6.22118 6.22121) scale(.805588)"></path>
    <path fill="#FBBD80" d="M44.45 14.01h3l-.03 8c0 4.42-3.58 8-8 8 -.53 0-1.04-.06-1.54-.15 3.72-.69 6.53-3.95 6.53-7.87l.03-7.99Z" transform="translate(.214862 6.22121) scale(.805588)"></path>
    <path fill="#4E3D4D" d="M22 12c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2s-.9 2-2 2H24c-1.1 0-2-.9-2-2Z" transform="translate(6.22118 6.22121) scale(.805588)"></path>
    <path fill="#615260" d="M24 16l8 2 8-2 -.03 4.52 -1.97 1c-1.26.63-2.74.64-4 .01 -1.26-.63-2.74-.63-3.99 0l-.02.01c-1.25.63-2.73.63-3.98.01l-2.04-1.01L24 16Z" transform="translate(6.22118 6.22121) scale(.805588)"></path>
    <path fill="#4E3D4D" d="M41.77 21.888l.02-5.14 3-.76 -.01 2.57 -.02 1.94 -1.97 1c-.34.16-.68.28-1.03.36Z" transform="translate(2.35645 6.2197) scale(.805588)"></path>
</svg>
    `),
    $(document).find("body").append(snatchaSVGIcon);
