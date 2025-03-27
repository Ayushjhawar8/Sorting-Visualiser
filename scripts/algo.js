const sortingAlgorithms = {
    "1": {
        name: "Bubble Sort",
        description: "Simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)",
        code: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`
    },
    "2": {
        name: "Selection Sort",
        description: "Divides the input list into a sorted and an unsorted region, repeatedly selects the smallest element from the unsorted region.",
        timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)",
        code: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}`
    },
    "3": {
        name: "Insertion Sort",
        description: "Builds the final sorted array one item at a time, efficient for small data sets.",
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)",
        code: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
    },
    "4": {
        name: "Merge Sort",
        description: "Divide and conquer algorithm that splits the array and merges sorted halves.",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(n)",
        code: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`
    },
    "5": {
        name: "Quick Sort",
        description: "Selects a pivot element and partitions the array around it.",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
        spaceComplexity: "O(log n)",
        code: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
    }
};



const selectAlgo = document.getElementById("menu");
const algoContainer = document.querySelector(".algo");
const codeContainer = document.getElementById("code-container");
const infoContainer = document.querySelector(".right");

algoContainer.style.display = "none";

function renderAlgorithm(selectedValue) {
   
    
    codeContainer.textContent = "";
    infoContainer.style.display = "none";
    codeContainer.style.display = "none";

    if (selectedValue === "0" || !sortingAlgorithms[selectedValue]) {
        console.log("No valid algorithm selected or data not found");
        return;
    }
    
    const algoData = sortingAlgorithms[selectedValue];
    codeContainer.textContent = algoData.code;
    document.getElementById("algoName").textContent = algoData.name;
    document.getElementById("algoDesc").textContent = algoData.description;
    document.getElementById("bestCase").textContent = algoData.timeComplexity.best;
    document.getElementById("avgCase").textContent = algoData.timeComplexity.average;
    document.getElementById("worstCase").textContent = algoData.timeComplexity.worst;
    document.getElementById("spaceComplexity").textContent = algoData.spaceComplexity;

    infoContainer.style.display = "block";
    algoContainer.style.display = "flex";
    codeContainer.style.display = "block";
}


selectAlgo.addEventListener("change", function () {
    renderAlgorithm(this.value);
});

document.getElementById("copy-btn").addEventListener("click", function() {
    const codeElement = document.getElementById("code-container");
    const textToCopy = codeElement.innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Code copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
});

// Initial render
renderAlgorithm("0");