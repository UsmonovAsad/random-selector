function $(a) {
	return document.querySelector(a);
}

function $All(a) {
	return document.querySelectorAll(a);
}

const input = $("input"),
	tagsEl = $("#tags"),
	chooseBtn = $(".chooseBtn"),
	clearTagsBtn = $(".clearTagsBtn"),
	tags = [];

clearTagsBtn.addEventListener("click", () => {
	tags.length = 0;
	for(const tag of $All(".tag")) tag.remove();
})

input.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {

		if (!tags.includes(e.target.value)) {
			createTag(e.target.value);
		}
		

		e.target.value = "";
	}
});

function createTag(value) {
	for(let tag of $All(".tag")) tag.remove();

		const tagValues = value.split(",").reverse()
									.filter(tag => tag.trim() !== "")
									.map(tag => tag.trim());
	
	for(let tag of tagValues) tags.push(tag);

	tags.forEach((tag,i) => {
		const tagEl = `
			<div class="tag">${tag} <i onclick="removeTag(this,${i})" class="fas fa-times"></i></div>
		`;

		tagsEl.insertAdjacentHTML("afterbegin",tagEl);
	});
}

function removeTag(e,i) {
	e.parentElement.remove();
	tags.splice(i,1);
}


chooseBtn.addEventListener("click",() => {
	randomSelect();
});

function randomSelect() {
	const interval = setInterval(() => {
		const randomTag = pickRandomTag();

		highLightTag(randomTag);

		setTimeout(() => {
			unHighLight(randomTag);
		},100);

		setTimeout(() => {
			clearInterval(interval);
			setTimeout(() => {
				for(const tag of $All(".tag")) unHighLight(tag);
				const randomTag = pickRandomTag();
				highLightTag(randomTag);
			},10);
		},1000);
	},50);
}

function pickRandomTag() {
	const tags = $All(".tag");
	return tags[Math.floor(Math.random() * tags.length)];
}

function highLightTag(tag) {
	tag.classList.add("heighlight");
}

function unHighLight(tag) {
	tag.classList.remove("heighlight");
}