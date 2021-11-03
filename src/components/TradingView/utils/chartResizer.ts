export function resize(dom: HTMLElement | null, height: number, width: number) {
    if(dom) {
        // dom.style.height = height + 'px';
        dom.style.width = width + 'px';
    }
}
export function resizeChart(dom: HTMLDivElement, width: number) {
    const height = 0;
    const iframe = dom.querySelector('iframe');
    if(iframe) {
        iframe.width = width + '';
    }
    if(iframe?.contentDocument) {
        const contentDocument = iframe.contentDocument;
        const layoutArea: HTMLDivElement | null = contentDocument
            .querySelector('.layout__area--center no-border-bottom-left-radius no-border-bottom-right-radius')
        resize(layoutArea, height, width);
        const chartContainer: HTMLDivElement | null = contentDocument.querySelector('.chart-container.active');
        resize(chartContainer, height, width);
        const chartWidget: HTMLDivElement | null = contentDocument.querySelector('.chart-widget')
        resize(chartWidget, height, width)
        const chartMarkupTable: HTMLDivElement | null = contentDocument.querySelector('.chart-markup-table')
        resize(chartMarkupTable, height, width);

        const paneCursorPointer: HTMLDivElement | null = contentDocument.querySelector('.chart-markup-table.pane.pane--cursor-pointer')
        resize(paneCursorPointer, height, width);
        const chartGuiWrapper: HTMLDivElement | null = contentDocument.querySelector('.chart-gui-wrapper')
        resize(chartGuiWrapper, height, width - 112);
        if(chartGuiWrapper) {
            const canvases: NodeListOf<HTMLCanvasElement> = chartGuiWrapper.querySelectorAll('canvas')
            canvases.forEach(canvas => {
                canvas.width = width - 112;
            })
        }
        /*const priceAxisContainer: NodeListOf<HTMLElement> = contentDocument.querySelectorAll('.chart-markup-table.price-axis-container')
        priceAxisContainer.forEach(item => {
            resize(item, height, width);
        })
        const canvases: NodeListOf<HTMLCanvasElement> = contentDocument.querySelectorAll('.chart-markup-table.price-axis-container .price-axis canvas')
        canvases.forEach(canvas => {
            canvas.width = width;
            canvas.height = height;
        })
        const layoutAreaLeft: HTMLElement | null = contentDocument.querySelector('.layout__area--left')
        // resize(layoutAreaLeft, height, width);*/
    }
}