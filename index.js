let input = document.querySelectorAll('input');
let submitButton = document.getElementById('submitBtn');
let dayLabel = document.getElementById('day-label');
let dayInput = document.getElementById('day');
let errorDay = document.querySelector('.error-day');
let daysResult = document.getElementById('days-result');
let monthLabel = document.getElementById('month-label');
let monthInput = document.getElementById('month');
let errorMonth = document.querySelector('.error-month');
let monthsResult = document.getElementById('months-result');
let yearLabel = document.getElementById('year-label');
let yearInput = document.getElementById('year');
let errorYear = document.querySelector('.error-year');
let yearsResult = document.getElementById('years-result');
const inputValues = { day: '', month: '', year: '' };

const updateValue = (e) => {
	inputValues[e.target.name] = Number(e.target.value);
};

input.forEach((element) => {
	element.addEventListener('input', (e) => {
		updateValue(e);
	});
});

const isValidYear = (year) => {
	const currentYear = new Date().getFullYear();
	return year <= currentYear && year > 0;
};

const isValidMonth = (month) => {
	return month <= 12 && month > 0;
};

const isValidDay = (year, month, day) => {
	var lastDay = new Date(year, month, 0).getDate();
	return day > 0 && day <= lastDay;
};

const calculateDifference = (year, month, day) => {
	// Set the date in the past
	const pastDate = new Date(year, month, day);
	// Get today's date
	const today = new Date();

	// Calculate the difference between the two dates in milliseconds
	const diffMilliseconds = today - pastDate;

	// Convert the difference to years, months, and days
	const diffYears = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24 * 365));
	const diffMonths = Math.floor(
		(diffMilliseconds % (1000 * 60 * 60 * 24 * 365)) /
			(1000 * 60 * 60 * 24 * 30)
	);
	const diffDays = Math.floor(
		(diffMilliseconds % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
	);

	yearsResult.textContent = diffYears;
	monthsResult.textContent = diffMonths;
	daysResult.textContent = diffDays;
};

submitButton.addEventListener('click', () => {
	const validYear = isValidYear(inputValues.year);
	const validMonth = isValidMonth(inputValues.month);
	const validDay = isValidDay(
		inputValues.year,
		inputValues.month,
		inputValues.day
	);

	if (!validDay) {
		dayLabel.style.color = 'hsl(0, 100%, 67%)';
		dayInput.style.border = '2px solid hsl(0, 100%, 67%)';
		errorDay.style.opacity = 1;
	} else {
		dayLabel.style.color = 'hsl(0, 1%, 44%)';
		dayInput.style.border = '2px solid hsl(0, 0%, 86%)';
		errorDay.style.opacity = 0;
	}

	if (!validMonth) {
		monthLabel.style.color = 'hsl(0, 100%, 67%)';
		monthInput.style.border = '2px solid hsl(0, 100%, 67%)';
		errorMonth.style.opacity = 1;
	} else {
		monthLabel.style.color = 'hsl(0, 1%, 44%)';
		monthInput.style.border = '2px solid hsl(0, 0%, 86%)';
		errorMonth.style.opacity = 0;
	}

	if (!validYear) {
		yearLabel.style.color = 'hsl(0, 100%, 67%)';
		yearInput.style.border = '2px solid hsl(0, 100%, 67%)';
		errorYear.style.opacity = 1;
	} else {
		yearLabel.style.color = 'hsl(0, 1%, 44%)';
		yearInput.style.border = '2px solid hsl(0, 0%, 86%)';
		errorYear.style.opacity = 0;
	}

	if (validDay && validMonth && validYear) {
		calculateDifference(
			inputValues.year,
			inputValues.month - 1,
			inputValues.day
		);
	}
});