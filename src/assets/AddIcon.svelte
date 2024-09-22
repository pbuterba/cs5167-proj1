<script>
    export let width;

    let longDimension = width * 2.4;
    let shortDimension = longDimension/5;
</script>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox={"0 0 " + longDimension + " " + longDimension} width={width}>
    <defs>
        <style>
            .cls-1 {
                fill: #a5a5a5;
            }
        </style>
    </defs>
    <!-- Generator: Adobe Illustrator 28.6.0, SVG Export Plug-In . SVG Version: 1.2.0 Build 709)  -->
    <g>
        <g id="Layer_1">
            <g id="Layer_1-2" data-name="Layer_1">
                <rect class="cls-1" x="0" y={longDimension/2 - shortDimension/2} width={longDimension} height={shortDimension} />
                <rect class="cls-1" x={longDimension/2 - shortDimension/2} y="0" width={shortDimension} height={longDimension} />
            </g>
        </g>
    </g>
 </svg>