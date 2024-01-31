class InfiniteList {
    constructor(options = {}) {
        if (!options.containerId || typeof options.containerId !== 'string') throw new Error('containerId must be a string.');
        if (!options.contentId || typeof options.contentId !== 'string') throw new Error('contentId must be a string.');
        if (!options.rowHeight || typeof options.rowHeight !== 'number') throw new Error('rowHeight must be a number.');
        if (!options.totalRows || typeof options.totalRows !== 'number') throw new Error('totalRows must be a number.');

        this.containerEl = document.getElementById(options.containerId);
        this.contentEl = document.getElementById(options.contentId);
        this.rowHeight = options.rowHeight;
        this.totalRows = options.totalRows;
        this.visibleRows = Math.ceil(this.containerEl.clientHeight / this.rowHeight);
        this.bufferSize = this.visibleRows * 2; // Adjust as needed
        this.renderChunk(0);
        this.attachScrollListener();
    }

    attachScrollListener() {
        this.containerEl.addEventListener('scroll', () => {
            const scrollTop = this.containerEl.scrollTop;
            const startIndex = Math.floor(scrollTop / this.rowHeight);
            this.renderChunk(startIndex);
        });
    }

    renderChunk(startIndex) {
        const endIndex = Math.min(startIndex + this.bufferSize, this.totalRows);
        this.contentEl.style.height = `${this.totalRows * this.rowHeight}px`;
        this.contentEl.style.transform = `translateY(${startIndex * this.rowHeight}px)`;
        this.contentEl.innerHTML = '';
        for (let i = startIndex; i < endIndex; i++) {
            const row = this.createRow(i);
            this.contentEl.appendChild(row);
        }
    }

    createRow(index) {
        const row = document.createElement('div');
        row.style.height = `${this.rowHeight}px`;
        row.textContent = `Row ${index}`;
        return row;
    }
}

const totalRows = 1_000_000;
const list = new InfiniteList({ containerId: 'container', contentId: 'content', rowHeight: 20, totalRows });
