import JSZip from 'jszip';

function updateStatus(status) {
	document.querySelector('.tco-extractor-status').innerHTML = status;
}

async function extractLinks(file) {
	updateStatus('Inspecting your zip file...');
	const zip = await JSZip.loadAsync(file);
	const tweetsString = await zip.file('data/tweets.js').async("string");
	const tweetsJson = tweetsString.substr(tweetsString.indexOf('['));
	const tweets = JSON.parse(tweetsJson);
	let links = [];
	tweets.forEach(item => {
		if (!item.tweet || !item.tweet.entities || !item.tweet.entities.urls) {
			return;
		}
		item.tweet.entities.urls.forEach(link => {
			if (link.expanded_url.substr(0, 20) == "https://twitter.com/" ||
			    link.expanded_url.substr(0, 19) == "http://twitter.com/") {
				return;
			}
			links.push([link.url, link.expanded_url]);
		});
	});
	return links;
}

function processRow(row) {
	var finalVal = '';
	for (var j = 0; j < row.length; j++) {
		var innerValue = row[j] === null ? '' : row[j].toString();
	if (row[j] instanceof Date) {
	innerValue = row[j].toLocaleString();
	};
	var result = innerValue.replace(/"/g, '""');

	if (j > 0)
	finalVal += ',';
	finalVal += result;
	}
	return finalVal + '\n';
	};

function generateCSV(links) {
	let csv = 'url,expanded_url\n';
	links.forEach(link => {
		csv += `${link[0]},`;
		if (link[0].search(/("|,|\n)/g) > -1) {
			csv += `"${link[1]}"\n`;
		} else {
			csv += `${link[1]}\n`;
		}
	});
	return csv;
}

function encodeDataURI(csv) {
	var blob = new Blob([csv], {
		type: 'text/csv;charset=utf-8;'
	});
	return URL.createObjectURL(blob);
}

export default {
	init() {
		const form = document.querySelector('.tco-extractor form');
		if (form) {
			form.addEventListener('submit', event => {
				event.preventDefault();
			});
		} else {
			console.error('no form found');
			return;
		}

		const input = document.querySelector('.tco-extractor input[type="file"]');
		if (input) {
			input.value = '';
			input.addEventListener('change', async event => {
				try {
					var [ file ] = event.target.files;
					const links = await extractLinks(file);
					const csvData = generateCSV(links);
					const dataURI = encodeDataURI(csvData);
					updateStatus('<a href="' + dataURI + '" class="tco-extractor-download" download="tco-links.csv">Download links CSV file</a>');
				} catch(error) {
					console.error(error.message);
				}
			});
		} else {
			console.error('no input found');
			return;
		}
	}
}
