class sortAlgorithms {
    constructor(time) {
        this.list = document.querySelectorAll(".cell");
        this.size = this.list.length;
        this.time = time;
        this.descending = document.querySelector(".order-menu").value === "desc";
        this.help = new Helper(this.time, this.list, this.descending);
        this.stopped = false; // Flag to control stopping
        this.swapSound = new Audio('sound.wav'); // Add a sound file for swaps
    }

    // Method to stop the sorting
    stop() {
        this.stopped = true;
    }

    // Method to play the swap sound
    playSwapSound() {
        this.swapSound.currentTime = 0; // Reset sound to start
        this.swapSound.play();
    }

    // BUBBLE SORT
    BubbleSort = async () => {
        this.stopped = false; // Reset the stopped flag at the start of sorting
        for (let i = 0; i < this.size - 1; ++i) {
            if (this.stopped) return; // Check if sorting should stop
            for (let j = 0; j < this.size - i - 1; ++j) {
                if (this.stopped) return; // Check if sorting should stop
                await this.help.mark(j);
                await this.help.mark(j + 1);
                if (await this.help.compare(j, j + 1)) {
                    await this.help.swap(j, j + 1);
                    this.playSwapSound(); // Play sound on swap
                }
                await this.help.unmark(j);
                await this.help.unmark(j + 1);
            }
            this.list[this.size - i - 1].setAttribute("class", "cell done");
        }
        if (!this.stopped) this.list[0].setAttribute("class", "cell done");
        document.getElementById('time').innerHTML = "O(n^2)";
        document.querySelector(".footer > p:nth-child(1)").style.visibility = "visible";
    }

    // INSERTION SORT
    InsertionSort = async () => {
        this.stopped = false;
        for (let i = 0; i < this.size - 1; ++i) {
            if (this.stopped) return;
            let j = i;
            while (j >= 0 && await this.help.compare(j, j + 1)) {
                if (this.stopped) return;
                await this.help.mark(j);
                await this.help.mark(j + 1);
                await this.help.pause();
                await this.help.swap(j, j + 1);
                this.playSwapSound(); // Play sound on swap
                await this.help.unmark(j);
                await this.help.unmark(j + 1);
                j -= 1;
            }
        }
        if (!this.stopped) {
            for (let counter = 0; counter < this.size; ++counter) {
                this.list[counter].setAttribute("class", "cell done");
            }
        }
        document.getElementById('time').innerHTML = "O(n^2)";
        document.querySelector(".footer > p:nth-child(1)").style.visibility = "visible";
    }

    // SELECTION SORT
    SelectionSort = async () => {
        this.stopped = false;
        for (let i = 0; i < this.size; ++i) {
            if (this.stopped) return;
            let minIndex = i;
            for (let j = i; j < this.size; ++j) {
                if (this.stopped) return;
                await this.help.markSpl(minIndex);
                await this.help.mark(j);
                if (await this.help.compare(minIndex, j)) {
                    await this.help.unmark(minIndex);
                    minIndex = j;
                }
                await this.help.unmark(j);
                await this.help.markSpl(minIndex);
            }
            await this.help.mark(minIndex);
            await this.help.mark(i);
            await this.help.pause();
            await this.help.swap(minIndex, i);
            this.playSwapSound(); // Play sound on swap
            await this.help.unmark(minIndex);
            this.list[i].setAttribute("class", "cell done");
        }
        document.getElementById('time').innerHTML = "O(n^2)";
        document.querySelector(".footer > p:nth-child(1)").style.visibility = "visible";
    }

    // MERGE SORT
    MergeSort = async () => {
        this.stopped = false;
        await this.MergeDivider(0, this.size - 1);
        if (!this.stopped) {
            for (let counter = 0; counter < this.size; ++counter) {
                this.list[counter].setAttribute("class", "cell done");
            }
        }
        document.getElementById('time').innerHTML = "O(nlog(n))";
        document.querySelector(".footer > p:nth-child(1)").style.visibility = "visible";
    }

    MergeDivider = async (start, end) => {
        if (this.stopped) return;
        if (start < end) {
            let mid = start + Math.floor((end - start) / 2);
            await this.MergeDivider(start, mid);
            await this.MergeDivider(mid + 1, end);
            await this.Merge(start, mid, end);
        }
    }

    Merge = async (start, mid, end) => {
        if (this.stopped) return;
        let newList = new Array();
        let frontcounter = start;
        let midcounter = mid + 1;

        while (frontcounter <= mid && midcounter <= end) {
            let fvalue = Number(this.list[frontcounter].getAttribute("value"));
            let svalue = Number(this.list[midcounter].getAttribute("value"));
            if (this.descending ? (fvalue <= svalue) : (fvalue >= svalue)) {
                newList.push(svalue);
                ++midcounter;
            }
            else {
                newList.push(fvalue);
                ++frontcounter;
            }
        }
        while (frontcounter <= mid) {
            newList.push(Number(this.list[frontcounter].getAttribute("value")));
            ++frontcounter;
        }
        while (midcounter <= end) {
            newList.push(Number(this.list[midcounter].getAttribute("value")));
            ++midcounter;
        }

        for (let c = start; c <= end; ++c) {
            this.list[c].setAttribute("class", "cell current");
        }
        for (let c = start, point = 0; c <= end && point < newList.length;
            ++c, ++point) {
            await this.help.pause();
            this.list[c].setAttribute("value", newList[point]);

            this.list[c].style.height = `${3.5 * newList[point]}px`;
            this.playSwapSound(); // Play sound on value update

            const baseHeight = 15;  // Minimum height for visibility
            const scalingFactor = 3.8;  // Scaling for larger values
            this.list[c].style.height = `${baseHeight + scalingFactor * newList[point]}px`;

            let span = this.list[c].querySelector(".cell-value");
            if (span) {
                span.innerText = newList[point];
            }
        }
        for (let c = start; c <= end; ++c) {
            this.list[c].setAttribute("class", "cell");
        }
    }

    // QUICK SORT
    QuickSort = async () => {
        this.stopped = false;
        await this.QuickDivider(0, this.size - 1);
        if (!this.stopped) {
            for (let c = 0; c < this.size; ++c) {
                this.list[c].setAttribute("class", "cell done");
            }
        }
        document.getElementById('time').innerHTML = "O(nlog(n))";
        document.querySelector(".footer > p:nth-child(1)").style.visibility = "visible";
    }

    QuickDivider = async (start, end) => {
        if (this.stopped) return;
        if (start < end) {
            let pivot = await this.Partition(start, end);
            await this.QuickDivider(start, pivot - 1);
            await this.QuickDivider(pivot + 1, end);
        }
    }

    Partition = async (start, end) => {
        if (this.stopped) return;
        let pivot = this.list[end].getAttribute("value");
        let prev_index = start - 1;

        await this.help.markSpl(end);
        for (let c = start; c < end; ++c) {
            if (this.stopped) return;
            let currValue = Number(this.list[c].getAttribute("value"));
            await this.help.mark(c);
            if (this.descending ? (currValue > pivot) : (currValue < pivot)) {
                prev_index += 1;
                await this.help.mark(prev_index);
                await this.help.swap(c, prev_index);
                this.playSwapSound(); // Play sound on swap
                await this.help.unmark(prev_index);
            }
            await this.help.unmark(c);
        }
        await this.help.swap(prev_index + 1, end);
        this.playSwapSound(); // Play sound on swap
        await this.help.unmark(end);
        return prev_index + 1;
    }
}
