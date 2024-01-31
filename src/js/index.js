class InfiniteList {
    constructor(container, rowHeight, totalRows) {
        this.container = container;
        this.rowHeight = rowHeight;
        this.totalRows = totalRows;
        this.visibleRows = Math.ceil(this.container.clientHeight / this.rowHeight);
        this.bufferSize = this.visibleRows * 2; // Adjust as needed
        this.renderChunk(0);
        this.attachScrollListener();
    }

    attachScrollListener() {
        this.container.addEventListener('scroll', () => {
            console.log('scroll')
            const scrollTop = this.container.scrollTop;
            const startIndex = Math.floor(scrollTop / this.rowHeight);
            this.renderChunk(startIndex);
        });
    }

    renderChunk(startIndex) {
        const endIndex = Math.min(startIndex + this.bufferSize, this.totalRows);
        const content = document.getElementById('content');
        content.style.height = `${this.totalRows * this.rowHeight}px`;
        content.style.transform = `translateY(${startIndex * this.rowHeight}px)`;
        content.innerHTML = '';
        console.log(startIndex, endIndex, this.visibleRows)
        for (let i = startIndex; i < endIndex; i++) {
            const row = this.createRow(i);
            content.appendChild(row);
        }
    }

    createRow(index) {
        const row = document.createElement('div');
        row.style.height = `${this.rowHeight}px`;
        row.textContent = `Row ${index}`;
        return row;
    }
}

const list = new InfiniteList(document.getElementById('container'), 20, 1_000_000);
