const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const BOTTOM = 700;

let unsorted = [];
let steps = [];
let newLine = 0;
let timer = 0;
let speed = 50;

ctx.fillStyle = 'blue';

for (let i = 0; i < 80; i++) {
	let random = createRandom() * -1;
	ctx.fillRect(newLine, BOTTOM, 10, random);
	newLine += 11;
	unsorted.push(random);
}

function createRandom() {
	return Math.floor(Math.random() * 700);
}
let sorted = [...unsorted];
function bubbleSort() {
	let swapped;
	let n = unsorted.length - 1;
	do {
		swapped = false;
		for (let i = 0; i < n; i++) {
			if (unsorted[i] > unsorted[i + 1]) {
				doSetTimeoutClear(i, i + 1);
				const temp = unsorted[i];
				unsorted[i] = unsorted[i + 1];
				unsorted[i + 1] = temp;
				doSetTimeoutDraw(i, i + 1);
				swapped = true;
				timer++;
			}
		}
	} while (swapped);
}

function selectionSort() {
	let minIdx,
		temp,
		len = unsorted.length;
	for (let i = 0; i < len; i++) {
		minIdx = i;
		for (let j = i + 1; j < len; j++) {
			if (unsorted[j] < unsorted[minIdx]) {
				minIdx = j;
			}
		}

		temp = unsorted[i];
		unsorted[i] = unsorted[minIdx];
		unsorted[minIdx] = temp;
		doSetTimeoutClear(i, minIdx);
		doSetTimeoutDraw(i, minIdx);
		timer++;
	}
}
function insertionSort() {
	let i,
		len = unsorted.length,
		el,
		j;

	for (i = 1; i < len; i++) {
		el = unsorted[i];
		j = i;

		while (j > 0 && unsorted[j - 1] < el) {
			unsorted[j] = unsorted[j - 1];
			doSetTimeoutClear(j, j - 1);
			doSetTimeoutDraw(j, j - 1);
			timer++;
			j--;
		}

		unsorted[j] = el;
	}
}
swap = function(x, y) {
	let b = sorted[x];
	sorted[x] = sorted[y];
	sorted[y] = b;
};
function doSetTimeoutClear(i, index) {
	setTimeout(function() {
		clear(i, sorted);
		clear(index, sorted);
		swap(index, i);
	}, speed * timer);
}
function doSetTimeoutDraw(i, index) {
	setTimeout(function() {
		draw(i, sorted);
		draw(index, sorted);
	}, speed * timer);
}

function draw(i, list) {
	ctx.fillRect(i * 11, BOTTOM, 10, list[i]);
}
function clear(i, list) {
	ctx.clearRect(i * 11, BOTTOM, 10, list[i]);
}
$('#bubble').click(() => {
	bubbleSort();
});
$('#insert').click(() => {
	insertionSort();
});
$('#select').click(() => {
	selectionSort();
});
$('#reset').click(() => {
	location.reload();
});
